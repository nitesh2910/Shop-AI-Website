from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import Product, Category, Order, OrderItem

@admin.register(Product)
class ProductAdmin(ImportExportModelAdmin):
    list_display = ['name', 'price', 'category', 'countInStock']

@admin.register(Category)
class CategoryAdmin(ImportExportModelAdmin):
    list_display = ['name', 'slug']

admin.site.register(Order)
admin.site.register(OrderItem)
