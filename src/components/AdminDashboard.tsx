import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Clock3, 
  XCircle, 
  Search, 
  Filter, 
  Plus, 
  Table, 
  Download, 
  Phone, 
  Mail, 
  Utensils, 
  ShieldCheck, 
  X, 
  Eye, 
  Edit, 
  Trash2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  MapPin,
  RefreshCw,
  Lock,
  LogOut,
  ShoppingBag
} from 'lucide-react';
import { Reservation, RestaurantTable, SeatingArea, CustomerOrder } from '../types';

interface AdminDashboardProps {
  reservations: Reservation[];
  tables: RestaurantTable[];
  orders?: CustomerOrder[];
  onUpdateReservationStatus: (id: string, status: Reservation['status']) => void;
  onAssignTable: (reservationId: string, tableNumber: string) => void;
  onDeleteReservation: (id: string) => void;
  onAddManualReservation: (res: Omit<Reservation, 'id' | 'createdAt' | 'referenceNumber'>) => void;
  onUpdateOrderStatus?: (id: string, status: CustomerOrder['status']) => void;
  onDeleteOrder?: (id: string) => void;
  onCloseAdmin: () => void;
  onLogout?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  reservations,
  tables,
  orders = [],
  onUpdateReservationStatus,
  onAssignTable,
  onDeleteReservation,
  onAddManualReservation,
  onUpdateOrderStatus,
  onDeleteOrder,
  onCloseAdmin,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'orders' | 'tables'>('bookings');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'upcoming'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Orders filter & search
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  
  // Modals inside admin
  const [selectedResForDetails, setSelectedResForDetails] = useState<Reservation | null>(null);
  const [isAddWalkInOpen, setIsAddWalkInOpen] = useState(false);

  // New Walk-in Form State
  const todayStr = new Date().toISOString().split('T')[0];
  const [newCustName, setNewCustName] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [newCustEmail, setNewCustEmail] = useState('');
  const [newGuests, setNewGuests] = useState(2);
  const [newDate, setNewDate] = useState(todayStr);
  const [newTime, setNewTime] = useState('20:00');
  const [newArea, setNewArea] = useState<SeatingArea>('stone-vault');
  const [newNotes, setNewNotes] = useState('');
  const [newStatus, setNewStatus] = useState<Reservation['status']>('confirmed');

  // Prevent background page from scrolling while admin dashboard is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Filtered reservations
  const filteredReservations = useMemo(() => {
    return reservations.filter((res) => {
      // Status filter
      if (statusFilter !== 'all' && res.status !== statusFilter) return false;

      // Date filter
      if (dateFilter === 'today' && res.date !== todayStr) return false;
      if (dateFilter === 'upcoming' && res.date < todayStr) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          res.customerName.toLowerCase().includes(q) ||
          res.referenceNumber.toLowerCase().includes(q) ||
          res.customerPhone.includes(q) ||
          (res.tableNumber && res.tableNumber.toLowerCase().includes(q));
        if (!matches) return false;
      }

      return true;
    });
  }, [reservations, statusFilter, dateFilter, searchQuery, todayStr]);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      if (orderStatusFilter !== 'all' && ord.status !== orderStatusFilter) return false;
      if (orderSearchQuery.trim()) {
        const q = orderSearchQuery.toLowerCase();
        const matches =
          ord.customerName.toLowerCase().includes(q) ||
          ord.orderNumber.toLowerCase().includes(q) ||
          ord.customerPhone.includes(q) ||
          ord.items.some((i) => i.name.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    });
  }, [orders, orderStatusFilter, orderSearchQuery]);

  // KPIs
  const totalBookings = reservations.length;
  const confirmedCount = reservations.filter((r) => r.status === 'confirmed').length;
  const pendingCount = reservations.filter((r) => r.status === 'pending').length;
  const seatedCount = reservations.filter((r) => r.status === 'seated').length;
  const totalCovers = reservations.reduce((acc, curr) => acc + (curr.status !== 'cancelled' ? curr.guests : 0), 0);

  // Menu Revenue & Orders calculation
  const reservationOrdersRevenue = reservations.reduce((acc, curr) => {
    if (curr.preOrderedItems && curr.preOrderedItems.length > 0) {
      return acc + (curr.finalPrice || curr.preOrderedItems.reduce((s, i) => s + i.price * i.quantity, 0));
    }
    return acc;
  }, 0);
  const directOrdersRevenue = orders.reduce((acc, curr) => acc + curr.finalPrice, 0);
  const totalMenuRevenue = reservationOrdersRevenue + directOrdersRevenue;
  const totalMenuPurchasesCount = orders.length + reservations.filter(r => r.preOrderedItems && r.preOrderedItems.length > 0).length;

  // Handle new walk in submit
  const handleCreateWalkIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName || !newCustPhone) return;

    onAddManualReservation({
      customerName: newCustName,
      customerPhone: newCustPhone,
      customerEmail: newCustEmail || `${newCustName.toLowerCase().replace(/\s+/g, '.')}@walkin.com`,
      guests: newGuests,
      date: newDate,
      time: newTime,
      seatingArea: newArea,
      specialRequests: newNotes || 'Walk-in guest',
      status: newStatus
    });

    setIsAddWalkInOpen(false);
    setNewCustName('');
    setNewCustPhone('');
    setNewNotes('');
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Ref Code', 'Guest Name', 'Phone', 'Email', 'Guests', 'Date', 'Time', 'Area', 'Status', 'Table', 'Requests'];
    const rows = reservations.map((r) => [
      r.referenceNumber,
      `"${r.customerName}"`,
      r.customerPhone,
      r.customerEmail,
      r.guests,
      r.date,
      r.time,
      r.seatingArea,
      r.status,
      r.tableNumber || 'Unassigned',
      `"${r.specialRequests || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `museum-pub-bookings-${todayStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#12110F] text-[#ECE7DE] overflow-y-auto overflow-x-hidden w-full max-w-full flex flex-col touch-pan-y">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-20 bg-[#171513]/95 backdrop-blur-md border-b border-[#2D2821] px-3.5 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 max-w-full">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#D4A359] text-black font-bold flex items-center justify-center shrink-0 shadow-sm">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h2 className="font-serif-heading text-sm sm:text-base md:text-lg font-bold text-white truncate">
                Admin Console
              </h2>
              <span className="shrink-0 px-1.5 sm:px-2 py-0.5 rounded bg-[#2A241C] text-[#D4A359] border border-[#D4A359]/30 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                Live
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-[#8E8678] truncate hidden xs:block">
              Restaurant Museum Pub · Mitrovica
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <button
            onClick={() => setIsAddWalkInOpen(true)}
            className="px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-[#D4A359] text-black font-bold text-xs sm:text-sm flex items-center gap-1 shadow hover:brightness-110 active:scale-95 transition-all"
            title="Add Manual / Walk-in Booking"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="hidden sm:inline">Add Booking</span>
            <span className="sm:hidden text-[11px]">Add</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-[#221F1B] border border-[#3A3328] hover:border-[#D4A359]/50 text-xs font-medium text-[#C8C0B2] hover:text-white flex items-center gap-1.5 transition-colors"
            title="Export CSV"
          >
            <Download className="w-3.5 h-3.5 text-[#D4A359] shrink-0" />
            <span className="hidden md:inline">Export</span>
          </button>

          {onLogout && (
            <button
              id="btn-admin-lock"
              onClick={onLogout}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-[#261817] border border-rose-900/40 hover:border-rose-600/60 text-xs font-semibold text-rose-300 hover:text-white flex items-center gap-1.5 transition-colors"
              title="Lock Admin Console & Log Out"
            >
              <Lock className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span className="hidden md:inline">Lock</span>
            </button>
          )}

          <button
            onClick={onCloseAdmin}
            className="p-1.5 sm:p-2 rounded-lg bg-[#24201A] hover:bg-[#332C24] text-[#A89F90] hover:text-white transition-colors shrink-0"
            title="Return to Customer Website"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
          <div className="p-3 sm:p-4 rounded-xl bg-[#181614] border border-[#2B2720] shadow flex flex-col justify-between">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#8E8678] block mb-1">
              Total Bookings
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif-heading text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                {totalBookings}
              </span>
              <Calendar className="w-4 h-4 text-[#D4A359] shrink-0" />
            </div>
            <span className="text-[9px] sm:text-[10px] text-[#7A7264] mt-1 block">Active on system</span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#181614] border border-[#2B2720] shadow flex flex-col justify-between">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#8E8678] block mb-1">
              Confirmed
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif-heading text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-400">
                {confirmedCount}
              </span>
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            </div>
            <span className="text-[9px] sm:text-[10px] text-[#7A7264] mt-1 block">Guaranteed</span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#181614] border border-[#2B2720] shadow flex flex-col justify-between">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#8E8678] block mb-1">
              Pending
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif-heading text-xl sm:text-2xl lg:text-3xl font-bold text-amber-400">
                {pendingCount}
              </span>
              <Clock3 className="w-4 h-4 text-amber-400 shrink-0" />
            </div>
            <span className="text-[9px] sm:text-[10px] text-[#7A7264] mt-1 block">Awaiting review</span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#181614] border border-[#2B2720] shadow flex flex-col justify-between">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#8E8678] block mb-1">
              Seated Today
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif-heading text-xl sm:text-2xl lg:text-3xl font-bold text-sky-400">
                {seatedCount}
              </span>
              <Table className="w-4 h-4 text-sky-400 shrink-0" />
            </div>
            <span className="text-[9px] sm:text-[10px] text-[#7A7264] mt-1 block">In restaurant</span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#181614] border border-[#2B2720] shadow flex flex-col justify-between">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#8E8678] block mb-1">
              Expected Covers
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif-heading text-xl sm:text-2xl lg:text-3xl font-bold text-[#F2C069]">
                {totalCovers}
              </span>
              <Users className="w-4 h-4 text-[#F2C069] shrink-0" />
            </div>
            <span className="text-[9px] sm:text-[10px] text-[#7A7264] mt-1 block">Total guest count</span>
          </div>

          {/* Menu Sales & Final Price Total KPI */}
          <div className="col-span-2 sm:col-span-1 p-3 sm:p-4 rounded-xl bg-[#1B1712] border border-[#D4A359]/40 shadow flex flex-col justify-between">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#D4A359] block mb-1">
              Menu Sales
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif-heading text-xl sm:text-2xl lg:text-3xl font-bold text-[#F2C069] font-mono">
                €{totalMenuRevenue.toFixed(2)}
              </span>
              <ShoppingBag className="w-4 h-4 text-[#D4A359] shrink-0" />
            </div>
            <span className="text-[9px] sm:text-[10px] text-[#A89F90] mt-1 block">
              {totalMenuPurchasesCount} orders placed
            </span>
          </div>
        </div>

        {/* Tab Navigation: Bookings Manifest vs Menu Orders vs Floor Plan */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 border-b border-[#2C2720] pb-2 sm:flex sm:items-center">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-2 px-2.5 sm:px-3 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
              activeTab === 'bookings'
                ? 'bg-[#26211B] text-[#D4A359] border border-[#D4A359]/50 shadow-sm'
                : 'text-[#A89F90] hover:text-white bg-[#161412]/50 border border-transparent'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate">Manifest ({filteredReservations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-2 px-2.5 sm:px-3 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
              activeTab === 'orders'
                ? 'bg-[#26211B] text-[#D4A359] border border-[#D4A359]/50 shadow-sm'
                : 'text-[#A89F90] hover:text-white bg-[#161412]/50 border border-transparent'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate">Menu Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('tables')}
            className={`py-2 px-2.5 sm:px-3 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
              activeTab === 'tables'
                ? 'bg-[#26211B] text-[#D4A359] border border-[#D4A359]/50 shadow-sm'
                : 'text-[#A89F90] hover:text-white bg-[#161412]/50 border border-transparent'
            }`}
          >
            <Table className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate">Floor Plan ({tables.length})</span>
          </button>
        </div>

        {activeTab === 'bookings' ? (
          <div className="space-y-3.5 sm:space-y-4">
            {/* Filter and Search Controls */}
            <div className="p-3 sm:p-4 rounded-xl bg-[#181614] border border-[#2B2720] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
              {/* Search */}
              <div className="relative w-full sm:w-72 lg:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7F776B]" />
                <input
                  type="text"
                  placeholder="Search guest, code, phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 rounded-lg bg-[#121110] border border-[#332D24] text-xs text-[#EDE8DF] placeholder-[#6A6356] focus:border-[#D4A359] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8E8678] hover:text-white p-0.5"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Filters */}
              <div className="grid grid-cols-2 gap-2 w-full sm:w-auto sm:flex sm:items-center">
                {/* Date filter */}
                <select
                  value={dateFilter}
                  onChange={(e: any) => setDateFilter(e.target.value)}
                  className="w-full sm:w-auto px-2.5 py-2 rounded-lg bg-[#121110] border border-[#332D24] text-xs text-[#EDE8DF] focus:border-[#D4A359] focus:outline-none"
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today Only</option>
                  <option value="upcoming">Upcoming</option>
                </select>

                {/* Status filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full sm:w-auto px-2.5 py-2 rounded-lg bg-[#121110] border border-[#332D24] text-xs text-[#EDE8DF] focus:border-[#D4A359] focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="seated">Seated</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Mobile Cards View (Optimized for Mobile Screens - Strict Vertical Scroll) */}
            <div className="space-y-3 md:hidden">
              {filteredReservations.length === 0 ? (
                <div className="p-8 text-center text-[#7F776B] bg-[#181614] border border-[#2B2720] rounded-xl text-xs">
                  No reservations found matching your criteria.
                </div>
              ) : (
                filteredReservations.map((res) => (
                  <div 
                    key={res.id} 
                    className="p-3.5 rounded-xl bg-[#181614] border border-[#2B2720] shadow space-y-3 text-xs"
                  >
                    {/* Header: Ref Code, Guests & Quick Actions */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#D4A359] bg-[#221C14] px-2 py-0.5 rounded border border-[#D4A359]/30 text-xs">
                          {res.referenceNumber}
                        </span>
                        <span className="text-[11px] text-[#A89F90] flex items-center gap-1">
                          <Users className="w-3 h-3 text-[#D4A359]" />
                          <span className="font-semibold text-white">{res.guests}</span> guests
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedResForDetails(res)}
                          className="p-1.5 rounded-lg bg-[#24201A] hover:bg-[#332D24] text-[#C4BCB0] hover:text-[#D4A359] transition-colors"
                          title="View Full Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteReservation(res.id)}
                          className="p-1.5 rounded-lg bg-[#24201A] hover:bg-rose-950/50 text-[#A89F90] hover:text-rose-400 transition-colors"
                          title="Delete / Cancel Booking"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Customer Name, Phone & Time */}
                    <div className="flex items-start justify-between gap-2 pt-1 border-t border-[#24201A]">
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-sm text-[#EDE8DF] truncate">{res.customerName}</div>
                        <a 
                          href={`tel:${res.customerPhone}`}
                          className="text-[#D4A359] hover:underline flex items-center gap-1 text-[11px] mt-0.5"
                        >
                          <Phone className="w-3 h-3 shrink-0" />
                          <span>{res.customerPhone}</span>
                        </a>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-medium text-[#EDE8DF] text-[11px]">{res.date}</div>
                        <div className="text-[#F2C069] font-mono font-bold text-xs">{res.time}</div>
                      </div>
                    </div>

                    {/* Inline Status & Table Controls */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#24201A]">
                      <div>
                        <label className="text-[9px] text-[#8E8678] font-semibold uppercase tracking-wider block mb-1">
                          Status
                        </label>
                        <select
                          value={res.status}
                          onChange={(e: any) => onUpdateReservationStatus(res.id, e.target.value)}
                          className={`w-full px-2 py-1.5 rounded-lg text-[11px] font-bold capitalize border focus:outline-none cursor-pointer ${
                            res.status === 'confirmed'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : res.status === 'pending'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                              : res.status === 'seated'
                              ? 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                              : res.status === 'completed'
                              ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                              : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="seated">Seated</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[9px] text-[#8E8678] font-semibold uppercase tracking-wider block mb-1 truncate">
                          Table ({res.seatingArea.replace('-', ' ')})
                        </label>
                        <select
                          value={res.tableNumber || ''}
                          onChange={(e) => onAssignTable(res.id, e.target.value)}
                          className="w-full px-2 py-1.5 rounded-lg bg-[#141210] border border-[#332D24] text-[11px] text-[#D4A359] focus:outline-none"
                        >
                          <option value="">No Table Assigned</option>
                          {tables.map((t) => (
                            <option key={t.id} value={t.number}>
                              {t.number} ({t.capacity}p)
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Ordered Menu Items & Final Price Display in Mobile Cards */}
                    {res.preOrderedItems && res.preOrderedItems.length > 0 && (
                      <div className="pt-2 border-t border-[#24201A] space-y-1.5">
                        <div className="p-2.5 rounded-lg bg-[#141210] border border-[#D4A359]/35 space-y-1.5 shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4A359] flex items-center gap-1">
                              <ShoppingBag className="w-3 h-3 text-[#D4A359]" />
                              Menu Order ({res.preOrderedItems.reduce((s, i) => s + i.quantity, 0)} items)
                            </span>
                            <span className="text-[11px] font-mono font-bold text-[#F2C069] bg-[#262016] px-2 py-0.5 rounded border border-[#D4A359]/40">
                              Final Price: €{(res.finalPrice || res.preOrderedItems.reduce((a, c) => a + c.price * c.quantity, 0)).toFixed(2)}
                            </span>
                          </div>

                          <div className="space-y-1 pt-1 border-t border-[#262017]">
                            {res.preOrderedItems.map((it) => (
                              <div key={it.itemId} className="flex justify-between items-center text-[11px] text-[#DDD5C7]">
                                <span className="truncate pr-2">
                                  <strong className="text-[#D4A359] font-bold">{it.quantity}x</strong> {it.name}
                                </span>
                                <span className="font-mono text-[#9E9484] shrink-0">
                                  €{(it.price * it.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {res.specialRequests && (
                      <div className="pt-1 text-[11px] text-[#8E8678] italic">
                        "{res.specialRequests}"
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Desktop Bookings Table (Hidden on Mobile) */}
            <div className="hidden md:block rounded-xl bg-[#181614] border border-[#2B2720] overflow-x-auto shadow-xl max-w-full">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#2C2720] bg-[#1E1C19] text-[#9E9587] font-semibold uppercase tracking-wider text-[11px]">
                    <th className="p-3.5">Ref Code</th>
                    <th className="p-3.5">Guest & Contact</th>
                    <th className="p-3.5">Guests</th>
                    <th className="p-3.5">Date & Time</th>
                    <th className="p-3.5">Area & Table</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#26221B]">
                  {filteredReservations.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-[#7F776B]">
                        No reservations found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredReservations.map((res) => {
                      return (
                        <tr key={res.id} className="hover:bg-[#1F1C18] transition-colors">
                          {/* Ref Code */}
                          <td className="p-3.5 font-mono font-bold text-[#D4A359]">
                            {res.referenceNumber}
                          </td>

                          {/* Guest Name & Ordered Items */}
                          <td className="p-3.5">
                            <div className="font-semibold text-[#EDE8DF]">{res.customerName}</div>
                            <div className="text-[11px] text-[#8E8678] flex items-center gap-2 mt-0.5">
                              <span>{res.customerPhone}</span>
                            </div>
                            {res.preOrderedItems && res.preOrderedItems.length > 0 && (
                              <div className="mt-2 p-2 rounded-lg bg-[#141210] border border-[#D4A359]/30 text-[11px] space-y-1">
                                <div className="flex items-center justify-between gap-3">
                                  <span className="text-[10px] font-bold text-[#D4A359] uppercase tracking-wider flex items-center gap-1">
                                    <ShoppingBag className="w-3 h-3" />
                                    Ordered ({res.preOrderedItems.reduce((s, i) => s + i.quantity, 0)}):
                                  </span>
                                  <span className="font-mono font-bold text-[#F2C069] bg-[#282117] px-1.5 py-0.5 rounded border border-[#D4A359]/35 text-[10px]">
                                    Final Price: €{(res.finalPrice || res.preOrderedItems.reduce((a, c) => a + c.price * c.quantity, 0)).toFixed(2)}
                                  </span>
                                </div>
                                <div className="text-[#C4BCB0] space-y-0.5 text-[10px] pt-0.5">
                                  {res.preOrderedItems.map((it) => (
                                    <div key={it.itemId} className="flex justify-between items-center">
                                      <span><strong className="text-[#D4A359]">{it.quantity}x</strong> {it.name}</span>
                                      <span className="font-mono text-[#8E8678]">€{(it.price * it.quantity).toFixed(2)}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </td>

                          {/* Guests */}
                          <td className="p-3.5">
                            <span className="font-semibold text-white">{res.guests}</span>
                            <span className="text-[#8E8678] ml-1">people</span>
                          </td>

                          {/* Date & Time */}
                          <td className="p-3.5">
                            <div className="font-medium text-[#EDE8DF]">{res.date}</div>
                            <div className="text-[#F2C069] font-mono text-[11px]">{res.time}</div>
                          </td>

                          {/* Area & Table */}
                          <td className="p-3.5">
                            <div className="capitalize text-[#C4BCB0]">{res.seatingArea.replace('-', ' ')}</div>
                            <select
                              value={res.tableNumber || ''}
                              onChange={(e) => onAssignTable(res.id, e.target.value)}
                              className="mt-1 px-1.5 py-0.5 rounded bg-[#141210] border border-[#332D24] text-[10px] text-[#D4A359] focus:outline-none"
                            >
                              <option value="">Assign Table...</option>
                              {tables.map((t) => (
                                <option key={t.id} value={t.number}>
                                  {t.number} ({t.capacity}p)
                                </option>
                              ))}
                            </select>
                          </td>

                          {/* Status */}
                          <td className="p-3.5">
                            <select
                              value={res.status}
                              onChange={(e: any) => onUpdateReservationStatus(res.id, e.target.value)}
                              className={`px-2.5 py-1 rounded-full text-[11px] font-bold capitalize border focus:outline-none cursor-pointer ${
                                res.status === 'confirmed'
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                  : res.status === 'pending'
                                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                  : res.status === 'seated'
                                  ? 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                                  : res.status === 'completed'
                                  ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                                  : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="seated">Seated</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>

                          {/* Actions */}
                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedResForDetails(res)}
                                className="p-1.5 rounded-md bg-[#24201A] hover:bg-[#332D24] text-[#C4BCB0] hover:text-[#D4A359] transition-colors"
                                title="View Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => onDeleteReservation(res.id)}
                                className="p-1.5 rounded-md bg-[#24201A] hover:bg-rose-900/40 text-[#A89F90] hover:text-rose-400 transition-colors"
                                title="Delete / Cancel Booking"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === 'orders' ? (
          /* Menu Orders & Purchases Section */
          <div className="space-y-4">
            {/* Orders Summary Header */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#181614] border border-[#2B2720] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow">
              <div>
                <h3 className="font-bold text-sm text-[#EDE8DF] flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#D4A359]" />
                  Interactive Menu Orders & Purchases
                </h3>
                <p className="text-xs text-[#8E8678] mt-0.5">
                  Live kitchen order feed from the interactive menu with itemized courses and final price calculation.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-3.5 py-1.5 rounded-lg bg-[#231E18] border border-[#D4A359]/30 text-right">
                  <div className="text-[10px] text-[#A89F90] uppercase tracking-wider font-semibold">Total Revenue</div>
                  <div className="text-sm sm:text-base font-bold text-[#F2C069] font-mono">
                    €{totalMenuRevenue.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Orders Search & Status Filter */}
            <div className="p-3 sm:p-4 rounded-xl bg-[#181614] border border-[#2B2720] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7F776B]" />
                <input
                  type="text"
                  placeholder="Search customer, order code, dish..."
                  value={orderSearchQuery}
                  onChange={(e) => setOrderSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 rounded-lg bg-[#121110] border border-[#332D24] text-xs text-[#EDE8DF] placeholder-[#6A6356] focus:border-[#D4A359] focus:outline-none"
                />
                {orderSearchQuery && (
                  <button
                    onClick={() => setOrderSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8E8678] hover:text-white p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="w-full sm:w-auto px-2.5 py-2 rounded-lg bg-[#121110] border border-[#332D24] text-xs text-[#EDE8DF] focus:border-[#D4A359] focus:outline-none"
                >
                  <option value="all">All Kitchen Statuses</option>
                  <option value="new">New</option>
                  <option value="preparing">Kitchen Preparing</option>
                  <option value="ready">Ready</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
              <div className="p-8 text-center text-[#7F776B] bg-[#181614] border border-[#2B2720] rounded-xl text-xs space-y-2">
                <ShoppingBag className="w-8 h-8 text-[#544D42] mx-auto" />
                <div className="text-[#C4BCB0] font-semibold text-sm">No menu orders found</div>
                <p className="text-[11px] max-w-md mx-auto">
                  When customers purchase dishes or drinks through the interactive menu, their ordered items and final price will appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 rounded-xl bg-[#181614] border border-[#2B2720] shadow space-y-3"
                  >
                    {/* Order Header */}
                    <div className="flex items-center justify-between gap-2 border-b border-[#24201A] pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#D4A359] bg-[#221C14] px-2 py-0.5 rounded border border-[#D4A359]/30 text-xs">
                          {ord.orderNumber}
                        </span>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded tracking-wider bg-[#26211B] text-[#A89F90] border border-[#383228]">
                          {ord.orderType === 'dine-in' ? `Dine-In ${ord.tableNumber ? `· Table ${ord.tableNumber}` : ''}` : ord.orderType}
                        </span>
                      </div>

                      {onDeleteOrder && (
                        <button
                          onClick={() => onDeleteOrder(ord.id)}
                          className="p-1.5 rounded-lg bg-[#24201A] hover:bg-rose-950/50 text-[#8E8678] hover:text-rose-400 transition-colors"
                          title="Cancel / Delete Order"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Customer Info */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-bold text-sm text-[#EDE8DF]">{ord.customerName}</div>
                        <a
                          href={`tel:${ord.customerPhone}`}
                          className="text-[#D4A359] hover:underline flex items-center gap-1 text-[11px] mt-0.5"
                        >
                          <Phone className="w-3 h-3 shrink-0" />
                          <span>{ord.customerPhone}</span>
                        </a>
                      </div>

                      <div className="text-right text-[11px] text-[#8E8678]">
                        <div>{new Date(ord.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}</div>
                        <div className="text-[#DDD5C8] font-mono">
                          {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>

                    {/* What You Ordered List */}
                    <div className="p-3 rounded-lg bg-[#141210] border border-[#2D271F] space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#A89F90] mb-1">
                        Ordered Dishes & Drinks:
                      </div>
                      <div className="space-y-1">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs text-[#EDE8DF]">
                            <span>
                              <strong className="text-[#D4A359] font-bold">{it.quantity}x</strong> {it.name}
                            </span>
                            <span className="font-mono text-[#A89F90]">
                              €{(it.price * it.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {ord.specialInstructions && (
                        <div className="pt-2 mt-2 border-t border-[#24201A] text-[11px] text-[#A89F90] italic">
                          "{ord.specialInstructions}"
                        </div>
                      )}
                    </div>

                    {/* Final Price Banner & Status Toggle */}
                    <div className="pt-2 border-t border-[#24201A] flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[9px] uppercase font-bold tracking-wider text-[#8E8678] block">
                          Order Total
                        </span>
                        <div className="text-sm sm:text-base font-bold font-mono text-[#F2C069]">
                          Final Price: €{ord.finalPrice.toFixed(2)}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <select
                          value={ord.status}
                          onChange={(e: any) => onUpdateOrderStatus && onUpdateOrderStatus(ord.id, e.target.value)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-bold capitalize border focus:outline-none cursor-pointer ${
                            ord.status === 'ready'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : ord.status === 'preparing'
                              ? 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                              : ord.status === 'new'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                              : ord.status === 'completed'
                              ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                              : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="preparing">Kitchen Preparing</option>
                          <option value="ready">Ready</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Floor Plan & Tables Grid */
          <div className="space-y-4 sm:space-y-6">
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#181614] border border-[#2B2720] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
              <div>
                <h3 className="font-bold text-sm text-[#EDE8DF]">Atmospheric Floor Plan & Table States</h3>
                <p className="text-xs text-[#8E8678]">
                  Table status across Hamam vault, pub bar, terrace and mezzanine.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" /> Available
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" /> Reserved
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shrink-0" /> Occupied
                </span>
              </div>
            </div>

            {/* Areas */}
            {(['stone-vault', 'pub-bar', 'historic-terrace', 'museum-mezzanine'] as const).map((area) => {
              const areaTables = tables.filter((t) => t.area === area);

              const areaLabels: Record<SeatingArea, string> = {
                'stone-vault': 'Ancient Ottoman Turkish Bath (Hamam Vault)',
                'pub-bar': 'Craft Pub & Brewery High Tops',
                'historic-terrace': 'Cobblestone Street Terrace',
                'museum-mezzanine': 'Museum Mezzanine Relics Gallery'
              };

              return (
                <div key={area} className="p-3.5 sm:p-5 rounded-xl bg-[#181614] border border-[#2B2720] space-y-3">
                  <h4 className="font-serif-heading font-bold text-xs sm:text-sm text-[#D4A359] flex items-center gap-2">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>{areaLabels[area]}</span>
                  </h4>

                  <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
                    {areaTables.map((tbl) => (
                      <div
                        key={tbl.id}
                        className={`p-2.5 sm:p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
                          tbl.status === 'occupied'
                            ? 'bg-sky-950/30 border-sky-500/40 text-sky-200'
                            : tbl.status === 'reserved'
                            ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                            : 'bg-[#1D1B18] border-[#332D24] text-[#C4BCB0] hover:border-emerald-500/40'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-xs">{tbl.number}</span>
                          <span className={`w-2 h-2 rounded-full ${
                            tbl.status === 'occupied' ? 'bg-sky-400' : tbl.status === 'reserved' ? 'bg-amber-400' : 'bg-emerald-400'
                          }`} />
                        </div>
                        <div className="text-[10px] sm:text-[11px] opacity-80">{tbl.capacity} Seats</div>
                        <span className="mt-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                          {tbl.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Details View Modal */}
      {selectedResForDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-[#171513] border border-[#383126] rounded-2xl max-w-md w-full p-4 sm:p-6 relative text-[#ECE7DE] shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedResForDetails(null)}
              className="absolute top-4 right-4 text-[#8E8678] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[#2C2720] pb-3">
              <span className="text-xs text-[#D4A359] font-mono font-bold">
                {selectedResForDetails.referenceNumber}
              </span>
              <h3 className="font-serif-heading text-xl font-bold text-white mt-0.5">
                {selectedResForDetails.customerName}
              </h3>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-[#24201A]">
                <span className="text-[#8E8678]">Phone</span>
                <span className="font-medium text-white">{selectedResForDetails.customerPhone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#24201A]">
                <span className="text-[#8E8678]">Email</span>
                <span className="font-medium text-white">{selectedResForDetails.customerEmail}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#24201A]">
                <span className="text-[#8E8678]">Party Size</span>
                <span className="font-medium text-white">{selectedResForDetails.guests} Guests</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#24201A]">
                <span className="text-[#8E8678]">Date & Time</span>
                <span className="font-medium text-[#F2C069]">
                  {selectedResForDetails.date} at {selectedResForDetails.time}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#24201A]">
                <span className="text-[#8E8678]">Seating Area</span>
                <span className="font-medium capitalize">{selectedResForDetails.seatingArea.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#24201A]">
                <span className="text-[#8E8678]">Assigned Table</span>
                <span className="font-medium text-[#D4A359]">{selectedResForDetails.tableNumber || 'None'}</span>
              </div>

              {selectedResForDetails.specialRequests && (
                <div className="pt-2">
                  <span className="text-[#8E8678] block mb-1">Special Instructions</span>
                  <p className="p-2.5 rounded-lg bg-[#1F1C18] border border-[#2D271F] italic text-white">
                    {selectedResForDetails.specialRequests}
                  </p>
                </div>
              )}

              {selectedResForDetails.preOrderedItems && selectedResForDetails.preOrderedItems.length > 0 && (
                <div className="pt-2 border-t border-[#24201A] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#A89F90] block text-[11px] uppercase tracking-wider font-bold">
                      Pre-Ordered Kitchen Courses
                    </span>
                    <span className="text-xs font-mono font-bold text-[#F2C069] bg-[#262017] px-2.5 py-0.5 rounded border border-[#D4A359]/40">
                      Final Price: €{(selectedResForDetails.finalPrice || selectedResForDetails.preOrderedItems.reduce((a, c) => a + c.price * c.quantity, 0)).toFixed(2)}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#141210] border border-[#2D271F] space-y-1.5">
                    {selectedResForDetails.preOrderedItems.map((it) => (
                      <div key={it.itemId} className="flex justify-between text-xs">
                        <span className="text-[#DDD5C8]">
                          <strong className="text-[#D4A359]">{it.quantity}x</strong> {it.name}
                        </span>
                        <span className="font-mono text-[#D4A359]">€{(it.price * it.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 flex justify-end">
              <button
                onClick={() => setSelectedResForDetails(null)}
                className="px-4 py-2 rounded-xl bg-[#24201A] text-xs font-bold text-white hover:bg-[#302B21]"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Walk-in Modal */}
      {isAddWalkInOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-[#171513] border border-[#383126] rounded-2xl max-w-lg w-full p-4 sm:p-6 relative text-[#ECE7DE] shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddWalkInOpen(false)}
              className="absolute top-4 right-4 text-[#8E8678] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#D4A359]" />
              <h3 className="font-serif-heading text-lg sm:text-xl font-bold text-white">
                Record Manual Walk-in / Phone Booking
              </h3>
            </div>

            <form onSubmit={handleCreateWalkIn} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#A89F90] mb-1 font-semibold">Customer Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Arben Kelmendi"
                  value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#121110] border border-[#332D24] text-[#EDE8DF] focus:outline-none focus:border-[#D4A359]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A89F90] mb-1 font-semibold">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+383 / +386..."
                    value={newCustPhone}
                    onChange={(e) => setNewCustPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#121110] border border-[#332D24] text-[#EDE8DF] focus:outline-none focus:border-[#D4A359]"
                  />
                </div>
                <div>
                  <label className="block text-[#A89F90] mb-1 font-semibold">Guests Count</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={newGuests}
                    onChange={(e) => setNewGuests(parseInt(e.target.value) || 1)}
                    className="w-full p-2.5 rounded-xl bg-[#121110] border border-[#332D24] text-[#EDE8DF] focus:outline-none focus:border-[#D4A359]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A89F90] mb-1 font-semibold">Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#121110] border border-[#332D24] text-[#EDE8DF] focus:outline-none focus:border-[#D4A359]"
                  />
                </div>
                <div>
                  <label className="block text-[#A89F90] mb-1 font-semibold">Time</label>
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#121110] border border-[#332D24] text-[#EDE8DF] focus:outline-none focus:border-[#D4A359]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A89F90] mb-1 font-semibold">Seating Area</label>
                  <select
                    value={newArea}
                    onChange={(e: any) => setNewArea(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#121110] border border-[#332D24] text-[#EDE8DF] focus:outline-none"
                  >
                    <option value="stone-vault">Stone Vault (Hamam)</option>
                    <option value="pub-bar">Pub Bar & Taps</option>
                    <option value="historic-terrace">Terrace</option>
                    <option value="museum-mezzanine">Museum Mezzanine</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#A89F90] mb-1 font-semibold">Initial Status</label>
                  <select
                    value={newStatus}
                    onChange={(e: any) => setNewStatus(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#121110] border border-[#332D24] text-[#EDE8DF] focus:outline-none"
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="seated">Seated Now</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#A89F90] mb-1 font-semibold">Staff Notes</label>
                <input
                  type="text"
                  placeholder="e.g. VIP guest, birthday table, prefers wine..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#121110] border border-[#332D24] text-[#EDE8DF] focus:outline-none focus:border-[#D4A359]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddWalkInOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[#8E8678] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#D4A359] text-black font-bold text-xs shadow hover:brightness-110"
                >
                  Save Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
