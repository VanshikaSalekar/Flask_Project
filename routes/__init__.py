from routes.category_routes import category_bp
from routes.product_routes import product_bp
from routes.order_routes import order_bp

def initialize_routes(app):
    app.register_blueprint(category_bp, url_prefix='/categories')
    app.register_blueprint(product_bp, url_prefix='/products')
    app.register_blueprint(order_bp, url_prefix='/orders')
