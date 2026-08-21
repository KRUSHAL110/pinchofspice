// Customer-facing order tracking.
//
// Order ids are kept in this browser's localStorage when the order is placed,
// so a customer sees their own orders without ever signing in. The rules allow
// reading a single order by id but not listing them, so one customer can never
// see another's.

import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js';
import { getFirestore, doc, onSnapshot, getDoc } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js';
import { firebaseConfig, FIREBASE_NOT_CONFIGURED } from './firebase-config.js';

const STORE_KEY = 'pos_my_orders';
const listEl = document.getElementById('trackList');

const STEPS = [
    { key: 'pending', label: 'Order received', note: 'We have your order and will confirm shortly.' },
    { key: 'preparing', label: 'Being prepared', note: 'Your food is being cooked fresh.' },
    { key: 'delivered', label: 'Delivered', note: 'Enjoy your meal!' }
];

function savedOrders() {
    let list = [];
    try {
        const raw = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
        list = Array.isArray(raw) ? raw.slice(0, 20) : [];
    } catch {
        list = [];
    }

    // A ?id= link opens that order even if this browser has no record of it,
    // so a customer can follow their order on a different device.
    const wanted = new URLSearchParams(location.search).get('id');
    if (wanted && !list.some((e) => e.id === wanted)) {
        list = [{ id: wanted, ref: 'Your order', at: Date.now() }, ...list];
    }
    return list;
}

// Roughly how long the kitchen says an order takes
const PREP_MINUTES = 45;

function placedAt(data) {
    const ts = data?.createdAt;
    if (!ts) return null;
    return typeof ts.toDate === 'function' ? ts.toDate() : new Date(ts);
}

function timingLine(data) {
    const placed = placedAt(data);
    if (!placed) return '';
    const clock = placed.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    const mins = Math.max(0, Math.floor((Date.now() - placed.getTime()) / 60000));

    if (data.status === 'delivered') {
        return `<p class="track-timing">Ordered at ${clock} &middot; delivered</p>`;
    }
    if (data.status === 'cancelled') {
        return `<p class="track-timing">Ordered at ${clock}</p>`;
    }

    const eta = new Date(placed.getTime() + PREP_MINUTES * 60000);
    const etaClock = eta.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    const late = Date.now() > eta.getTime();
    return `<p class="track-timing${late ? ' is-late' : ''}">
        Ordered at ${clock} &middot; ${mins} min ago<br>
        ${late
            ? `Running a little late &mdash; call <a href="tel:8451876111">8451876111</a> if you need an update.`
            : `Expected by about <strong>${etaClock}</strong>`}
    </p>`;
}

function esc(v) {
    return String(v ?? '').replace(/[&<>"']/g, (c) => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
}

function stepsHtml(status) {
    if (status === 'cancelled') {
        return `<div class="track-cancelled">
            <strong>This order was cancelled.</strong>
            <p>If that wasn't expected, call us on <a href="tel:8451876111">8451876111</a>.</p>
        </div>`;
    }
    const current = STEPS.findIndex((s) => s.key === status);
    return `<ol class="track-steps">${STEPS.map((s, i) => {
        const state = i < current ? 'done' : i === current ? 'now' : 'todo';
        return `<li class="track-step is-${state}">
            <span class="track-bullet">${i < current ? '&#10003;' : i + 1}</span>
            <div>
                <strong>${s.label}</strong>
                ${i === current ? `<p>${s.note}</p>` : ''}
            </div>
        </li>`;
    }).join('')}</ol>`;
}

function cardHtml(entry, data, isHistory) {
    if (!data) {
        return `<article class="track-card is-missing">
            <h2>${esc(entry.ref)}</h2>
            <p class="track-note">We couldn't find this order. If you just placed it, give it a moment.</p>
        </article>`;
    }
    const items = (data.items || []).map((it) =>
        `<li><span>${esc(it.name)} <em>(${esc(it.size)})</em> &times;${esc(it.quantity)}</span>
             <span>Rs.${esc((it.price || 0) * (it.quantity || 0))}</span></li>`).join('');

    return `<article class="track-card status-${esc(data.status)}">
        <header>
            <div>
                <h2>${esc(data.orderRef || entry.ref)}</h2>
                <p class="track-note">${esc(data.customer?.address || '')}</p>
            </div>
            <span class="track-pill">${esc(data.status)}</span>
        </header>
        ${timingLine(data)}
        ${isHistory ? '' : stepsHtml(data.status)}
        <ul class="track-items">${items}</ul>
        <footer>
            <span>Total</span>
            <strong>Rs.${esc(data.total)}</strong>
        </footer>
        ${data.paymentId ? `<p class="track-paid">&#10003; Paid &middot; ${esc(data.paymentId)}</p>` : ''}
        ${isHistory && data.status !== 'cancelled'
            ? `<button class="btn btn-primary btn-reorder" data-reorder="${esc(entry.id)}">Order this again</button>`
            : ''}
    </article>`;
}

const ACTIVE = ['pending', 'preparing'];

function render(entries, byId) {
    if (!entries.length) {
        listEl.innerHTML = `<div class="track-empty">
            <p>You haven't placed an order from this device yet.</p>
            <a class="btn btn-primary" href="../index.html#menu">Browse the menu</a>
        </div>`;
        return;
    }

    // Anything still cooking goes on top; everything else becomes history.
    const active = [];
    const past = [];
    entries.forEach((e) => {
        const data = byId[e.id];
        // Unknown (still loading, or missing) is treated as active so it stays visible
        if (!data || ACTIVE.includes(data.status)) active.push(e);
        else past.push(e);
    });

    past.sort((a, b) => {
        const da = placedAt(byId[a.id])?.getTime() ?? a.at ?? 0;
        const db2 = placedAt(byId[b.id])?.getTime() ?? b.at ?? 0;
        return db2 - da;
    });

    const spent = past.reduce((sum, e) => {
        const d = byId[e.id];
        return sum + (d && d.status !== 'cancelled' ? Number(d.total) || 0 : 0);
    }, 0);

    let html = '';

    if (active.length) {
        html += `<h2 class="track-section">Happening now</h2>`;
        html += active.map((e) => cardHtml(e, byId[e.id])).join('');
    }

    if (past.length) {
        html += `<div class="track-history-head">
            <h2 class="track-section">Order history</h2>
            <span class="track-history-meta">${past.length} order${past.length > 1 ? 's' : ''}${spent ? ` &middot; Rs.${spent} spent` : ''}</span>
        </div>`;
        html += past.map((e) => cardHtml(e, byId[e.id], true)).join('');
    }

    listEl.innerHTML = html;

    listEl.querySelectorAll('[data-reorder]').forEach((btn) => {
        btn.addEventListener('click', () => reorder(byId[btn.dataset.reorder]));
    });
}

// Current menu, used so re-ordering never charges yesterday's price
let currentMenu = [];

async function loadCurrentMenu(db) {
    try {
        const snap = await getDoc(doc(db, 'menu', 'current'));
        if (snap.exists() && Array.isArray(snap.data().items)) {
            currentMenu = snap.data().items.filter((i) => i.available !== false);
        }
    } catch (err) {
        console.warn('[track] could not load the menu for re-ordering', err);
    }
}

// Put a previous order's items back into the cart, at today's prices
function reorder(data) {
    if (!data || !Array.isArray(data.items)) return;

    const matched = [];
    const gone = [];

    data.items.forEach((it) => {
        const dish = currentMenu.find(
            (d) => String(d.name).trim().toLowerCase() === String(it.name).trim().toLowerCase()
        );
        const price = dish?.prices?.find((p) => p.size === it.size);

        if (!dish || !price) {
            gone.push(it.name);
            return;
        }
        matched.push({
            id: dish.id,
            name: dish.name,
            category: dish.categoryDisplay || dish.category,
            type: dish.type,
            size: price.size,
            price: price.price,
            quantity: it.quantity
        });
    });

    if (!matched.length) {
        alert('Sorry, none of those dishes are on the menu right now.');
        return;
    }
    if (gone.length) {
        alert(`These are no longer available and were left out:\n\n${gone.join('\n')}`);
    }

    try {
        const raw = JSON.parse(localStorage.getItem('cart') || '[]');
        const next = Array.isArray(raw) ? raw.slice() : [];
        matched.forEach((m) => {
            const found = next.find((c) => c.name === m.name && c.size === m.size);
            if (found) found.quantity += m.quantity;
            else next.push(m);
        });
        localStorage.setItem('cart', JSON.stringify(next));
        location.href = '../index.html#menu';
    } catch (err) {
        console.warn('[track] could not reorder', err);
    }
}

function start() {
    const entries = savedOrders();
    if (FIREBASE_NOT_CONFIGURED || !entries.length) {
        render(entries, {});
        return;
    }

    const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const byId = {};

    window.__trackRerender = () => render(entries, byId);
    render(entries, byId);
    loadCurrentMenu(db);

    // Live: the card updates itself the moment the kitchen changes the status
    entries.forEach((entry) => {
        onSnapshot(doc(db, 'orders', entry.id), (snap) => {
            byId[entry.id] = snap.exists() ? snap.data() : null;
            render(entries, byId);
        }, (err) => {
            console.warn('[track] could not watch order', entry.id, err.code);
        });
    });
}

start();

// Keep "x min ago" and the late warning honest without hammering the database
setInterval(() => {
    if (typeof window.__trackRerender === 'function') window.__trackRerender();
}, 60000);
