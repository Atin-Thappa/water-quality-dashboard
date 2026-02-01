from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from project import mcd_login, raise_complaint, get_db_connection
app = Flask(__name__)
CORS(app)

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
@app.route("/api/map-data", methods=["GET"])
def get_map_data():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        # We fetch the city and its status to show on the map
        query = "SELECT city_name, overall_quality FROM city_dataset"
        cursor.execute(query)
        city_data = cursor.fetchall()
        
        return jsonify({
            "status": "success",
            "data": city_data
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
    finally:
        if 'conn' in locals() and conn.is_connected():
            cursor.close()
            conn.close()

@app.route("/complaint/resolve/<int:complaint_id>", methods=["PUT"])
def resolve_complaint_api(complaint_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        query = "UPDATE complaints SET work_status = 'Resolved' WHERE complaint_id = %s"
        cursor.execute(query, (complaint_id,))
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return jsonify({"status": "success", "message": f"Complaint {complaint_id} resolved"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    host = os.getenv("FLASK_HOST", "0.0.0.0")
    port = int(os.getenv("FLASK_PORT", 1000))
    debug = os.getenv("FLASK_DEBUG", "True") == "True"

    app.run(host=host, port=port, debug=debug)
