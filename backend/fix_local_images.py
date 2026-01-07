import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import Product

def fix_images():
    print("Fixing product images based on local files...")
    
    # Map products to the images the user actually has
    updates = {
        'Wireless Noise Cancelling Headphones': 'img-1.jpg',
        'Smart Watch Series X': 'img-2.jpg',
        'Portable Bluetooth Speaker': 'img-3.jpg',
        'Classic Denim Jacket': 'Cotton_Suit_with_Dupatta.jpg',
        'Minimalist White T-Shirt': 'Floral_Cotton_Kurti.jpg',
        'Retro High-Top Sneakers': 'Chiffon_Dupatta__White.jpg',
        'Lightweight Running Shoes': 'Unstitched_Cotton_Dress_Material__Indigo.jpg',
        'Leather Minimalist Wallet': 'Printed_Cotton_Suit_with_Dupatta.jpg',
        'Premium Polarized Sunglasses': 'img-1_3D0JCiL.jpg',
        'Modern Ceramic Vase': 'Floral_Cotton_Kurti.jpg',
        'Scented Soy Wax Candle': 'img-2.jpg',
    }

    for name, image_path in updates.items():
        product = Product.objects.filter(name=name).first()
        if product:
            # We store the relative path within the media root
            product.image = image_path
            product.save()
            print(f"Updated image for: {name} -> {image_path}")
        else:
            print(f"Product not found: {name}")

    print("Image fix completed!")

if __name__ == '__main__':
    fix_images()
