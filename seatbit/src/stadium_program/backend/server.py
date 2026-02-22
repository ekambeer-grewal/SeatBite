import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
# server.py
from flask import Flask, jsonify, request
from AppBase import checkValid

app = Flask(__name__)

@app.route("/seat_path", methods=["POST"])
def seat_path():
    data = request.json
    seat_num = data.get("seat")
    if not seat_num:
        return jsonify({"error": "No seat provided"}), 400

    path = checkValid(seat_num)
    if path is None:
        return jsonify({"error": "Invalid seat"}), 400

    return jsonify({"path": path})

if __name__ == "__main__":
    app.run(debug=True)