import { Link } from 'react-router-dom';
import {
  FaUtensils,
  FaLeaf,
  FaSeedling,
  FaClock,
  FaHeart,
  FaPlus,
  FaMinus,
} from 'react-icons/fa';
import { useState } from 'react';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';

const CULINARY_PHILOSOPHY = [
  {
    icon: FaSeedling,
    title: 'Farm to Table',
    description: 'Every ingredient travels from our organic farms to your plate within hours, ensuring peak freshness and flavor.',
  },
  {
    icon: FaHeart,
    title: 'Crafted with Care',
    description: 'Our chefs honor traditional recipes while embracing modern techniques, creating unforgettable culinary experiences.',
  },
  {
    icon: FaLeaf,
    title: 'Sustainable Practices',
    description: 'We practice zero-waste cooking, composting, and sustainable sourcing to protect our land for future generations.',
  },
];

const DINING_VENUES = [
  {
    title: 'The Estate Restaurant',
    subtitle: 'Fine Dining Under the Stars',
    description: 'Our signature restaurant offers panoramic valley views and an extensive menu featuring local Maharashtrian specialties alongside international favorites. Open for breakfast, lunch, and dinner.',
    hours: '7:00 AM - 11:00 PM',
    image: 'fine-dining-restaurant',
    features: ['Valley Views', 'Multi-Cuisine', 'Indoor & Outdoor Seating'],
  },
  {
    title: 'Garden Terrace',
    subtitle: 'Alfresco Dining',
    description: 'Dine surrounded by lush gardens and mountain breezes. Perfect for romantic dinners, family celebrations, and special occasions with customizable private dining experiences.',
    hours: 'Dinner Only | 6:30 PM - 10:30 PM',
    image: 'fine-dining-restaurant-2',
    features: ['Private Dining', 'Romantic Setting', 'Chef\'s Tasting Menu'],
  },
  {
    title: 'The Harvest Café',
    subtitle: 'Casual All-Day Dining',
    description: 'A relaxed café atmosphere serving freshly brewed coffee, homemade pastries, light meals, and snacks. Perfect for a quick bite between adventures.',
    hours: '6:30 AM - 8:00 PM',
    image: 'dining',
    features: ['Artisan Coffee', 'Fresh Pastries', 'Quick Service'],
  },
];

const THALI_ITEMS = [
  'Varan Bhaat',
  'Pithla Bhakri',
  'Thecha & Bhakri',
  'Bharli Vangi',
  'Batata Bhaji',
  'Zunka',
  'Usal',
  'Misal',
  'Seasonal Vegetable',
  'Takk / Mattha',
  'Papad & Loncha',
  'Gavran Chicken',
  'Sweets & Desserts',
];

const FEATURED_DISHES = [
  { name: 'Pithla Bhakri', slug: 'kolhapuri-food' },
  { name: 'Thecha & Bhakri', slug: 'dining' },
  { name: 'Zunka Bhakri', slug: 'fine-dining-restaurant' },
  { name: 'Bharli Vangi', slug: 'fine-dining-restaurant-2' },
  { name: 'Batata Bhaji', slug: 'kolhapuri-food' },
  { name: 'Usal Pav', slug: 'dining' },
];

const LOCAL_BREAKFAST = ['Pohe', 'Upma', 'Sabudana Khichadi', 'Thalipeeth', 'Kanda Pohe', 'Masala Dosa'];

const VILLAGE_SPECIALS = ['Gavran Chicken', 'Mattha / Taak', 'Puran Poli'];

const FOOD_FEATURES = [
  'Pure Veg & Non-Veg Options',
  'Organic & Chemical-Free',
  'Hygienic & Healthy Food',
  'Traditional Cooking Methods',
  'Family Restaurant & Food Court',
  'Outdoor & Indoor Dining',
  'Food Festival & Live Cooking',
];

const SIGNATURE_DISHES = [
  { name: 'Kolhapuri Pandhra Rassa', category: 'Local Specialties', spice: 'Mild' },
  { name: 'Tandoori Malvani Pomfret', category: 'Coastal Delights', spice: 'Medium' },
  { name: 'Organic Farm Salad Bowl', category: 'Healthy Choice', spice: 'None' },
  { name: 'Wood-Fired Margherita', category: 'Continental', spice: 'None' },
  { name: 'Puran Poli with Ghee', category: 'Traditional Desserts', spice: 'None' },
  { name: 'Pan-Asian Noodle Bowl', category: 'International', spice: 'Customizable' },
];

function DiningFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'DO I NEED TO MAKE A RESERVATION?',
      answer: 'Reservations are recommended for dinner at The Estate Restaurant and Garden Terrace, especially for private dining experiences. The Harvest Café operates on a walk-in basis. Guests can book through our reception or via the enquiry form.',
    },
    {
      question: 'ARE VEGETARIAN AND VEGAN OPTIONS AVAILABLE?',
      answer: 'Absolutely! We offer extensive vegetarian options reflecting Maharashtra\'s rich vegetarian cuisine. Vegan, gluten-free, and other dietary requirements can be accommodated with advance notice.',
    },
    {
      question: 'CAN I HAVE A PRIVATE DINING EXPERIENCE?',
      answer: 'Yes! We offer exclusive private dining experiences at the Garden Terrace, by the lake, or in your villa. Our team can customize menus, décor, and service to create unforgettable moments for proposals, anniversaries, or intimate celebrations.',
    },
    {
      question: 'WHERE DO YOUR INGREDIENTS COME FROM?',
      answer: 'Most of our produce comes from our own organic farms on the estate. What we don\'t grow ourselves is sourced from local sustainable farmers within 50km. Our dairy products come from our estate dairy farm, and seafood is fresh from the Konkan coast.',
    },
    {
      question: 'DO YOU ACCOMMODATE FOOD ALLERGIES?',
      answer: 'Yes, we take food allergies and intolerances very seriously. Please inform us of any dietary restrictions when making your reservation, and our chefs will prepare safe, delicious alternatives tailored to your needs.',
    },
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => (
        <div key={idx} className="border-b border-stone pb-4">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full flex items-center justify-between text-left group"
          >
            <h3 className="text-base md:text-lg font-light text-forest-green uppercase tracking-wide group-hover:text-copper transition-colors pr-4">
              {faq.question}
            </h3>
            <span className="flex-shrink-0 text-copper">
              {openIndex === idx ? <FaMinus className="text-sm" /> : <FaPlus className="text-sm" />}
            </span>
          </button>
          {openIndex === idx && (
            <div className="mt-4 text-light-charcoal font-light text-sm md:text-base leading-relaxed animate-fadeIn">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Dining() {
  return (
    <main className="bg-ivory-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full isolate">
          <EstateImage
            slug="fine-dining-restaurant"
            alt="Fine dining at Bambardara"
            sizes="100vw"
            priority={true}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-[5] bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <Reveal>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-ivory-white mb-6 leading-tight tracking-wide">
              Where Every Meal
              <span className="block italic text-muted-gold mt-2">Tells a Story</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-base md:text-lg text-ivory-white/90 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
              From sunrise breakfasts overlooking misty valleys to candlelit dinners under starry skies, 
              experience farm-fresh cuisine that celebrates the bounty of our land.
            </p>
          </Reveal>

          <Reveal delay={350}>
            <Link
              to="/enquire"
              className="inline-block px-10 py-4 bg-copper text-ivory-white text-sm tracking-[0.15em] uppercase font-light hover:bg-bronze transition-all duration-300 shadow-xl"
            >
              Reserve Your Table
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CULINARY PHILOSOPHY */}
      <section className="py-20 md:py-28 px-6 bg-warm-sand">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Reveal>
              <span className="text-copper uppercase tracking-[0.2em] text-xs font-body">Our Philosophy</span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-forest-green mt-4 mb-6">
                Rooted in Tradition,
                <span className="block italic text-copper">Grown with Purpose</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {CULINARY_PHILOSOPHY.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 100}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-copper/10 mb-6">
                    <item.icon className="w-7 h-7 text-copper" />
                  </div>
                  <h3 className="text-xl font-light text-forest-green mb-4">{item.title}</h3>
                  <p className="text-light-charcoal font-light leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DINING VENUES */}
      <section className="py-20 md:py-28 px-6 bg-ivory-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Reveal>
              <span className="text-copper uppercase tracking-[0.2em] text-xs font-body">Dining Destinations</span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-forest-green mt-4">
                Three Unique
                <span className="block italic text-copper">Culinary Experiences</span>
              </h2>
            </Reveal>
          </div>

          <div className="space-y-20">
            {DINING_VENUES.map((venue, idx) => (
              <Reveal key={venue.title} delay={idx * 100}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                  <div className={idx % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="aspect-[4/3] overflow-hidden shadow-2xl">
                      <EstateImage
                        slug={venue.image}
                        alt={venue.title}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>

                  <div className={idx % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <span className="text-copper uppercase tracking-[0.2em] text-xs font-body">{venue.subtitle}</span>
                    <h3 className="text-2xl md:text-3xl font-light text-forest-green mt-3 mb-4">{venue.title}</h3>
                    <p className="text-light-charcoal font-light leading-relaxed mb-6">
                      {venue.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-copper mb-6">
                      <FaClock className="w-4 h-4" />
                      <span className="text-sm font-light">{venue.hours}</span>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-8">
                      {venue.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-4 py-2 bg-copper/5 text-copper text-xs uppercase tracking-wide border border-copper/20"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <Link
                      to="/enquire"
                      className="inline-flex items-center gap-2 text-copper text-sm uppercase tracking-wide hover:text-bronze transition-colors group"
                    >
                      <span>Book Now</span>
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AUTHENTIC MAHARASHTRIAN THALI */}
      <section className="py-20 md:py-28 px-6 bg-ivory-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Reveal>
              <span className="text-copper uppercase tracking-[0.2em] text-xs font-body">Taste of Tradition, Fresh from Our Land</span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-forest-green mt-4">
                Authentic
                <span className="block italic text-copper">Maharashtrian Thali</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal>
              <div className="aspect-[4/3] overflow-hidden shadow-2xl">
                <EstateImage
                  slug="kolhapuri-food"
                  alt="Authentic Maharashtrian thali"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {THALI_ITEMS.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-light-charcoal font-light text-sm">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-copper" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-5">
              {FEATURED_DISHES.map((dish, idx) => (
                <Reveal key={dish.name} delay={idx * 60}>
                  <div className="aspect-square overflow-hidden shadow-lg">
                    <EstateImage
                      slug={dish.slug}
                      alt={dish.name}
                      sizes="(min-width: 1024px) 16vw, 45vw"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="mt-2 block text-center text-forest-green text-xs uppercase tracking-wide">
                    {dish.name}
                  </span>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-stone pt-14">
            <Reveal delay={100}>
              <span className="text-copper uppercase tracking-[0.2em] text-xs font-body">Local Breakfast</span>
              <div className="mt-4 flex flex-wrap gap-3">
                {LOCAL_BREAKFAST.map((item) => (
                  <span key={item} className="px-4 py-2 bg-warm-sand text-forest-green text-xs uppercase tracking-wide">
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={150}>
              <span className="text-copper uppercase tracking-[0.2em] text-xs font-body">Village Style Specials</span>
              <div className="mt-4 flex flex-wrap gap-3">
                {VILLAGE_SPECIALS.map((item) => (
                  <span key={item} className="px-4 py-2 bg-warm-sand text-forest-green text-xs uppercase tracking-wide">
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 border-t border-stone pt-10 text-center">
              {FOOD_FEATURES.map((feature) => (
                <span key={feature} className="text-light-charcoal font-light text-xs leading-snug">
                  {feature}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={250}>
            <p className="mt-14 text-center text-copper uppercase tracking-[0.2em] text-xs font-body">
              Bambardara Local Food — Taste the Tradition, Live the Experience
            </p>
          </Reveal>
        </div>
      </section>

      {/* FULL-WIDTH IMAGE DIVIDER */}
      <section className="relative h-[60vh] overflow-hidden">
        <EstateImage
          slug="dining"
          alt="Dining experience"
          sizes="100vw"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-deep-forest/50 flex items-center justify-center">
          <Reveal>
            <div className="text-center px-6">
              <FaUtensils className="w-12 h-12 text-muted-gold mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-ivory-white">
                Taste the Essence
                <span className="block italic text-muted-gold mt-2">of Maharashtra</span>
              </h2>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SIGNATURE DISHES */}
      <section className="py-20 md:py-28 px-6 bg-warm-sand">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Reveal>
              <span className="text-copper uppercase tracking-[0.2em] text-xs font-body">Menu Highlights</span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-forest-green mt-4 mb-6">
                Signature Dishes
                <span className="block italic text-copper">from Our Kitchen</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-light-charcoal font-light max-w-2xl mx-auto">
                A curated selection of guest favorites, each dish crafted with ingredients 
                harvested from our organic farms and prepared with generations of culinary wisdom.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SIGNATURE_DISHES.map((dish, idx) => (
              <Reveal key={dish.name} delay={idx * 60}>
                <div className="flex items-start justify-between border-b border-stone pb-4 group hover:border-copper transition-colors">
                  <div className="flex-1">
                    <h4 className="text-lg font-light text-forest-green group-hover:text-copper transition-colors">
                      {dish.name}
                    </h4>
                    <p className="text-sm text-copper mt-1">{dish.category}</p>
                  </div>
                  <span className="text-xs text-light-charcoal bg-ivory-white px-3 py-1 border border-stone">
                    {dish.spice}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <div className="text-center mt-12">
              <Link
                to="/enquire"
                className="inline-block px-8 py-3 border-2 border-copper text-copper text-sm tracking-[0.15em] uppercase font-light hover:bg-copper hover:text-ivory-white transition-all duration-300"
              >
                Request Full Menu
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRIVATE DINING CTA */}
      <section className="relative py-20 md:py-28 px-6 bg-deep-forest text-ivory-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <EstateImage
            slug="fine-dining-restaurant-2"
            alt="Background"
            sizes="100vw"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">
              Celebrate Life's
              <span className="block italic text-muted-gold mt-2">Special Moments</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-ivory-white/80 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
              From intimate proposals by the lake to family gatherings under the stars, 
              our private dining experiences are tailored to make your celebration unforgettable.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Link
              to="/enquire"
              className="inline-block px-10 py-4 bg-muted-gold text-deep-forest text-sm tracking-[0.15em] uppercase font-medium hover:bg-copper hover:text-ivory-white transition-all duration-300 shadow-xl"
            >
              Plan Your Experience
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 md:py-28 px-6 bg-ivory-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Reveal>
              <span className="text-copper uppercase tracking-[0.2em] text-xs font-body">Your Questions Answered</span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-forest-green mt-4">
                Frequently Asked
                <span className="block italic text-copper">Questions</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <DiningFAQ />
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 px-6 bg-copper text-center">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h3 className="text-2xl md:text-3xl font-light text-ivory-white mb-6">
              Ready to Experience Farm-to-Table Excellence?
            </h3>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-ivory-white/90 font-light mb-8">
              Book your table today and taste the difference that fresh, local, and sustainable makes.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Link
              to="/enquire"
              className="inline-block px-10 py-4 bg-ivory-white text-copper text-sm tracking-[0.15em] uppercase font-medium hover:bg-warm-sand transition-all duration-300"
            >
              Reserve Now
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
