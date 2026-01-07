import os
import django
import random

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth.models import User
from api.models import Product, Category

def seed_data():
    print("Starting data seeding...")

    # 1. Get or Create a User (Admin)
    user = User.objects.filter(is_staff=True).first()
    if not user:
        user = User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
        print(f"Created superuser: {user.username}")

    # 2. Create Categories
    categories_data = [
        {'name': 'Electronics', 'slug': 'electronics'},
        {'name': 'Fashion', 'slug': 'fashion'},
        {'name': 'Sneakers', 'slug': 'sneakers'},
        {'name': 'Accessories', 'slug': 'accessories'},
        {'name': 'Home Decor', 'slug': 'home-decor'},
    ]

    category_objs = {}
    for cat in categories_data:
        obj, created = Category.objects.get_or_create(name=cat['name'], defaults={'slug': cat['slug']})
        category_objs[cat['name']] = obj
        if created:
            print(f"Created category: {cat['name']}")

    # 3. Sample Products Data
    products_data = [
        # Electronics
        {
            'name': 'Wireless Noise Cancelling Headphones',
            'brand': 'AudioMax',
            'category': 'Electronics',
            'description': 'Premium wireless headphones with industry-leading noise cancellation.',
            'price': 299.99,
            'countInStock': 15,
            'rating': 4.8,
            'numReviews': 120
        },
        {
            'name': 'Smart Watch Series X',
            'brand': 'TechWise',
            'category': 'Electronics',
            'description': 'Advanced fitness tracking and notifications on your wrist.',
            'price': 199.50,
            'countInStock': 25,
            'rating': 4.5,
            'numReviews': 85
        },
        {
            'name': 'Portable Bluetooth Speaker',
            'brand': 'SonicBoom',
            'category': 'Electronics',
            'description': 'Waterproof portable speaker with 20 hours of battery life.',
            'price': 79.99,
            'countInStock': 40,
            'rating': 4.2,
            'numReviews': 45
        },
        # Fashion
        {
            'name': 'Classic Denim Jacket',
            'brand': 'UrbanStyle',
            'category': 'Fashion',
            'description': 'A timeless denim jacket for every season.',
            'price': 89.00,
            'countInStock': 10,
            'rating': 4.6,
            'numReviews': 30
        },
        {
            'name': 'Minimalist White T-Shirt',
            'brand': 'BasicNeeds',
            'category': 'Fashion',
            'description': 'High-quality 100% cotton white tee.',
            'price': 24.99,
            'countInStock': 100,
            'rating': 4.9,
            'numReviews': 210
        },
        # Sneakers
        {
            'name': 'Retro High-Top Sneakers',
            'brand': 'Stride',
            'category': 'Sneakers',
            'description': 'Iconic high-top design with premium leather finish.',
            'price': 149.99,
            'countInStock': 8,
            'rating': 4.7,
            'numReviews': 65
        },
        {
            'name': 'Lightweight Running Shoes',
            'brand': 'Velocity',
            'category': 'Sneakers',
            'description': 'Breathable mesh upper with ultra-responsive cushioning.',
            'price': 110.00,
            'countInStock': 20,
            'rating': 4.4,
            'numReviews': 42
        },
        # Accessories
        {
            'name': 'Leather Minimalist Wallet',
            'brand': 'Hide & Seek',
            'category': 'Accessories',
            'description': 'Slim leather wallet with RFID protection.',
            'price': 45.00,
            'countInStock': 50,
            'rating': 4.8,
            'numReviews': 95
        },
        {
            'name': 'Premium Polarized Sunglasses',
            'brand': 'ClearView',
            'category': 'Accessories',
            'description': 'Classic aviator style with UV400 protection.',
            'price': 125.00,
            'countInStock': 12,
            'rating': 4.5,
            'numReviews': 28
        },
        # Home Decor
        {
            'name': 'Modern Ceramic Vase',
            'brand': 'Artisana',
            'category': 'Home Decor',
            'description': 'Handcrafted minimalist ceramic vase for modern interiors.',
            'price': 35.50,
            'countInStock': 15,
            'rating': 4.3,
            'numReviews': 18
        },
        {
            'name': 'Scented Soy Wax Candle',
            'brand': 'Lumina',
            'category': 'Home Decor',
            'description': 'Long-lasting lavender scented candle in a glass jar.',
            'price': 19.99,
            'countInStock': 60,
            'rating': 4.7,
            'numReviews': 52
        }
    ]

    # 4. Insert Products
    for prod in products_data:
        # Avoid duplicates by name
        if not Product.objects.filter(name=prod['name']).exists():
            Product.objects.create(
                user=user,
                name=prod['name'],
                brand=prod['brand'],
                category=category_objs.get(prod['category']),
                description=prod['description'],
                price=prod['price'],
                countInStock=prod['countInStock'],
                rating=prod['rating'],
                numReviews=prod['numReviews']
            )
            print(f"Added product: {prod['name']}")
        else:
            print(f"Product already exists: {prod['name']}")

    print("Data seeding completed successfully!")

if __name__ == '__main__':
    seed_data()
