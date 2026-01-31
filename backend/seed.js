const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Product = require('./models/Product');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

const sampleProducts = [
    {
        name: 'Chocolate Truffle Cake',
        description: 'Rich and decadent chocolate truffle cake with layers of chocolate ganache. Perfect for chocolate lovers!',
        price: 599,
        category: 'Cakes',
        imageURL: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
        isAvailable: true
    },
    {
        name: 'Red Velvet Cake',
        description: 'Classic red velvet cake with cream cheese frosting. Moist, fluffy, and absolutely delicious.',
        price: 649,
        category: 'Cakes',
        imageURL: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=400',
        isAvailable: true
    },
    {
        name: 'Butter Croissant',
        description: 'Freshly baked French butter croissant. Flaky, buttery, and perfect with your morning coffee.',
        price: 89,
        category: 'Pastries',
        imageURL: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
        isAvailable: true
    },
    {
        name: 'Chocolate Chip Cookies',
        description: 'Homemade chocolate chip cookies with premium chocolate chunks. Soft, chewy, and irresistible. Pack of 6.',
        price: 149,
        category: 'Cookies',
        imageURL: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400',
        isAvailable: true
    },
    {
        name: 'Vanilla Cupcake',
        description: 'Fluffy vanilla cupcake with buttercream frosting and rainbow sprinkles. Pack of 4.',
        price: 199,
        category: 'Cupcakes',
        imageURL: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=400',
        isAvailable: true
    },
    {
        name: 'Sourdough Bread',
        description: 'Artisan sourdough bread with crispy crust and soft interior. Made with our 50-year-old starter.',
        price: 179,
        category: 'Breads',
        imageURL: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=400',
        isAvailable: true
    },
    {
        name: 'Tiramisu',
        description: 'Classic Italian tiramisu with layers of coffee-soaked ladyfingers and mascarpone cream.',
        price: 349,
        category: 'Desserts',
        imageURL: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
        isAvailable: true
    },
    {
        name: 'Wedding Cake (Custom)',
        description: 'Beautiful 3-tier wedding cake. Custom flavors and designs available. Price for vanilla base.',
        price: 4999,
        category: 'Special',
        imageURL: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400',
        isAvailable: true
    },
    {
        name: 'Blueberry Muffin',
        description: 'Fresh blueberry muffins made with real blueberries. Perfect for breakfast. Pack of 4.',
        price: 169,
        category: 'Pastries',
        imageURL: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400',
        isAvailable: true
    },
    {
        name: 'Cinnamon Roll',
        description: 'Warm cinnamon roll with cream cheese glaze. Soft, gooey, and absolutely heavenly.',
        price: 129,
        category: 'Pastries',
        imageURL: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400',
        isAvailable: true
    },
    {
        name: 'Fruit Tart',
        description: 'Fresh fruit tart with custard cream and glazed seasonal fruits on a buttery crust.',
        price: 299,
        category: 'Desserts',
        imageURL: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
        isAvailable: true
    },
    {
        name: 'Garlic Bread',
        description: 'Freshly baked garlic bread with herbs and butter. Perfect side for pasta or soup.',
        price: 99,
        category: 'Breads',
        imageURL: 'https://images.unsplash.com/photo-1573140401552-3fab0b24306f?w=400',
        isAvailable: true
    }
];

const seedDatabase = async () => {
    await connectDB();

    try {
        // Clear existing data
        await User.deleteMany({});
        await Product.deleteMany({});
        console.log('Cleared existing data');

        // Create admin user
        const adminPassword = await bcrypt.hash('admin123', 10);
        const admin = await User.create({
            mobileNumber: '9999999999',
            password: adminPassword,
            role: 'admin'
        });
        console.log('Admin user created:');
        console.log('  Mobile: 9999999999');
        console.log('  Password: admin123');

        // Create test user
        const userPassword = await bcrypt.hash('user123', 10);
        await User.create({
            mobileNumber: '8888888888',
            password: userPassword,
            role: 'user'
        });
        console.log('Test user created:');
        console.log('  Mobile: 8888888888');
        console.log('  Password: user123');

        // Create sample products
        await Product.insertMany(sampleProducts);
        console.log(`${sampleProducts.length} sample products created`);

        console.log('\n✅ Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
