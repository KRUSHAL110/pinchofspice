// Menu Data for Pinch of Spice
// Transcribed from the printed menu card. Prices in INR.
const menuData = [
    {
        id: 1,
        name: "Veg Momos",
        category: "momos",
        categoryDisplay: "Momos",
        type: "veg",
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&q=80",
        prices: [{ size: "Full", price: 90 }]
    },
    {
        id: 2,
        name: "Chicken Momos",
        category: "momos",
        categoryDisplay: "Momos",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&q=80",
        prices: [{ size: "Full", price: 100 }]
    },
    {
        id: 3,
        name: "Regular Fries",
        category: "fries",
        categoryDisplay: "Fries",
        type: "veg",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&q=80",
        prices: [{ size: "Full", price: 100 }]
    },
    {
        id: 4,
        name: "Peri-Peri Fries",
        category: "fries",
        categoryDisplay: "Fries",
        type: "veg",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&q=80",
        prices: [{ size: "Full", price: 110 }]
    },
    {
        id: 5,
        name: "Veg Manchow Soup",
        category: "veg-soup",
        categoryDisplay: "Veg Soup",
        type: "veg",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&q=80",
        prices: [{ size: "Half", price: 50 }, { size: "Full", price: 100 }]
    },
    {
        id: 6,
        name: "Veg Hot & Sour Soup",
        category: "veg-soup",
        categoryDisplay: "Veg Soup",
        type: "veg",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&q=80",
        prices: [{ size: "Half", price: 90 }, { size: "Full", price: 150 }]
    },
    {
        id: 7,
        name: "Paneer Soup",
        category: "veg-soup",
        categoryDisplay: "Veg Soup",
        type: "veg",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&q=80",
        prices: [{ size: "Half", price: 100 }, { size: "Full", price: 180 }]
    },
    {
        id: 8,
        name: "Chicken Manchow Soup",
        category: "non-veg-soup",
        categoryDisplay: "Chicken Soup",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=500&q=80",
        prices: [{ size: "Half", price: 60 }, { size: "Full", price: 120 }]
    },
    {
        id: 9,
        name: "Chicken Hot & Sour Soup",
        category: "non-veg-soup",
        categoryDisplay: "Chicken Soup",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=500&q=80",
        prices: [{ size: "Half", price: 90 }, { size: "Full", price: 180 }]
    },
    {
        id: 10,
        name: "Chicken Lung Fung Soup",
        category: "non-veg-soup",
        categoryDisplay: "Chicken Soup",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=500&q=80",
        prices: [{ size: "Half", price: 90 }, { size: "Full", price: 180 }]
    },
    {
        id: 11,
        name: "Chicken Lemon Coriander Soup",
        category: "non-veg-soup",
        categoryDisplay: "Chicken Soup",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=500&q=80",
        prices: [{ size: "Half", price: 110 }, { size: "Full", price: 200 }]
    },
    {
        id: 12,
        name: "Chicken Special Soup",
        category: "non-veg-soup",
        categoryDisplay: "Chicken Soup",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=500&q=80",
        prices: [{ size: "Half", price: 80 }, { size: "Full", price: 160 }]
    },
    {
        id: 13,
        name: "Paneer Chilli",
        category: "veg-starter",
        categoryDisplay: "Veg Starters",
        type: "veg",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80",
        prices: [{ size: "Full", price: 200 }]
    },
    {
        id: 14,
        name: "Paneer Crispy",
        category: "veg-starter",
        categoryDisplay: "Veg Starters",
        type: "veg",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80",
        prices: [{ size: "Full", price: 220 }]
    },
    {
        id: 15,
        name: "Paneer 65",
        category: "veg-starter",
        categoryDisplay: "Veg Starters",
        type: "veg",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80",
        prices: [{ size: "Full", price: 200 }]
    },
    {
        id: 16,
        name: "Mushroom Chilli",
        category: "veg-starter",
        categoryDisplay: "Veg Starters",
        type: "veg",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80",
        prices: [{ size: "Full", price: 180 }]
    },
    {
        id: 17,
        name: "Veg Manchurian",
        category: "veg-starter",
        categoryDisplay: "Veg Starters",
        type: "veg",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80",
        prices: [{ size: "Half", price: 80 }, { size: "Full", price: 160 }]
    },
    {
        id: 18,
        name: "Chinese Bhel",
        category: "veg-starter",
        categoryDisplay: "Veg Starters",
        type: "veg",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80",
        prices: [{ size: "Full", price: 90 }]
    },
    {
        id: 19,
        name: "Chicken Lollipop",
        category: "non-veg-starter",
        categoryDisplay: "Non-Veg Starters",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80",
        prices: [{ size: "Half", price: 110 }, { size: "Full", price: 220 }]
    },
    {
        id: 20,
        name: "Chicken Chilli",
        category: "non-veg-starter",
        categoryDisplay: "Non-Veg Starters",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80",
        prices: [{ size: "Half", price: 110 }, { size: "Full", price: 220 }]
    },
    {
        id: 21,
        name: "Chicken Crispy",
        category: "non-veg-starter",
        categoryDisplay: "Non-Veg Starters",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80",
        prices: [{ size: "Full", price: 180 }]
    },
    {
        id: 22,
        name: "Chicken Masala Lollipop",
        category: "non-veg-starter",
        categoryDisplay: "Non-Veg Starters",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80",
        prices: [{ size: "Half", price: 130 }, { size: "Full", price: 260 }]
    },
    {
        id: 23,
        name: "Chicken Garlic",
        category: "non-veg-starter",
        categoryDisplay: "Non-Veg Starters",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80",
        prices: [{ size: "Full", price: 180 }]
    },
    {
        id: 24,
        name: "Chicken Peri-Peri",
        category: "non-veg-starter",
        categoryDisplay: "Non-Veg Starters",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80",
        prices: [{ size: "Full", price: 180 }]
    },
    {
        id: 25,
        name: "Chicken Steak",
        category: "non-veg-starter",
        categoryDisplay: "Non-Veg Starters",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80",
        prices: [{ size: "Full", price: 220 }]
    },
    {
        id: 26,
        name: "Chicken Chinese Bhel",
        category: "non-veg-starter",
        categoryDisplay: "Non-Veg Starters",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80",
        prices: [{ size: "Full", price: 100 }]
    },
    {
        id: 27,
        name: "Veg Hakka Noodles",
        category: "veg-noodles",
        categoryDisplay: "Veg Noodles",
        type: "veg",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80",
        prices: [{ size: "Half", price: 80 }, { size: "Full", price: 160 }]
    },
    {
        id: 28,
        name: "Veg Schezwan Noodles",
        category: "veg-noodles",
        categoryDisplay: "Veg Noodles",
        type: "veg",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80",
        prices: [{ size: "Half", price: 90 }, { size: "Full", price: 180 }]
    },
    {
        id: 29,
        name: "Paneer Chilli Noodles",
        category: "veg-noodles",
        categoryDisplay: "Veg Noodles",
        type: "veg",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80",
        prices: [{ size: "Half", price: 160 }, { size: "Full", price: 300 }]
    },
    {
        id: 30,
        name: "Veg Manchurian Noodles",
        category: "veg-noodles",
        categoryDisplay: "Veg Noodles",
        type: "veg",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80",
        prices: [{ size: "Half", price: 130 }, { size: "Full", price: 260 }]
    },
    {
        id: 31,
        name: "Paneer Hakka Noodles",
        category: "veg-noodles",
        categoryDisplay: "Veg Noodles",
        type: "veg",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80",
        prices: [{ size: "Half", price: 120 }, { size: "Full", price: 240 }]
    },
    {
        id: 32,
        name: "Paneer Triple Noodles",
        category: "veg-noodles",
        categoryDisplay: "Veg Noodles",
        type: "veg",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80",
        prices: [{ size: "Half", price: 150 }, { size: "Full", price: 280 }]
    },
    {
        id: 33,
        name: "Veg Triple Noodles",
        category: "veg-noodles",
        categoryDisplay: "Veg Noodles",
        type: "veg",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80",
        prices: [{ size: "Half", price: 130 }, { size: "Full", price: 260 }]
    },
    {
        id: 34,
        name: "Chicken Hakka Noodles",
        category: "non-veg-noodles",
        categoryDisplay: "Non-Veg Noodles",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=500&q=80",
        prices: [{ size: "Half", price: 90 }, { size: "Full", price: 180 }]
    },
    {
        id: 35,
        name: "Chicken Schezwan Noodles",
        category: "non-veg-noodles",
        categoryDisplay: "Non-Veg Noodles",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=500&q=80",
        prices: [{ size: "Half", price: 100 }, { size: "Full", price: 200 }]
    },
    {
        id: 36,
        name: "Chicken Chilli Noodles",
        category: "non-veg-noodles",
        categoryDisplay: "Non-Veg Noodles",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=500&q=80",
        prices: [{ size: "Half", price: 140 }, { size: "Full", price: 260 }]
    },
    {
        id: 37,
        name: "Chicken Manchurian Noodles",
        category: "non-veg-noodles",
        categoryDisplay: "Non-Veg Noodles",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=500&q=80",
        prices: [{ size: "Half", price: 130 }, { size: "Full", price: 260 }]
    },
    {
        id: 38,
        name: "Chicken Singapore Noodles",
        category: "non-veg-noodles",
        categoryDisplay: "Non-Veg Noodles",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=500&q=80",
        prices: [{ size: "Half", price: 120 }, { size: "Full", price: 240 }]
    },
    {
        id: 39,
        name: "Chicken Hong Kong Noodles",
        category: "non-veg-noodles",
        categoryDisplay: "Non-Veg Noodles",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=500&q=80",
        prices: [{ size: "Half", price: 120 }, { size: "Full", price: 240 }]
    },
    {
        id: 40,
        name: "Chicken Garlic Noodles",
        category: "non-veg-noodles",
        categoryDisplay: "Non-Veg Noodles",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=500&q=80",
        prices: [{ size: "Half", price: 100 }, { size: "Full", price: 200 }]
    },
    {
        id: 41,
        name: "Chicken Triple Noodles",
        category: "non-veg-noodles",
        categoryDisplay: "Non-Veg Noodles",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=500&q=80",
        prices: [{ size: "Half", price: 140 }, { size: "Full", price: 260 }]
    },
    {
        id: 42,
        name: "Veg Fried Rice",
        category: "veg-rice",
        categoryDisplay: "Veg Rice",
        type: "veg",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&q=80",
        prices: [{ size: "Half", price: 80 }, { size: "Full", price: 160 }]
    },
    {
        id: 43,
        name: "Veg Schezwan Fried Rice",
        category: "veg-rice",
        categoryDisplay: "Veg Rice",
        type: "veg",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&q=80",
        prices: [{ size: "Half", price: 90 }, { size: "Full", price: 180 }]
    },
    {
        id: 44,
        name: "Paneer Chilli Fried Rice",
        category: "veg-rice",
        categoryDisplay: "Veg Rice",
        type: "veg",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&q=80",
        prices: [{ size: "Half", price: 160 }, { size: "Full", price: 300 }]
    },
    {
        id: 45,
        name: "Veg Manchurian Fried Rice",
        category: "veg-rice",
        categoryDisplay: "Veg Rice",
        type: "veg",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&q=80",
        prices: [{ size: "Half", price: 130 }, { size: "Full", price: 260 }]
    },
    {
        id: 46,
        name: "Paneer Fried Rice",
        category: "veg-rice",
        categoryDisplay: "Veg Rice",
        type: "veg",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&q=80",
        prices: [{ size: "Half", price: 120 }, { size: "Full", price: 240 }]
    },
    {
        id: 47,
        name: "Veg Triple Rice",
        category: "veg-rice",
        categoryDisplay: "Veg Rice",
        type: "veg",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&q=80",
        prices: [{ size: "Half", price: 130 }, { size: "Full", price: 260 }]
    },
    {
        id: 48,
        name: "Chicken Fried Rice",
        category: "non-veg-rice",
        categoryDisplay: "Non-Veg Rice",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=500&q=80",
        prices: [{ size: "Half", price: 90 }, { size: "Full", price: 180 }]
    },
    {
        id: 49,
        name: "Chicken Schezwan Fried Rice",
        category: "non-veg-rice",
        categoryDisplay: "Non-Veg Rice",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=500&q=80",
        prices: [{ size: "Half", price: 100 }, { size: "Full", price: 200 }]
    },
    {
        id: 50,
        name: "Chicken Garlic Fried Rice",
        category: "non-veg-rice",
        categoryDisplay: "Non-Veg Rice",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=500&q=80",
        prices: [{ size: "Half", price: 100 }, { size: "Full", price: 200 }]
    },
    {
        id: 51,
        name: "Chicken Singapore Fried Rice",
        category: "non-veg-rice",
        categoryDisplay: "Non-Veg Rice",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=500&q=80",
        prices: [{ size: "Half", price: 120 }, { size: "Full", price: 240 }]
    },
    {
        id: 52,
        name: "Chicken Hong Kong Fried Rice",
        category: "non-veg-rice",
        categoryDisplay: "Non-Veg Rice",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=500&q=80",
        prices: [{ size: "Half", price: 120 }, { size: "Full", price: 240 }]
    },
    {
        id: 53,
        name: "Chicken Chilli Fried Rice",
        category: "non-veg-rice",
        categoryDisplay: "Non-Veg Rice",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=500&q=80",
        prices: [{ size: "Half", price: 140 }, { size: "Full", price: 260 }]
    },
    {
        id: 54,
        name: "Chicken Manchurian Fried Rice",
        category: "non-veg-rice",
        categoryDisplay: "Non-Veg Rice",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=500&q=80",
        prices: [{ size: "Half", price: 130 }, { size: "Full", price: 260 }]
    },
    {
        id: 55,
        name: "Chicken Garden Fried Rice",
        category: "non-veg-rice",
        categoryDisplay: "Non-Veg Rice",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=500&q=80",
        prices: [{ size: "Half", price: 160 }, { size: "Full", price: 300 }]
    },
    {
        id: 56,
        name: "Chicken Chopper Fried Rice",
        category: "non-veg-rice",
        categoryDisplay: "Non-Veg Rice",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=500&q=80",
        prices: [{ size: "Half", price: 150 }, { size: "Full", price: 290 }]
    },
    {
        id: 57,
        name: "Golden Rice",
        category: "non-veg-rice",
        categoryDisplay: "Non-Veg Rice",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=500&q=80",
        prices: [{ size: "Half", price: 160 }, { size: "Full", price: 300 }]
    },
    {
        id: 58,
        name: "Thousand Rice",
        category: "non-veg-rice",
        categoryDisplay: "Non-Veg Rice",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=500&q=80",
        prices: [{ size: "Half", price: 160 }, { size: "Full", price: 300 }]
    },
    {
        id: 59,
        name: "Tangdi Rice",
        category: "non-veg-rice",
        categoryDisplay: "Non-Veg Rice",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=500&q=80",
        prices: [{ size: "Full", price: 210 }]
    }
];

// Expose for the Firestore menu loader's offline fallback
window.menuData = menuData;
