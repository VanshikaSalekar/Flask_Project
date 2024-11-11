let searchForm = document.querySelector('.search-form ');
document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
    
}

let cart = [];
let cartContainer = document.querySelector('.cart-items');
let cartTotal = document.querySelector('.shopping-cart .total');

// Function to update the cart display
function updateCart() {
    let cartHTML = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
        cartHTML += `
        <div class="box" data-index="${index}">
            <i class="fas fa-trash" onclick="removeFromCart(${index})"></i>
            <img src="${item.image}" alt="${item.name}">
            <div class="content">
                <h3>${item.name}</h3>
                <span class="price">$${item.price}</span>
                <div class="quantity-control">
                    <button class="btn-decrease" onclick="changeQuantity(${index}, -1)">-</button>
                    <span class="quantity">qty: ${item.quantity}</span>
                    <button class="btn-increase" onclick="changeQuantity(${index}, 1)">+</button>
                </div>
            </div>
        </div>`;
        totalPrice += item.price * item.quantity;
    });

    cartContainer.innerHTML = cartHTML;
    cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Function to add a product to the cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.onclick = (e) => {
        e.preventDefault();

        let product = button.closest('.box');
        let id = product.getAttribute('data-id');
        let name = product.getAttribute('data-name');
        let price = parseFloat(product.getAttribute('data-price'));
        let image = product.querySelector('img').src;

        // Check if the product is already in the cart
        let existingProduct = cart.find(item => item.id === id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            // Add new product to cart
            cart.push({ id, name, price, quantity: 1, image });
        }

        updateCart(); // Update the cart display
    };
});

// Function to remove a product from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove the item at the given index
    updateCart(); // Update the cart display
}

// Function to change product quantity
function changeQuantity(index, amount) {
    cart[index].quantity += amount;

    // Remove product if quantity is less than 1
    if (cart[index].quantity < 1) {
        cart.splice(index, 1);
    }

    updateCart(); // Update the cart display
}

let shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#cart-btn').onclick = () =>{
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
    
}

let loginForm = document.querySelector('.login-form');
let signupForm = document.querySelector('.signup-form');
let loginBtn = document.querySelector('.login-form .btn');
let signupBtn = document.querySelector('.signup-form .btn');

// Simulate login action
loginBtn.onclick = (e) => {
    e.preventDefault(); // Prevent form submission for demonstration
    alert('Login Successful!'); // Simulate login success
    loginForm.classList.remove('active'); // Hide login form
}

// Simulate signup action
signupBtn.onclick = (e) => {
    e.preventDefault(); // Prevent form submission for demonstration
    alert('Signup Successful!'); // Simulate signup success
    signupForm.classList.remove('active'); // Hide signup form
}

// Toggle between forms
document.querySelector('#login-btn').onclick = () => {
    loginForm.classList.toggle('active');
    signupForm.classList.remove('active'); // Hide signup form when login is clicked
}

document.querySelector('#show-signup').onclick = (e) => {
    e.preventDefault(); // Prevent page refresh
    signupForm.classList.add('active');
    loginForm.classList.remove('active'); // Hide login form
}

document.querySelector('#show-login').onclick = (e) => {
    e.preventDefault(); // Prevent page refresh
    loginForm.classList.add('active');
    signupForm.classList.remove('active'); // Hide signup form
}

// Ensure both forms hide when user scrolls or clicks outside
window.onscroll = () => {
    loginForm.classList.remove('active');
    signupForm.classList.remove('active'); // Hide signup form on scroll
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    navbar.classList.remove('active');
}



let navbar = document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    
    
}

window.onscroll = () =>{
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
    
}   

var swiper = new Swiper(".product-slider",{
    loop:true,
    spaceBetween:20,
    autoplay:{
        delay:7500,
        disableOnInteraction:false,
    },
    centeredSlides:true,
    breakpoints:{
        0:{
            slidesPerView: 1,
        },
        768:{
            slidesPerView: 2,
        },
        1020:{
            slidesPerView: 3,
               
        },
    },
});

var swiper = new Swiper(".review-slider",{
    loop:true,
    spaceBetween:20,
    autoplay:{
        delay:7500,
        disableOnInteraction:false,
    },
    centeredSlides:true,
    breakpoints:{
        0:{
            slidesPerView: 1,
        },
        768:{
            slidesPerView: 2,
        },
        1020:{
            slidesPerView: 3,
               
        },
    },
});

document.querySelector('#shop-now').onclick = (e) => {
    e.preventDefault();
    document.querySelector('#products').scrollIntoView({ behavior: 'smooth' });
};
