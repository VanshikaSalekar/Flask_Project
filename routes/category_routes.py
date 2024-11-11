from flask import Blueprint, jsonify, request
from models import db, Category

category_bp = Blueprint('category_bp', __name__)

@category_bp.route('/', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([category.name for category in categories])

@category_bp.route('/', methods=['POST'])
def add_category():
    data = request.json
    new_category = Category(name=data['name'])
    db.session.add(new_category)
    db.session.commit()
    return jsonify({'message': 'Category added successfully!'})
