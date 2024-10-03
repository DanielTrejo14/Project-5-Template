# backend/models.py

from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from config import app, db
from flask_login import UserMixin



favorites = db.Table(
    'favorites',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipe.id'), primary_key=True)
)





class User(db.Model, UserMixin):
    __tablename__ = 'user'  

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password_hash = db.Column(db.String(128), nullable=False)
    
    recipes = db.relationship('Recipe', backref='author', lazy=True)
    favorite_recipes = db.relationship('Recipe', secondary='favorites', backref='favorited_by')
    
    reviews = db.relationship('Review', back_populates='reviewer', lazy=True)

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
    __tablename__ = 'category'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False, unique=True)

    


    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
        }

class Recipe(db.Model):
    __tablename__ = 'recipe'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255), nullable=True)  
    ingredients = db.Column(db.JSON, nullable=True) 
    categories = db.Column(db.Integer) 
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    
    
    reviews = db.relationship('Review', back_populates='recipe', lazy=True)
    
    def serialize(self):
        import json
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'image_url': self.image_url,
            'ingredients': self.ingredients,
            'author': self.author.serialize(),
            'categories': self.categories,
            'reviews': [review.serialize() for review in self.reviews]
        }

class Review(db.Model):
    __tablename__ = 'review'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    reviewer = db.relationship('User', back_populates='reviews')
    recipe = db.relationship('Recipe', back_populates='reviews')

    def serialize(self):
        return {
            'id': self.id,
            'content': self.content,
            'rating': self.rating,
            'recipe_id': self.recipe_id,
            'reviewer': self.reviewer.serialize()
        }