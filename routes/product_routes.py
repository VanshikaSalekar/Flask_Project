from flask import Blueprint, jsonify, request
from models import db, Product

product_bp = Blueprint('product_bp', __name__)

@product_bp.route('/', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{'name': product.name, 'price': product.price} for product in products])

@product_bp.route('/', methods=['POST'])
def add_product():
    data = request.json
    new_product = Product(name=data['name'], price=data['price'], category_id=data['category_id'])
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'message': 'Product added successfully!'})
