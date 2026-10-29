import React, { useEffect, useRef, useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Phone, 
  Clock, 
  Share2, 
  ExternalLink, 
  Compass, 
  Layers, 
  Copy, 
  Check, 
  Car, 
  Building2,
  CalendarCheck
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/initialData';
import L from 'leaflet';

export const IntegratedMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [activeTileLayer, setActiveTileLayer] = useState<'dark' | 'standard'>('dark');

  const { lat, lng } = RESTAURANT_INFO.coordinates;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy existing instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize map
    const map = L.map(mapContainerRef.current, {
      center: [lat, lng],
      zoom: 16,
      zoomControl: false,
      scrollWheelZoom: false,
    });

    // Custom dark tile layer matching the pub's aesthetics
    const darkTileLayer = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        maxZoom: 19,
      }
    );

    darkTileLayer.addTo(map);

    // Custom Pub Marker Icon
    const customIcon = L.divIcon({
      className: 'custom-pub-marker',
      html: `
        <div style="
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: #191613;
          border: 2px solid #D4A359;
          border-radius: 50%;
          box-shadow: 0 4px 16px rgba(0,0,0,0.6);
          color: #D4A359;
          font-weight: bold;
          font-family: serif;
        ">
          <span style="font-size: 18px; font-weight: 800;">M</span>
          <div style="
            position: absolute;
            bottom: -6px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 6px solid #D4A359;
          "></div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 44],
      popupAnchor: [0, -42],
    });

    // Marker
    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

    const popupContent = `
      <div style="font-family: sans-serif; padding: 4px 2px; color: #111;">
        <h4 style="margin: 0 0 4px; font-size: 15px; font-weight: 700; color: #8A5E1C;">Restaurant Museum Pub</h4>
        <p style="margin: 0 0 6px; font-size: 12px; color: #444;">Rruga Shemsi Ahmeti, Mitrovica e Veriut</p>
        <div style="font-size: 11px; font-weight: 600; color: #B37D2E; margin-bottom: 6px;">★ 4.6 (43 reviews) · Ottoman Bath Hamam</div>
        <a href="https://maps.google.com/?q=VVQC+68+Mitrovica" target="_blank" style="display: inline-block; background: #C59341; color: white; padding: 4px 10px; border-radius: 6px; font-size: 11px; text-decoration: none; font-weight: 600;">Open in Google Maps</a>
      </div>
    `;

    marker.bindPopup(popupContent);

    // Custom Zoom controls
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [lat, lng]);

  const copyAddress = () => {
    navigator.clipboard.writeText(
      `${RESTAURANT_INFO.name}, ${RESTAURANT_INFO.address}, ${RESTAURANT_INFO.city} (Plus Code: ${RESTAURANT_INFO.plusCode})`
    );
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([lat, lng], 16, { animate: true });
    }
  };

  const nearbyPlaces = [
    { name: 'Restaurant No. 1', rating: 4.6, reviews: 48, tag: 'Family-friendly' },
    { name: 'Restaurant Ura [RTU]', rating: 4.5, reviews: 147, tag: 'Restaurant & River View' },
    { name: 'Restaurant RIVERSIDE', rating: 3.8, reviews: 4, tag: 'Scenic riverside' },
    { name: 'Restaurant Koha', rating: 4.5, reviews: 80, tag: 'Balkan Traditional' },
  ];

  return (
    <section id="location" className="py-20 bg-[#11100F] relative border-t border-[#26221D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#201D19] border border-[#D4A359]/30 text-xs font-semibold text-[#D4A359] uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Integrated Location Map</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold text-[#F7F4EB]">
            Find Us in Mitrovica
          </h2>
          <p className="text-[#A89F90] text-sm sm:text-base">
            Located on historical Rruga Shemsi Ahmeti, easily accessible with nearby parking and riverside walking paths.
          </p>
        </div>

        {/* 2-Column Layout: Location Details & Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Business Location & Schedule Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-[#181614] border border-[#302B22] shadow-xl space-y-6">
              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-xs font-bold text-[#F2BD63] uppercase tracking-wider">
                    {RESTAURANT_INFO.openingHours.thursdayStatus}
                  </span>
                </div>
                <span className="text-xs text-[#8E8678]">Mitrovica e Veriut</span>
              </div>

              {/* Address Box */}
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-[#8E8678] font-bold block">
                  Official Address
                </span>
                <div className="p-3.5 rounded-xl bg-[#1F1C18] border border-[#332C22] flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#D4A359] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-[#EDE8DF]">{RESTAURANT_INFO.address}</p>
                      <p className="text-xs text-[#9E9587] mt-0.5">Plus Code: <span className="text-[#D4A359] font-mono">{RESTAURANT_INFO.plusCode}</span></p>
                    </div>
                  </div>
                  <button
                    onClick={copyAddress}
                    className="p-1.5 rounded-lg bg-[#28231C] text-[#C4BCB0] hover:text-[#D4A359] hover:bg-[#332D24] transition-colors shrink-0"
                    title="Copy Address"
                  >
                    {copiedAddress ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Contact & Social */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="p-3 rounded-xl bg-[#1F1C18] border border-[#332C22] hover:border-[#D4A359]/40 flex items-center gap-2.5 group transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#D4A359]" />
                  <div>
                    <span className="text-[10px] text-[#8E8678] block">Direct Phone</span>
                    <span className="text-xs font-bold text-[#EDE8DF] group-hover:text-[#D4A359] transition-colors">{RESTAURANT_INFO.phone}</span>
                  </div>
                </a>

                <a
                  href={RESTAURANT_INFO.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-[#1F1C18] border border-[#332C22] hover:border-[#D4A359]/40 flex items-center gap-2.5 group transition-colors"
                >
                  <Building2 className="w-4 h-4 text-[#D4A359]" />
                  <div>
                    <span className="text-[10px] text-[#8E8678] block">Official Page</span>
                    <span className="text-xs font-bold text-[#EDE8DF] group-hover:text-[#D4A359] transition-colors">facebook.com</span>
                  </div>
                </a>
              </div>

              {/* Operating Hours Table */}
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-[#8E8678] font-bold block flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D4A359]" />
                  <span>Weekly Operating Schedule</span>
                </span>
                <div className="rounded-xl bg-[#1F1C18] border border-[#332C22] p-3 text-xs space-y-1.5">
                  {RESTAURANT_INFO.openingHours.schedule.map((item) => (
                    <div key={item.day} className="flex justify-between items-center py-0.5 border-b border-[#29241D] last:border-0">
                      <span className="text-[#A89F90]">{item.day}</span>
                      <span className="text-[#EDE8DF] font-medium font-mono">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <a
                  href="https://maps.google.com/?q=VVQC+68+Mitrovica"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#C59341] to-[#D4A359] text-black font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 shadow hover:brightness-110 active:scale-98 transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Driving Directions</span>
                </a>
              </div>
            </div>

            {/* People Also Search For (From prompt) */}
            <div className="p-4 rounded-xl bg-[#181614] border border-[#2B2720] space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8E8678] block">
                People Also Search For Nearby
              </span>
              <div className="grid grid-cols-2 gap-2">
                {nearbyPlaces.map((pl) => (
                  <div key={pl.name} className="p-2 rounded-lg bg-[#141210] border border-[#26221B] text-[11px]">
                    <div className="font-semibold text-[#EDE8DF] truncate">{pl.name}</div>
                    <div className="text-[#8E8678] text-[10px] mt-0.5">★ {pl.rating} ({pl.reviews}) · {pl.tag}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Leaflet Map Container */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-[450px] lg:h-full min-h-[460px] rounded-2xl overflow-hidden border border-[#383126] shadow-2xl">
              {/* Map Mount Point */}
              <div ref={mapContainerRef} className="w-full h-full z-10" />

              {/* Map Floating Controls Overlay */}
              <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                <div className="px-3 py-1.5 rounded-lg bg-[#141210]/90 backdrop-blur-md border border-[#383126] text-xs font-semibold text-[#D4A359] shadow flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Restaurant Museum Pub · VVQC+68</span>
                </div>
              </div>

              {/* Recenter button */}
              <div className="absolute top-4 right-4 z-20">
                <button
                  onClick={handleRecenter}
                  className="px-3 py-1.5 rounded-lg bg-[#141210]/90 backdrop-blur-md border border-[#383126] text-xs text-[#EDE8DF] hover:text-[#D4A359] shadow flex items-center gap-1.5"
                  title="Recenter Map"
                >
                  <Compass className="w-3.5 h-3.5 text-[#D4A359]" />
                  <span>Center</span>
                </button>
              </div>

              {/* Map Footer Banner */}
              <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
                <div className="p-3 rounded-xl bg-[#141210]/90 backdrop-blur-md border border-[#383126] text-xs text-[#C4BCB0] flex items-center justify-between pointer-events-auto">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-[#D4A359]" />
                    <span>Free on-street parking & pedestrian entrance from Shemsi Ahmeti</span>
                  </div>
                  <a
                    href="https://maps.google.com/?q=VVQC+68+Mitrovica"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#D4A359] font-semibold hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>Maps app</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
