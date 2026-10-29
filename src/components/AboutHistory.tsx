import React, { useState } from 'react';
import { Landmark, Sparkles, Beer, Coffee, Clock, Users, Flame, HeartHandshake } from 'lucide-react';
import { POPULAR_TIMES_DATA, RESTAURANT_INFO } from '../data/initialData';

export const AboutHistory: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('Wednesday');
  const [hoveredHour, setHoveredHour] = useState<number | null>(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Current estimated rush level
  const activeHourData = hoveredHour !== null ? POPULAR_TIMES_DATA[hoveredHour] : POPULAR_TIMES_DATA[6]; // 6pm default

  return (
    <section id="about" className="py-20 bg-[#141311] relative border-t border-[#26221D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241F18] border border-[#D4A359]/30 text-xs font-semibold text-[#D4A359] uppercase tracking-wider">
            <Landmark className="w-3.5 h-3.5" />
            <span>Living Cultural Monument</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold text-[#F7F4EB]">
            A Pub Inside an Ancient Turkish Bath
          </h2>
          <p className="text-[#AFA698] text-base sm:text-lg leading-relaxed">
            Preserving centuries of Ottoman masonry in Mitrovica, Restaurant Museum Pub repurposes an authentic public hamam into a welcoming cultural sanctuary for gastronomy, craft drinks, and community.
          </p>
        </div>

        {/* 2-Column Grid: Architecture & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          {/* Left Column: Story Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#1A1815] border border-[#302B23] relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4A359]/5 rounded-full blur-3xl pointer-events-none" />
              
              <h3 className="font-serif-heading text-2xl font-bold text-[#EDE8DF] mb-4 flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-[#D4A359]" />
                Where Old & New Converge
              </h3>
              <p className="text-[#C2B7A8] text-sm sm:text-base leading-relaxed mb-4">
                Walk through our vaulted stone entrance and you instantly feel the historic temperature shift. Originally constructed during the Ottoman period as a civic steam bath (hamam), the structure features natural stone domes, arched alcoves, and thermal masonry that once echoed with flowing water and social assemblies.
              </p>
              <p className="text-[#C2B7A8] text-sm sm:text-base leading-relaxed mb-6">
                Today, soft amber lighting illuminates the exposed rock walls, rustic oak pub tables line the former bath chambers, and modern Italian espresso group heads hiss alongside artisan craft beer taps.
              </p>

              {/* Quote from Local Guide */}
              <div className="p-4 rounded-xl bg-[#201D19] border-l-4 border-[#D4A359] text-xs sm:text-sm text-[#D7CFC2] italic">
                “The pub is located in an old Turkish bath (sauna), with an interior which is a blend of old and new. Everywhere you look, you find history — whether you want a quick macchiato or a great evening pint.”
                <div className="mt-2 text-right not-italic font-semibold text-[#D4A359] text-xs">
                  — Srdjan Zivkovic, Google Local Guide (48 reviews)
                </div>
              </div>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#1A1815] border border-[#2E2A23] space-y-2">
                <Coffee className="w-6 h-6 text-[#D4A359]" />
                <h4 className="font-bold text-[#ECE7DE] text-sm">Legendary Macchiato</h4>
                <p className="text-xs text-[#A89F90] leading-relaxed">
                  Creamy, layered, and velvety. Prepared with genuine passion according to Kosovo's famous coffee standards.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#1A1815] border border-[#2E2A23] space-y-2">
                <Flame className="w-6 h-6 text-[#D4A359]" />
                <h4 className="font-bold text-[#ECE7DE] text-sm">Handmade Pierogi</h4>
                <p className="text-xs text-[#A89F90] leading-relaxed">
                  Delicate dough dumplings filled with potatoes, cheese or spiced meats, pan-fried in golden butter.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#1A1815] border border-[#2E2A23] space-y-2">
                <Beer className="w-6 h-6 text-[#D4A359]" />
                <h4 className="font-bold text-[#ECE7DE] text-sm">Curated Beer Vault</h4>
                <p className="text-xs text-[#A89F90] leading-relaxed">
                  Cold Bavarian Paulaner, Peja craft brews, and dark stouts served in heavy steins.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Photo Gallery */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#3A3329] shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1000&q=80"
                alt="Atmospheric Stone Vault Pub Interior"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[11px] uppercase tracking-wider text-[#D4A359] font-bold">The Main Vault</span>
                <p className="text-sm text-white font-medium">Stone arches preserved from the 18th century Ottoman Hamam</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-xl overflow-hidden border border-[#3A3329] group">
                <img
                  src="https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80"
                  alt="Espresso and Macchiato Craft"
                  className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-2.5 left-2.5 text-xs text-[#EAE4D8] font-medium">Artisan Coffee Bar</span>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-[#3A3329] group">
                <img
                  src="https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?auto=format&fit=crop&w=600&q=80"
                  alt="Draught Beer and Taps"
                  className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-2.5 left-2.5 text-xs text-[#EAE4D8] font-medium">Draft Beer Selection</span>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Times Interactive Section (From Google Maps Data in prompt) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#1A1815] border border-[#2E2A23] shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-[#D4A359] text-xs font-bold uppercase tracking-wider mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Live Google Maps Data</span>
              </div>
              <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-[#F7F4EB]">
                Popular Times · {selectedDay}s
              </h3>
              <p className="text-xs sm:text-sm text-[#A89F90]">
                {activeHourData.label ? `${activeHourData.time}: ${activeHourData.label}` : `Typical crowd at ${activeHourData.time}: ${activeHourData.occupancy}% occupancy`}
              </p>
            </div>

            {/* Day Selector Tabs */}
            <div className="flex flex-wrap items-center gap-1 bg-[#141210] p-1 rounded-lg border border-[#2A251E]">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    selectedDay === day
                      ? 'bg-[#D4A359] text-black font-bold'
                      : 'text-[#9E9587] hover:text-[#EDE8DF]'
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Graph Bars */}
          <div className="pt-4">
            <div className="h-32 flex items-end justify-between gap-1 sm:gap-2 border-b border-[#2C2720] pb-2">
              {POPULAR_TIMES_DATA.map((item, idx) => {
                const isHovered = hoveredHour === idx;
                const isPeak = item.occupancy >= 75;

                return (
                  <div
                    key={item.time}
                    onMouseEnter={() => setHoveredHour(idx)}
                    onMouseLeave={() => setHoveredHour(null)}
                    className="flex-1 flex flex-col items-center gap-1 group cursor-pointer"
                  >
                    <div className="w-full flex items-end justify-center h-28">
                      <div
                        style={{ height: `${item.occupancy}%` }}
                        className={`w-full max-w-[28px] rounded-t transition-all duration-300 ${
                          isHovered
                            ? 'bg-[#F2BD63] shadow-lg shadow-[#D4A359]/30'
                            : isPeak
                            ? 'bg-[#D4A359]'
                            : 'bg-[#40382E] group-hover:bg-[#85735B]'
                        }`}
                      />
                    </div>
                    <span className={`text-[10px] sm:text-xs transition-colors ${isHovered ? 'text-[#D4A359] font-bold' : 'text-[#857C70]'}`}>
                      {item.time}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-[#8E8677] pt-3">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#40382E]" /> Normal
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#D4A359]" /> Popular Peak
                </span>
              </div>
              <span className="text-[11px] text-[#A69C8E]">
                Hover over bars to inspect hourly table availability
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
