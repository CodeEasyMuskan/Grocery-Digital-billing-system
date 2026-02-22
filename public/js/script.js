function initializeApp() {

    // USERS
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    const adminExists = users.some(user => user.role === 'admin');

    if (!adminExists) {
        createDefaultAdmin();
    }

    // PRODUCTS
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    if (products.length === 0) {
        createDefaultProducts();
    }
}

// ===== USER MANAGEMENT =====

function createDefaultAdmin() {
    const users = [];
    users.push({
        id: 1,
        username: 'admin',
        password: hashPassword('admin123'),
        role: 'admin',
        createdDate: new Date().toLocaleDateString()
    });
    localStorage.setItem('users', JSON.stringify(users));
}

function registerUser(username, password) {
    if (!username || !password) {
        return { success: false, message: 'All fields are required' };
    }

    const users = getAllUsers();
    
    if (users.find(u => u.username === username)) {
        return { success: false, message: 'Username already exists' };
    }

    const newUser = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        username: username,
        password: hashPassword(password),
        role: 'user',
        createdDate: new Date().toLocaleDateString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    return { success: true, message: 'Registration successful' };
}

function loginUser(username, password) {
    const users = getAllUsers();
    const user = users.find(u => u.username === username);

    if (!user) {
        return { success: false, message: 'Username not found' };
    }

    if (!verifyPassword(password, user.password)) {
        return { success: false, message: 'Incorrect password' };
    }

    const currentUser = {
        id: user.id,
        username: user.username,
        role: user.role
    };

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    return { success: true, message: 'Login successful' };
}

function logoutUser() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

function getAllUsers() {
    initializeApp();
    return JSON.parse(localStorage.getItem('users') || '[]');
}

function userExists(username) {
    return getAllUsers().some(u => u.username === username);
}

function removeUser(userId) {
    let users = getAllUsers();
    users = users.filter(u => u.id !== userId && u.role !== 'admin');
    localStorage.setItem('users', JSON.stringify(users));
}

function updateUserPassword(userId, newPassword) {
    let users = getAllUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
        user.password = hashPassword(newPassword);
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// ===== PRODUCT MANAGEMENT =====

function createDefaultProducts() {
    const defaultProducts = [
        // Staples
        { id: 1, name: 'Rice (10kg)', price: 450, stock: 50, image: 'js/images/rice.png' },
        { id: 2, name: 'Sugar (1kg)', price: 45, stock: 40, image: 'js/images/sugar.png' },
        { id: 3, name: 'Cooking Oil (1L)', price: 120, stock: 35, image: 'js/images/oil.png' },
        { id: 4, name: 'Fresh Milk (500ml)', price: 40, stock: 60, image: 'js/images/milk.png' },
        { id: 5, name: 'Soap Bar (100g)', price: 25, stock: 100, image: 'js/images/soap.png' },
        { id: 6, name: 'Tea Leaves (100g)', price: 80, stock: 45, image: 'js/images/tea.png' },
        { id: 7, name: 'Coffee (200g)', price: 150, stock: 30, image: 'js/images/coffee.png' },
        { id: 8, name: 'Biscuits (400g)', price: 55, stock: 70, image: 'js/images/Biscuits.png' },
        // Vegetables
        { id: 9, name: 'Tomato (1kg)', price: 35, stock: 80, image: 'js/images/Tomato.png' },
        { id: 10, name: 'Onion (1kg)', price: 30, stock: 90, image: 'js/images/onion.png' },
        { id: 11, name: 'Potato (1kg)', price: 25, stock: 100, image: 'js/images/potato.png' },
        { id: 12, name: 'Carrot (1kg)', price: 40, stock: 60, image: 'js/images/caroto.png' },
        { id: 13, name: 'Cabbage (1kg)', price: 28, stock: 75, image:'js/images/Cabbage.png' },
        { id: 14, name: 'Spinach (500g)', price: 32, stock: 50, image:'js/images/Spinach.png' },
        { id: 16, name: 'Broccoli (500g)', price: 50, stock: 40, image: 'js/images/Broccoli.png' },
        { id: 17, name: 'Cucumber (1kg)', price: 30, stock: 70, image: 'js/images/Cucumber.png' },
        { id: 18, name: 'Garlic (250g)', price: 45, stock: 55, image: 'js/images/Garlic.png' },
        // Fruits
        { id: 19, name: 'Banana (1kg)', price: 50, stock: 85, image: 'js/images/banana.png' },
        { id: 21, name: 'Orange (1kg)', price: 60, stock: 70, image: 'js/images/orange.png' },
        { id: 22, name: 'Mango (1kg)', price: 100, stock: 50, image:'js/images/mango.png' },
        { id: 23, name: 'Grapes (500g)', price: 80, stock: 55, image:'js/images/Grapes.png' },
        { id: 24, name: 'Watermelon (1pc)', price: 150, stock: 30, image:'js/images/watermelon.png' },
        { id: 25, name: 'Papaya (1kg)', price: 55, stock: 40, image: 'js/images/Papaya.png' },
        { id: 26, name: 'Pineapple (1pc)', price: 90, stock: 35, image: 'js/images/Pineapple.png' },
        { id: 27, name: 'Strawberry (250g)', price: 120, stock: 45, image: 'js/images/Strawberry.png' },
        { id: 28, name: 'Guava (1kg)', price: 65, stock: 50, image: 'js/images/Guava.png' }
    ];
    localStorage.setItem('products', JSON.stringify(defaultProducts));
}

function getAllProducts() {
    initializeApp();
    return JSON.parse(localStorage.getItem('products') || '[]');
}

function addProduct(name, price, stock, image) {
    const products = getAllProducts();
    const newProduct = {
        id: Math.max(...products.map(p => p.id), 0) + 1,
        name,
        price,
        stock,
        image: image || 'https://via.placeholder.com/200'
    };
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
}

function removeProduct(productId) {
    let products = getAllProducts();
    products = products.filter(p => p.id !== productId);
    localStorage.setItem('products', JSON.stringify(products));
}

function updateProductStock(productId, newStock) {
    let products = getAllProducts();
    const product = products.find(p => p.id === productId);
    if (product) {
        product.stock = newStock;
        localStorage.setItem('products', JSON.stringify(products));
    }
}

// ===== CART MANAGEMENT =====

function getCart() {
    const user = getCurrentUser();
    if (!user) return [];
    const cart = localStorage.getItem(`cart_${user.id}`);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    const user = getCurrentUser();
    if (user) {
        localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
    }
}

function clearCart() {
    const user = getCurrentUser();
    if (user) {
        localStorage.removeItem(`cart_${user.id}`);
    }
}

// ===== BILL MANAGEMENT =====

function saveBill(bill) {
    const bills = getAllBills();
    bills.push(bill);
    localStorage.setItem('bills', JSON.stringify(bills));
}

function getAllBills() {
    return JSON.parse(localStorage.getItem('bills') || '[]');
}

function getBillByNumber(billNumber) {
    const bills = getAllBills();
    return bills.find(b => b.billNumber === billNumber);
}

function getUserBills(userId) {
    const bills = getAllBills();
    return bills.filter(b => b.userId === userId);
}

// ===== PASSWORD HASHING (Simple Hash - NOT for production) =====
// Note: For production, implement proper bcrypt hashing on the server

function hashPassword(password) {
    // Simple hash for demo - should use bcrypt in production
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return 'hash_' + Math.abs(hash).toString(36);
}

function verifyPassword(plainPassword, hashedPassword) {
    return hashPassword(plainPassword) === hashedPassword;
}

// ===== ACCESS CONTROL & PROTECTION =====

function checkLoginRequired(restrictedAction = false) {
    const user = getCurrentUser();
    if (!user && restrictedAction) {
        showLoginPrompt();
        return false;
    }
    return true;
}

function checkAdminAccess() {
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
        window.location.href = 'user.html';
        return false;
    }
    return true;
}

function showLoginPrompt() {
    const modal = document.createElement('div');
    modal.className = 'login-prompt-modal';
    modal.innerHTML = `
        <div class="login-prompt-content">
            <div class="login-prompt-icon">🔐</div>
            <h2>Please Login to Continue</h2>
            <p>You need to sign in to access this feature</p>
            <button onclick="window.location.href='login.html'" class="prompt-btn">Go to Login</button>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .login-prompt-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .login-prompt-content {
            background: white;
            padding: 40px;
            border-radius: 16px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease;
            max-width: 400px;
        }
        
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .login-prompt-icon {
            font-size: 3rem;
            margin-bottom: 20px;
        }
        
        .login-prompt-content h2 {
            margin-bottom: 10px;
            color: #1e293b;
            font-size: 1.5rem;
        }
        
        .login-prompt-content p {
            color: #6b7280;
            margin-bottom: 30px;
        }
        
        .prompt-btn {
            background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .prompt-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(6, 182, 212, 0.3);
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.remove();
        window.location.href = 'login.html';
    }, 1500);
}

function protectRestrictedAction(action) {
    return function(...args) {
        if (!checkLoginRequired(true)) return;
        return action(...args);
    };
}

// ===== PAGE-LEVEL ACCESS CONTROL =====

function checkPageAccess() {
    const currentPage = window.location.pathname;
    const user = getCurrentUser();
    
    // Public pages - no check needed
    const publicPages = ['login', 'register', 'index.html', '/'];
    const isPublicPage = publicPages.some(page => currentPage.includes(page));
    
    if (isPublicPage) {
        return; // Allow public access
    }
    
    // Admin page - only admins allowed
    if (currentPage.includes('admin')) {
        if (!user || user.role !== 'admin') {
            window.location.href = 'login.html';
        }
        return;
    }
    
    // Protected pages - users must be logged in
    const protectedPages = ['user', 'payment', 'cart', 'profile'];
    const isProtected = protectedPages.some(page => currentPage.includes(page));
    
    if (isProtected && !user) {
        showLoginPrompt();
    }
}

// ===== PROTECTED ACTION WRAPPER =====

function protectedAddToCart(productId) {
    if (!checkLoginRequired(true)) return;
    // Proceed with add to cart
    const cart = getCart();
    const product = getAllProducts().find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart(cart);
}

function protectedCheckout() {
    if (!checkLoginRequired(true)) return;
    window.location.href = 'payment.html';
}

// ===== INITIALIZATION ON EVERY PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    checkPageAccess();
});

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});
