from flask import Blueprint, jsonify, request
from models import db, Order
from datetime import datetime

order_bp = Blueprint('order_bp', __name__)

@order_bp.route('/', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    return jsonify([{'id': order.id, 'total_amount': order.total_amount, 'order_date': order.order_date} for order in orders])

@order_bp.route('/', methods=['POST'])
def add_order():
    data = request.json
    new_order = Order(total_amount=data['total_amount'], order_date=datetime.utcnow())
    db.session.add(new_order)
    db.session.commit()
    return jsonify({'message': 'Order placed successfully!'})
