import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import LoadingScreen from './components/LoadingScreen';

// Lazy-loaded pages
const Home       = React.lazy(() => import('./pages/Home'));
const About      = React.lazy(() => import('./pages/About'));
const Menu       = React.lazy(() => import('./pages/Menu'));
const Gallery    = React.lazy(() => import('./pages/Gallery'));
const Reservation = React.lazy(() => import('./pages/Reservation'));
const Contact    = React.lazy(() => import('./pages/Contact'));
const AdminLogin = React.lazy(() => import('./pages/AdminLogin'));
const Admin      = React.lazy(() => import('./pages/Admin'));
const NotFound   = React.lazy(() => import('./pages/NotFound'));

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public pages with Navbar + Footer */}
        <Route element={<MainLayout />}>
          <Route path="/"           element={<Home />} />
          <Route path="/about"      element={<About />} />
          <Route path="/menu"       element={<Menu />} />
          <Route path="/gallery"    element={<Gallery />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/contact"    element={<Contact />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin/login"  element={<AdminLogin />} />
        <Route path="/admin"        element={<AdminLayout />}>
          <Route index              element={<Admin />} />
        </Route>

        <Route path="*"             element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<LoadingScreen />}>
          <AnimatedRoutes />
        </Suspense>
        <WhatsAppButton />
      </Router>
    </HelmetProvider>
  );
}
