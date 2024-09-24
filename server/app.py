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
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user is None or not user.check_password(password):
        return jsonify({'error': 'Invalid email or password'}), 400


    session['user_id'] = user.id
    return jsonify({'message': 'Logged in successfully', 'user': user.serialize()}), 200



@app.route('/logout', method=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully'}), 200



@app.route('/recipes', methods=['POST'])
@login_required
def create_recipe():
    data = request.json
    title = data.get('title')
    description = data.get('description')
    user_id = session.get('user_id')

    if not title or not description:
        return jsonify({'error': 'Title and description are required'}), 400

    recipe = Recipe(title=title, description=description, user_id=user_id)
    db.session.add(recipe)
    db.session.commit()
    return jsonify({'message': 'Recipe created successfully', 'recipe': recipe.serialize()}), 201




@app.route('/recipes', methods=['GET'])
def get_recipe():
    recipes = Recipe.query.all()
    return jsonify([recipe.serialize() for recipe in recipes])

@app.route('/recipes/<int:id>', methods=['GET'])
def get_recipe(id):
    recipe = Recipe.query.get_or_404(id)
    return jsonify(recipe.serialize())


@app.route('/recipes/<int:id>', methods=['PATCH'])
@login_required
def update_recipe(id):
    recipe = Recipe.query.get_or_404(id)
    data = request.json
    recipe.title = data.get('title', recipe.title)
    recipe.description = data.get('description', recipe.description)
    db.session.commit()
    return jsonify({'message': 'Recipe updated successfully', 'recipe': recipe.serialize()}), 200


@app.route('/recipes/<int:id>', methods=['DELETE'])
@login_required
def delete_recipe(id):
    recipe = Recipe.query.get_or_404(id)
    db.session.delete(recipe)
    db.session.commit()
    return jsonify({'message': 'Recipe deleted successfully'}), 200


@app.route('/recipes/<int:recipe_id>/favorite', methods=['POST'])
@login_required
def favorite_recipe(recipe_id):
    user_id = session['user_id']
    user = User.query.get_or_404(user_id)
    recipe = Recipe.query.get_or_404(recipe_id)


    if recipe in user.favorite_recipes:
        return jsonify({'message': 'Recipe already favorited'}), 400
    

    user.favorite_recipes.append(recipe)
    db.session.commit()
    return jsonify({'message': 'Recipe favorited successfully'}), 200


@app.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([category.serialize() for category in categories])




@app.route('/recipes/<int:recipe_id>/reviews', methods=['POST'])
@login_required
def create_review(recipe_id):
    data = request.json
    content = data.get('content')
    rating = data.get('rating')
    user_id = session['user_id']

    if not content or not rating:
        return jsonify({'error': 'Content and rating are required'}), 400
    

    review = Review(content=content, rating=rating, user_id=user_id, recipe_id=recipe_id)
    db.session.add(review)
    db.session.commit()
    return jsonify({'message': 'Review created successfully', 'review': review.serialize()}), 201



if __name__ == '__main__':
    app.run(port=5555, debug=True)
