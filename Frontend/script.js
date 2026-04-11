/**
 * =================================================================
 * 1. GLOBAL CONFIGURATION & STATE
 * =================================================================
 */
/*const API = "http://localhost:8080/api"; // For admin backend if needed */
const API = "/api";
const INR_CONV = 83; 
const CATS = ['All', 'Mobiles', 'Laptops', 'Electronics', 'Furniture', 'Fashion' ,'Books'];

let allProducts = [];
let cart = [];
let addressBook = {};
let state = { 
    selectedCategory: 'All',  
    paymentMethod: null 
};

// NEW GLOBAL STATE FOR LOGIN GUARD & SESSION
let isLoggedIn = false;
let currentUser = null;

/**
 * =================================================================
 * 2. TRENDY ELITE COLLECTION (2026 FLAGSHIPS)
 * =================================================================
 */
const ELITE_COLLECTION = [
    // --- APPLE IPHONE  ---
    { id: 1001, title: 'iPhone 16 Pro Max', brand: 'Apple', price: 1199, category: 'Mobiles', thumbnail: 'https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Max_Black_Titanium_PDP_Image_Position_1__en-IN.jpg?v=1727251129&width=1445', description: 'Desert Titanium. A18 Pro. The current global benchmark.' },
    { id: 1002, title: 'iPhone 16 Pro', brand: 'Apple', price: 999, category: 'Mobiles', thumbnail: 'https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Black_Titanium_PDP_Image_Position_1__en-IN.jpg?v=1727249975&width=1445', description: 'Pro Camera System. Titanium build. Exceptional power.' },
    { id: 1003, title: 'iPhone 16 Plus', brand: 'Apple', price: 899, category: 'Mobiles', thumbnail: 'https://iplanet.one/cdn/shop/files/iPhone_16_Plus_White_PDP_Image_Position_1__en-IN_9a53cc2b-8a96-407c-a3bd-ed3e4665248b_360x.jpg?v=1727248838', description: 'Ultramarine finish. Best-in-class battery life.' },
    { id: 1004, title: 'iPhone 16', brand: 'Apple', price: 799, category: 'Mobiles', thumbnail: 'https://iplanet.one/cdn/shop/files/iPhone_16_Pink_PDP_Image_Position_1__en-IN_360x.jpg?v=1727248004', description: 'A18 Bionic. New Camera Control button. Vibrant colors.' },
    { id: 1005, title: 'iPhone 15 Pro Max', brand: 'Apple', price: 1099, category: 'Mobiles', thumbnail: 'https://iplanet.one/cdn/shop/files/iPhone_15_Pro_Max_Blue_Titanium_PDP_Image_Position-1__en-IN_360x.jpg?v=1695435917', description: 'Natural Titanium. 5x Optical zoom. A17 Pro chip.' },
    { id: 1006, title: 'iPhone 15 Pro', brand: 'Apple', price: 899, category: 'Mobiles', thumbnail: 'https://iplanet.one/cdn/shop/files/iPhone_15_Pro_Natural_Titanium_PDP_Image_Position-1__en-IN_ce97c737-e8c5-4578-856d-809328930c6d_360x.jpg?v=1695435202', description: 'Compact power. Action button. Lightweight design.' },
    { id: 1007, title: 'iPhone 15 Plus', brand: 'Apple', price: 799, category: 'Mobiles', thumbnail: 'https://iplanet.one/cdn/shop/files/iPhone_15_Plus_Green_PDP_Image_Position-1__en-IN_2c4a7e92-2e09-4357-a30b-32f1eecf9564_360x.jpg?v=1695430389', description: 'Dynamic Island. 48MP Main camera. USB-C charging.' },
    { id: 1008, title: 'iPhone 15', brand: 'Apple', price: 699, category: 'Mobiles', thumbnail: 'https://iplanet.one/cdn/shop/files/iPhone_15_Black_PDP_Image_Position-1__en-IN_360x.jpg?v=1695427804', description: 'Advanced dual-camera system. All-day battery life.' },
    { id: 1009, title: 'iPhone 14 Pro Max', brand: 'Apple', price: 999, category: 'Mobiles', thumbnail: 'https://iplanet.one/cdn/shop/files/iPhone_14_Pro_Max_Deep_Purple_PDP_Image_Position-1a__WWEN_7fb7e7b5-464e-4198-9328-13db96bf87f0_360x.jpg?v=1691141617', description: 'Deep Purple. Always-On display. Crash Detection.' },
    
    // --- SAMSUNG S SERIES  ---
    { id: 1101, title: 'Galaxy S24 Ultra', brand: 'Samsung', price: 1299, category: 'Mobiles', thumbnail: 'https://m.media-amazon.com/images/I/717Q2swzhBL._SX679_.jpg', description: 'Titanium Gray. Galaxy AI. 200MP sensor. Integrated S-Pen.' },
    { id: 1103, title: 'Galaxy S24', brand: 'Samsung', price: 799, category: 'Mobiles', thumbnail: 'https://m.media-amazon.com/images/I/61+g6KrDXdL._SX679_.jpg', description: 'The compact AI flagship. Dynamic AMOLED 2X.' },
    { id: 1104, title: 'Galaxy S23 Ultra', brand: 'Samsung', price: 1099, category: 'Mobiles', thumbnail: 'https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/275154_qj8x8q.png?tr=w-600', description: 'Iconic 200MP camera. Snapdragon 8 Gen 2 for Galaxy.' },
    { id: 1106, title: 'Galaxy S23', brand: 'Samsung', price: 699, category: 'Mobiles', thumbnail: 'https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/302149_gcbqab.png?tr=w-400', description: 'Refined flagship experience in a pocketable size.' },
    { id: 1107, title: 'Galaxy Z Fold 6', brand: 'Samsung', price: 1899, category: 'Mobiles', thumbnail: 'https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/308188_0_upzg1b.png?tr=w-400', description: 'The ultimate foldable. Slimmer, lighter, and AI-powered.' },
    { id: 1108, title: 'Galaxy Z Flip 6', brand: 'Samsung', price: 1099, category: 'Mobiles', thumbnail: 'https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/316845_0_ofee0w.png?tr=w-400', description: 'Pocket-sized perfection. 50MP Pro-grade camera.' },
    { id: 1109, title: 'Galaxy S24 FE', brand: 'Samsung', price: 649, category: 'Mobiles', thumbnail: 'https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/311521_0_y7ms2q.png?tr=w-400', description: 'Flagship essentials without the compromise.' },

    // --- ANDROID FLAGSHIPS ---
    { id: 1201, title: 'Vivo X100 Pro', brand: 'Vivo', price: 949, category: 'Mobiles', thumbnail: 'https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/319748_0_n8etvt416.png?updatedAt=1764156513270?tr=w-400', description: 'Zeiss APO Telephoto lens. Dimensity 9300. Professional optics.' },
    { id: 1301, title: 'OnePlus 12', brand: 'OnePlus', price: 799, category: 'Mobiles', thumbnail: 'https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/306961_0_rt0l2s.png?tr=w-400', description: 'Flowy Emerald. Hasselblad Camera. 80W SuperVOOC charging.' },
    { id: 1401, title: 'Nothing Phone (2)', brand: 'Nothing', price: 649, category: 'Mobiles', thumbnail: 'https://img6.gadgetsnow.com/gd/images/products/additional/large/G454289_View_1/mobiles/smartphones/nothing-phone-2-256-gb-dark-grey-12-gb-ram-.jpg', description: 'Iconic Glyph Interface. Nothing OS 2.5. Symmetric design.' },
    { id: 1501, title: 'Pixel 9 Pro', brand: 'Google', price: 999, category: 'Mobiles', thumbnail: 'https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/309160_0_ccr72w.png?tr=w-400', description: 'Google AI native. Super Res Zoom. The smartest Pixel yet.' },

    // --- LAPTOPS ---
    { id: 2001, title: 'Asus ROG Strix G18', brand: 'Asus', price: 2499, category: 'Laptops', thumbnail: 'https://www.tanotis.com/cdn/shop/files/1751659888_1905350_1024x.jpg?v=1765918620', description: 'Intel Core i9-14900HX. RTX 4080. 18" Nebula Display.' },
    { id: 2101, title: 'MacBook Pro M3 Max', brand: 'Apple', price: 3499, category: 'Laptops', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4qJIg7DKenvYZ4kIWUGPnc5Z5kcUed1IepA&s', description: 'Space Black. 128GB Unified Memory. The ultimate pro laptop.' },
    { id: 2201, title: 'HP Spectre x360', brand: 'HP', price: 1599, category: 'Laptops', thumbnail: 'https://techstore.co.in/cdn/shop/articles/Hp-Spectre-07.jpg?v=1487510918', description: 'Premium 2-in-1 design. 4K OLED Touch. Luxury finish.' },
    { id: 2301, title: 'Lenovo Legion 9i', brand: 'Lenovo', price: 3799, category: 'Laptops', thumbnail: 'https://m.media-amazon.com/images/I/81x7P1JQHAL.jpg', description: 'Integrated Liquid Cooling. RTX 4090. Carbon Fiber chassis.' },

    // --- ELITE BOOKS COLLECTION (30 ITEMS CURATED) ---
    { id: 4001, title: 'Nexus: A Brief History', brand: 'Yuval Noah Harari', price: 45, category: 'Books', thumbnail: 'https://m.media-amazon.com/images/I/71ogmSoMfML._AC_UF1000,1000_QL80_.jpg', description: 'AI through the lens of human history. A 2026 essential read.' },
    { id: 4002, title: 'The Singularity Is Nearer', brand: 'Ray Kurzweil', price: 55, category: 'Books', thumbnail: 'https://m.media-amazon.com/images/I/81o4sr8AUpL._SY466_.jpg', description: 'Updated predictions on when we will merge with Artificial Intelligence.' },
    { id: 4003, title: 'AI Engineering', brand: 'Chip Huyen', price: 75, category: 'Books', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkqUvq7pIppLsFIUQWD5V4f1OnYgQOPnIugQ&s', description: 'The definitive guide for building applications with foundation models.' },
    { id: 4004, title: 'Empire of AI', brand: 'Karen Hao', price: 39, category: 'Books', thumbnail: 'https://m.media-amazon.com/images/I/71PvG526YjL._AC_UF1000,1000_QL80_.jpg', description: 'An investigative look into the rise of OpenAI and Sam Altman.' },
    { id: 4005, title: 'Supremacy', brand: 'Parmy Olson', price: 32, category: 'Books', thumbnail: 'https://m.media-amazon.com/images/I/81FlYGkgrmL._AC_UF1000,1000_QL80_.jpg', description: 'The high-stakes race between Google and OpenAI for AGI.' },
    { id: 4006, title: 'The Alignment Problem', brand: 'Brian Christian', price: 29, category: 'Books', thumbnail: 'https://m.media-amazon.com/images/I/71DKWJ5O7vL._SY466_.jpg', description: 'Machine learning and the critical challenge of human values.' },
    { id: 4007, title: 'Unmasking AI', brand: 'Joy Buolamwini', price: 28, category: 'Books', thumbnail: 'https://m.media-amazon.com/images/I/71DAY+vWfJL._UF1000,1000_QL80_.jpg', description: 'Exposing racial and gender bias in the machines of tomorrow.' },
    { id: 4008, title: 'Life 3.0', brand: 'Max Tegmark', price: 34, category: 'Books', thumbnail: 'https://m.media-amazon.com/images/I/51iWuo-TTvL._SY445_SX342_FMwebp_.jpg', description: 'Being human in the age of Artificial Intelligence.' },
    { id: 4009, title: 'Co-Intelligence', brand: 'Ethan Mollick', price: 30, category: 'Books', thumbnail: 'https://m.media-amazon.com/images/I/51u0LCP4hYL._SY445_SX342_FMwebp_.jpg', description: 'A practical guide to living and working alongside smart machines.' },
    { id: 4010, title: 'The Thinking Machine', brand: 'Stephen Witt', price: 42, category: 'Books', thumbnail: 'https://m.media-amazon.com/images/I/4138cufSh6L._SY445_SX342_FMwebp_.jpg', description: 'How Jensen Huang turned Nvidia into a global AI powerhouse.' },
    { id: 4101, title: 'Srimad Bhagavad Gita', brand: 'Gita Press', price: 15, category: 'Books', thumbnail: 'https://m.media-amazon.com/images/I/41ArDoGeKBL._SY445_SX342_FMwebp_.jpg', description: 'The timeless spiritual wisdom of Lord Krishna on the battlefield.' },
    { id: 4102, title: 'The Mahabharata', brand: 'C. Rajagopalachari', price: 25, category: 'Books', thumbnail: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR2KZ2K2p6I-4o8ktX35OkRcDkwoihrmS_lA32kC1DZFcNZuU3a3gxec1S6RnPTYq5hjhqOmIdz0tIg2Jbbf5jmSgmUZj5_7c-r2H2YQwk&usqp=CAc', description: 'Indias greatest epic saga of duty, family, and war.' },
    { id: 4103, title: 'Ramayana', brand: 'Valmiki Edition', price: 20, category: 'Books', thumbnail: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT90BLscInkbzrEtVEp71axlQg0K69thGfEbN-t4yRReUVHTB-XolpOxclp2xaHr-NIBtY159wOW2ykJfHl4gDf5EIY7eYXvYx8sR_02e_-WzzlLoI9Hv_d&usqp=CAc', description: 'The journey of Shri Rama, the embodiment of righteousness.' },
    { id: 4104, title: 'The Upanishads', brand: 'Eknath Easwaran', price: 18, category: 'Books', thumbnail: 'https://m.media-amazon.com/images/I/41opF8-6Y3L._SY445_SX342_FMwebp_.jpg', description: 'The core philosophical essence of ancient Vedic wisdom.' },
    { id: 4105, title: 'Guru Granth Sahib', brand: 'Sikh Dharma', price: 50, category: 'Books', thumbnail: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTcWEFCNS6GFTaNsmCKWY9eDPW0sk9s-v5o4gsryOm7ZB27rPCIlfcTUHjrAblAyoNjg1oaW1-53CBcBGlYtqXPvViJvLbcwaaUi8vI-zEJha7_TXlAq4uZPUqhULayrvzkIW__GP8geM4&usqp=CAc', description: 'The living Guru of the Sikhs, containing universal truth.' },
    { id: 4106, title: 'Dhammapada', brand: 'Buddhist Wisdom', price: 12, category: 'Books', thumbnail: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTMo_FhmYO6Ezlz71u99fue9FcZYHoOSCpzrs8N1leZRVEDI2A6efnnFKEpP9Hv_Z0xNqXB32YJR8aKj1RJRXsCSZcllw7ceXdtzO3-riPdOkaY90lZczF81RwMK8x-QOWtxnjcbqk&usqp=CAc', description: 'The path of the Buddhas teachings in simple verse.' },
    { id: 4107, title: 'Tattvartha Sutra', brand: 'Jain Classics', price: 22, category: 'Books', thumbnail: 'https://storage.jainebooks.org/uploads/front-image/915388520-Tattvartha_Sutra_001934_HR.jpg', description: 'The manual for understanding the nature of reality in Jainism.' },
    { id: 4108, title: 'Shiva Purana', brand: 'Traditional', price: 28, category: 'Books', thumbnail: 'https://m.media-amazon.com/images/I/41isrMFNHbL._SY445_SX342_FMwebp_.jpg', description: 'The sacred legends and philosophy of Lord Shiva.' },
];

/**
 * =================================================================
 * 3. CORE INITIALIZATION & API SYNC
 * =================================================================
 */
async function init() {
    renderCategoryBar();
    
    // RESTORE SESSION ON REFRESH
    const savedUser = localStorage.getItem('suite_user');
    if (savedUser) {
        isLoggedIn = true;
        currentUser = JSON.parse(savedUser);
        updateAuthUI(true);
    }

    try {
        const dummyRes = await fetch('https://dummyjson.com/products?limit=100');
        const dummyData = await dummyRes.json();

        let adminProducts = [];
        try {
            const adminRes = await fetch(`${API}/products`);
            if(adminRes.ok) adminProducts = await adminRes.json();
        } catch(e) { console.warn("Admin Backend Offline."); }

        const filteredProducts = dummyData.products.filter(p => p.category !== "beauty");

        const apiData = filteredProducts.map(p => {
            let cat = p.category;
            if (['smartphones', 'tablets'].includes(cat)) cat = 'Mobiles';
            else if (['laptops'].includes(cat)) cat = 'Laptops';
            else if (['electronics', 'lighting','mobile-accessories'].includes(cat)) cat = 'Electronics';
            else if (['furniture', 'home-decoration', 'kitchen-accessories'].includes(cat)) cat = 'Furniture';
            else if (['tops', 'womens-dresses', 'mens-shirts', 'mens-shoes', 'watches', 'bags', 'jewellery', 'sunglasses'].some(s => cat.includes(s))) cat = 'Fashion';
            else if (cat.includes('book')) cat = 'Books';
            return { ...p, category: cat };
        });

        allProducts = [
            ...ELITE_COLLECTION.map(e => ({ ...e, rating: 5.0 })),
            ...adminProducts, 
            ...apiData
        ];

        renderGrid();
    } catch (err) { 
        console.error("Critical: Product Sync Failed.", err); 
    }

    const proceedBtn = document.getElementById('proceed-to-address');
    if(proceedBtn) proceedBtn.onclick = () => {
        if(cart.length === 0) return alert("Bag is empty");
        window.closeCart();
        window.showStep('step-address');
    };
    
    const closeCartBtn = document.getElementById('close-cart');
    if(closeCartBtn) closeCartBtn.onclick = window.closeCart;
    const cartOverlay = document.getElementById('cart-overlay');
    if(cartOverlay) cartOverlay.onclick = window.closeCart;
}

/**
 * =================================================================
 * 4. AUTHENTICATION & LOGIN LOGIC
 * =================================================================
 */
function updateAuthUI(loggedIn) {
    const guestMenu = document.getElementById('guest-menu-items');
    const userMenu = document.getElementById('user-menu-items');
    const label = document.getElementById('user-name-label');

    if (!guestMenu || !userMenu || !label) return; // Prevent errors if elements aren't loaded yet

    if (loggedIn && currentUser) {
        guestMenu.classList.add('hidden');
        userMenu.classList.remove('hidden');
        label.innerText = `Hello, ${currentUser.username}`;
    } else {
        guestMenu.classList.remove('hidden');
        userMenu.classList.add('hidden');
        label.innerText = "Login / Register";
    }
}

// Add this to your init() function to check session immediately
const savedUser = localStorage.getItem('suite_user');
if (savedUser) {
    isLoggedIn = true;
    currentUser = JSON.parse(savedUser);
    updateAuthUI(true);
}

window.handleLogout = function() {
    isLoggedIn = false;
    currentUser = null;
    localStorage.removeItem('suite_user');
    updateAuthUI(false);
    alert("You have been logged out.");
};

window.openAuthModal = function(type) {
    const modal = document.getElementById('auth-modal');
    const userStep = document.getElementById('auth-step-user');
    const adminStep = document.getElementById('auth-step-admin');
    const regStep = document.getElementById('auth-step-register');

    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.add('modal-active');
        modal.style.opacity = '1';
    }, 10);
    
    [userStep, adminStep, regStep].forEach(el => {
        if(el) el.classList.add('hidden');
    });

    if (type === 'user') {
        userStep.classList.remove('hidden');
    } else if (type === 'admin') {
        adminStep.classList.remove('hidden');
    } else if (type === 'register') {
        regStep.classList.remove('hidden');
    }
};

window.closeAuthModal = function() {
    const modal = document.getElementById('auth-modal');
    modal.classList.remove('modal-active');
    modal.style.opacity = '0';
    setTimeout(() => modal.classList.add('hidden'), 300);
};

window.handleRegistration = async function() {
    const usernameInput = document.getElementById('reg-name-input');
    const passwordInput = document.getElementById('reg-pass-input');
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        alert("Please provide both a username and password.");
        return;
    }

    try {
        const response = await fetch(`${API}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, role: 'USER' })
        });

        if (response.ok) {
            alert("Registration Successful! You can now log in.");
            window.openAuthModal('user');
        } else {
            const err = await response.text();
            alert("Registration Failed: " + err);
        }
    } catch (e) {
        alert("System error. Check backend connection.");
    }
};

window.handleUserLogin = async function() {
    const usernameInput = document.getElementById('user-name-input');
    const passwordInput = document.getElementById('user-pass-input');
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        alert("Credentials required: Please enter your username and password.");
        return;
    }

    try {
        const response = await fetch(`${API}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const user = await response.json();
            isLoggedIn = true;
            currentUser = user;
            localStorage.setItem('suite_user', JSON.stringify(user));
            updateAuthUI(true);
            window.closeAuthModal();
        } else {
            alert("Invalid Credentials.");
            passwordInput.value = ""; 
        }
    } catch (error) {
        alert("System Offline: Unable to reach server.");
    }
};

window.handleAdminLogin = function() {
    const pass = document.getElementById('admin-pass-input').value;
    const errorMsg = document.getElementById('admin-error');
    if (pass === "8400") {
        window.location.href = "admin.html";
    } else {
        errorMsg.innerText = "Password incorrect.";
        errorMsg.classList.remove('hidden');
        document.getElementById('admin-pass-input').value = "";
    }
};

/**
 * =================================================================
 * 5. UI RENDERERS
 * =================================================================
 */
function renderCategoryBar() {
    const bar = document.getElementById('category-bar');
    if(!bar) return;
    bar.innerHTML = CATS.map(c => `
        <div class="category-item ${state.selectedCategory === c ? 'active' : ''}" onclick="filterCat('${c}')">
            <div class="category-icon-box glass-card border flex items-center justify-center p-3 rounded-2xl cursor-pointer hover:bg-violet-50 transition-all ${state.selectedCategory === c ? 'border-violet-500 bg-violet-50' : 'border-slate-100'}">${getIcon(c)}</div>
            <span class="text-[11px] font-black text-slate-400 uppercase tracking-widest block text-center mt-2">${c}</span>
        </div>
    `).join('');
}

function renderGrid() {
    const grid = document.getElementById('product-grid');
    if(!grid) return;
    let filtered = allProducts.filter(p => state.selectedCategory === 'All' || p.category === state.selectedCategory);
    
    if (state.selectedCategory !== 'All') {
        filtered = filtered.slice(0, 30);
    } else {
        filtered = filtered.slice(0, 60); 
    }

    grid.innerHTML = filtered.map(p => `
        <div class="glass-card rounded-[40px] p-6 flex flex-col animate-fade border border-white/40">
            <div class="relative h-64 mb-6 rounded-[28px] overflow-hidden bg-slate-100">
                <img src="${p.thumbnail}" class="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="${p.title}" loading="lazy">
                <div class="absolute top-4 left-4 glass px-3 py-1 rounded-full text-[10px] font-black uppercase text-violet-700 border border-violet-100">${p.brand || 'Suite'}</div>
            </div>
            <div class="flex-1 space-y-2">
                <div class="flex justify-between items-start">
                     <h3 class="text-lg font-black text-slate-800 leading-tight">${p.title}</h3>
                     <div class="flex items-center gap-1 bg-white/50 px-2 py-0.5 rounded-lg border border-slate-100">
                        <svg class="text-amber-400" width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>
                        <span class="text-[10px] font-bold text-slate-500">${p.rating || 4.5}</span>
                     </div>
                </div>
                <p class="text-xs text-slate-400 font-bold line-clamp-2">${p.description}</p>
            </div>
            <div class="mt-6 flex items-center justify-between">
                <div class="flex flex-col">
                    <span class="text-[10px] text-slate-300 font-black line-through">₹${Math.round(p.price * 1.2 * INR_CONV).toLocaleString()}</span>
                    <span class="text-2xl font-black tracking-tighter">₹${Math.round(p.price * INR_CONV).toLocaleString()}</span>
                </div>
                <button onclick="addToCart(${p.id})" class="bg-slate-900 text-white p-4 rounded-2xl hover:bg-vibrant hover:scale-105 active:scale-90 transition-all">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5"><path d="M5 12h14M12 5v14"/></svg>
                </button>
            </div>
        </div>
    `).join('');
    
    document.getElementById('results-count').innerText = `${filtered.length} products found for your collection`;
}

/**
 * =================================================================
 * 6. GLOBAL ACTIONS (Exposed for HTML)
 * =================================================================
 */
window.openCart = function() {
    document.body.classList.add('lock-scroll');
    const overlay = document.getElementById('cart-overlay');
    if(overlay) overlay.classList.remove('hidden');
    window.showStep('side-step-bag'); 
    setTimeout(() => {
        if(overlay) overlay.style.opacity = '1';
        const sidebar = document.getElementById('cart-sidebar');
        if(sidebar) sidebar.style.transform = 'translateX(0)';
    }, 10);
};

window.closeCart = function() {
    const overlay = document.getElementById('cart-overlay');
    if(overlay) overlay.style.opacity = '0';
    const sidebar = document.getElementById('cart-sidebar');
    if(sidebar) sidebar.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if(overlay) overlay.classList.add('hidden');
        document.body.classList.remove('lock-scroll');
    }, 500);
};

window.showStep = function(stepId) {
    const steps = ['side-step-bag', 'side-step-address', 'side-step-payment', 'side-step-success', 'step-address', 'step-payment', 'step-success'];
    steps.forEach(s => {
        const el = document.getElementById(s);
        if (el) el.classList.add('hidden');
    });
    const target = document.getElementById(stepId);
    if (target) target.classList.remove('hidden');
};

window.addToCart = function(id) {
    if (!isLoggedIn) {
        alert("Please create an ID or Login to add items to your Suite Bag.");
        window.openAuthModal('user');
        return;
    }
    const productId = Number(id);
    const p = allProducts.find(x => Number(x.id) === productId);
    const inCart = cart.find(x => Number(x.id) === productId);
    if (inCart) inCart.qty++;
    else if (p) cart.push({ ...p, qty: 1 });
    updateCartUI();
};

window.qty = (id, d) => {
    const productId = Number(id);
    const i = cart.find(x => Number(x.id) !== null && Number(x.id) === productId);
    if (i) {
        i.qty += d;
        if (i.qty <= 0) cart = cart.filter(x => Number(x.id) !== productId);
    }
    updateCartUI();
};

window.filterCat = function(c) {
    state.selectedCategory = c;
    renderCategoryBar();
    renderGrid();
    const titleEl = document.getElementById('feed-title');
    if(titleEl) titleEl.innerText = c === 'All' ? 'Trending Pieces' : c;
};

window.saveAddressAndGoToPayment = function() {
    const nameInput = document.getElementById('addr-name');
    const lineInput = document.getElementById('addr-line');
    const cityInput = document.getElementById('addr-city');
    const pinInput = document.getElementById('addr-pin');
    if (!nameInput.value || !lineInput.value || !cityInput.value || !pinInput.value) return alert("Please fill all delivery details");
    const previewEl = document.getElementById('address-preview');
    if (previewEl) {
        previewEl.innerHTML = `${nameInput.value}<br>${lineInput.value}, ${cityInput.value} - ${pinInput.value}`;
    }
    window.showStep('side-step-payment');
    updateCartUI(); 
};

window.selectPayment = function(method) {
    state.paymentMethod = method;
    document.querySelectorAll('.pay-opt').forEach(el => el.classList.remove('border-violet-500', 'bg-violet-50/30'));
    if(event && event.currentTarget) event.currentTarget.classList.add('border-violet-500', 'bg-violet-50/30');
};

async function placeOrderToBackend() {
    const total = cart.reduce((a, b) => a + (b.price * b.qty * INR_CONV), 0) * 1.18;
    const orderPayload = {
        clientName: currentUser ? currentUser.username : 'Guest',
        totalBill: Math.round(total),
        paymentMethod: state.paymentMethod
    };
    const response = await fetch(`${API}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
    });
    if (!response.ok) throw new Error('Failed to place order');
    return response.json();
}

window.finalPurchase = async function() {
    if (!state.paymentMethod) return alert("Please select a payment method");
    try {
        await placeOrderToBackend();
        window.showStep('side-step-success');
        cart = [];
        state.paymentMethod = null;
        updateCartUI();
    } catch (error) {
        alert("Order could not be saved to backend.");
    }
};

/**
 * =================================================================
 * 7. ORDER HISTORY & CANCELLATION LOGIC
 * =================================================================
 */
window.openOrderHistory = async function() {
    const sidebar = document.getElementById('history-sidebar');
    const container = document.getElementById('history-content');
    const overlay = document.getElementById('cart-overlay');

    overlay.classList.remove('hidden');
    setTimeout(() => {
        overlay.style.opacity = '1';
        sidebar.style.transform = 'translateX(0)';
    }, 10);
    
    try {
        const res = await fetch(`${API}/admin/orders`);
        const allOrders = await res.json();
        const myOrders = allOrders.filter(o => o.clientName === currentUser.username);
        
        if (myOrders.length === 0) {
            container.innerHTML = `<p class="text-center py-20 opacity-30 font-bold uppercase">No orders found</p>`;
            return;
        }

        container.innerHTML = myOrders.map(order => `
            <div class="glass-card p-6 rounded-3xl border border-white/40 flex items-center justify-between">
                <div>
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order #ORD-${order.id}</p>
                    <h4 class="text-xl font-black text-slate-800">₹${order.totalBill.toLocaleString()}</h4>
                    <p class="text-xs font-bold ${order.status === 'DISPATCHED' ? 'text-emerald-500' : 'text-amber-500'}">${order.status}</p>
                </div>
                <button onclick="cancelOrder(${order.id}, '${order.status}')" class="px-6 py-2 rounded-xl font-black text-xs ${order.status === 'DISPATCHED' ? 'bg-slate-100 text-slate-400' : 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white'} transition-all">
                    Cancel Order
                </button>
            </div>
        `).join('');
    } catch (e) {
        container.innerHTML = `<p class="text-red-500 font-bold">Failed to load orders.</p>`;
    }
};

window.closeHistoryModal = function() {
    const sidebar = document.getElementById('history-sidebar');
    const overlay = document.getElementById('cart-overlay');
    overlay.style.opacity = '0';
    sidebar.style.transform = 'translateX(100%)';
    setTimeout(() => {
        overlay.classList.add('hidden');
    }, 500);
};

window.cancelOrder = async function(id, status) {
    if (status === 'DISPATCHED') {
        alert("This order cannot be cancelled. It's already dispatched!");
        return;
    }

    if (!confirm("Are you sure you want to cancel this order?")) return;

    try {
        const res = await fetch(`${API}/admin/order/${id}`, { method: 'DELETE' });
        if (res.ok) {
            alert("Order Cancelled Successfully!");
            openOrderHistory(); 
        } else {
            alert("Cancellation failed.");
        }
    } catch (e) {
        alert("Server error.");
    }
};

/**
 * =================================================================
 * 8. CART CALCULATIONS
 * =================================================================
 */
function updateCartUI() {
    const count = cart.reduce((a, b) => a + b.qty, 0);
    const countEl = document.getElementById('cart-count');
    if (countEl) {
        countEl.innerText = count;
        countEl.classList.toggle('hidden', count === 0);
    }
    const container = document.getElementById('cart-items');
    if (container) {
        container.innerHTML = cart.length === 0 ? `<p class="text-center py-20 opacity-30 font-bold uppercase">Bag is Empty</p>` : 
            cart.map(item => `
                <div class="flex items-center gap-5 glass-card p-4 rounded-3xl border border-white/40 mb-3">
                    <img src="${item.thumbnail}" class="w-12 h-12 rounded-xl object-cover bg-slate-50">
                    <div class="flex-1">
                        <h4 class="font-bold text-[11px] leading-tight">${item.title}</h4>
                        <p class="text-[10px] text-violet-600 font-bold mt-1">₹${Math.round(item.price * INR_CONV).toLocaleString()}</p>
                    </div>
                    <div class="flex items-center gap-2">
                         <button onclick="qty(${item.id}, -1)" class="w-6 h-6 rounded-full border border-slate-200 text-xs">-</button>
                         <span class="text-xs font-bold">${item.qty}</span>
                         <button onclick="qty(${item.id}, 1)" class="w-6 h-6 rounded-full border border-slate-200 text-xs">+</button>
                    </div>
                </div>
            `).join('');
    }
    const subtotal = cart.reduce((a, b) => a + (b.price * b.qty * INR_CONV), 0);
    const tax = subtotal * 0.18;
    let total = subtotal + tax;
    const subEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('taxes');
    const billEl = document.getElementById('total-bill');
    const payFinal = document.getElementById('pay-final-amount');
    if (subEl) subEl.innerText = `₹${Math.round(subtotal).toLocaleString()}`;
    if (taxEl) taxEl.innerText = `₹${Math.round(tax).toLocaleString()}`;
    if (billEl) billEl.innerText = `₹${Math.round(total).toLocaleString()}`;
    if (payFinal) payFinal.innerText = `₹${Math.round(total).toLocaleString()}`;
}

/**
 * =================================================================
 * 9. UTILITIES & ICONS
 * =================================================================
 */
function getIcon(c) {
    const map = {
        'All': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>',
        'Mobiles': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/></svg>',
        'Laptops': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/></svg>',
        'Electronics': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M2 9h3l3 3m0 0 3 3m-3-3 3-3m-3 3-3 3M13 18h7a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7"/></svg>',
        'Furniture': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 20h16M5 20v-5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5"/></svg>',
        'Fashion': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23Z"/></svg>',
        'Books': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-0-5H20"/></svg>',
    };
    return map[c] || map['All'];
}

function updateEMIDetails() {
    const total = cart.reduce((a, b) => a + (b.price * b.qty * INR_CONV), 0) * 1.18;
    const down = total * 0.20;
    const monthly = (total - down) / 9;
    const downEl = document.getElementById('emi-down');
    const monthEl = document.getElementById('emi-month');
    if(downEl) downEl.innerText = `₹${Math.round(down).toLocaleString()}`;
    if(monthEl) monthEl.innerText = `₹${Math.round(monthly).toLocaleString()} × 9 months`;
}

init();
