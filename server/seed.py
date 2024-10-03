# backend/seed.py

from app import app
from models import db, User, Recipe, Category, Review
import json

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
        recipe_data123 = Recipe(title = "Chocolate Cake", description = "A rich and moist chocolate cake perfect for all occasions.", image_url = "data:image/jpeg;base64,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", ingredients = "2 cups all-purpose flour"
                    "2 cups sugar"
                    "3/4 cup cocoa powder"
                    "2 teaspoons baking powder"
                    "1.5 teaspoons baking soda"
                    "1 teaspoon salt"
                    "1 cup milk"
                    "1/2 cup vegetable oil"
                    "2 eggs"
                    "2 teaspoons vanilla extract"
                    "1 cup boiling water", user_id = 1, categories = "Dessert")
        recipes_data = [
            {
                "title": "Chocolate Cake",
                "description": "A rich and moist chocolate cake perfect for all occasions.",
                "image_url": "data:image/jpeg;base64,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",
                "ingredients": [
                    "2 cups all-purpose flour",
                    "2 cups sugar",
                    "3/4 cup cocoa powder",
                    "2 teaspoons baking powder",
                    "1.5 teaspoons baking soda",
                    "1 teaspoon salt",
                    "1 cup milk",
                    "1/2 cup vegetable oil",
                    "2 eggs",
                    "2 teaspoons vanilla extract",
                    "1 cup boiling water"
                ],
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
                "image_url": "https://example.com/images/vegan_salad_bowl.jpg",
                "ingredients": [
                    "1 cup quinoa",
                    "2 cups water",
                    "1 cucumber, diced",
                    "1 bell pepper, diced",
                    "1/2 red onion, finely chopped",
                    "1 cup cherry tomatoes, halved",
                    "1/4 cup olive oil",
                    "2 tablespoons lemon juice",
                    "Salt and pepper to taste",
                    "Fresh parsley, chopped"
                ],
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
                "image_url": "https://example.com/images/pancakes.jpg",
                "ingredients": [
                    "1.5 cups all-purpose flour",
                    "3.5 teaspoons baking powder",
                    "1 teaspoon salt",
                    "1 tablespoon white sugar",
                    "1.25 cups milk",
                    "1 egg",
                    "3 tablespoons butter, melted"
                ],
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
                "image_url": "https://example.com/images/quinoa_stir_fry.jpg",
                "ingredients": [
                    "1 cup quinoa",
                    "2 cups water",
                    "1 tablespoon vegetable oil",
                    "2 cloves garlic, minced",
                    "1-inch piece ginger, minced",
                    "1 bell pepper, sliced",
                    "1 cup broccoli florets",
                    "1 carrot, julienned",
                    "2 tablespoons soy sauce",
                    "1 tablespoon sesame oil",
                    "Salt and pepper to taste",
                    "Sesame seeds for garnish"
                ],
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
                image_url=recipe_data.get("image_url"),
                ingredients=json.dumps(recipe_data.get("ingredients", [])),
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
