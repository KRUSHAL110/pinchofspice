// Menu Data for Pinch of Spice
const menuData = [
    // Non-Veg Chinese Rice
    {
        id: 1,
        name: "Chicken Fried Rice",
        category: "non-veg-rice",
        categoryDisplay: "Non-Veg Chinese Rice",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&q=80",
        prices: [{ size: "Half", price: 80 }, { size: "Full", price: 160 }]
    },
    {
        id: 2,
        name: "Chicken Schezwan Rise",
        category: "non-veg-rice",
        categoryDisplay: "Non-Veg Chinese Rice",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=500&q=80",
        prices: [{ size: "Half", price: 90 }, { size: "Full", price: 180 }]
    },
    {
        id: 3,
        name: "Chicken Chilli Rise",
        category: "non-veg-rice",
        categoryDisplay: "Non-Veg Chinese Rice",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80",
        prices: [{ size: "Half", price: 130 }, { size: "Full", price: 250 }]
    },
    {
        id: 4,
        name: "Chicken Manchurian Fried Rise",
        category: "non-veg-rice",
        categoryDisplay: "Non-Veg Chinese Rice",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&q=80",
        prices: [{ size: "Half", price: 120 }, { size: "Full", price: 240 }]
    },
    {
        id: 5,
        name: "Chicken Singapuri Rise",
        category: "non-veg-rice",
        categoryDisplay: "Non-Veg Chinese Rice",
        type: "non-veg",
        image: "https://images.pexels.com/photos/2741448/pexels-photo-2741448.jpeg?auto=compress&cs=tinysrgb&w=500",
        prices: [{ size: "Half", price: 110 }, { size: "Full", price: 220 }]
    },
    {
        id: 6,
        name: "Chicken Hong Kong Rise",
        category: "non-veg-rice",
        categoryDisplay: "Non-Veg Chinese Rice",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&q=80",
        prices: [{ size: "Half", price: 110 }, { size: "Full", price: 220 }]
    },
    {
        id: 7,
        name: "Chicken Garlic Rise",
        category: "non-veg-rice",
        categoryDisplay: "Non-Veg Chinese Rice",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=500&q=80",
        prices: [{ size: "Half", price: 90 }, { size: "Full", price: 180 }]
    },
    {
        id: 8,
        name: "Chicken Garden Rise",
        category: "non-veg-rice",
        categoryDisplay: "Non-Veg Chinese Rice",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&q=80",
        prices: [{ size: "Full", price: 160 }]
    },
    {
        id: 9,
        name: "Chicken Chopper Rise",
        category: "non-veg-rice",
        categoryDisplay: "Non-Veg Chinese Rice",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&q=80",
        prices: [{ size: "Full", price: 150 }]
    },
    {
        id: 10,
        name: "Chicken Burn Garlic Rise",
        category: "non-veg-rice",
        categoryDisplay: "Non-Veg Chinese Rice",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&q=80",
        prices: [{ size: "Half", price: 90 }, { size: "Full", price: 180 }]
    },

    // Veg Chinese Rice
    {
        id: 11,
        name: "Veg Fried Rise",
        category: "veg-rice",
        categoryDisplay: "Veg Chinese Rice",
        type: "veg",
        image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500&q=80",
        prices: [{ size: "Half", price: 70 }, { size: "Full", price: 140 }]
    },
    {
        id: 12,
        name: "Veg Schezwan Rise",
        category: "veg-rice",
        categoryDisplay: "Veg Chinese Rice",
        type: "veg",
        image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&q=80",
        prices: [{ size: "Half", price: 80 }, { size: "Full", price: 160 }]
    },
    {
        id: 13,
        name: "Paneer Chilly Rise",
        category: "veg-rice",
        categoryDisplay: "Veg Chinese Rice",
        type: "veg",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80",
        prices: [{ size: "Half", price: 130 }, { size: "Full", price: 250 }]
    },
    {
        id: 14,
        name: "Veg Manchurian Fried Rise",
        category: "veg-rice",
        categoryDisplay: "Veg Chinese Rice",
        type: "veg",
        image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=500&q=80",
        prices: [{ size: "Half", price: 120 }, { size: "Full", price: 240 }]
    },
    {
        id: 15,
        name: "Paneer Fried Rise",
        category: "veg-rice",
        categoryDisplay: "Veg Chinese Rice",
        type: "veg",
        image: "https://images.unsplash.com/photo-1589301773859-01ab84f38c91?w=500&q=80",
        prices: [{ size: "Half", price: 120 }, { size: "Full", price: 240 }]
    },
    {
        id: 16,
        name: "Mushroom Fried Rise",
        category: "veg-rice",
        categoryDisplay: "Veg Chinese Rice",
        type: "veg",
        image: "https://images.unsplash.com/photo-1612874742417-2d3f0419c48e?w=500&q=80",
        prices: [{ size: "Half", price: 120 }, { size: "Full", price: 240 }]
    },

    // Non-Veg Noodles
    {
        id: 17,
        name: "Chicken Fried Noodles",
        category: "non-veg-noodles",
        categoryDisplay: "Non-Veg Noodles",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80",
        prices: [{ size: "Half", price: 80 }, { size: "Full", price: 160 }]
    },
    {
        id: 18,
        name: "Chicken Schezwan Noodles",
        category: "non-veg-noodles",
        categoryDisplay: "Non-Veg Noodles",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80",
        prices: [{ size: "Half", price: 90 }, { size: "Full", price: 180 }]
    },
    {
        id: 19,
        name: "Chicken Chilly Noodles",
        category: "non-veg-noodles",
        categoryDisplay: "Non-Veg Noodles",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&q=80",
        prices: [{ size: "Half", price: 130 }, { size: "Full", price: 250 }]
    },
    {
        id: 20,
        name: "Chicken Manchurian Noodles",
        category: "non-veg-noodles",
        categoryDisplay: "Non-Veg Noodles",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80",
        prices: [{ size: "Half", price: 120 }, { size: "Full", price: 240 }]
    },
    {
        id: 21,
        name: "Chicken Singapur Noodles",
        category: "non-veg-noodles",
        categoryDisplay: "Non-Veg Noodles",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=500&q=80",
        prices: [{ size: "Half", price: 110 }, { size: "Full", price: 220 }]
    },
    {
        id: 22,
        name: "Chicken Hong Kong Noodles",
        category: "non-veg-noodles",
        categoryDisplay: "Non-Veg Noodles",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80",
        prices: [{ size: "Half", price: 110 }, { size: "Full", price: 220 }]
    },
    {
        id: 23,
        name: "Chicken Garlic Noodles",
        category: "non-veg-noodles",
        categoryDisplay: "Non-Veg Noodles",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&q=80",
        prices: [{ size: "Half", price: 90 }, { size: "Full", price: 180 }]
    },

    // Veg Noodles
    {
        id: 24,
        name: "Veg Fried Noodles",
        category: "veg-noodles",
        categoryDisplay: "Veg Noodles",
        type: "veg",
        image: "https://images.pexels.com/photos/1907244/pexels-photo-1907244.jpeg?auto=compress&cs=tinysrgb&w=500",
        prices: [{ size: "Half", price: 70 }, { size: "Full", price: 140 }]
    },
    {
        id: 25,
        name: "Veg Schezwan Noodles",
        category: "veg-noodles",
        categoryDisplay: "Veg Noodles",
        type: "veg",
        image: "https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg?auto=compress&cs=tinysrgb&w=500",
        prices: [{ size: "Half", price: 80 }, { size: "Full", price: 160 }]
    },
    {
        id: 26,
        name: "Paneer Chilly Noodles",
        category: "veg-noodles",
        categoryDisplay: "Veg Noodles",
        type: "veg",
        image: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=500",
        prices: [{ size: "Half", price: 150 }, { size: "Full", price: 280 }]
    },
    {
        id: 27,
        name: "Veg Manchurian Noodles",
        category: "veg-noodles",
        categoryDisplay: "Veg Noodles",
        type: "veg",
        image: "https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&cs=tinysrgb&w=500",
        prices: [{ size: "Half", price: 120 }, { size: "Full", price: 240 }]
    },
    {
        id: 28,
        name: "Paneer Fried Noodles",
        category: "veg-noodles",
        categoryDisplay: "Veg Noodles",
        type: "veg",
        image: "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=500",
        prices: [{ size: "Half", price: 120 }, { size: "Full", price: 240 }]
    },
    {
        id: 29,
        name: "Mushroom Noodles",
        category: "veg-noodles",
        categoryDisplay: "Veg Noodles",
        type: "veg",
        image: "https://images.pexels.com/photos/1907244/pexels-photo-1907244.jpeg?auto=compress&cs=tinysrgb&w=500",
        prices: [{ size: "Half", price: 120 }, { size: "Full", price: 240 }]
    },
    {
        id: 30,
        name: "Paneer Tripel Noodles",
        category: "veg-noodles",
        categoryDisplay: "Veg Noodles",
        type: "veg",
        image: "https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&cs=tinysrgb&w=500",
        prices: [{ size: "Half", price: 150 }, { size: "Full", price: 280 }]
    },

    // Non-Veg Starter
    {
        id: 31,
        name: "Chicken Lollipop",
        category: "non-veg-starter",
        categoryDisplay: "Non-Veg Starter",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80",
        prices: [{ size: "Half", price: 100 }, { size: "Full", price: 200 }]
    },
    {
        id: 32,
        name: "Chicken Chilli",
        category: "non-veg-starter",
        categoryDisplay: "Non-Veg Starter",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=80",
        prices: [{ size: "Half", price: 100 }, { size: "Full", price: 200 }]
    },
    {
        id: 33,
        name: "Chicken Crispy",
        category: "non-veg-starter",
        categoryDisplay: "Non-Veg Starter",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=500&q=80",
        prices: [{ size: "Full", price: 160 }]
    },
    {
        id: 34,
        name: "Chicken Masala Lollipop",
        category: "non-veg-starter",
        categoryDisplay: "Non-Veg Starter",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80",
        prices: [{ size: "Half", price: 120 }, { size: "Full", price: 240 }]
    },
    {
        id: 35,
        name: "Chicken Garlic",
        category: "non-veg-starter",
        categoryDisplay: "Non-Veg Starter",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&q=80",
        prices: [{ size: "Full", price: 180 }]
    },
    {
        id: 36,
        name: "Chicken Peri Peri",
        category: "non-veg-starter",
        categoryDisplay: "Non-Veg Starter",
        type: "non-veg",
        image: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=500",
        prices: [{ size: "Full", price: 180 }]
    },
    {
        id: 37,
        name: "Junglee Chiken",
        category: "non-veg-starter",
        categoryDisplay: "Non-Veg Starter",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&q=80",
        prices: [{ size: "Full", price: 240 }]
    },
    {
        id: 38,
        name: "Chicken Sathe",
        category: "non-veg-starter",
        categoryDisplay: "Non-Veg Starter",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=500&q=80",
        prices: [{ size: "Full", price: 240 }]
    },

    // Veg Starter
    {
        id: 39,
        name: "Paneer Chilli",
        category: "veg-starter",
        categoryDisplay: "Veg Starter",
        type: "veg",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80",
        prices: [{ size: "Full", price: 180 }]
    },
    {
        id: 40,
        name: "Paneer Crispy",
        category: "veg-starter",
        categoryDisplay: "Veg Starter",
        type: "veg",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80",
        prices: [{ size: "Full", price: 200 }]
    },
    {
        id: 41,
        name: "Mashroom Chilli",
        category: "veg-starter",
        categoryDisplay: "Veg Starter",
        type: "veg",
        image: "https://images.unsplash.com/photo-1621188503291-e1e5fb2d2f39?w=500&q=80",
        prices: [{ size: "Full", price: 160 }]
    },
    {
        id: 42,
        name: "Veg Manchurian",
        category: "veg-starter",
        categoryDisplay: "Veg Starter",
        type: "veg",
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&q=80",
        prices: [{ size: "Full", price: 140 }]
    },
    {
        id: 43,
        name: "Paneer Sathe",
        category: "veg-starter",
        categoryDisplay: "Veg Starter",
        type: "veg",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80",
        prices: [{ size: "Full", price: 220 }]
    },
    {
        id: 44,
        name: "Paneer 65",
        category: "veg-starter",
        categoryDisplay: "Veg Starter",
        type: "veg",
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&q=80",
        prices: [{ size: "Full", price: 180 }]
    },

    // Non-Veg Soup
    {
        id: 45,
        name: "Chicken Manchow",
        category: "non-veg-soup",
        categoryDisplay: "Non-Veg Soup",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&q=80",
        prices: [{ size: "Full", price: 60 }]
    },
    {
        id: 46,
        name: "Chicken Hot & Sour",
        category: "non-veg-soup",
        categoryDisplay: "Non-Veg Soup",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&q=80",
        prices: [{ size: "Full", price: 90 }]
    },
    {
        id: 47,
        name: "Chicken Lung Fung",
        category: "non-veg-soup",
        categoryDisplay: "Non-Veg Soup",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&q=80",
        prices: [{ size: "Full", price: 90 }]
    },
    {
        id: 48,
        name: "Chicken Lemon Coriander",
        category: "non-veg-soup",
        categoryDisplay: "Non-Veg Soup",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&q=80",
        prices: [{ size: "Full", price: 110 }]
    },
    {
        id: 49,
        name: "Chicken Special Soup",
        category: "non-veg-soup",
        categoryDisplay: "Non-Veg Soup",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&q=80",
        prices: [{ size: "Full", price: 140 }]
    },

    // Veg Soup
    {
        id: 50,
        name: "Veg Manchow",
        category: "veg-soup",
        categoryDisplay: "Veg Soup",
        type: "veg",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&q=80",
        prices: [{ size: "Full", price: 60 }]
    },
    {
        id: 51,
        name: "Veg Hot & Sour",
        category: "veg-soup",
        categoryDisplay: "Veg Soup",
        type: "veg",
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&q=80",
        prices: [{ size: "Full", price: 90 }]
    },
    {
        id: 52,
        name: "Paneer Soup",
        category: "veg-soup",
        categoryDisplay: "Veg Soup",
        type: "veg",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&q=80",
        prices: [{ size: "Full", price: 100 }]
    },
    {
        id: 53,
        name: "Mashroom Soup",
        category: "veg-soup",
        categoryDisplay: "Veg Soup",
        type: "veg",
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&q=80",
        prices: [{ size: "Full", price: 100 }]
    },

    // Special Tandoor
    {
        id: 54,
        name: "Chicken Tandoor",
        category: "tandoor",
        categoryDisplay: "Special Tandoor",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=80",
        prices: [{ size: "Half", price: 180 }, { size: "Full", price: 360 }]
    },
    {
        id: 55,
        name: "Chicken Rozali Kabab",
        category: "tandoor",
        categoryDisplay: "Special Tandoor",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&q=80",
        prices: [{ size: "Full", price: 260 }]
    },
    {
        id: 56,
        name: "Chicken Seekh Kabab",
        category: "tandoor",
        categoryDisplay: "Special Tandoor",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500&q=80",
        prices: [{ size: "Full", price: 250 }]
    },
    {
        id: 57,
        name: "Chicken Afgani Tandoor",
        category: "tandoor",
        categoryDisplay: "Special Tandoor",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&q=80",
        prices: [{ size: "Half", price: 280 }, { size: "Full", price: 560 }]
    },
    {
        id: 58,
        name: "Chicken Banjara Tandoori",
        category: "tandoor",
        categoryDisplay: "Special Tandoor",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=80",
        prices: [{ size: "Half", price: 240 }, { size: "Full", price: 480 }]
    },
    {
        id: 59,
        name: "Chicken Kalmi Tangadi",
        category: "tandoor",
        categoryDisplay: "Special Tandoor",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80",
        prices: [{ size: "Full", price: 240 }]
    },
    {
        id: 60,
        name: "Tandoori Lollipop",
        category: "tandoor",
        categoryDisplay: "Special Tandoor",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80",
        prices: [{ size: "Full", price: 260 }]
    },

    // Pinch of Spice Special
    {
        id: 61,
        name: "Chicken Tangadi Rise with Mojito",
        category: "special",
        categoryDisplay: "Pinch of Spice Special",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80",
        prices: [{ size: "Full", price: 210 }]
    },
    {
        id: 62,
        name: "Chicken Rosted Fried Rise with Mojito",
        category: "special",
        categoryDisplay: "Pinch of Spice Special",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&q=80",
        prices: [{ size: "Full", price: 280 }]
    },
    {
        id: 63,
        name: "Chicken Peri Peri Tangadi Rise with Mojito",
        category: "special",
        categoryDisplay: "Pinch of Spice Special",
        type: "non-veg",
        image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=500",
        prices: [{ size: "Full", price: 260 }]
    },
    {
        id: 64,
        name: "Hotel Special Chiken with Mojito",
        category: "special",
        categoryDisplay: "Pinch of Spice Special",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=80",
        prices: [{ size: "Full", price: 290 }]
    },
    {
        id: 65,
        name: "Peri Peri Tangadi Tandoori with Mojito",
        category: "special",
        categoryDisplay: "Pinch of Spice Special",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80",
        prices: [{ size: "Full", price: 260 }]
    },
    {
        id: 66,
        name: "Thai Wings with Mojito",
        category: "special",
        categoryDisplay: "Pinch of Spice Special",
        type: "non-veg",
        image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500&q=80",
        prices: [{ size: "Full", price: 280 }]
    }
];
