from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import requests
import json

# Flask Server
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/uv', methods=['POST'])
def check_uv():
    # Datetime has to be in this format YYYY-MM-DDTHH-MM-SS
    # 2019-04-24T10%3A00%3A00
    date = json.loads(request.data)['date']
    url = 'https://api.data.gov.sg/v1/environment/uv-index?date_time='+ str(date).replace(" ","-")\
        + "T10%3A00%3A00"
    headers = {
        'Accept': 'application/json',
        'Content-Type': "application/json"
    }
    r = requests.get(url, headers=headers)
    print(r.text)
    result = json.loads(
        r.text)['items'][0]["index"][0]["value"]
    return jsonify(result)

@cross_origin
@app.route('/psi', methods=['POST'])
def check_psi():
    """
    Datetime has to be in this format YYYY-MM-DDTHH:MM:SS
    2019-04-24T10%3A00%3A00
    """
    date = json.loads(request.data)['date']
    url = 'https://api.data.gov.sg/v1/environment/psi?date_time=' + str(date).replace(" ","-")\
        + "T10%3A00%3A00"
    headers = {
        'Accept': 'application/json',
        'Content-Type': "application/json"
    }
    r = requests.get(url, headers=headers)
    result = json.loads(
        r.text)['items'][0]['readings']["psi_twenty_four_hourly"]
    return jsonify(result)

@app.route('/pm', methods=['POST'])
def check_pm():
    """
    Datetime has to be in this format YYYY-MM-DDTHH-MM-SS
    2019-04-24T10%3A00%3A00
    """
    date = json.loads(request.data)['date']
    url = 'https://api.data.gov.sg/v1/environment/pm25?date_time='+ str(date).replace(" ","-")\
        + "T10%3A00%3A00"
    headers = {
        'Accept': 'application/json',
        'Content-Type': "application/json"
    }
    r = requests.get(url, headers=headers)
    result = json.loads(r.text)['items'][0]['readings']["pm25_one_hourly"]
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
