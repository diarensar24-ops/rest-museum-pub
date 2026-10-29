import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  Flame, 
  Coffee, 
  Salad, 
  UtensilsCrossed, 
  Sandwich, 
  Beer, 
  GlassWater, 
  Cake, 
  Plus, 
  Minus, 
  Check, 
  Info, 
  ShoppingBag, 
  X,
  Heart,
  Star
} from 'lucide-react';
import { MenuItem, DietaryTag } from '../types';
import { MENU_ITEMS, CATEGORIES } from '../data/menuData';

interface InteractiveMenuProps {
  preOrderedItems: { itemId: string; name: string; quantity: number; price: number }[];
  onUpdatePreOrder: (items: { itemId: string; name: string; quantity: number; price: number }[]) => void;
  onOpenReservationWithOrder: () => void;
  onOpenCheckout: () => void;
}

export const InteractiveMenu: React.FC<InteractiveMenuProps> = ({
  preOrderedItems,
  onUpdatePreOrder,
  onOpenReservationWithOrder,
  onOpenCheckout
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag | 'all'>('all');
  const [activeDetailItem, setActiveDetailItem] = useState<MenuItem | null>(null);

  // Filter items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      const matchesCategory =
        activeCategory === 'all'
          ? true
          : activeCategory === 'highlights'
          ? item.highlight
          : item.category === activeCategory;

      // Dietary filter
      const matchesDietary =
        selectedDietary === 'all' ? true : item.dietary.includes(selectedDietary);

      // Search query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        item.name.toLowerCase().includes(q) ||
        (item.originalName && item.originalName.toLowerCase().includes(q)) ||
        item.description.toLowerCase().includes(q) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(q));

      return matchesCategory && matchesDietary && matchesSearch;
    });
  }, [activeCategory, selectedDietary, searchQuery]);

  // Order management helpers
  const getItemQuantity = (id: string) => {
    const found = preOrderedItems.find((p) => p.itemId === id);
    return found ? found.quantity : 0;
  };

  const handleAddItem = (item: MenuItem) => {
    const existing = preOrderedItems.find((p) => p.itemId === item.id);
    if (existing) {
      onUpdatePreOrder(
        preOrderedItems.map((p) =>
          p.itemId === item.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      onUpdatePreOrder([
        ...preOrderedItems,
        { itemId: item.id, name: item.name, quantity: 1, price: item.price }
      ]);
    }
  };

  const handleRemoveItem = (id: string) => {
    const existing = preOrderedItems.find((p) => p.itemId === id);
    if (!existing) return;

    if (existing.quantity > 1) {
      onUpdatePreOrder(
        preOrderedItems.map((p) =>
          p.itemId === id ? { ...p, quantity: p.quantity - 1 } : p
        )
      );
    } else {
      onUpdatePreOrder(preOrderedItems.filter((p) => p.itemId !== id));
    }
  };

  const orderTotal = preOrderedItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const totalItemsCount = preOrderedItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Icon mapping for categories
  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Flame': return <Flame className="w-4 h-4 text-amber-500" />;
      case 'Coffee': return <Coffee className="w-4 h-4" />;
      case 'Salad': return <Salad className="w-4 h-4" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-4 h-4" />;
      case 'Sandwich': return <Sandwich className="w-4 h-4" />;
      case 'Beer': return <Beer className="w-4 h-4" />;
      case 'GlassWater': return <GlassWater className="w-4 h-4" />;
      case 'Cake': return <Cake className="w-4 h-4" />;
      default: return <UtensilsCrossed className="w-4 h-4" />;
    }
  };

  return (
    <section id="menu" className="py-20 bg-[#11100F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#201D19] border border-[#D4A359]/30 text-xs font-semibold text-[#D4A359] uppercase tracking-wider">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Artisan Gastronomy</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold text-[#F7F4EB]">
            Interactive Menu
          </h2>
          <p className="text-[#A89E90] text-sm sm:text-base">
            Explore our curated culinary offerings, customize dietary selections, and pre-order to accompany your table reservation.
          </p>
        </div>

        {/* Search & Dietary Filters Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-[#181614] p-4 rounded-2xl border border-[#2B2620] shadow-md">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#857C70]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Macchiato, Pierogi, Wraps, Beer..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#121110] border border-[#332D25] focus:border-[#D4A359] focus:outline-none rounded-xl text-sm text-[#EDE7DE] placeholder-[#766E62] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#766E62] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Dietary Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs text-[#8E8578] font-medium hidden sm:inline">Dietary:</span>
            {(['all', 'vegan', 'vegetarian', 'halal', 'signature', 'chef-pick'] as const).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedDietary(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  selectedDietary === tag
                    ? 'bg-[#D4A359] text-black font-semibold shadow-sm'
                    : 'bg-[#1F1D1A] text-[#B0A79A] border border-[#332D24] hover:text-white hover:border-[#D4A359]/40'
                }`}
              >
                {tag === 'all' ? 'All Diets' : tag.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#C59341] to-[#D4A359] text-[#121110] font-bold shadow-lg shadow-[#C59341]/20 scale-102'
                    : 'bg-[#1A1815] text-[#C2B8AA] border border-[#2D2821] hover:border-[#D4A359]/40 hover:text-white'
                }`}
              >
                {renderCategoryIcon(cat.icon)}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#161513] rounded-2xl border border-[#2A251E] space-y-3">
            <UtensilsCrossed className="w-10 h-10 text-[#696155] mx-auto" />
            <h3 className="text-lg font-serif-heading text-[#D4CEC3]">No items match your filter</h3>
            <p className="text-xs text-[#8A8173]">Try resetting your search or dietary filter</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDietary('all');
                setActiveCategory('all');
              }}
              className="px-4 py-2 text-xs bg-[#24201A] border border-[#3A3328] text-[#D4A359] rounded-lg hover:bg-[#2F2921]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const qty = getItemQuantity(item.id);

              return (
                <div
                  key={item.id}
                  className="bg-[#181614] border border-[#2B2720] hover:border-[#D4A359]/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col group shadow-lg hover:shadow-xl hover:shadow-black/60"
                >
                  {/* Item Image with tags */}
                  <div className="relative h-48 w-full overflow-hidden bg-[#1E1B17]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181614] via-transparent to-black/30" />

                    {/* Highlights badge */}
                    {item.highlight && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#D4A359] text-black text-[11px] font-bold flex items-center gap-1 shadow-md">
                        <Flame className="w-3 h-3 fill-black" />
                        Signature Highlight
                      </span>
                    )}

                    {/* Price Tag */}
                    <span className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-[#141210]/90 backdrop-blur-md border border-[#D4A359]/40 text-[#F2C069] font-bold text-base shadow">
                      €{item.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Item Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Name & Origin */}
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <h3 className="font-serif-heading text-lg font-bold text-[#F4F0E6] group-hover:text-[#D4A359] transition-colors">
                            {item.name}
                          </h3>
                          {item.originalName && (
                            <p className="text-xs text-[#9E9586] italic">{item.originalName}</p>
                          )}
                        </div>

                        {item.rating && (
                          <div className="flex items-center gap-1 text-xs text-[#F5B83D] font-bold bg-[#221E19] px-2 py-0.5 rounded border border-[#383023]">
                            <Star className="w-3 h-3 fill-[#F5B83D]" />
                            <span>{item.rating}</span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#BCB2A3] leading-relaxed line-clamp-2 mt-2">
                        {item.description}
                      </p>

                      {/* Dietary Badges */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {item.dietary.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded bg-[#221F1A] text-[#C4BCB0] border border-[#332D24] capitalize"
                          >
                            {tag.replace('-', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions: Info button & Pre-Order Add */}
                    <div className="pt-3 border-t border-[#29241D] flex items-center justify-between gap-2">
                      <button
                        onClick={() => setActiveDetailItem(item)}
                        className="text-xs text-[#A89F90] hover:text-[#D4A359] flex items-center gap-1 py-1.5 px-2.5 rounded-lg hover:bg-[#221F1A] transition-colors"
                        title="View details & story"
                      >
                        <Info className="w-3.5 h-3.5 text-[#D4A359]" />
                        <span>Story & Details</span>
                      </button>

                      {/* Quantity Controls */}
                      {qty > 0 ? (
                        <div className="flex items-center gap-2 bg-[#221E18] border border-[#D4A359]/40 rounded-lg p-1">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="w-6 h-6 rounded bg-[#181512] hover:bg-[#2E2820] text-[#EDE8DF] flex items-center justify-center transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#F2C069] px-1 min-w-[16px] text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => handleAddItem(item)}
                            className="w-6 h-6 rounded bg-[#D4A359] text-black flex items-center justify-center transition-colors hover:brightness-110"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddItem(item)}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#201D18] hover:bg-[#D4A359] text-[#D8D0C3] hover:text-black border border-[#383126] hover:border-[#D4A359] transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Tray</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Floating Pre-Order Tray Banner (When customer has selected items) */}
        {totalItemsCount > 0 && (
          <div className="fixed bottom-20 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-lg z-30 animate-bounce-short">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#1D1A16]/95 border-2 border-[#D4A359] shadow-2xl shadow-black/90 flex flex-col sm:flex-row items-center justify-between gap-3 backdrop-blur-xl">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-10 h-10 rounded-xl bg-[#D4A359] text-black flex items-center justify-center font-bold shrink-0">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-[#A89F90]">
                    {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} in Tray
                  </div>
                  <div className="text-sm sm:text-base font-bold text-[#F4EFE6]">
                    Total: <span className="text-[#F2C069] font-mono">€{orderTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => onUpdatePreOrder([])}
                  className="p-1.5 text-xs text-[#8E8678] hover:text-[#EDE8DF] hover:bg-[#28241E] rounded-lg shrink-0"
                  title="Clear Tray"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  id="btn-tray-order"
                  onClick={onOpenCheckout}
                  className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#C59341] to-[#D4A359] text-black text-xs sm:text-sm font-bold shadow hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Order Now</span>
                </button>

                <button
                  id="btn-tray-reserve"
                  onClick={onOpenReservationWithOrder}
                  className="flex-1 sm:flex-initial px-3 py-2.5 rounded-xl bg-[#27221B] border border-[#3E3426] hover:border-[#D4A359]/60 text-[#EDE7DE] text-xs sm:text-sm font-semibold hover:bg-[#332C22] active:scale-95 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <span>Book Table</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Item Details Modal */}
        {activeDetailItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#181614] border border-[#383126] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl space-y-0 relative">
              {/* Close Button */}
              <button
                onClick={() => setActiveDetailItem(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Image */}
              <div className="relative h-60 w-full">
                <img
                  src={activeDetailItem.image}
                  alt={activeDetailItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181614] via-transparent to-black/20" />
                <span className="absolute bottom-3 left-4 px-3 py-1 rounded-lg bg-[#141210]/90 border border-[#D4A359]/40 text-[#F2C069] font-bold text-lg">
                  €{activeDetailItem.price.toFixed(2)}
                </span>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-serif-heading text-2xl font-bold text-[#F5F1E8]">
                    {activeDetailItem.name}
                  </h3>
                  {activeDetailItem.originalName && (
                    <p className="text-xs text-[#D4A359]">{activeDetailItem.originalName}</p>
                  )}
                </div>

                <p className="text-sm text-[#C4BCB0] leading-relaxed">
                  {activeDetailItem.description}
                </p>

                {/* Cultural/Origin Story */}
                {activeDetailItem.originStory && (
                  <div className="p-3.5 rounded-xl bg-[#201D19] border-l-3 border-[#D4A359] text-xs text-[#D1C9BD] space-y-1">
                    <span className="font-semibold text-[#D4A359] uppercase tracking-wider block text-[10px]">
                      Heritage & Craft
                    </span>
                    <p>{activeDetailItem.originStory}</p>
                  </div>
                )}

                {/* Ingredients */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8E8678] mb-2">
                    Key Ingredients & Preparation
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeDetailItem.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="text-xs px-2.5 py-1 rounded-md bg-[#24201A] text-[#D8D2C5] border border-[#332D23]"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-[#29241D] flex items-center justify-between">
                  <span className="text-xs text-[#9E9586]">
                    Category: <strong className="text-[#EDE8DF] capitalize">{activeDetailItem.category.replace('-', ' ')}</strong>
                  </span>

                  <button
                    onClick={() => {
                      handleAddItem(activeDetailItem);
                      setActiveDetailItem(null);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C59341] to-[#D4A359] text-black font-bold text-xs sm:text-sm flex items-center gap-2 hover:brightness-110 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Pre-Order Tray</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
