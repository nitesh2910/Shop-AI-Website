import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import Product

def update_images():
    print("Updating product images...")
    
    updates = {
        'Wireless Noise Cancelling Headphones': '/images/headphones.png',
        'Smart Watch Series X': '/images/smartwatch.png',
        'Portable Bluetooth Speaker': '/images/speaker.png',
        'Classic Denim Jacket': '/images/jacket.png',
        'Minimalist White T-Shirt': '/images/tshirt.png',
        'Retro High-Top Sneakers': 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800',
        'Lightweight Running Shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
        'Leather Minimalist Wallet': 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800',
        'Premium Polarized Sunglasses': 'https://images.unsplash.com/photo-1511499767390-a739039759d7?auto=format&fit=crop&q=80&w=800',
        'Modern Ceramic Vase': 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=800',
        'Scented Soy Wax Candle': 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800',
    }

    for name, image_path in updates.items():
        product = Product.objects.filter(name=name).first()
        if product:
            product.image = image_path
            product.save()
            print(f"Updated image for: {name}")
        else:
            print(f"Product not found: {name}")

    print("Image update completed!")

if __name__ == '__main__':
    update_images()
