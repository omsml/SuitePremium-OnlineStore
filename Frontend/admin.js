const API = "http://localhost:8080/api";

function showNotification(message, isError = false) {
    const toast = document.getElementById('toast');
    const msg = document.getElementById('toast-msg');
    toast.className = `notification show ${isError ? 'error' : 'success'}`;
    msg.innerText = message;
    setTimeout(() => toast.classList.remove('show'), 5000);
}

// --- VIEW TOGGLE ---
function toggleView() {
    const form = document.getElementById('form-container');
    const list = document.getElementById('products-list-container');
    const btnText = document.getElementById('view-btn-text');

    if (list.classList.contains('hidden')) {
        list.classList.remove('hidden');
        form.classList.add('hidden');
        btnText.innerText = "Add New Product";
        loadInventory();
    } else {
        list.classList.add('hidden');
        form.classList.remove('hidden');
        btnText.innerText = "Listed Products";
    }
}

// --- MODAL MANAGEMENT ---
function closeEditModal() {
    document.getElementById('edit-modal').classList.add('hidden');
}

async function editProduct(id) {
    try {
        const response = await fetch(`${API}/products`);
        const products = await response.json();
        const p = products.find(item => item.id === id);

        if (p) {
            document.getElementById('edit-p-id').value = p.id;
            document.getElementById('edit-p-title').value = p.title;
            document.getElementById('edit-p-brand').value = p.brand;
            document.getElementById('edit-p-price').value = p.price;
            document.getElementById('edit-p-rating').value = p.rating;
            document.getElementById('edit-p-img').value = p.thumbnail;
            document.getElementById('edit-p-desc').value = p.description;

            document.getElementById('edit-modal').classList.remove('hidden');
        }
    } catch (e) {
        showNotification("Error fetching product details", true);
    }
}

async function updateProduct() {
    const id = document.getElementById('edit-p-id').value;
    const updatedProduct = {
        title: document.getElementById('edit-p-title').value,
        brand: document.getElementById('edit-p-brand').value,
        price: parseFloat(document.getElementById('edit-p-price').value),
        rating: parseFloat(document.getElementById('edit-p-rating').value),
        thumbnail: document.getElementById('edit-p-img').value,
        description: document.getElementById('edit-p-desc').value
    };

    try {
        const response = await fetch(`${API}/admin/product/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProduct)
        });

        if (response.ok) {
            showNotification("Database Updated: Changes are now live.");
            closeEditModal();
            loadInventory();
        } else {
            throw new Error("Update failed");
        }
    } catch (e) {
        showNotification("Update Failed. Ensure backend is running.", true);
    }
}

// --- INVENTORY LISTING ---
async function loadInventory() {
    try {
        const response = await fetch(`${API}/products`);
        const products = await response.json();
        const container = document.getElementById('inventory-list');
        
        container.innerHTML = products.map(p => `
            <tr class="border-b border-slate-50 hover:bg-slate-50/50 transition-all">
                <td class="py-4">
                    <div class="flex items-center gap-3">
                        <img src="${p.thumbnail}" class="w-10 h-10 rounded-lg object-cover bg-slate-100">
                        <div>
                            <p class="font-bold text-slate-900 text-sm">${p.title}</p>
                            <p class="text-[10px] font-bold text-slate-400 uppercase">${p.brand}</p>
                        </div>
                    </div>
                </td>
                <td class="text-xs font-bold text-slate-500">${p.category}</td>
                <td class="font-black text-violet-600 text-sm">₹${p.price.toLocaleString()}</td>
                <td class="text-right">
                    <div class="flex justify-end gap-2">
                        <button onclick="editProduct(${p.id})" class="p-2 hover:bg-amber-50 text-amber-600 rounded-lg transition-all">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button onclick="deleteProduct(${p.id})" class="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-all">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    } catch (e) {
        showNotification("Failed to load inventory", true);
    }
}

async function deleteProduct(id) {
    if(!confirm("Remove this product from your store?")) return;
    try {
        const response = await fetch(`${API}/admin/product/${id}`, { method: 'DELETE' });
        if(response.ok) {
            showNotification("Product deleted from database.");
            loadInventory();
        }
    } catch (e) {
        showNotification("Delete Failed", true);
    }
}

// --- ORDER MONITOR LOGIC ---
function getStatusBadgeClass(status) {
    return status === 'DISPATCHED'
        ? 'bg-emerald-100 text-emerald-600 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider'
        : 'bg-amber-100 text-amber-600 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider';
}

function renderOrders(orders) {
    const orderList = document.getElementById('order-list');
    if (!orderList) return;
    
    // Updated colspan to 5 because we added a new column
    if (!orders.length) {
        orderList.innerHTML = `<tr><td colspan="5" class="py-8 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">No orders found</td></tr>`;
        return;
    }

    orderList.innerHTML = orders.map(order => {
        const isDispatched = order.status === 'DISPATCHED';
        return `
            <tr class="border-b border-slate-50 group hover:bg-slate-50/50 transition-all">
                <td class="py-6 px-2 font-bold text-slate-400">#ORD-${order.id}</td>
                <td class="font-bold text-slate-700">
                    <div class="flex items-center gap-2">
                        <div class="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center text-[10px] text-slate-500 font-black uppercase">
                            ${(order.clientName || 'G').charAt(0)}
                        </div>
                        ${order.clientName || 'Guest User'}
                    </div>
                </td>
                <td class="font-black text-violet-600">₹${Math.round(order.totalBill || 0).toLocaleString()}</td>
                <td><span id="status-${order.id}" class="${getStatusBadgeClass(order.status)}">${order.status || 'PENDING'}</span></td>
                <td class="text-right">
                    <button id="dispatch-btn-${order.id}" onclick="dispatch(${order.id})" ${isDispatched ? 'disabled' : ''} class="${isDispatched ? 'bg-slate-100 text-slate-400 px-5 py-2 rounded-xl font-black text-xs cursor-not-allowed' : 'bg-white border-2 border-violet-100 text-violet-600 px-5 py-2 rounded-xl font-black text-xs hover:bg-violet-600 hover:text-white transition-all shadow-sm'}">
                        ${isDispatched ? 'Shipped' : 'Dispatch'}
                    </button>
                </td>
            </tr>`;
    }).join('');
}

async function loadOrders() {
    try {
        const response = await fetch(`${API}/admin/orders`);
        if (!response.ok) throw new Error('Unable to fetch orders');
        const orders = await response.json();
        renderOrders(orders);
    } catch (error) {
        renderOrders([]);
        showNotification('Could not load orders from backend.', true);
    }
}

// --- ADD PRODUCT LOGIC ---
async function addProduct() {
    const title = document.getElementById('p-title').value;
    const brand = document.getElementById('p-brand').value;
    const price = parseFloat(document.getElementById('p-price').value);
    const category = document.getElementById('p-cat').value;
    const description = document.getElementById('p-desc').value;
    const thumbnail = document.getElementById('p-img').value;
    const rating = parseFloat(document.getElementById('p-rating').value);

    if (!title || !price || !thumbnail || !brand) {
        showNotification("Mandatory fields: Title, Brand, Price, and Image URL.", true);
        return;
    }

    const product = { title, brand, price, category, description, thumbnail, rating };

    try {
        const response = await fetch(`${API}/admin/add-product`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product) 
        });

        if (!response.ok) throw new Error("Sync failed");
        const savedData = await response.json();
        showNotification(`Database Synced: ${savedData.title} is now live.`);
        
        ['p-title', 'p-brand', 'p-price', 'p-img', 'p-desc'].forEach(id => {
            document.getElementById(id).value = '';
        });
    } catch (error) {
        showNotification("Backend Error: Ensure SuiteBackend.java is running.", true);
    }
}

async function dispatch(id) {
    try {
        const response = await fetch(`${API}/admin/order/${id}/dispatch`, { method: 'PUT' });
        if (!response.ok) throw new Error("Server error");
        const statusBadge = document.getElementById(`status-${id}`);
        const btn = document.getElementById(`dispatch-btn-${id}`);
        statusBadge.innerText = "DISPATCHED";
        statusBadge.className = "bg-emerald-100 text-emerald-600 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider";
        btn.disabled = true;
        btn.innerText = "Shipped";
        showNotification(`Logistics Update: Order #${id} is out for delivery.`);
        loadOrders();
    } catch (error) {
        showNotification("Logistics Hub Offline", true);
    }
}

// Initial Load
loadOrders();

async function updateProduct() {
    const id = document.getElementById('edit-p-id').value;
    
    // Safety check: if ID is missing, don't even try the fetch
    if (!id) {
        showNotification("Error: Product ID is missing", true);
        return;
    }

    const updatedProduct = {
        title: document.getElementById('edit-p-title').value,
        brand: document.getElementById('edit-p-brand').value,
        price: parseFloat(document.getElementById('edit-p-price').value),
        rating: parseFloat(document.getElementById('edit-p-rating').value),
        thumbnail: document.getElementById('edit-p-img').value,
        description: document.getElementById('edit-p-desc').value
        // If your modal doesn't have category, the Java fix above handles it
    };

    try {
        const response = await fetch(`${API}/admin/product/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProduct)
        });

        if (response.ok) {
            showNotification("Database Updated: Changes are now live.", false);
            closeEditModal();
            loadInventory(); // Refresh the list
        } else {
            const errorData = await response.text();
            console.error("Server Error:", errorData);
            showNotification("Server rejected update. Check console.", true);
        }
    } catch (e) {
        console.error("Fetch Error:", e);
        showNotification("Network Error: Could not connect to backend.", true);
    }
}