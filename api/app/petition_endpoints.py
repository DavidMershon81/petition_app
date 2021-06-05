from flask import request, jsonify
from app import app
from app import database as db

def petition_to_dict(p):
    return { 'id':p.id, 'petition_group_id' : p.petition_group_id, 'subject':p.subject, 'petition_text':p.petition_text }

@app.route('/api/petitions', methods=['GET', 'POST'])
def petitions():
    if request.method == 'GET':
        petition_group_id = request.args['petition_group_id']
        petitions = [petition_to_dict(p) for p in db.get_petitions(petition_group_id)]
        return jsonify(petitions)
    elif request.method == 'POST':
        json = request.json
        new_petition = db.add_petition(petition_group_id=json['petition_group_id'], subject=json['subject'], petition_text=json['petition_text'])
        return petition_to_dict(new_petition)

@app.route('/api/petitions/<petition_id>', methods=['GET'])
def petition(petition_id):
    petition = db.get_petition(petition_id)
    return jsonify(petition_to_dict(petition))