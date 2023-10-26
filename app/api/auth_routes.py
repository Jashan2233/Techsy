from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from .aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from flask_login import current_user, login_user, logout_user, login_required
#Oauth Imports
import os
import pathlib
import requests
from flask import abort, redirect # note that you can slap these 2 imports at the end of the 'from flask import' statement that you probably already have.
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests
from tempfile import NamedTemporaryFile
import json

auth_routes = Blueprint('auth', __name__)


# Note: As the flow object requires a file path to load the configuration from AND
	# we want to keep our credentials safe (out of our github repo!!).
	# We will create a temporary file to hold our values as json.
	# Some of these values will come from our .env file.
# Import our credentials from the .env file
CLIENT_SECRET = os.getenv('GOOGLE_OAUTH_CLIENT_SECRET')
CLIENT_ID = os.getenv('GOOGLE_OAUTH_CLIENT_ID')
BASE_URL = os.getenv('BASE_URL')

client_secrets = {
  "web": {
    "client_id": CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": CLIENT_SECRET,
    "redirect_uris": [
      "http://localhost:5000/api/auth/callback"
    ]
  }
}

# Here we are generating a temporary file as the google oauth package requires a file for configuration!
secrets = NamedTemporaryFile()
# Note that the property '.name' is the file PATH to our temporary file!
# The command below will write our dictionary to the temp file AS json!
with open(secrets.name, "w") as output:
    json.dump(client_secrets, output)

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1" # to allow Http traffic for local dev

flow = Flow.from_client_secrets_file(
    client_secrets_file=secrets.name,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
    redirect_uri="http://localhost:5000/callback"
)

secrets.close() # This method call deletes our temporary file from the /tmp folder! We no longer need it as our flow object has been configured!





def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
