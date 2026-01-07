import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import Product

def final_sync():
    print("Finalizing product images mapping...")
    
    updates = {
        'Wireless Noise Cancelling Headphones': 'headphones_ai.png',
        'Smart Watch Series X': 'smartwatch_ai.png',
        'Portable Bluetooth Speaker': 'speaker_ai.png',
        'Classic Denim Jacket': 'jacket_ai.png',
        'Minimalist White T-Shirt': 'tshirt_ai.png',
        'Retro High-Top Sneakers': 'shoes-1.jpg',
        'Lightweight Running Shoes': 'shoes-2.jpg',
        'Leather Minimalist Wallet': 'wallet.jpg',
        'Premium Polarized Sunglasses': 'glasses-1.jpg',
        'Modern Ceramic Vase': 'Modern Ceramic Verse.jpg',
        'Scented Soy Wax Candle': 'Wax Candle.jpg',
        
        # High quality Unsplash URLs for the rest (to be distinct as requested)
        
        # 'Lightweight Running Shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
        # 'Leather Minimalist Wallet': 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800',
        # 'Premium Polarized Sunglasses': 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800',
        # 'Modern Ceramic Vase': 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=800',
        # 'Scented Soy Wax Candle': 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800',
    }

    for name, image_path in updates.items():
        product = Product.objects.filter(name=name).first()
        if product:
            product.image = image_path
            product.save()
            print(f"Synced: {name} -> {image_path}")
        else:
            print(f"Not found: {name}")

    print("Final sync completed!")

if __name__ == '__main__':
    final_sync()
