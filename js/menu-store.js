// Loads the menu from Firestore so the admin can edit it without a redeploy.
//
// The whole menu lives in a single document (menu/current), so a visitor costs
// one read rather than one per dish. If Firestore is unreachable, or the menu
// has never been published, we fall back to the bundled menu-data.js so the
// restaurant is never left with an empty menu.

import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js';
import { firebaseConfig, FIREBASE_NOT_CONFIGURED } from './firebase-config.js';

// Below this many dishes we assume the saved menu is a mistake, not a real menu
const MIN_REAL_MENU = 5;

function bundledMenu() {
    return Array.isArray(window.menuData) ? window.menuData : [];
}

async function loadMenu() {
    if (FIREBASE_NOT_CONFIGURED) return { items: bundledMenu(), source: 'bundled' };

    try {
        const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
        const snap = await getDoc(doc(getFirestore(app), 'menu', 'current'));

        if (snap.exists()) {
            const items = snap.data().items;
            const live = Array.isArray(items) ? items.filter((i) => i.available !== false) : [];

            // A near-empty saved menu almost always means a mistake in the admin
            // panel, not a genuinely tiny menu. Merge the bundled dishes in rather
            // than showing customers a one-item restaurant.
            if (live.length >= MIN_REAL_MENU) {
                return { items, source: 'firestore' };
            }
            if (live.length) {
                const names = new Set(live.map((i) => String(i.name).trim().toLowerCase()));
                const extra = bundledMenu().filter((b) => !names.has(String(b.name).trim().toLowerCase()));
                console.warn(`[menu] only ${live.length} saved dishes - showing the bundled menu alongside them`);
                return { items: live.concat(extra), source: 'firestore + bundled' };
            }
        }
    } catch (err) {
        console.warn('[menu] falling back to the bundled menu:', err);
    }
    return { items: bundledMenu(), source: 'bundled' };
}

// script.js waits on this before rendering
window.menuReady = loadMenu().then(({ items, source }) => {
    // Only show dishes the kitchen has marked available
    window.menuData = items.filter((i) => i.available !== false);
    console.info(`[menu] ${window.menuData.length} dishes loaded from ${source}`);
    return window.menuData;
});
