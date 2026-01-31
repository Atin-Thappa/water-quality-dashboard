from flask import Flask, request, jsonify
from project import mcd_login, raise_complaint, get_db_connection

app = Flask(__name__)

#MCD LOGIN API
@app.route("/mcd/login", methods=["POST"])
def mcd_login_api():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    result = mcd_login(email, password)
    return jsonify(result)

#RAISE COMPLAINT API 
@app.route("/complaint/raise", methods=["POST"])
def raise_complaint_api():
    data = request.json
    result = raise_complaint(
        data.get("user_gmail"),
        data.get("user_city"),
        data.get("water_quality")
    )
    return jsonify(result)
@app.route("/complaint/list", methods=["GET"])
def list_complaints():
    city = request.args.get("city")  

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    if city:
        cursor.execute("""
            SELECT complaint_id, user_gmail, city_name, reported_status, work_status, time
            FROM complaints
            WHERE city_name = %s
            ORDER BY time DESC
        """, (city,))
    else:
        cursor.execute("""
            SELECT complaint_id, user_gmail, city_name, reported_status, work_status, time
            FROM complaints
            ORDER BY time DESC
        """)

    complaints = cursor.fetchall()
    cursor.close()
    conn.close()

    return jsonify(complaints)


if __name__ == "__main__":
    app.run(debug=True)
