#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app

from app import app
from models import db, User, Recipe, Category, Review
from werkzeug.security import generate_password_hash

def seed():
    with app.app_context():
        db.drop_all()
        db.create_all()

        
        user1 = User(username="john_doe", email="john@example.com")
        user1.set_password("password123")
        user2 = User(username="jane_smith", email="jane@example.com")
        user2.set_password("securepassword")

        db.session.add_all([user1, user2])
        db.session.commit()

        
        category1 = Category(name="Dessert")
        category2 = Category(name="Vegan")
        category3 = Category(name="Quick Meals")

        db.session.add_all([category1, category2, category3])
        db.session.commit()

        
        recipe1 = Recipe(title="Chocolate Cake", description="Delicious and moist chocolate cake.", author=user1)
        recipe1.categories.extend([category1])
        recipe2 = Recipe(title="Vegan Salad", description="Fresh and healthy vegan salad.", author=user2)
        recipe2.categories.extend([category2, category3])

        db.session.add_all([recipe1, recipe2])
        db.session.commit()

        review1 = Review(content="Amazing cake!", rating=5, recipe=recipe1, reviewer=user2)
        review2 = Review(content="Loved the freshness.", rating=4, recipe=recipe2, reviewer=user1)

        db.session.add_all([review1, review2])
        db.session.commit()

        print("Database seeded successfully.")

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        seed()
    