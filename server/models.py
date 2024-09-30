# backend/models.py

from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from config import app, db

# Association table for Recipe-Category (Many-to-Many)
recipe_category = db.Table(
    'recipe_category',
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipe.id'), primary_key=True),
    db.Column('category_id', db.Integer, db.ForeignKey('category.id'), primary_key=True)
)

# Association table for User-Favorites (Many-to-Many)
favorites = db.Table(
    'favorites',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipe.id'), primary_key=True)
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password_hash = db.Column(db.String(128), nullable=False)
    
    recipes = db.relationship('Recipe', backref='author', lazy=True)
    favorite_recipes = db.relationship('Recipe', secondary='favorites', backref='favorited_by')

    reviews = db.relationship('Review', backref='reviewer', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False, unique=True)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'recipes': [recipe.id for recipe in self.recipes]  # Optional: list of recipe IDs
        }

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    categories = db.relationship('Category', secondary=recipe_category, backref='recipes')
    reviews = db.relationship('Review', backref='recipe', lazy=True)

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'author': self.author.serialize(),
            'categories': [category.name for category in self.categories],
            'reviews': [review.serialize() for review in self.reviews]
        }

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    user = db.relationship('User', backref='user_reviews')

    def serialize(self):
        return {
            'id': self.id,
            'content': self.content,
            'rating': self.rating,
            'recipe_id': self.recipe_id,
            'user': self.user.serialize()
        }
