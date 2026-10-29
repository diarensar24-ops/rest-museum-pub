import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutHistory } from './components/AboutHistory';
import { InteractiveMenu } from './components/InteractiveMenu';
import { ReservationModal } from './components/ReservationModal';
import { OrderCheckoutModal } from './components/OrderCheckoutModal';
import { ReviewsSection } from './components/ReviewsSection';
import { IntegratedMap } from './components/IntegratedMap';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminAuthModal } from './components/AdminAuthModal';
import { Footer } from './components/Footer';
import { MobileQuickBar } from './components/MobileQuickBar';

import { Reservation, RestaurantTable, Review, CustomerOrder, OrderItem } from './types';
import { INITIAL_RESERVATIONS, INITIAL_TABLES, INITIAL_REVIEWS, INITIAL_ORDERS } from './data/initialData';

export default function App() {
  // Persistence via localStorage with fallback to initial data
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem('museum_pub_reservations');
      return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
    } catch {
      return INITIAL_RESERVATIONS;
    }
  });

  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    try {
      const saved = localStorage.getItem('museum_pub_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [tables, setTables] = useState<RestaurantTable[]>(() => {
    try {
      const saved = localStorage.getItem('museum_pub_tables');
      return saved ? JSON.parse(saved) : INITIAL_TABLES;
    } catch {
      return INITIAL_TABLES;
    }
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('museum_pub_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // UI state
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('museum_pub_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  // Interactive menu pre-order tray
  const [preOrderedItems, setPreOrderedItems] = useState<{
    itemId: string;
    name: string;
    quantity: number;
    price: number;
  }[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('museum_pub_reservations', JSON.stringify(reservations));
    } catch (e) {
      console.error('Failed to persist reservations', e);
    }
  }, [reservations]);

  useEffect(() => {
    try {
      localStorage.setItem('museum_pub_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to persist orders', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('museum_pub_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error('Failed to persist reviews', e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('museum_pub_tables', JSON.stringify(tables));
    } catch (e) {
      console.error('Failed to persist tables', e);
    }
  }, [tables]);

  // Observer for active section scrolling
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'about', 'menu', 'reviews', 'location'];
      const scrollPos = window.scrollY + 200;

      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reservation Handlers
  const handleCreateReservation = (
    data: Omit<Reservation, 'id' | 'createdAt' | 'status' | 'referenceNumber'>
  ): Reservation => {
    const refCode = `MSP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReservation: Reservation = {
      ...data,
      id: `res-${Date.now()}`,
      referenceNumber: refCode,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    // Auto-assign table if available matching area
    const availableTable = tables.find(
      (t) => t.area === data.seatingArea && t.status === 'available' && t.capacity >= data.guests
    );

    if (availableTable) {
      newReservation.tableNumber = availableTable.number;
      setTables((prev) =>
        prev.map((t) =>
          t.id === availableTable.id ? { ...t, status: 'reserved', currentReservationId: newReservation.id } : t
        )
      );
    }

    setReservations((prev) => [newReservation, ...prev]);
    return newReservation;
  };

  const handleUpdateReservationStatus = (id: string, status: Reservation['status']) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );

    // Update corresponding table if status changes
    if (status === 'seated') {
      const res = reservations.find((r) => r.id === id);
      if (res && res.tableNumber) {
        setTables((prev) =>
          prev.map((t) => (t.number === res.tableNumber ? { ...t, status: 'occupied' } : t))
        );
      }
    } else if (status === 'completed' || status === 'cancelled') {
      const res = reservations.find((r) => r.id === id);
      if (res && res.tableNumber) {
        setTables((prev) =>
          prev.map((t) => (t.number === res.tableNumber ? { ...t, status: 'available', currentReservationId: undefined } : t))
        );
      }
    }
  };

  const handleAssignTable = (reservationId: string, tableNumber: string) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === reservationId ? { ...r, tableNumber } : r))
    );
  };

  const handleDeleteReservation = (id: string) => {
    setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  const handleManualReservation = (
    data: Omit<Reservation, 'id' | 'createdAt' | 'referenceNumber'>
  ) => {
    const refCode = `MSP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRes: Reservation = {
      ...data,
      id: `res-${Date.now()}`,
      referenceNumber: refCode,
      createdAt: new Date().toISOString(),
    };
    setReservations((prev) => [newRes, ...prev]);
  };

  // Review handler
  const handleAddReview = (data: Omit<Review, 'id' | 'likes' | 'userLiked'>) => {
    const newReview: Review = {
      ...data,
      id: `rev-${Date.now()}`,
      likes: 0,
      userLiked: false,
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  // Menu Order Handlers
  const handleCreateOrder = (orderData: {
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    orderType: 'dine-in' | 'pickup' | 'delivery';
    tableNumber?: string;
    specialInstructions?: string;
    items: OrderItem[];
    finalPrice: number;
  }): CustomerOrder => {
    const orderNum = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: CustomerOrder = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    // Clear pre-order tray
    setPreOrderedItems([]);
    return newOrder;
  };

  const handleUpdateOrderStatus = (orderId: string, status: CustomerOrder['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Admin Access & Authentication Handlers
  const handleToggleAdmin = () => {
    if (isAdminOpen) {
      setIsAdminOpen(false);
    } else {
      if (isAdminAuthenticated) {
        setIsAdminOpen(true);
      } else {
        setIsAdminAuthModalOpen(true);
      }
    }
  };

  const handleOpenAdmin = () => {
    if (isAdminAuthenticated) {
      setIsAdminOpen(true);
    } else {
      setIsAdminAuthModalOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    try {
      sessionStorage.setItem('museum_pub_admin_auth', 'true');
    } catch (e) {
      console.error('Session storage error:', e);
    }
    setIsAdminAuthModalOpen(false);
    setIsAdminOpen(true);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem('museum_pub_admin_auth');
    } catch (e) {
      console.error('Session storage error:', e);
    }
    setIsAdminOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#11100F] text-[#ECE7DE] flex flex-col selection:bg-[#C99753] selection:text-black">
      {/* Sticky Header Navbar */}
      <Navbar
        onOpenReservation={() => setIsReservationModalOpen(true)}
        isAdminOpen={isAdminOpen}
        onToggleAdmin={handleToggleAdmin}
        activeSection={activeSection}
        reservationCount={reservations.filter((r) => r.status === 'confirmed' || r.status === 'pending').length}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenReservation={() => setIsReservationModalOpen(true)}
          onScrollToMenu={() => scrollToSection('menu')}
          onScrollToLocation={() => scrollToSection('location')}
        />

        {/* Historic Ottoman Turkish Bath Heritage & Popular Times */}
        <AboutHistory />

        {/* Interactive Menu with Dietary Filter & Pre-Order Tray */}
        <InteractiveMenu
          preOrderedItems={preOrderedItems}
          onUpdatePreOrder={setPreOrderedItems}
          onOpenReservationWithOrder={() => setIsReservationModalOpen(true)}
          onOpenCheckout={() => setIsCheckoutModalOpen(true)}
        />

        {/* Google Reviews Section (4.6 Rating & 43 Reviews) */}
        <ReviewsSection
          reviews={reviews}
          onAddReview={handleAddReview}
        />

        {/* Integrated Leaflet Map & Location */}
        <IntegratedMap />
      </main>

      {/* Footer */}
      <Footer
        onOpenReservation={() => setIsReservationModalOpen(true)}
        onToggleAdmin={handleOpenAdmin}
      />

      {/* Mobile Sticky Action Bar */}
      <MobileQuickBar
        onOpenReservation={() => setIsReservationModalOpen(true)}
        onToggleAdmin={handleToggleAdmin}
        isAdminOpen={isAdminOpen}
      />

      {/* Table Reservation Modal */}
      <ReservationModal
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
        onSubmitReservation={handleCreateReservation}
        preOrderedItems={preOrderedItems}
      />

      {/* Direct Menu Order Checkout Modal */}
      <OrderCheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        items={preOrderedItems}
        onSubmitOrder={handleCreateOrder}
      />

      {/* Admin Password Gate Modal */}
      <AdminAuthModal
        isOpen={isAdminAuthModalOpen}
        onClose={() => setIsAdminAuthModalOpen(false)}
        onSuccess={handleAdminLoginSuccess}
      />

      {/* Admin Dashboard Overlay (Protected by Password Authentication) */}
      {isAdminOpen && isAdminAuthenticated && (
        <AdminDashboard
          reservations={reservations}
          tables={tables}
          orders={orders}
          onUpdateReservationStatus={handleUpdateReservationStatus}
          onAssignTable={handleAssignTable}
          onDeleteReservation={handleDeleteReservation}
          onAddManualReservation={handleManualReservation}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onDeleteOrder={handleDeleteOrder}
          onCloseAdmin={() => setIsAdminOpen(false)}
          onLogout={handleAdminLogout}
        />
      )}
    </div>
  );
}
