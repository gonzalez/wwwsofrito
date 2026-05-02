// Sample products data
const products = [
    {
        id: 1,
        type: 'books',
        title: 'Latin X Heroes',
        author: 'Community Stories',
        description: 'Celebrating the achievements and stories of Latinx leaders and changemakers.',
        price: 24.99,
        icon: '📚'
    },
    {
        id: 2,
        type: 'books',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        description: 'A handbook of agile software craftsmanship and best practices.',
        price: 39.99,
        icon: '📖'
    },
    {
        id: 3,
        type: 'posters',
        title: 'Mountain Sunset',
        author: 'Nature Collection',
        description: 'Beautiful mountain landscape at golden hour. 24x36 inches.',
        price: 29.99,
        icon: '🏔️'
    },
    {
        id: 4,
        type: 'books',
        title: 'JavaScript: The Good Parts',
        author: 'Douglas Crockford',
        description: 'Essential JavaScript patterns and best practices.',
        price: 34.99,
        icon: '📕'
    },
    {
        id: 5,
        type: 'posters',
        title: 'Abstract Dreams',
        author: 'Modern Art Series',
        description: 'Contemporary abstract art poster. 18x24 inches.',
        price: 24.99,
        icon: '🎨'
    },
    {
        id: 6,
        type: 'posters',
        title: 'Ocean Waves',
        author: 'Nature Collection',
        description: 'Serene ocean scene perfect for any room. 24x36 inches.',
        price: 29.99,
        icon: '🌊'
    },
    {
        id: 7,
        type: 'books',
        title: 'Design Patterns',
        author: 'Gang of Four',
        description: 'Elements of reusable object-oriented software.',
        price: 44.99,
        icon: '📘'
    },
    {
        id: 8,
        type: 'posters',
        title: 'City Lights',
        author: 'Urban Photography',
        description: 'Stunning cityscape at night. 20x30 inches.',
        price: 27.99,
        icon: '🌃'
    },
    {
        id: 9,
        type: 'books',
        title: 'The Pragmatic Programmer',
        author: 'Andrew Hunt & David Thomas',
        description: 'Your journey to mastery in software development.',
        price: 42.99,
        icon: '📗'
    },
    {
        id: 10,
        type: 'posters',
        title: 'Vintage Typography',
        author: 'Retro Collection',
        description: 'Classic typography design poster. 16x20 inches.',
        price: 19.99,
        icon: '📝'
    }
];

// Current filter state
let currentFilter = 'all';

// Initialize the app
function init() {
    renderProducts(products);
    setupFilterButtons();
}

// Render products to the page
function renderProducts(productsToRender) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';

    const filteredProducts = currentFilter === 'all' 
        ? productsToRender 
        : productsToRender.filter(p => p.type === currentFilter);

    filteredProducts.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });

    // Add animation
    setTimeout(() => {
        const cards = grid.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            }, index * 50);
        });
    }, 10);
}

// Create a product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.type = product.type;

    card.innerHTML = `
        <div class="product-image">
            ${product.icon}
        </div>
        <div class="product-info">
            <span class="product-category">${product.type}</span>
            <h3 class="product-title">${product.title}</h3>
            <p class="product-author">${product.author}</p>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <button class="buy-btn" data-product-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `;

    // Add event listener to buy button
    const buyBtn = card.querySelector('.buy-btn');
    buyBtn.addEventListener('click', () => handleBuy(product.id));

    return card;
}

// Setup filter button functionality
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Update current filter
            currentFilter = button.dataset.filter;
            
            // Re-render products
            renderProducts(products);
        });
    });
}

// PayPal payment handler
let paypalButtonsRendered = false;

// Handle buy button click
function handleBuy(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        showPayPalCheckout(product);
    }
}

// Show PayPal checkout modal
function showPayPalCheckout(product) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'paypal-modal';
    modal.innerHTML = `
        <div class="paypal-modal-content">
            <div class="paypal-modal-header">
                <h3>Complete Purchase</h3>
                <button class="close-btn" onclick="closePayPalModal()">×</button>
            </div>
            <div class="paypal-modal-body">
                <div class="product-summary">
                    <h4>${product.title}</h4>
                    <p>by ${product.author}</p>
                    <p class="price">$${product.price.toFixed(2)}</p>
                </div>
                <div id="paypal-button-${product.id}"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Render PayPal buttons
    renderPayPalButtons(product.id, product.price);
    
    // Show modal with animation
    setTimeout(() => modal.classList.add('show'), 10);
}

// Render PayPal buttons
function renderPayPalButtons(productId, price) {
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: price.toFixed(2)
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                showToast('Payment successful! Thank you for your purchase.');
                closePayPalModal();
                console.log('Transaction completed by ' + details.payer.name.given_name);
            });
        },
        onError: function(err) {
            console.error('PayPal error:', err);
            showToast('Payment failed. Please try again.');
        }
    }).render(`#paypal-button-${productId}`);
}

// Close PayPal modal
function closePayPalModal() {
    const modal = document.querySelector('.paypal-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

// Show toast notification
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
