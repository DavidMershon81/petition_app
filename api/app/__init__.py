from flask import Flask, session
from dotenv import dotenv_values

#init flask app
app = Flask(__name__, static_folder='../../build', static_url_path='/')
config = dotenv_values("app_env")
app.config['SECRET_KEY'] = config['SECRET_KEY']

#note - this should be strict when this is properly deployed
#but I think setting this to Lax is the only thing that's going to work
#until HTTPS is set up
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

from app import database as db
db.connect()

from app import email
email.init(app)

from app import front_end_views
from app import user_endpoints
from app import petition_group_endpoints
from app import member_endpoints
from app import petition_endpoints
from app import signature_endpoints
from app import login_endpoints

@app.route('/test_mail')
def test_mail():    
    body = """
    Dear Recipient,
    Don't you love testing mail? It's great to get a test mail, don't you think? 
    I do!
    I love mail!
    Sincerely,
    The Petition App
    """
    mail_sent = email.send_mail(recipients=['wakik47254@5ubo.com'], subject = "A mail to test mails", body=body)
    message = 'successfully sent mail!' if mail_sent else 'failed to send mail.'
    return f"<h1>{message}</h1>"