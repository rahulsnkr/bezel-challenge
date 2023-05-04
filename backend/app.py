from flask import Flask, request, jsonify
from watch import Watch
import requests

app = Flask(__name__)

# GET request for watch details
@app.route('/marketplace/orders/<int:order_id>', methods=['GET'])
def get_watch_details(order_id):
    response = requests.get(f'https://eb863a74-7a4e-4daf-9540-d2db8470c18e.mock.pstmn.io/marketplace/orders/{order_id}')
    if response.status_code == 200:
        data = response.json()
        watch = Watch(data)
        return jsonify(watch.get_details())
    else:
        return 'Error'

# POST request for accepting an order
@app.route('/marketplace/orders/<int:order_id>/accept', methods=['POST'])
def accept_order(order_id):
    response = requests.post(f'https://eb863a74-7a4e-4daf-9540-d2db8470c18e.mock.pstmn.io/marketplace/orders/{order_id}/accept')
    if response.status_code == 200:
        return 'Success'
    else:
        return 'Error'

# POST request for declining an order
@app.route('/marketplace/orders/<int:order_id>/decline', methods=['POST'])
def decline_order(order_id):
    response = requests.post(f'https://eb863a74-7a4e-4daf-9540-d2db8470c18e.mock.pstmn.io/marketplace/orders/{order_id}/decline')
    if response.status_code == 200:
        return 'Success'
    else:
        return 'Error'
    
if __name__ == '__main__':
    app.run(debug=True)
