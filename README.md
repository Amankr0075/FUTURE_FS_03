# Royal Spice Restaurant — Full-Stack Website

A production-ready, premium restaurant website built with the MERN stack (React, Node.js, Express, MongoDB). The application features a stunning glassmorphism user interface for patrons, a complete online reservation engine, dynamic menu filtering, and a powerful administrative dashboard for managing restaurant operations.

---

## 🚀 Features

* **Patron Experience**:
  * **Interactive Home**: Dynamic hero section, signature signature dishes, testimonials, and booking CTAs.
  * **Categorized Menu**: Searchable and filterable menu rendering live items from MongoDB with fallback data.
  * **Online Reservation**: Live validation form with guest select, date constraint, and time-slot selectors.
  * **Visual Gallery**: Masonry grid layout with a high-fidelity media lightbox.
  * **Contact Portal**: Custom inquiry form, Google Maps localization, and direct WhatsApp CTA.
* **Admin Dashboard**:
  * **Key Metrics**: Real-time stats for total bookings, today's pending reservations, customer inquiries, and menu count.
  * **Reservation Manager**: List view with details and simple status updates or deletion.
  * **Inquiry Hub**: Read and delete custom customer inquiries.
  * **Menu CRUD Manager**: Add new dishes, edit descriptions, adjust pricing, toggle veg/non-veg, and toggle menu availability live.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS, Framer Motion, React Icons, Axios, React Router DOM |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose |
| **Utilities** | Helmet (security), CORS, Morgan (logger), Dotenv |

---

## 📂 Project Structure

```
d:\Projects\RoyalSpiceResturant\
├── client/                     # Frontend Vite + React application
│   ├── public/                 # Static assets, sitemap.xml, robots.txt
│   ├── src/
│   │   ├── components/         # Shared UI (Navbar, Footer, Lightbox, etc.)
│   │   ├── layouts/            # Page templates (MainLayout, AdminLayout)
│   │   ├── pages/              # Route views (Home, About, Menu, Gallery, Admin, etc.)
│   │   ├── services/           # Axios API services
│   │   ├── data/               # Static fallbacks (menu seed data)
│   │   ├── App.jsx             # Main Router structure
│   │   └── index.css           # Global Tailwind & Custom Styles
│   └── vite.config.js          # Vite config with API server proxy
│
├── server/                     # Backend REST API server
│   ├── config/                 # Database connection config
│   ├── controllers/            # Route controllers (Reservation, Contact, Menu)
│   ├── models/                 # Mongoose schemas (Reservation, Contact, MenuItem)
│   ├── middleware/             # Error handlers & simple Auth
│   ├── routes/                 # Express route entrypoints
│   ├── server.js               # Express application entrypoint
│   └── seed.js                 # Database initializer seed script
│
├── BUSINESS_PITCH.md           # Business context & product pitch
└── README.md                   # Setup guide and instructions
```

---

## ⚙️ Installation & Setup

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v16+ recommended) and `npm` installed.

### 1. Backend Configuration

Navigate to the `server/` directory and configure the environment variables:

```bash
cd server
```

Copy the `.env.example` file and create `.env`:

```bash
cp .env.example .env
```

Open `.env` and fill in your details:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
ADMIN_USERNAME=admin
ADMIN_PASSWORD=royalspice@123
NODE_ENV=development
```

Install server dependencies:

```bash
npm install
```

### 2. Frontend Configuration

Navigate to the `client/` directory and install dependencies:

```bash
cd ../client
npm install
```

*(Optional)* The frontend proxy configuration is located in `client/vite.config.js` and routes all relative `/api` calls directly to `http://localhost:5000`.

---

## 🏃 Running the Application

### Start Backend

From the `server/` directory:

```bash
# Seed initial menu items (if DB connected)
npm run seed

# Run in development mode (with nodemon auto-restart)
npm run dev
```

### Start Frontend

From the `client/` directory:

```bash
# Start Vite development server (runs on http://localhost:5173)
npm run dev
```

Open your browser and navigate to `http://localhost:5173`. You can log into the admin dashboard at `/admin/login` using the username/password configured in your server `.env` file (default: `admin` / `royalspice@123`).
