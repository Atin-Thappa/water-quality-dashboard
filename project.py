import mysql.connector

def mcd_login(mcd_gmail, mcd_password):
    conn = mysql.connector.connect(
        host="localhost",
        user="root",          # your MySQL username
        password="sql123",  # your MySQL password
        database="Project"   # your database name
    )
    cursor = conn.cursor()
    query = """
    SELECT mcd_name, mcd_post
    FROM mcd_staff
    WHERE mcd_gmail = %s AND mcd_password = %s
    """
    cursor.execute(query, (mcd_gmail, mcd_password))
    staff = cursor.fetchone()
    cursor.close()
    conn.close()
    if staff:
        return {
            "status": "success",
            "mcd_name": staff[0],
            "mcd_post": staff[1]
        }
    else:
        return {
            "status": "failed",
            "message": "Invalid email or password"
        }
