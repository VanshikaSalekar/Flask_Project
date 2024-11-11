from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from config import Config  
app = Flask(__name__)

app.config.from_object(Config)

db = SQLAlchemy(app)

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/features')
def features():
    return render_template('features.html')    

@app.route('/products')
def products():
    return render_template('products.html')

@app.route('/categories')
def categories():
    return render_template('categories.html')

@app.route('/review')
def review():
    return render_template('review.html')

@app.route('/blog')
def blog():
    return render_template('blog.html')

@app.route('/login', methods=['POST'])
def login():
    email = request.form.get('email')
    password = request.form.get('password')
    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        flash('Login successful!')
        return redirect(url_for('login.html'))
    else:
        flash('Login failed. Check your email or password.')
        return redirect(url_for('index'))

@app.route('/signup', methods=['POST'])
def signup():
    name = request.form.get('name')
    email = request.form.get('email')
    password = request.form.get('password')
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        flash('Email already registered.')
        return redirect(url_for('signup.html'))
    hashed_password = generate_password_hash(password, method='sha256')
    new_user = User(name=name, email=email, password=hashed_password)
    try:
        db.session.add(new_user)
        db.session.commit()
        flash('Signup successful!')
    except Exception as e:
        db.session.rollback()
        flash(f'Signup failed. Please try again. {e}')
    return redirect(url_for('index'))

@app.route('/cart/add', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    user_id = data['user_id']
    product_id = data['product_id']
    quantity = data.get('quantity', 1)
    cart_item = Cart(user_id=user_id, product_id=product_id, quantity=quantity)
    db.session.add(cart_item)
    db.session.commit()
    return jsonify({"message": "Item added to cart"}), 200

@app.route('/test-connection')
def test_connection():
    try:
        # This is a simple query to test the connection
        result = db.session.execute("SELECT 1")
        return "Database connection successful!" if result else "No result returned from query."
    except Exception as e:
        return f"Database connection failed: {e}"

if __name__ == '__main__':
    app.run(debug=True)
