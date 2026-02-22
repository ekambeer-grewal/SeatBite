from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

# Homepage route
@app.route("/")
def home():
    return render_template("index.html")  # Flask will look inside 'templates/' folder

# Return seat status
@app.route("/seat_status")
def seat_status():
    data = {
        "Side1-R0-C0": "available",
        "Side1-R0-C1": "taken",
        # etc.
    }
    return jsonify(data)

# Example: receive data from JS
@app.route("/book_seat", methods=["POST"])
def book_seat():
    info = request.json
    print("Booking request:", info)
    return jsonify({"status": "success"})

if __name__ == "__main__":
    app.run(debug=True)