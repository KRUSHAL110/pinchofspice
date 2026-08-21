import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js';
import {
    getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js';
import {
    getFirestore, collection, query, orderBy, onSnapshot, doc, updateDoc,
    getDoc, setDoc, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js';
import { firebaseConfig, FIREBASE_NOT_CONFIGURED } from './firebase-config.js';

const loginView = document.getElementById('loginView');
const dashView = document.getElementById('dashView');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const loginBtn = document.getElementById('loginBtn');
const orderList = document.getElementById('orderList');
const connState = document.getElementById('connState');

const STATUSES = ['pending', 'preparing', 'delivered', 'cancelled'];
const NEXT_ACTION = {
    pending: { to: 'preparing', label: 'Start preparing' },
    preparing: { to: 'delivered', label: 'Mark delivered' }
};

let orders = [];
let activeFilter = 'all';
let unsubscribe = null;

function showError(msg) {
    loginError.textContent = msg;
    loginError.hidden = false;
}

if (FIREBASE_NOT_CONFIGURED) {
    showError('Firebase is not configured yet. Fill in js/firebase-config.js first.');
    loginBtn.disabled = true;
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ---- Auth ----

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.hidden = true;
    loginBtn.disabled = true;
    loginBtn.textContent = 'Signing in...';
    try {
        await signInWithEmailAndPassword(
            auth,
            document.getElementById('email').value.trim(),
            document.getElementById('password').value
        );
    } catch (err) {
        // Don't reveal whether the email exists - just say the pair is wrong
        const wrong = ['auth/wrong-password', 'auth/user-not-found', 'auth/invalid-credential'];
        if (wrong.includes(err.code)) {
            showError('Wrong email or password. Check the account exists in Firebase Authentication.');
        } else if (err.code === 'auth/too-many-requests') {
            showError('Too many attempts. Wait a few minutes and try again.');
        } else if (err.code === 'auth/network-request-failed') {
            showError('No connection. Check your internet and try again.');
        } else {
            showError(`Could not sign in: ${err.code || err.message}`);
        }
    } finally {
        loginBtn.disabled = false;
        loginBtn.textContent = 'Sign in';
    }
});

document.getElementById('signOutBtn').addEventListener('click', () => signOut(auth));

onAuthStateChanged(auth, (user) => {
    if (user) {
        loginView.hidden = true;
        dashView.hidden = false;
        watchOrders();
    } else {
        if (unsubscribe) { unsubscribe(); unsubscribe = null; }
        orders = [];
        dashView.hidden = true;
        loginView.hidden = false;
        loginForm.reset();
    }
});

// ---- Orders ----

function watchOrders() {
    if (unsubscribe) return;
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    unsubscribe = onSnapshot(q, (snap) => {
        orders = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        connState.textContent = 'Live';
        connState.classList.remove('is-error');
        render();
    }, (err) => {
        if (err.code === 'permission-denied') {
            connState.textContent = 'This account is signed in but is not an admin. Ask for its UID to be added.';
        } else {
            connState.textContent = `Connection problem: ${err.code}`;
        }
        connState.classList.add('is-error');
    });
}

document.querySelectorAll('.admin-filters .filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.admin-filters .filter-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.status;
        render();
    });
});

async function setStatus(id, status) {
    if (!STATUSES.includes(status)) return;
    try {
        await updateDoc(doc(db, 'orders', id), { status, updatedAt: serverTimestamp() });
    } catch (err) {
        alert(`Could not update the order: ${err.code || err.message}`);
    }
}

function toDate(ts) {
    if (!ts) return null;
    return typeof ts.toDate === 'function' ? ts.toDate() : new Date(ts);
}

function isToday(d) {
    if (!d) return false;
    const now = new Date();
    return d.getDate() === now.getDate()
        && d.getMonth() === now.getMonth()
        && d.getFullYear() === now.getFullYear();
}

function timeLabel(d) {
    if (!d) return '';
    const mins = Math.floor((Date.now() - d.getTime()) / 60000);
    const clock = d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    if (mins < 1) return `just now - ${clock}`;
    if (mins < 60) return `${mins} min ago - ${clock}`;
    return d.toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

function esc(v) {
    return String(v ?? '').replace(/[&<>"']/g, (c) => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
}

function render() {
    const todays = orders.filter((o) => isToday(toDate(o.createdAt)));
    document.getElementById('statPending').textContent = orders.filter((o) => o.status === 'pending').length;
    document.getElementById('statToday').textContent = todays.length;
    document.getElementById('statRevenue').textContent =
        'Rs.' + todays.filter((o) => o.status !== 'cancelled')
                     .reduce((sum, o) => sum + (Number(o.total) || 0), 0);

    const shown = activeFilter === 'all' ? orders : orders.filter((o) => o.status === activeFilter);

    if (!shown.length) {
        orderList.innerHTML = `<p class="admin-empty">No ${activeFilter === 'all' ? '' : activeFilter} orders yet.</p>`;
        return;
    }

    orderList.innerHTML = shown.map((o) => {
        const created = toDate(o.createdAt);
        const items = (o.items || []).map((it) =>
            `<li><span>${esc(it.name)} <em>(${esc(it.size)})</em></span>
                 <span>x${esc(it.quantity)}</span>
                 <span>Rs.${esc((it.price || 0) * (it.quantity || 0))}</span></li>`).join('');
        const next = NEXT_ACTION[o.status];
        const actions = [
            next ? `<button class="btn btn-primary btn-sm" data-id="${esc(o.id)}" data-to="${next.to}">${next.label}</button>` : '',
            o.status !== 'delivered' && o.status !== 'cancelled'
                ? `<button class="btn btn-ghost btn-sm" data-id="${esc(o.id)}" data-to="cancelled">Cancel</button>` : ''
        ].join('');

        return `
        <article class="order-card status-${esc(o.status)}">
            <header>
                <div>
                    <h2>${esc(o.orderRef || o.id)}</h2>
                    <p class="order-time">${esc(timeLabel(created))}</p>
                </div>
                <span class="status-pill">${esc(o.status)}</span>
            </header>

            <div class="order-customer">
                <p><strong>${esc(o.customer?.name)}</strong></p>
                <p><a href="tel:${esc(o.customer?.phone)}">${esc(o.customer?.phone)}</a></p>
                <p class="order-address">${esc(o.customer?.address)}</p>
                ${o.customer?.specialInstructions
                    ? `<p class="order-note">Note: ${esc(o.customer.specialInstructions)}</p>` : ''}
            </div>

            <ul class="order-items">${items}</ul>
            ${o.paymentId ? `<p class="order-payid">Payment ID: ${esc(o.paymentId)}</p>` : ''}

            <footer>
                <span class="order-total">Rs.${esc(o.total)}</span>
                <span class="order-pay">${esc(o.paymentMethod)}${o.paymentId ? ' &middot; paid' : ''}</span>
            </footer>

            ${actions ? `<div class="order-actions">${actions}</div>` : ''}
        </article>`;
    }).join('');

    orderList.querySelectorAll('button[data-id]').forEach((btn) => {
        btn.addEventListener('click', () => setStatus(btn.dataset.id, btn.dataset.to));
    });
}


// ---------------------------------------------------------------- Menu editor

const CATEGORIES = [
    ['non-veg-rice', 'Non-Veg Chinese Rice'],
    ['veg-rice', 'Veg Chinese Rice'],
    ['non-veg-noodles', 'Non-Veg Noodles'],
    ['veg-noodles', 'Veg Noodles'],
    ['non-veg-starter', 'Non-Veg Starter'],
    ['veg-starter', 'Veg Starter'],
    ['non-veg-soup', 'Non-Veg Soup'],
    ['veg-soup', 'Veg Soup'],
    ['tandoor', 'Special Tandoor'],
    ['special', 'Pinch of Spice Special']
];

const menuState = { items: [], filter: 'all', editingId: null, saving: false };

const dishForm = document.getElementById('dishForm');
const dishError = document.getElementById('dishError');
const menuStateLabel = document.getElementById('menuState');
const dishList = document.getElementById('dishList');

function setMenuState(msg, isError) {
    menuStateLabel.textContent = msg;
    menuStateLabel.classList.toggle('is-error', Boolean(isError));
}

// Tabs
document.querySelectorAll('.admin-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.admin-tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        const showMenu = tab.dataset.view === 'menu';
        document.getElementById('ordersView').hidden = showMenu;
        document.getElementById('menuView').hidden = !showMenu;
        if (showMenu && !menuState.items.length) loadMenu();
    });
});

function fillCategorySelect() {
    const sel = document.getElementById('dishCategory');
    sel.innerHTML = CATEGORIES.map(([v, l]) => `<option value="${v}">${l}</option>`).join('');
}

async function loadMenu() {
    setMenuState('Loading...');
    try {
        const snap = await getDoc(doc(db, 'menu', 'current'));
        menuState.items = snap.exists() && Array.isArray(snap.data().items) ? snap.data().items : [];
        setMenuState(menuState.items.length
            ? `${menuState.items.length} dishes`
            : 'No menu saved yet - use "Import current menu" to start from the existing 66 dishes.');
    } catch (err) {
        setMenuState(`Could not load the menu: ${err.code || err.message}`, true);
    }
    renderMenu();
}

async function saveMenu(successMsg) {
    if (menuState.saving) return false;
    menuState.saving = true;
    setMenuState('Saving...');
    try {
        await setDoc(doc(db, 'menu', 'current'), {
            items: menuState.items,
            updatedAt: serverTimestamp()
        });
        setMenuState(successMsg || `${menuState.items.length} dishes - saved`);
        return true;
    } catch (err) {
        setMenuState(`Could not save: ${err.code || err.message}`, true);
        return false;
    } finally {
        menuState.saving = false;
    }
}

// Seed Firestore from the menu bundled with the customer site
document.getElementById('importMenuBtn').addEventListener('click', async () => {
    if (menuState.items.length &&
        !confirm('This replaces the saved menu with the 66 dishes from the website file. Continue?')) return;
    try {
        const res = await fetch('../js/menu-data.js');
        const text = await res.text();
        const start = text.indexOf('[');
        const end = text.lastIndexOf(']');
        // The file is a JS literal, not JSON, so evaluate just the array portion
        // eslint-disable-next-line no-new-func
        const items = Function(`return ${text.slice(start, end + 1)}`)();
        menuState.items = items.map((i) => ({ ...i, available: i.available !== false }));
        if (await saveMenu(`Imported ${menuState.items.length} dishes`)) renderMenu();
    } catch (err) {
        setMenuState(`Import failed: ${err.message}`, true);
    }
});

// Add / edit
document.getElementById('addDishBtn').addEventListener('click', () => openDishForm(null));
document.getElementById('cancelDishBtn').addEventListener('click', () => { dishForm.hidden = true; });

function openDishForm(dish) {
    menuState.editingId = dish ? dish.id : null;
    document.getElementById('dishFormTitle').textContent = dish ? `Edit ${dish.name}` : 'Add a dish';
    document.getElementById('dishName').value = dish?.name || '';
    document.getElementById('dishCategory').value = dish?.category || CATEGORIES[0][0];
    document.getElementById('dishType').value = dish?.type || 'veg';
    document.getElementById('dishImage').value = dish?.image || '';
    const half = dish?.prices?.find((p) => p.size === 'Half');
    const full = dish?.prices?.find((p) => p.size === 'Full');
    document.getElementById('dishHalf').value = half ? half.price : '';
    document.getElementById('dishFull').value = full ? full.price : (dish?.prices?.[0]?.price ?? '');
    dishError.hidden = true;
    dishForm.hidden = false;
    dishForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

dishForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    dishError.hidden = true;

    const name = document.getElementById('dishName').value.trim();
    const category = document.getElementById('dishCategory').value;
    const halfRaw = document.getElementById('dishHalf').value.trim();
    const fullRaw = document.getElementById('dishFull').value.trim();
    const full = Number(fullRaw);

    if (!name) return showDishError('Give the dish a name.');
    if (!Number.isFinite(full) || full <= 0) return showDishError('Full price must be more than 0.');
    const prices = [];
    if (halfRaw !== '') {
        const half = Number(halfRaw);
        if (!Number.isFinite(half) || half <= 0) return showDishError('Half price must be more than 0, or left blank.');
        if (half >= full) return showDishError('Half price should be less than the full price.');
        prices.push({ size: 'Half', price: half });
    }
    prices.push({ size: 'Full', price: full });

    const dish = {
        id: menuState.editingId ?? (Math.max(0, ...menuState.items.map((i) => Number(i.id) || 0)) + 1),
        name,
        category,
        categoryDisplay: CATEGORIES.find(([v]) => v === category)[1],
        type: document.getElementById('dishType').value,
        image: document.getElementById('dishImage').value.trim(),
        prices,
        available: true
    };

    if (menuState.editingId != null) {
        const idx = menuState.items.findIndex((i) => i.id === menuState.editingId);
        dish.available = menuState.items[idx]?.available !== false;
        menuState.items[idx] = dish;
    } else {
        menuState.items.push(dish);
    }

    if (await saveMenu()) {
        dishForm.hidden = true;
        renderMenu();
    }
});

function showDishError(msg) {
    dishError.textContent = msg;
    dishError.hidden = false;
}

async function toggleDish(id) {
    const dish = menuState.items.find((i) => i.id === id);
    if (!dish) return;
    dish.available = dish.available === false;
    if (await saveMenu()) renderMenu();
}

async function deleteDish(id) {
    const dish = menuState.items.find((i) => i.id === id);
    if (!dish) return;
    if (!confirm(`Remove "${dish.name}" from the menu permanently?\n\nTo hide it temporarily instead, use "Sold out".`)) return;
    menuState.items = menuState.items.filter((i) => i.id !== id);
    if (await saveMenu()) renderMenu();
}

function renderMenu() {
    const filters = document.getElementById('menuCategoryFilters');
    filters.innerHTML = [['all', 'All']].concat(CATEGORIES).map(([v, l]) => {
        const n = v === 'all' ? menuState.items.length : menuState.items.filter((i) => i.category === v).length;
        return `<button class="filter-btn ${menuState.filter === v ? 'active' : ''}" data-cat="${v}">${l} (${n})</button>`;
    }).join('');
    filters.querySelectorAll('button').forEach((b) => {
        b.addEventListener('click', () => { menuState.filter = b.dataset.cat; renderMenu(); });
    });

    const shown = menuState.filter === 'all'
        ? menuState.items
        : menuState.items.filter((i) => i.category === menuState.filter);

    if (!shown.length) {
        dishList.innerHTML = '<p class="admin-empty">No dishes here yet.</p>';
        return;
    }

    dishList.innerHTML = shown.map((d) => {
        const price = (d.prices || []).map((p) => `${p.size} Rs.${p.price}`).join('  &middot;  ');
        const out = d.available === false;
        return `
        <article class="dish-row ${out ? 'is-out' : ''}">
            <span class="dish-dot ${esc(d.type)}"></span>
            <div class="dish-main">
                <h3>${esc(d.name)}${out ? ' <span class="dish-out-tag">Sold out</span>' : ''}</h3>
                <p>${esc(d.categoryDisplay || d.category)}</p>
                <p class="dish-price">${price}</p>
            </div>
            <div class="dish-actions">
                <button class="btn-ghost btn-sm" data-act="edit" data-id="${d.id}">Edit</button>
                <button class="btn-ghost btn-sm" data-act="toggle" data-id="${d.id}">${out ? 'Back on' : 'Sold out'}</button>
                <button class="btn-ghost btn-sm is-danger" data-act="delete" data-id="${d.id}">Delete</button>
            </div>
        </article>`;
    }).join('');

    dishList.querySelectorAll('button[data-act]').forEach((b) => {
        const id = Number(b.dataset.id);
        b.addEventListener('click', () => {
            if (b.dataset.act === 'edit') openDishForm(menuState.items.find((i) => i.id === id));
            else if (b.dataset.act === 'toggle') toggleDish(id);
            else deleteDish(id);
        });
    });
}

fillCategorySelect();
