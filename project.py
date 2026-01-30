import mysql.connector
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password=os.getenv("DB_PASS"),
        database="mcd_water_management"
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
        cursor.execute("SELECT * FROM city_dataset WHERE city_name = %s", (user_city,))
        if cursor.fetchone():
            cursor.execute("UPDATE city_dataset SET overall_quality = %s WHERE city_name = %s", (water_quality, user_city))
        else:
            cursor.execute("INSERT INTO city_dataset (city_name, overall_quality) VALUES (%s, %s)", (user_city, water_quality))

        conn.commit()
        return {"message": "Complaint raised successfully"}

    except mysql.connector.Error as err:
        return {"error": str(err)}
    finally:
        if 'conn' in locals() and conn.is_connected():
            cursor.close()
            conn.close()