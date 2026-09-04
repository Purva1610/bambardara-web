import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';

import { FaCheck, FaBed, FaSwimmingPool, FaSnowflake, FaWifi, FaTv, FaBath, FaShower, FaCoffee, FaGlassMartiniAlt, FaConciergeBell, FaUserTie, FaLeaf, FaDoorOpen, FaDesktop, FaUser, FaFire, FaFan, FaBroom, FaTractor, FaWater, FaCampground, FaHome, FaEgg, FaChair, FaShieldAlt, FaCouch } from 'react-icons/fa';

const GOLD = '#D4AF37';

const AMENITY_ICONS = {
  'Private Plunge Pool': FaSwimmingPool,
  'Plunge Pool': FaSwimmingPool,
  'Pool': FaSwimmingPool,
  'King Size Bed': FaBed,
  'Queen Size Bed': FaBed,
  'Double Bed': FaBed,
  'Twin Beds': FaBed,
  'Queen + Twin Bed': FaBed,
  '3 King Size Beds': FaBed,
  'Bed': FaBed,
  'Air Conditioning': FaSnowflake,
  'AC': FaSnowflake,
  'Mini Bar': FaGlassMartiniAlt,
  'Bar': FaGlassMartiniAlt,
  'Coffee Machine': FaCoffee,
  'Coffee Maker': FaCoffee,
  'Coffee': FaCoffee,
  'Balcony': FaDoorOpen,
  'Private Terrace': FaDoorOpen,
  'Terrace': FaDoorOpen,
  'Porch': FaDoorOpen,
  'Outdoor Seating': FaDoorOpen,
  'Room Service': FaConciergeBell,
  'Service': FaConciergeBell,
  'WiFi': FaWifi,
  'Wi-Fi': FaWifi,
  'Internet': FaWifi,
  'Limited WiFi': FaWifi,
  'Smart TV': FaTv,
  'TV': FaTv,
  'Jacuzzi': FaBath,
  'Bathtub': FaBath,
  'Bath': FaBath,
  'Rain Shower': FaShower,
  'Shower': FaShower,
  'Butler Service': FaUserTie,
  'Butler': FaUserTie,
  'Garden Terrace': FaLeaf,
  'Garden View': FaLeaf,
  'Garden Access': FaLeaf,
  'Garden': FaLeaf,
  'Courtyard View': FaLeaf,
  'Courtyard': FaLeaf,
  'Verandah': FaLeaf,
  'Work Desk': FaDesktop,
  'Desk': FaDesktop,
  'Bath Robes': FaUser,
  'Robe': FaUser,
  'Fireplace': FaFire,
  'Fire': FaFire,
  'Campfire': FaFire,
  'Ceiling Fan': FaFan,
  'Fan': FaFan,
  'Shared Bathroom': FaShower,
  'Private Bathroom': FaShower,
  'Bathroom': FaShower,
  'Housekeeping': FaBroom,
  'Cleaning': FaBroom,
  'Farm Tour': FaTractor,
  'Tour': FaTractor,
  'River View': FaWater,
  'River': FaWater,
  'Canvas Tent': FaCampground,
  'Tent': FaCampground,
  'Shared Facilities': FaHome,
  'Hot Water': FaShower,
  'Water': FaShower,
  'Breakfast Included': FaEgg,
  'Breakfast': FaEgg,
  'Meals': FaEgg,
  'Deck Chair': FaChair,
  'Chair': FaChair,
  'Mosquito Net': FaShieldAlt,
  'Net': FaShieldAlt,
  'Outdoor Rain Shower': FaShower,
  'Pool View': FaSwimmingPool,
  'Private Balcony': FaDoorOpen,
  'Lounge Area': FaCouch,
  'Lounge': FaCouch,
  'Dipping Pool': FaSwimmingPool,
};

const getAmenityIcon = (amenity) => {
  const IconComponent = AMENITY_ICONS[amenity];
  if (IconComponent) {
    return <IconComponent className="h-5 w-5" style={{ color: GOLD }} />;
  }
  return <FaCheck className="h-5 w-5" style={{ color: GOLD }} />;
};

const ROOMS = [
  {
    id: 'valley-villa',
    name: 'The Valley Villas',
    type: 'Villa',
    price: 34000,
    size: '1,850 sq ft',
    guests: '2-4 Guests',
    beds: '2 Bedrooms',
    view: 'Valley View',
    image: 'resort-and-villas-2',
    gallery: ['resort-and-villas-2', 'resort-and-villas-3', 'resort-and-villas-4', 'resort-and-villas-5'],
    description: 'Five stone villas along the upper ridge, each turned a few degrees off its neighbour so no terrace looks onto another. A private plunge pool runs the length of the deck and falls away into the valley.',
    longDescription: 'Each villa is a private world of its own. Built from local stone with lime-plaster walls, the interiors are cooled by cross-ventilation and warmed by the sun. The plunge pool is fed from the estate spring, and the deck is large enough for a long table under the stars.',
    amenities: ['Private Plunge Pool', 'King Size Bed', 'Air Conditioning', 'Mini Bar', 'Coffee Machine', 'Balcony', 'Room Service', 'WiFi', 'Smart TV', 'Jacuzzi', 'Private Terrace', 'Butler Service'],
    charges: { base: 34000, tax: '12% GST', cleaning: 'Included', breakfast: 'Included', wifi: 'Complimentary' },
  },
  {
    id: 'villa-2',
    name: 'The Valley Villa — Ridge',
    type: 'Villa',
    price: 38000,
    size: '2,200 sq ft',
    guests: '2-6 Guests',
    beds: '3 Bedrooms',
    view: 'Panoramic Valley',
    image: 'resort-and-villas-3',
    gallery: ['resort-and-villas-3', 'resort-and-villas-4', 'resort-and-villas-5', 'resort-and-villas-2'],
    description: 'The largest villa, positioned at the highest point of the ridge with unobstructed valley views and a larger private pool.',
    longDescription: 'Perched at the estate\'s highest point, this is the crown jewel. Three bedrooms, a sprawling terrace, and a pool that seems to float over the valley. Designed for families or groups who want space, silence, and spectacle.',
    amenities: ['Private Plunge Pool', '3 King Size Beds', 'Air Conditioning', 'Mini Bar', 'Coffee Machine', 'Balcony', 'Room Service', 'WiFi', 'Smart TV', 'Jacuzzi', 'Private Terrace', 'Butler Service', 'Fireplace'],
    charges: { base: 38000, tax: '12% GST', cleaning: 'Included', breakfast: 'Included', wifi: 'Complimentary' },
  },
  {
    id: 'villa-3',
    name: 'The Valley Villa — Garden',
    type: 'Villa',
    price: 36000,
    size: '2,000 sq ft',
    guests: '2-5 Guests',
    beds: '2 Bedrooms',
    view: 'Garden View',
    image: 'resort-and-villas-4',
    gallery: ['resort-and-villas-4', 'resort-and-villas-5', 'resort-and-villas-2', 'resort-and-villas-3'],
    description: 'Set among the mango orchard with direct garden access, a smaller plunge pool, and an outdoor rain shower.',
    longDescription: 'Nestled among the mango trees, this villa is all about soft light and garden scents. The outdoor rain shower is fed by a bamboo pipe, and the plunge pool is shaded by the canopy. Perfect for honeymooners or quiet retreats.',
    amenities: ['Private Plunge Pool', 'King Size Bed', 'Air Conditioning', 'Mini Bar', 'Coffee Machine', 'Balcony', 'Room Service', 'WiFi', 'Smart TV', 'Outdoor Rain Shower', 'Garden Access'],
    charges: { base: 36000, tax: '12% GST', cleaning: 'Included', breakfast: 'Included', wifi: 'Complimentary' },
  },
  {
    id: 'luxury-suite',
    name: 'Luxury Suite — Orchard',
    type: 'Suite',
    price: 21500,
    size: '940 sq ft',
    guests: '1-2 Guests',
    beds: '1 Bedroom',
    view: 'Garden View',
    image: 'luxury-hotel-rooms-and-suites-3',
    gallery: ['luxury-hotel-rooms-and-suites-2', 'luxury-hotel-rooms-and-suites-3', 'luxury-hotel-rooms-and-suites-4'],
    description: 'Set inside the mango orchard, with lime-plaster walls, a deep soaking tub cut from local basalt, and shutters that open onto fruit you are welcome to pick before breakfast.',
    longDescription: 'Walls of lime plaster keep the room cool in summer and warm in winter. The basalt tub is carved from a single block and filled with filtered spring water. Windows open onto the orchard, where you can pick mangoes, guavas, or chikoo depending on the season.',
    amenities: ['Garden Terrace', 'Queen Size Bed', 'Air Conditioning', 'Mini Bar', 'Coffee Machine', 'Bathtub', 'Room Service', 'WiFi', 'Smart TV', 'Work Desk', 'Bath Robes'],
    charges: { base: 21500, tax: '12% GST', cleaning: 'Included', breakfast: 'Included', wifi: 'Complimentary' },
  },
  {
    id: 'luxury-suite-2',
    name: 'Luxury Suite — Pool Facing',
    type: 'Suite',
    price: 24000,
    size: '1,100 sq ft',
    guests: '1-2 Guests',
    beds: '1 Bedroom',
    view: 'Pool View',
    image: 'luxury-hotel-rooms-and-suites-4',
    gallery: ['luxury-hotel-rooms-and-suites-4', 'luxury-hotel-rooms-and-suites-3', 'luxury-hotel-rooms-and-suites-2'],
    description: 'Overlooking the main infinity pool with a private balcony, rain shower, and dedicated lounge area.',
    longDescription: 'The pool-facing suite is designed for those who want to be at the centre of the action without sacrificing privacy. The balcony runs the full width of the room, and the rain shower opens onto a private courtyard with a dipping pool.',
    amenities: ['Pool View', 'King Size Bed', 'Air Conditioning', 'Mini Bar', 'Coffee Machine', 'Rain Shower', 'Room Service', 'WiFi', 'Smart TV', 'Private Balcony', 'Lounge Area'],
    charges: { base: 24000, tax: '12% GST', cleaning: 'Included', breakfast: 'Included', wifi: 'Complimentary' },
  },
  {
    id: 'farm-1',
    name: 'Farmhouse Room — Courtyard',
    type: 'Farm Stay',
    price: 14000,
    size: '620 sq ft',
    guests: '1-3 Guests',
    beds: '1 Bedroom',
    view: 'Courtyard View',
    image: 'organic-farming-and-farm-stay-3',
    gallery: ['organic-farming-and-farm-stay-2', 'organic-farming-and-farm-stay-3', 'organic-farming-and-farm-stay-4'],
    description: 'The original farmhouse, kept as it was and quietly brought up to standard. Guests here wake with the dairy at four if they choose to, and most choose to at least once.',
    longDescription: 'This is the heart of the estate. The farmhouse has been in the family for three generations. The rooms are simple, honest, and filled with character—exposed stone, wooden beams, and verandahs that look out onto the dairy and the vegetable garden.',
    amenities: ['Courtyard View', 'Double Bed', 'Ceiling Fan', 'Mini Bar', 'Coffee Maker', 'Shared Bathroom', 'Housekeeping', 'WiFi', 'Verandah', 'Farm Tour'],
    charges: { base: 14000, tax: '12% GST', cleaning: 'Included', breakfast: 'Included', wifi: 'Complimentary' },
  },
  {
    id: 'farm-2',
    name: 'Farmhouse Room — Garden',
    type: 'Farm Stay',
    price: 16000,
    size: '720 sq ft',
    guests: '1-3 Guests',
    beds: '1 Bedroom',
    view: 'Garden View',
    image: 'organic-farming-and-farm-stay-2',
    gallery: ['organic-farming-and-farm-stay-2', 'organic-farming-and-farm-stay-3', 'organic-farming-and-farm-stay-4'],
    description: 'A larger farmhouse room with private garden access, an outdoor seating area, and a traditional clay water cooler.',
    longDescription: 'A step up from the courtyard room, this one has its own patch of garden, a traditional clay water cooler that keeps water naturally chilled, and an outdoor seating area perfect for morning coffee or evening chai.',
    amenities: ['Garden Access', 'Double Bed', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Private Bathroom', 'Housekeeping', 'WiFi', 'Outdoor Seating', 'Farm Tour'],
    charges: { base: 16000, tax: '12% GST', cleaning: 'Included', breakfast: 'Included', wifi: 'Complimentary' },
  },
  {
    id: 'camp-1',
    name: 'Riverside Tent — Premium',
    type: 'Tent',
    price: 11500,
    size: '480 sq ft',
    guests: '1-2 Guests',
    beds: 'Twin Beds',
    view: 'River View',
    image: 'camping-2',
    gallery: ['camping', 'camping-2'],
    description: 'Six canvas pavilions on timber platforms at the water line, with proper beds, hot water drawn from the estate boiler, and a fire lit for you at dusk.',
    longDescription: 'Not camping as you remember it. These are proper canvas pavilions on raised timber platforms with real beds, hot water, and a fire lit for you at dusk. The river is right there, and the night sounds are extraordinary.',
    amenities: ['River View', 'Twin Beds', 'Canvas Tent', 'Shared Facilities', 'Campfire', 'Hot Water', 'Breakfast Included', 'Limited WiFi', 'Deck Chair', 'Mosquito Net'],
    charges: { base: 11500, tax: '12% GST', cleaning: 'Included', breakfast: 'Included', wifi: 'Limited' },
  },
  {
    id: 'camp-2',
    name: 'Riverside Tent — Family',
    type: 'Tent',
    price: 14000,
    size: '650 sq ft',
    guests: '2-4 Guests',
    beds: 'Queen + Twin',
    view: 'River View',
    image: 'camping',
    gallery: ['camping', 'camping-2'],
    description: 'A larger family tent with a queen and twin bed, a small porch, and shared bathroom facilities nearby.',
    longDescription: 'The family tent is spacious enough for two adults and two children. A queen and a twin bed, a small porch with deck chairs, and shared bathroom facilities just a few steps away. The river lulls you to sleep and the birds wake you at dawn.',
    amenities: ['River View', 'Queen + Twin Bed', 'Canvas Tent', 'Shared Facilities', 'Campfire', 'Hot Water', 'Breakfast Included', 'Limited WiFi', 'Porch', 'Mosquito Net'],
    charges: { base: 14000, tax: '12% GST', cleaning: 'Included', breakfast: 'Included', wifi: 'Limited' },
  },
];

const RoomDetail = () => {
  const { id } = useParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const room = ROOMS.find(r => r.id === id);

  if (!room) {
    return <Navigate to="/stays" replace />;
  }

  return (
    <main className="taj-bg-cream">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <EstateImage
            slug={room.image}
            alt={room.name}
            sizes="100vw"
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-editorial flex-col justify-end px-6 pb-20 md:px-10 md:pb-28">
          <Reveal>
            <div className="taj-divider mb-8">
              <span className="taj-section-subtitle">{room.type}</span>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-extralight leading-[0.95] text-white tracking-tight">
              {room.name}
              <span className="block mt-4 italic font-light text-[#D4AF37] tracking-wide">
                {room.view}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-white/70">{room.guests}</span>
                <span className="h-1 w-1 rounded-full bg-[#D4AF37]/60" />
                <span className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-white/70">{room.beds}</span>
                <span className="h-1 w-1 rounded-full bg-[#D4AF37]/60" />
                <span className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-white/70">{room.size}</span>
              </div>
              <div className="bg-[#D4AF37] px-5 py-2">
                <span className="font-heading text-lg text-[#1a1a1a]">₹{room.price.toLocaleString()}</span>
                <span className="font-body text-[0.65rem] text-[#1a1a1a]/70 ml-1">/night</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Room Details */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left - Gallery & Description */}
            <div className="lg:col-span-8">
              <Reveal>
                <div className="mb-12">
                  <div className="taj-divider mb-8">
                    <span className="taj-section-subtitle">Overview</span>
                  </div>
                  <p className="font-body text-[0.95rem] font-light leading-[1.9] text-light-charcoal">
                    {room.longDescription}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="mb-12">
                  <div className="taj-divider mb-8">
                    <span className="taj-section-subtitle">Gallery</span>
                  </div>
                  <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-4 taj-image-frame">
                    <EstateImage
                      slug={room.gallery[activeImageIndex]}
                      alt={`${room.name} - Photo ${activeImageIndex + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex gap-3">
                    {room.gallery.map((slug, idx) => (
                      <button
                        key={slug}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          activeImageIndex === idx ? 'border-[#D4AF37]' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <EstateImage slug={slug} alt={`Thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="mb-12">
                  <div className="taj-divider mb-8">
                    <span className="taj-section-subtitle">Amenities</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {room.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-3 taj-card p-4">
                        <span className="text-lg flex-shrink-0">{getAmenityIcon(amenity)}</span>
                        <span className="font-body text-sm text-light-charcoal">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right - Booking Card */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <Reveal>
                  <div className="taj-card p-8">
                    <div className="mb-6">
                      <div className="taj-divider mb-6">
                        <span className="taj-section-subtitle">Book Your Stay</span>
                      </div>
                      <div className="text-center mb-6">
                        <span className="font-heading text-4xl font-extralight text-[#1a1a1a]">₹{room.price.toLocaleString()}</span>
                        <span className="font-body text-sm text-light-charcoal">/night</span>
                      </div>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Booking request sent!'); }}>
                      <div>
                        <label className="block font-body text-[0.625rem] uppercase tracking-label text-light-charcoal mb-2">Check-in *</label>
                        <input type="date" required className="w-full border border-stone bg-ivory-white px-4 py-3 font-body text-sm" />
                      </div>
                      <div>
                        <label className="block font-body text-[0.625rem] uppercase tracking-label text-light-charcoal mb-2">Check-out *</label>
                        <input type="date" required className="w-full border border-stone bg-ivory-white px-4 py-3 font-body text-sm" />
                      </div>
                      <div>
                        <label className="block font-body text-[0.625rem] uppercase tracking-label text-light-charcoal mb-2">Guests *</label>
                        <select className="w-full border border-stone bg-ivory-white px-4 py-3 font-body text-sm">
                          <option>1 Guest</option>
                          <option>2 Guests</option>
                          <option>3 Guests</option>
                          <option>4 Guests</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-body text-[0.625rem] uppercase tracking-label text-light-charcoal mb-2">Your Name *</label>
                        <input type="text" required className="w-full border border-stone bg-ivory-white px-4 py-3 font-body text-sm" placeholder="Enter your name" />
                      </div>
                      <div>
                        <label className="block font-body text-[0.625rem] uppercase tracking-label text-light-charcoal mb-2">Phone *</label>
                        <input type="tel" required className="w-full border border-stone bg-ivory-white px-4 py-3 font-body text-sm" placeholder="+91 98765 43210" />
                      </div>
                      <div>
                        <label className="block font-body text-[0.625rem] uppercase tracking-label text-light-charcoal mb-2">Email</label>
                        <input type="email" className="w-full border border-stone bg-ivory-white px-4 py-3 font-body text-sm" placeholder="your@email.com" />
                      </div>
                      <button type="submit" className="taj-btn-primary w-full mt-6">
                        Book Now
                      </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-stone/50">
                      <h4 className="font-heading text-sm font-extralight text-[#1a1a1a] mb-4">Charges Include</h4>
                      <ul className="space-y-2">
                        {Object.entries(room.charges).map(([key, value]) => (
                          <li key={key} className="flex items-center justify-between font-body text-sm text-light-charcoal">
                            <span className="capitalize">{key}</span>
                            <span className="text-[#1a1a1a]">{value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RoomDetail;
