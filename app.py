from flask import Flask, request, jsonify
from project import mcd_login, raise_complaint

app = Flask(__name__)

# ---- MCD LOGIN API ----
@app.route("/mcd/login", methods=["POST"])
def mcd_login_api():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    result = mcd_login(email, password)
    return jsonify(result)

# ---- RAISE COMPLAINT API ----
@app.route("/complaint/raise", methods=["POST"])
def raise_complaint_api():
    data = request.json
    result = raise_complaint(
        data.get("user_gmail"),
        data.get("user_city"),
        data.get("water_quality")
    )
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
