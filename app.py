from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import database

app = Flask(__name__)
CORS(app)

# --------------------------
# Home API
# --------------------------

@app.route("/")
def home():
    return jsonify({
        "project":"Smart Payload Management System",
        "status":"Running"
    })

# --------------------------
# Save Mission API
# --------------------------

@app.route("/api/mission", methods=["POST"])
def save_mission():

    data = request.get_json()

    conn = sqlite3.connect("uav.db")
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO missions
        (
            uav_name,
            payload,
            distance,
            cg,
            battery,
            risk,
            status
        )
        VALUES(?,?,?,?,?,?,?)
    """,
    (
        data["uav_name"],
        data["payload"],
        data["distance"],
        data["cg"],
        data["battery"],
        data["risk"],
        data["status"]
    ))

    conn.commit()
    conn.close()

    return jsonify({
        "message":"Mission Saved Successfully"
    })

# --------------------------
# Get Mission API
# --------------------------

@app.route("/api/missions", methods=["GET"])
def get_missions():

    conn = sqlite3.connect("uav.db")

    cursor = conn.cursor()

    cursor.execute("SELECT * FROM missions")

    rows = cursor.fetchall()

    conn.close()

    missions=[]

    for row in rows:

        missions.append({

            "id":row[0],

            "uav_name":row[1],

            "payload":row[2],

            "distance":row[3],

            "cg":row[4],

            "battery":row[5],

            "risk":row[6],

            "status":row[7]

        })

    return jsonify(missions)

if __name__=="__main__":
    app.run(debug=True)