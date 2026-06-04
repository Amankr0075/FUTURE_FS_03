const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');
const MenuItem = require('./models/MenuItem');

// Load environment variables
dotenv.config();

// Configure custom DNS servers to resolve MongoDB Atlas SRV records correctly
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (dnsErr) {
  console.warn('⚠️ Custom DNS servers could not be set:', dnsErr.message);
}

const menuItems = [
  // ── Starters ────────────────────────────────────────────────
  {
    name: 'Paneer Tikka',
    description: 'Succulent cottage cheese marinated in aromatic spices, char-grilled to perfection in a tandoor. Served with mint chutney.',
    price: 349,
    category: 'Starters',
    image: '/images/paneer_tikka.png',
    isPopular: true,
    isAvailable: true,
    isVeg: true,
  },
  {
    name: 'Veg Spring Roll',
    description: 'Crispy golden rolls stuffed with seasoned vegetables, glass noodles, and aromatic herbs. Served with sweet chilli dip.',
    price: 249,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop',
    isPopular: false,
    isAvailable: true,
    isVeg: true,
  },
  {
    name: 'Chicken Wings',
    description: 'Smoky, spice-rubbed chicken wings grilled in the tandoor, tossed in our signature royal masala. Served with blue cheese dip.',
    price: 429,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&auto=format&fit=crop',
    isPopular: true,
    isAvailable: true,
    isVeg: false,
  },
  {
    name: 'Dal Soup',
    description: 'Slow-simmered yellow lentil soup with cumin-infused ghee tempering, fresh ginger and a squeeze of lime.',
    price: 199,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop',
    isPopular: false,
    isAvailable: true,
    isVeg: true,
  },
  {
    name: 'Seekh Kebab',
    description: 'Minced lamb kneaded with raw papaya, garam masala, and caramelised onion, skewered and chargrilled over live coals.',
    price: 499,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&auto=format&fit=crop',
    isPopular: true,
    isAvailable: true,
    isVeg: false,
  },

  // ── Main Course ──────────────────────────────────────────────
  {
    name: 'Butter Chicken',
    description: 'Tender chicken in a rich, velvety tomato-cream sauce infused with kasuri methi and aromatic spices. A timeless classic.',
    price: 529,
    category: 'Main Course',
    image: '/images/butter_chicken.png',
    isPopular: true,
    isAvailable: true,
    isVeg: false,
  },
  {
    name: 'Dal Makhani',
    description: 'Black lentils and kidney beans slow-cooked overnight in a buttery tomato gravy. Finished with cream and smoked butter.',
    price: 389,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop',
    isPopular: true,
    isAvailable: true,
    isVeg: true,
  },
  {
    name: 'Paneer Butter Masala',
    description: 'Fresh cottage cheese cubes in a lush, mildly spiced onion-tomato gravy. Finished with cream and garnished with cilantro.',
    price: 419,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&auto=format&fit=crop',
    isPopular: false,
    isAvailable: true,
    isVeg: true,
  },
  {
    name: 'Lamb Rogan Josh',
    description: 'Slow-braised Kashmiri lamb in a boldly spiced gravy with whole spices, dried red chillis and a deep, dark sauce.',
    price: 649,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&auto=format&fit=crop',
    isPopular: false,
    isAvailable: true,
    isVeg: false,
  },
  {
    name: 'Palak Paneer',
    description: 'Creamy puréed spinach sauce studded with fresh paneer cubes, tempered with cumin and finished with homemade cream.',
    price: 389,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop',
    isPopular: false,
    isAvailable: true,
    isVeg: true,
  },

  // ── Biryani ─────────────────────────────────────────────────
  {
    name: 'Veg Biryani',
    description: 'Fragrant basmati rice dum-cooked with seasonal vegetables, saffron, and whole spices. Served with raita and mirchi salan.',
    price: 399,
    category: 'Biryani',
    image: '/images/biryani.png',
    isPopular: true,
    isAvailable: true,
    isVeg: true,
  },
  {
    name: 'Chicken Biryani',
    description: 'Hyderabadi-style dum biryani with marinated chicken, golden fried onions, saffron milk, and fragrant long-grain basmati.',
    price: 499,
    category: 'Biryani',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop',
    isPopular: true,
    isAvailable: true,
    isVeg: false,
  },
  {
    name: 'Mutton Biryani',
    description: 'Tender slow-cooked mutton layered with kewra-scented basmati, caramelised onions, and royal saffron. Sealed and dum-cooked.',
    price: 649,
    category: 'Biryani',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop',
    isPopular: false,
    isAvailable: true,
    isVeg: false,
  },

  // ── Tandoori / Other Main Courses ────────────────────────────
  {
    name: 'Tandoori Chicken',
    description: 'Whole chicken marinated in yoghurt, lemon and a royal blend of spices, roasted in our clay tandoor at high heat for a smoky char.',
    price: 579,
    category: 'Main Course',
    image: '/images/tandoori_chicken.png',
    isPopular: true,
    isAvailable: true,
    isVeg: false,
  },
  {
    name: 'Royal Special Thali',
    description: 'A royal feast on one plate — dal makhani, paneer curry, seasonal vegetable, rice, assorted breads, raita, pickle, and dessert.',
    price: 699,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&auto=format&fit=crop',
    isPopular: true,
    isAvailable: true,
    isVeg: true,
  },

  // ── Breads ───────────────────────────────────────────────────
  {
    name: 'Butter Naan',
    description: 'Soft leavened flatbread baked in the tandoor, generously brushed with fresh white butter and garnished with nigella seeds.',
    price: 69,
    category: 'Breads',
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600&auto=format&fit=crop',
    isPopular: false,
    isAvailable: true,
    isVeg: true,
  },
  {
    name: 'Garlic Naan',
    description: 'Tandoor-baked naan with a generous topping of minced garlic, cilantro, and butter. Pairs perfectly with any curry.',
    price: 89,
    category: 'Breads',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop',
    isPopular: true,
    isAvailable: true,
    isVeg: true,
  },
  {
    name: 'Laccha Paratha',
    description: 'Multi-layered whole wheat flatbread cooked on a griddle with ghee, creating flaky, crispy, buttery layers. A royal classic.',
    price: 79,
    category: 'Breads',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&auto=format&fit=crop',
    isPopular: false,
    isAvailable: true,
    isVeg: true,
  },

  // ── Desserts ─────────────────────────────────────────────────
  {
    name: 'Gulab Jamun',
    description: 'Soft, spongy milk-solid dumplings fried golden, soaked in rose-scented sugar syrup. Served warm with a scoop of kulfi.',
    price: 199,
    category: 'Desserts',
    image: '/images/gulab_jamun.png',
    isPopular: true,
    isAvailable: true,
    isVeg: true,
  },
  {
    name: 'Rasmalai',
    description: 'Delicate saffron-scented cottage cheese patties soaked in chilled sweetened milk, garnished with pistachios and rose petals.',
    price: 229,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1571197119738-a7c0cfdd8e35?w=600&auto=format&fit=crop',
    isPopular: false,
    isAvailable: true,
    isVeg: true,
  },
  {
    name: 'Kheer',
    description: 'Slow-simmered rice pudding with cardamom, saffron, and a generous sprinkling of blanched almonds, cashews and raisins.',
    price: 179,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1590080875852-9f06e2a5e9e8?w=600&auto=format&fit=crop',
    isPopular: false,
    isAvailable: true,
    isVeg: true,
  },

  // ── Beverages ────────────────────────────────────────────────
  {
    name: 'Cold Coffee',
    description: 'Rich espresso blended with chilled milk and ice cream, topped with whipped cream and a dusting of cocoa powder.',
    price: 199,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=600&auto=format&fit=crop',
    isPopular: false,
    isAvailable: true,
    isVeg: true,
  },
  {
    name: 'Virgin Mojito',
    description: 'Refreshing blend of fresh lime juice, mint leaves, sugar syrup, and sparkling soda water. Served over crushed ice.',
    price: 179,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=600&auto=format&fit=crop',
    isPopular: true,
    isAvailable: true,
    isVeg: true,
  },
  {
    name: 'Mango Lassi',
    description: 'Creamy yoghurt blended with sweet Alphonso mango pulp, cardamom, and a pinch of saffron. Chilled and refreshing.',
    price: 159,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&auto=format&fit=crop',
    isPopular: true,
    isAvailable: true,
    isVeg: true,
  },
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI env variable is missing.');
    }
    
    console.log('Connecting to database for seeding...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected. Clearing existing menu items...');
    await MenuItem.deleteMany({});
    
    console.log(`Inserting ${menuItems.length} menu items...`);
    await MenuItem.insertMany(menuItems);
    
    console.log('✅ Database successfully seeded with menu items!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDB();
