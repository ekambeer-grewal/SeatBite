import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
# server.py
from flask import Flask, jsonify, request
from AppBase import checkValid  # your seat/path algorithm

app = Flask(__name__)

# Return seat statuses (optional)
@app.route("/seat_status")
def seat_status():
    return jsonify({})  # initially empty, paths will highlight dynamically

# Get path for a given seat
@app.route("/seat_path", methods=["POST"])
def seat_path():
    data = request.json
    seat_num = data.get("seat")
    if not seat_num:
        return jsonify({"error": "No seat provided"}), 400

    path = checkValid(seat_num)
    if path is None:
        return jsonify({"error": "Invalid seat"}), 400

    # path is a list like ["A1", "A2", ..., "Con1"]
    return jsonify({"path": path})

if __name__ == "__main__":
    app.run(debug=True)