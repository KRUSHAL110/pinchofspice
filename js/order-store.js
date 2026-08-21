// Saves each order to Firestore so the admin dashboard can show it.
// Loaded as a module; exposes window.saveOrder for the main script.
//
// Deliberately fail-soft: if Firebase is misconfigured or offline, the
// customer must still be able to send their order over WhatsApp.

import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js';
import {
    getFirestore, collection, addDoc, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js';
import { firebaseConfig, FIREBASE_NOT_CONFIGURED } from './firebase-config.js';

let db = null;

if (!FIREBASE_NOT_CONFIGURED) {
    try {
        db = getFirestore(initializeApp(firebaseConfig));
    } catch (err) {
        console.error('[orders] Firebase failed to start:', err);
    }
}

// Keep the ids of this device's own orders so the tracking page can show them
function rememberOrder(id, orderRef) {
    try {
        const KEY = 'pos_my_orders';
        const prev = JSON.parse(localStorage.getItem(KEY) || '[]');
        const next = [{ id, ref: orderRef, at: Date.now() }, ...(Array.isArray(prev) ? prev : [])].slice(0, 20);
        localStorage.setItem(KEY, JSON.stringify(next));
    } catch (err) {
        console.warn('[orders] could not remember this order locally', err);
    }
}

window.saveOrder = async function saveOrder(order, orderRef, paymentId) {
    if (!db) return null;
    try {
        const docRef = await addDoc(collection(db, 'orders'), {
            orderRef: orderRef,
            customer: {
                name: order.customer.name,
                phone: order.customer.phone,
                address: order.customer.address,
                specialInstructions: order.customer.specialInstructions || ''
            },
            items: order.items.map((i) => ({
                name: i.name,
                size: i.size,
                price: i.price,
                quantity: i.quantity
            })),
            total: order.total,
            paymentMethod: order.paymentMethod,
            status: 'pending',
            paymentId: paymentId || '',
            createdAt: serverTimestamp()
        });
        rememberOrder(docRef.id, orderRef);
        return docRef.id;
    } catch (err) {
        // Never block the customer on this
        console.error('[orders] could not save order:', err);
        return null;
    }
};
