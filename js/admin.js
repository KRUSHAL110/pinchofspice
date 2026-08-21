import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js';
import {
    getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js';
import {
    getFirestore, collection, query, orderBy, onSnapshot, doc, updateDoc, serverTimestamp
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
        showError(wrong.includes(err.code)
            ? 'Wrong email or password.'
            : `Could not sign in: ${err.code || err.message}`);
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
        connState.textContent = `Connection problem: ${err.code}`;
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
