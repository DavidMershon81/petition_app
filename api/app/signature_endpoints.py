from flask import request, jsonify
from app import app
from app import database as db

def signature_to_dict(s):
    return { 'id':s.id, 'petition_id' : s.petition_id, 'user_id':s.user_id, 'reveal_threshold':s.reveal_threshold }

@app.route('/api/signatures', methods=['GET', 'POST'])
def signatures():
    print('signatures API')
    if request.method == 'GET':
        petition_id = request.args['petition_id']
        signatures = [signature_to_dict(p) for p in db.get_signatures(petition_id)]
        return jsonify(signatures)
    elif request.method == 'POST':
        json = request.json
        new_signature = db.add_signature(petition_id=json['petition_id'], user_id=json['user_id'], reveal_threshold=json['reveal_threshold'])
        return signature_to_dict(new_signature)