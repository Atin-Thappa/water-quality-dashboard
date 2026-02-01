import mysql.connector
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()
def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        port=int(os.getenv("DB_PORT", 3306)),  # Railway uses 44223
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASS"),
        database=os.getenv("DB_NAME")
    )

def mcd_login(mcd_gmail, mcd_password):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        query = """
        SELECT mcd_name, mcd_post
        FROM mcd_staff
        WHERE mcd_gmail = %s AND mcd_password = %s
        """
        cursor.execute(query, (mcd_gmail, mcd_password))
        staff = cursor.fetchone()
        return {
            "status": "success",
            "mcd_name": staff[0],
            "mcd_post": staff[1]
        } if staff else {"status": "failed", "message": "Invalid email or password"}
    except mysql.connector.Error as err:
        return {"status": "error", "message": str(err)}
    finally:
        if 'conn' in locals() and conn.is_connected():
            cursor.close()
            conn.close()

def raise_complaint(user_gmail, user_city, water_quality):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM users WHERE user_gmail = %s", (user_gmail,))
        if not cursor.fetchone():
            return {"error": "User not found"}

        if water_quality not in ["Good", "Bad", "Severe"]:
            return {"error": "Invalid water quality status"}

        insert_query = """
            INSERT INTO complaints (user_gmail, city_name, reported_status, work_status, time)
            VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(insert_query, (user_gmail, user_city, water_quality, "Pending", datetime.now()))

        freq_query = """
            SELECT reported_status, COUNT(*) as cnt
            FROM complaints
            WHERE city_name = %s
            GROUP BY reported_status
            ORDER BY cnt DESC
            LIMIT 1
        """
        cursor.execute(freq_query, (user_city,))
        most_frequent = cursor.fetchone()

        if most_frequent:
            most_status = most_frequent[0]

            cursor.execute("SELECT * FROM city_dataset WHERE city_name = %s", (user_city,))
            if cursor.fetchone():
                update_query = "UPDATE city_dataset SET overall_quality = %s WHERE city_name = %s"
                cursor.execute(update_query, (most_status, user_city))
            else:
                insert_dataset_query = "INSERT INTO city_dataset (city_name, overall_quality) VALUES (%s, %s)"
                cursor.execute(insert_dataset_query, (user_city, most_status))

        conn.commit()
        return {"message": "Complaint raised successfully"}

    except mysql.connector.Error as err:
        return {"error": str(err)}
    finally:
        if 'conn' in locals() and conn.is_connected():
            cursor.close()
            conn.close()
# if __name__ == "__main__":
#     print(f"DEBUG: Trying to use password: {os.getenv('DB_PASS')}")
#     try:
#         conn = get_db_connection()
#         print("✅ SUCCESS: Connected to the database!")
#         conn.close()
#     except Exception as e:
#         print(f"❌ DETAILED ERROR: {e}")