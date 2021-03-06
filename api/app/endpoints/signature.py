from flask import request, jsonify, Blueprint
from app import session_check, signature_reveal
import app.database.signature_queries as sig_queries
import app.database.user_queries as u_queries

bp_signature_endpoints = Blueprint('signature_endpoints', __name__)

def signature_to_dict(s):
    return { 'id':s.id, 'petition_id' : s.petition_id, 'user_id':s.user_id, 'reveal_threshold':s.reveal_threshold }

@bp_signature_endpoints.route('/api/signatures', methods=['GET', 'POST'])
@session_check.session_required
def signatures(current_user):
    if request.method == 'GET':
        return get_revealed_signatures(request.args['petition_id'])
    elif request.method == 'POST':
        if not request.json or not 'petition_id' in request.json or not 'reveal_threshold' in request.json:
            print('missing request parameters')
            return jsonify({ 'message' : 'missing_request_parameters'}),403
        else:
            return try_sign_petition(current_user, request.json['petition_id'], request.json['reveal_threshold'])

def try_sign_petition(current_user, petition_id, reveal_threshold):
    user_id = current_user.id
    user_signed = sig_queries.did_user_sign_petition(petition_id, user_id)
    not_in_group = user_id not in [u.id for u in u_queries.get_petition_users(petition_id)]

    if user_signed:
        print('user already signed, returning error message')
        return jsonify({ 'message' : 'user_already_signed'}),403
    elif not_in_group:
        print('user not in petition group, returning error message')
        return jsonify({ 'message' : 'user_not_in_group'}),403
    else:
        print('adding new signature')
        new_signature = sig_queries.add_signature(petition_id=petition_id, user_id=user_id, reveal_threshold=reveal_threshold)
        return signature_to_dict(new_signature)

def get_revealed_signatures(petition_id):
    signatures_raw = sig_queries.get_signatures(petition_id)
    revealed_sigs = signature_reveal.get_signatures_for_endpoint(signatures_raw)
    return jsonify(revealed_sigs)

@bp_signature_endpoints.route('/api/user_signed', methods=['GET'])
@session_check.session_required
def user_signed(current_user):
    print(f"checking user_signed for : {current_user.email}")
    user_signed = sig_queries.did_user_sign_petition(request.args['petition_id'], current_user.id)
    print(f"user_signed: {user_signed}")
    return jsonify({ 'user_signed' : user_signed })