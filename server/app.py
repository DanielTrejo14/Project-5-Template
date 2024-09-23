#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify, session, Flask
from functools import wraps
# Local imports
from config import app, db, api
from models import User, Recipe, Review, Category


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user.id' not in session:
            return jsonify({'error': 'You need to be logged in to access this resource'}), 403
        return f(*args, **kwargs)
    return decorated_function


@app.route('/users', method=['POST'])
def create_user():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')


    if not username or not email or not password:
        return jsonify({'error': 'all field are required'}), 400
    

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 400
    
    user = User(username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User created successfully', 'user': user.serialize()}), 201



@app.route('/login', method=['POST'])
def login():
    data = request.json
    
    




if __name__ == '__main__':
    app.run(port=5555, debug=True)

