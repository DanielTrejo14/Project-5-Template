# backend/seed.py

from app import app, db
from models import User, Recipe, Category, Review
from werkzeug.security import generate_password_hash

def seed():
    with app.app_context():
        # Drop all existing tables and recreate them
        db.drop_all()
        db.create_all()

        # 1. Seed Users
        users_data = [
            {
                "username": "john_doe",
                "email": "john@example.com",
                "password": "password123"
            },
            {
                "username": "jane_smith",
                "email": "jane@example.com",
                "password": "securepassword"
            },
            {
                "username": "alice_wonder",
                "email": "alice@example.com",
                "password": "alicepass"
            },
            # Add more users as needed
        ]

        users = []
        for user_data in users_data:
            user = User(
                username=user_data["username"],
                email=user_data["email"]
            )
            user.set_password(user_data["password"])  # Hash the password
            users.append(user)

        db.session.add_all(users)
        db.session.commit()

        # 2. Seed Categories
        categories_data = [
            {"name": "Dessert"},
            {"name": "Vegan"},
            {"name": "Quick Meals"},
            {"name": "Breakfast"},
            {"name": "Lunch"},
            {"name": "Dinner"},
            {"name": "Beverages"},
            {"name": "Appetizers"},
            {"name": "Gluten-Free"},
            {"name": "Healthy"},
            # Add more categories as needed
        ]

        categories = []
        for category_data in categories_data:
            category = Category(name=category_data["name"])
            categories.append(category)

        db.session.add_all(categories)
        db.session.commit()

        # 3. Seed Recipes
        recipes_data = [
            {
                "title": "Chocolate Cake",
                "description": "A rich and moist chocolate cake perfect for all occasions.",
                "author_email": "john@example.com",
                "categories": ["Dessert"],
                "reviews": [
                    {
                        "content": "Absolutely delicious! My family loved it.",
                        "rating": 5,
                        "reviewer_email": "jane@example.com"
                    },
                    {
                        "content": "Too sweet for my taste.",
                        "rating": 3,
                        "reviewer_email": "alice@example.com"
                    },
                ]
            },
            {
                "title": "Vegan Salad Bowl",
                "description": "A healthy and colorful salad packed with fresh vegetables and quinoa.",
                "author_email": "jane@example.com",
                "categories": ["Vegan", "Healthy", "Lunch"],
                "reviews": [
                    {
                        "content": "Perfect for a quick and nutritious lunch!",
                        "rating": 5,
                        "reviewer_email": "john@example.com"
                    },
                ]
            },
            {
                "title": "Pancakes",
                "description": "Fluffy pancakes served with maple syrup and fresh berries.",
                "author_email": "alice@example.com",
                "categories": ["Breakfast", "Dessert"],
                "reviews": [
                    {
                        "content": "The pancakes were light and fluffy. Will make again!",
                        "rating": 4,
                        "reviewer_email": "john@example.com"
                    },
                    {
                        "content": "Great taste but a bit too greasy.",
                        "rating": 3,
                        "reviewer_email": "jane@example.com"
                    },
                ]
            },
            {
                "title": "Quinoa Stir-Fry",
                "description": "A quick and easy stir-fry with quinoa, vegetables, and a savory sauce.",
                "author_email": "john@example.com",
                "categories": ["Vegan", "Quick Meals", "Dinner"],
                "reviews": [
                    {
                        "content": "Fast to make and very tasty!",
                        "rating": 5,
                        "reviewer_email": "alice@example.com"
                    },
                ]
            },
            # Add more recipes as needed
        ]

        for recipe_data in recipes_data:
            # Find the author by email
            author = User.query.filter_by(email=recipe_data["author_email"]).first()
            if not author:
                print(f"Author with email {recipe_data['author_email']} not found.")
                continue

            # Create the recipe
            recipe = Recipe(
                title=recipe_data["title"],
                description=recipe_data["description"],
                author=author
            )

            # Assign categories to the recipe
            for cat_name in recipe_data["categories"]:
                category = Category.query.filter_by(name=cat_name).first()
                if category:
                    recipe.categories.append(category)
                else:
                    print(f"Category '{cat_name}' not found.")

            db.session.add(recipe)
            db.session.commit()  # Commit to generate recipe ID for reviews

            # Add reviews to the recipe
            for review_data in recipe_data.get("reviews", []):
                reviewer = User.query.filter_by(email=review_data["reviewer_email"]).first()
                if not reviewer:
                    print(f"Reviewer with email {review_data['reviewer_email']} not found.")
                    continue

                review = Review(
                    content=review_data["content"],
                    rating=review_data["rating"],
                    recipe=recipe,
                    reviewer=reviewer
                )
                db.session.add(review)

            db.session.commit()  # Commit reviews

        print("Database seeded successfully.")

if __name__ == "__main__":
    seed()
