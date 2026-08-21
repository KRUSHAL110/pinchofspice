// Cart state
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeMenu();
    initializeNavigation();
    initializeCart();
    initializeForms();
    updateCartCount();
    initializeScrollEffects();
});

// Initialize Menu
function initializeMenu() {
    const menuGrid = document.getElementById('menuGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('menuSearch');

    // Render all menu items initially
    renderMenuItems('all');

    // Add filter button event listeners
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Clear search input
            searchInput.value = '';

            // Filter menu items
            const filter = btn.dataset.filter;
            renderMenuItems(filter);
        });
    });

    // Add search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();

        // Clear active filter button when searching
        if (searchTerm) {
            filterButtons.forEach(b => b.classList.remove('active'));
        }

        // Search and render
        searchMenuItems(searchTerm);
    });
}

// Render menu items based on filter
function renderMenuItems(filter) {
    const menuGrid = document.getElementById('menuGrid');
    let filteredItems = filter === 'all' ? menuData : menuData.filter(item => item.category === filter);

    menuGrid.innerHTML = '';

    filteredItems.forEach(item => {
        const menuCard = createMenuCard(item);
        menuGrid.appendChild(menuCard);
    });
}

// Search menu items
function searchMenuItems(searchTerm) {
    const menuGrid = document.getElementById('menuGrid');

    if (!searchTerm) {
        // If search is empty, show all items
        renderMenuItems('all');
        return;
    }

    // Filter items based on search term
    const filteredItems = menuData.filter(item => {
        const itemName = item.name.toLowerCase();
        const itemCategory = item.categoryDisplay.toLowerCase();
        return itemName.includes(searchTerm) || itemCategory.includes(searchTerm);
    });

    // Render filtered items
    menuGrid.innerHTML = '';

    if (filteredItems.length === 0) {
        menuGrid.innerHTML = '<div class="no-results">No dishes found matching your search. Try "Chicken", "Biryani", or "Noodles".</div>';
    } else {
        filteredItems.forEach(item => {
            const menuCard = createMenuCard(item);
            menuGrid.appendChild(menuCard);
        });
    }
}

// Create menu card element
function createMenuCard(item) {
    const card = document.createElement('div');
    card.className = 'menu-item';
    card.dataset.id = item.id;

    const hasSizes = item.prices.length > 1;
    const defaultPrice = item.prices[0];

    // Fallback image if image fails to load
    const fallbackImage = item.type === 'veg'
        ? 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500'
        : 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=500';

    card.innerHTML = `
        <div class="menu-item-image-container">
            <img src="${item.image}"
                 alt="${item.name}"
                 class="menu-item-image"
                 loading="lazy"
                 onerror="this.src='${fallbackImage}'">
            <span class="menu-item-badge badge-${item.type}">${item.type === 'veg' ? 'VEG' : 'NON-VEG'}</span>
        </div>
        <div class="menu-item-content">
            <div class="menu-item-header">
                <h3 class="menu-item-name">${item.name}</h3>
            </div>
            <p class="menu-item-category">${item.categoryDisplay}</p>
            ${hasSizes ? `
                <div class="price-options">
                    ${item.prices.map((price, index) => `
                        <div class="price-option">
                            <input type="radio"
                                   id="size-${item.id}-${index}"
                                   name="size-${item.id}"
                                   value="${index}"
                                   ${index === 0 ? 'checked' : ''}>
                            <label for="size-${item.id}-${index}">${price.size} - ₹${price.price}</label>
                        </div>
                    `).join('')}
                </div>
            ` : `
                <div class="menu-item-price">₹${defaultPrice.price}</div>
            `}
            <button class="add-to-cart-btn" onclick="addToCart(${item.id})">Add to Cart</button>
        </div>
    `;

    return card;
}

// Add item to cart
function addToCart(itemId) {
    const item = menuData.find(i => i.id === itemId);
    if (!item) return;

    // Get selected size
    let selectedPriceIndex = 0;
    if (item.prices.length > 1) {
        const selectedRadio = document.querySelector(`input[name="size-${itemId}"]:checked`);
        selectedPriceIndex = parseInt(selectedRadio.value);
    }

    const selectedPrice = item.prices[selectedPriceIndex];

    // Check if item with same size already in cart
    const existingItemIndex = cart.findIndex(
        cartItem => cartItem.id === itemId && cartItem.size === selectedPrice.size
    );

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            category: item.categoryDisplay,
            type: item.type,
            size: selectedPrice.size,
            price: selectedPrice.price,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
    showNotification('Item added to cart!');
}

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Initialize cart functionality
function initializeCart() {
    const cartIcon = document.getElementById('cartIcon');
    const cartModal = document.getElementById('cartModal');
    const checkoutModal = document.getElementById('checkoutModal');
    const closeBtns = document.querySelectorAll('.close-modal');
    const clearCartBtn = document.getElementById('clearCart');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // Open cart modal
    cartIcon.addEventListener('click', () => {
        renderCart();
        cartModal.classList.add('active');
    });

    // Close modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            cartModal.classList.remove('active');
            checkoutModal.classList.remove('active');
            document.getElementById('successModal').classList.remove('active');
        });
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });

    // Clear cart
    clearCartBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear the cart?')) {
            cart = [];
            saveCart();
            updateCartCount();
            renderCart();
        }
    });

    // Proceed to checkout
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        cartModal.classList.remove('active');
        showCheckout();
        checkoutModal.classList.add('active');
    });
}

// Render cart items
function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
        cartTotal.textContent = '₹0';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name} ${item.size !== 'Full' && item.size !== '' ? `(${item.size})` : ''}</h4>
                <p>${item.category}</p>
            </div>
            <div class="cart-item-actions">
                <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                <span class="cart-qty">${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                <div class="cart-item-price">₹${itemTotal}</div>
                <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartTotal.textContent = `₹${total}`;
}

// Update item quantity
function updateQuantity(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    updateCartCount();
    renderCart();
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    renderCart();
}

// Show checkout modal
function showCheckout() {
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutTotal = document.getElementById('checkoutTotal');

    let total = 0;
    checkoutItems.innerHTML = '';

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item';
        summaryItem.innerHTML = `
            <span>${item.name} ${item.size !== 'Full' && item.size !== '' ? `(${item.size})` : ''} x ${item.quantity}</span>
            <span>₹${itemTotal}</span>
        `;
        checkoutItems.appendChild(summaryItem);
    });

    checkoutTotal.textContent = `₹${total}`;
}

// Initialize forms
function initializeForms() {
    const checkoutForm = document.getElementById('checkoutForm');
    const contactForm = document.getElementById('contactForm');
    const closeSuccessBtn = document.getElementById('closeSuccess');
    const paymentConfirmedCheckbox = document.getElementById('paymentConfirmed');
    const confirmOrderBtn = document.getElementById('confirmOrderBtn');
    let pendingOrderData = null;
    let pendingOrderRef = null;

    // Handle payment confirmation checkbox
    paymentConfirmedCheckbox.addEventListener('change', (e) => {
        confirmOrderBtn.disabled = !e.target.checked;
    });

    // Handle checkout form submission - Show payment modal
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get selected payment method
        const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
        if (!selectedPayment) {
            alert('Please select a payment method');
            return;
        }

        // Store order data
        pendingOrderData = {
            customer: {
                name: document.getElementById('customerName').value,
                phone: document.getElementById('customerPhone').value,
                address: document.getElementById('customerAddress').value,
                specialInstructions: document.getElementById('specialInstructions').value
            },
            items: cart,
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            paymentMethod: selectedPayment.value,
            timestamp: new Date().toISOString()
        };

        // One reference shared by the UPI note and the WhatsApp message, so the
        // kitchen can match an incoming payment to an incoming order
        pendingOrderRef = buildOrderRef();

        // Show payment details based on selected method
        showPaymentDetails(selectedPayment.value, pendingOrderData.total, pendingOrderRef);

        // Nothing to pay up front on COD, so don't gate the button behind the checkbox
        const isCod = selectedPayment.value === 'cod';
        paymentConfirmedCheckbox.checked = false;
        paymentConfirmedCheckbox.closest('.payment-confirmation').style.display = isCod ? 'none' : '';
        confirmOrderBtn.disabled = !isCod;

        // Close checkout modal and show payment modal
        document.getElementById('checkoutModal').classList.remove('active');
        document.getElementById('paymentModal').classList.add('active');
    });

    // Handle confirm order button - send the order to the restaurant on WhatsApp
    confirmOrderBtn.addEventListener('click', () => {
        if (!pendingOrderData) return;

        const orderRef = pendingOrderRef || buildOrderRef();
        const waUrl = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(buildWhatsAppMessage(pendingOrderData, orderRef))}`;

        // Opened synchronously from the click so mobile browsers don't block it
        window.open(waUrl, '_blank');

        cart = [];
        saveCart();
        updateCartCount();

        document.getElementById('orderId').textContent = orderRef;
        document.getElementById('paymentModal').classList.remove('active');
        document.getElementById('successModal').classList.add('active');

        checkoutForm.reset();
        paymentConfirmedCheckbox.checked = false;
        confirmOrderBtn.disabled = true;
        pendingOrderData = null;
        pendingOrderRef = null;
    });

    // Handle contact form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will contact you soon.');
        contactForm.reset();
    });

    // Close success modal
    closeSuccessBtn.addEventListener('click', () => {
        document.getElementById('successModal').classList.remove('active');
    });
}

// Restaurant WhatsApp number in international format (no + or spaces)
const RESTAURANT_WHATSAPP = '918451876111';

// UPI payee. Money goes straight from the customer to this VPA - no gateway, no fee.
const UPI_VPA = 'pratikchavan3996-7@okhdfcbank';
const UPI_PAYEE_NAME = 'Pinch of Spice';

// Builds a UPI intent link. Tapping it on a phone opens GPay / PhonePe / Paytm
// with the payee, amount and order reference already filled in.
function buildUpiLink(amount, orderRef) {
    const params = new URLSearchParams({
        pa: UPI_VPA,
        pn: UPI_PAYEE_NAME,
        am: String(amount),
        cu: 'INR',
        tn: `Pinch of Spice ${orderRef}`
    });
    return `upi://pay?${params.toString()}`;
}

const PAYMENT_LABELS = {
    paytm: 'Paytm / UPI',
    phonepe: 'PhonePe',
    cod: 'Cash on Delivery'
};

// Short human-readable reference so the customer and the kitchen can talk about the same order
function buildOrderRef() {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const stamp = `${pad(d.getDate())}${pad(d.getMonth() + 1)}`;
    const rand = Math.floor(Math.random() * 9000) + 1000;
    return `POS-${stamp}-${rand}`;
}

function buildWhatsAppMessage(order, orderRef) {
    const lines = [];
    lines.push('*NEW ORDER - Pinch of Spice*');
    lines.push(`Order: ${orderRef}`);
    lines.push('');
    lines.push('*Items*');
    order.items.forEach((item, i) => {
        lines.push(`${i + 1}. ${item.name} (${item.size}) x${item.quantity} - Rs.${item.price * item.quantity}`);
    });
    lines.push('');
    lines.push(`*TOTAL: Rs.${order.total}*`);
    lines.push(`Payment: ${PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod}`);
    lines.push('');
    lines.push('*Delivery details*');
    lines.push(`Name: ${order.customer.name}`);
    lines.push(`Phone: ${order.customer.phone}`);
    lines.push(`Address: ${order.customer.address}`);
    if (order.customer.specialInstructions) {
        lines.push(`Note: ${order.customer.specialInstructions}`);
    }
    return lines.join('\n');
}

// Show payment details based on selected method
function showPaymentDetails(paymentMethod, amount, orderRef) {
    const paymentDetails = document.getElementById('paymentDetails');
    const upiLink = buildUpiLink(amount, orderRef);

    if (paymentMethod === 'paytm' || paymentMethod === 'phonepe') {
        const appName = paymentMethod === 'phonepe' ? 'PhonePe' : 'Paytm / UPI';
        paymentDetails.innerHTML = `
            <h3>Pay Rs.${amount} via ${appName}</h3>
            <div class="payment-upi">
                <a class="btn btn-primary upi-pay-btn" href="${upiLink}">Pay Rs.${amount} now</a>
                <p class="upi-hint">Opens your UPI app with the amount already filled in.</p>

                <div class="upi-divider"><span>or pay manually</span></div>

                <div class="payment-qr">
                    <img src="images/payment/paytm-qr.jpg" alt="UPI QR Code" onerror="this.parentElement.style.display='none'">
                </div>
                <div class="upi-id">
                    <span>UPI ID</span>
                    <strong>${UPI_VPA}</strong>
                </div>
                <p class="upi-ref">Please add reference <strong>${orderRef}</strong> in the payment note.</p>
                <p class="upi-amount">Amount: Rs.${amount}</p>
            </div>
        `;
    } else if (paymentMethod === 'cod') {
        paymentDetails.innerHTML = `
            <h3>Cash on Delivery</h3>
            <div class="payment-upi">
                <div class="cod-icon">&#128181;</div>
                <h4>Pay when you receive your order</h4>
                <p class="upi-hint">Please keep exact change ready if you can.</p>
                <p class="upi-amount">Amount to pay: Rs.${amount}</p>
            </div>
        `;
    }
}

// Initialize navigation
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Smooth scroll and close mobile menu
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu
            navMenu.classList.remove('active');

            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideInRight 0.3s;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Initialize scroll effects
function initializeScrollEffects() {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
