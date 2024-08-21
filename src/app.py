import json
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO


app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
socket = SocketIO(app)
cors = CORS(app)


@socket.on("connect")
def on_connect():
    print("New connection")

@app.route("/")
def index_page():
    return send_from_directory(app.static_folder, "index.html")

@app.post('/update-flow-rate')
def update_flow_rate():
    try:
        data = json.loads(request.data)
        socket.emit("data", data)
        return jsonify({"message" : "OK"}), 200
    except:
        return jsonify({"message" : "Failed"}), 400
