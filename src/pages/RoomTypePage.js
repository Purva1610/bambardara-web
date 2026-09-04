import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';

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

const URL_SLUGS = {
  Villa: 'villas',
  Suite: 'suites',
  'Farm Stay': 'farm-stay',
  Tent: 'tent',
};

const DISPLAY_LABELS = {
  Villa: 'Villas',
  Suite: 'Suites',
  'Farm Stay': 'Farm Stay',
  Tent: 'Tented Camp',
};

const REVERSE_SLUGS = Object.fromEntries(
  Object.entries(URL_SLUGS).map(([type, slug]) => [slug, type])
);

const RoomTypePage = () => {
  const { type } = useParams();
  const normalizedType = REVERSE_SLUGS[type] || type;
  const filteredRooms = ROOMS.filter(r => r.type === normalizedType);

  if (!normalizedType || !ROOMS.some(r => r.type === normalizedType)) {
    return <Navigate to="/stays" replace />;
  }

  const label = DISPLAY_LABELS[normalizedType] || normalizedType;

  return (
    <main className="taj-bg-cream">
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0">
          {normalizedType === 'Villa' ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/images/opt/resort-and-villas-2.jpg"
              className="h-full w-full object-cover"
            >
              <source src="/videos/villas.mp4" type="video/mp4" />
            </video>
          ) : (
            <EstateImage
              slug={filteredRooms[0]?.image || 'resort-and-villas-2'}
              alt={label}
              sizes="100vw"
              className="h-full w-full object-cover"
              priority
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-editorial flex-col justify-end px-6 pb-20 md:px-10 md:pb-28">
          <Reveal>
            <div className="taj-divider mb-8">
              <span className="taj-section-subtitle">Accommodations</span>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-extralight leading-[0.95] text-white tracking-tight">
              {label}
              <span className="block mt-4 italic font-light text-[#D4AF37] tracking-wide">
                {filteredRooms.length} options available
              </span>
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-8 max-w-2xl font-body text-[0.95rem] font-light leading-[1.9] text-white/80 tracking-wide">
              {filteredRooms[0]?.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Room List */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <Reveal>
            <div className="mb-16">
              <div className="taj-divider mb-8">
                <span className="taj-section-subtitle">Select Your Room</span>
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {filteredRooms.map((room, idx) => (
              <Reveal key={room.id} delay={idx * 100}>
                <Link to={`/room/${room.id}`} className="block">
                  <div className="taj-card cursor-pointer overflow-hidden">
                    <div className="taj-image-frame aspect-[16/10] relative">
                      <EstateImage
                        slug={room.image}
                        alt={room.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-4 py-1.5 bg-white/95 backdrop-blur-sm border border-[#D4AF37]/30">
                          <span className="font-body text-[0.6rem] uppercase tracking-[0.2em] text-[#1a1a1a] font-medium">
                            {room.type}
                          </span>
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-[#D4AF37] px-4 py-1.5">
                          <span className="font-heading text-sm text-[#1a1a1a]">
                            ₹{room.price.toLocaleString()}
                          </span>
                          <span className="font-body text-[0.6rem] text-[#1a1a1a]/70 ml-1">/night</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-body text-[0.65rem] uppercase tracking-[0.15em] text-light-charcoal">
                          {room.guests}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-[#D4AF37]/40" />
                        <span className="font-body text-[0.65rem] uppercase tracking-[0.15em] text-light-charcoal">
                          {room.beds}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-[#D4AF37]/40" />
                        <span className="font-body text-[0.65rem] uppercase tracking-[0.15em] text-light-charcoal">
                          {room.view}
                        </span>
                      </div>
                      <h3 className="font-heading text-[clamp(1.5rem,2.5vw,2rem)] font-extralight leading-[1.1] text-[#1a1a1a] tracking-tight">
                        {room.name}
                      </h3>
                      <p className="mt-3 font-body text-[0.85rem] font-light leading-[1.8] text-light-charcoal line-clamp-2">
                        {room.description}
                      </p>
                      <div className="mt-6 flex items-center gap-2 text-[#D4AF37]">
                        <span className="font-body text-[0.65rem] uppercase tracking-[0.2em]">View Details</span>
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default RoomTypePage;
