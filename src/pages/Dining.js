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
    image: 'restraunt',
    features: ['Valley Views', 'Multi-Cuisine', 'Indoor & Outdoor Seating'],
  },
  {
    title: 'Garden Terrace',
    subtitle: 'Alfresco Dining',
    description: 'Dine surrounded by lush gardens and mountain breezes. Perfect for romantic dinners, family celebrations, and special occasions with customizable private dining experiences.',
    hours: 'Dinner Only | 6:30 PM - 10:30 PM',
    image: 'terrace-garden',
    features: ['Private Dining', 'Romantic Setting', 'Chef\'s Tasting Menu'],
  },
  {
    title: 'The Harvest Café',
    subtitle: 'Casual All-Day Dining',
    description: 'A relaxed café atmosphere serving freshly brewed coffee, homemade pastries, light meals, and snacks. Perfect for a quick bite between adventures.',
    hours: '6:30 AM - 8:00 PM',
    image: 'harvest-cafe',
    features: ['Artisan Coffee', 'Fresh Pastries', 'Quick Service'],
  },
];

const THALI_DISHES = [
  {
    name: 'Varan Bhaat',
    marathi: 'वरण भात',
    slug: 'varan-bhaat',
    tag: 'Pure Ghee & Dal',
    desc: 'Golden toor dal tempered with cumin, mustard seeds and homemade ghee over fragrant steamed rice.',
  },
  {
    name: 'Pithla Bhakri',
    marathi: 'पिठलं भाकरी',
    slug: 'pitla-bhakri',
    tag: 'Rustic Classic',
    desc: 'Velvety spiced besan pithla cooked in earthen pots, served piping hot with fresh jowar bhakri.',
  },
  {
    name: 'Bharli Vangi',
    marathi: 'भारली वांगी',
    slug: 'bharli-vangi',
    desc: 'Baby eggplants stuffed with roasted peanuts, sesame, goda masala and grated fresh coconut.',
  },
  {
    name: 'Batata Bhaji',
    marathi: 'बटाटा भाजी',
    slug: 'batata-bhaji',
    tag: 'Traditional',
    desc: 'Golden turmeric potato tempered with mustard, curry leaves, green chilies and grated coconut.',
  },
  {
    name: 'Zunka',
    marathi: 'झुणका',
    slug: 'zunka',
    tag: 'Clay Pot Cooked',
    desc: 'Coarse gram flour dry-roasted with caramelized onions, garlic, and aromatic Maharashtrian spices.',
  },
  {
    name: 'Usal',
    marathi: 'मटकी उसळ',
    slug: 'matki-usal',
    tag: 'Farm Sprouted',
    desc: 'Organic sprouted matki simmered in a spiced goda masala gravy with fresh coconut garnish.',
  },
  {
    name: 'Misal',
    marathi: 'कोल्हापुरी मिसळ',
    slug: 'kolhapuri-misal',
    tag: 'Fiery & Crisp',
    desc: 'Iconic Kolhapuri spiced sprout curry served with crispy farsan, fresh onions, lemon and pav.',
  },
  {
    name: 'Seasonal Vegetable',
    marathi: 'हंगामी भाजी',
    slug: 'seasonal-vegetable',
    tag: 'Harvest Fresh',
    desc: 'Farm-fresh vegetables harvested daily from our organic gardens and cooked in village style.',
  },
  {
    name: 'Takk / Mattha',
    marathi: 'ताक / मठ्ठा',
    slug: 'taak-mattha',
    tag: 'Chilled & Spiced',
    desc: 'Refreshing churned buttermilk infused with roasted cumin, fresh ginger, cilantro and boondi.',
  },
  {
    name: 'Papad & Loncha',
    marathi: 'पापड आणि लोणचं',
    slug: 'papad-loncha',
    tag: 'Crisp & Tangy',
    desc: 'Roasted spiced urad dal papad accompanied by house-cured raw mango loncha and lemon.',
  },
  {
    name: 'Gavran Chicken',
    marathi: 'गावरान चिकन',
    slug: 'gavran-chicken',
    tag: 'Village Special',
    desc: 'Free-range country chicken slow-cooked in earthen pots with roasted spices and rassa.',
  },
  {
    name: 'Sweets & Desserts',
    marathi: 'मिष्टान्न / पुरणपोळी',
    slug: 'sweets-desserts',
    tag: 'Festive Delight',
    desc: 'Handmade puran poli with pure ghee, served alongside festive seviyan kheer and sheera.',
  },
];

const THALI_ITEMS = THALI_DISHES.map((d) => d.name);

const LOCAL_BREAKFAST_ITEMS = [
  {
    name: 'Kanda Pohe',
    marathi: 'कांदे पोहे',
    slug: 'kanda-pohe',
    tag: 'Morning Classic',
    desc: 'Light flattened rice tossed with crunchy roasted peanuts, mustard seeds, onions, fresh coriander, and grated coconut.',
  },
  {
    name: 'Rava Upma',
    marathi: 'रवा उपमा',
    slug: 'rava-upma',
    tag: 'Fresh Roasted',
    desc: 'Golden semolina roasted in pure cow ghee and tempered with ginger, mustard seeds, green chillies, and garden herbs.',
  },
  {
    name: 'Sabudana Khichadi',
    marathi: 'साबुदाणा खिचडी',
    slug: 'sabudana-khichadi',
    tag: 'Fasting Special',
    desc: 'Soft tapioca pearls tossed with coarsely crushed roasted groundnuts, cumin, green chillies, and potatoes in pure ghee.',
  },
  {
    name: 'Bhajani Thalipeeth',
    marathi: 'भाजणी थालीपीठ',
    slug: 'bhajani-thalipeeth',
    tag: 'Multigrain Heritage',
    desc: 'Pan-roasted multigrain spiced flatbread with onions, coriander, and sesame seeds, served with a dollop of white butter.',
  },
  {
    name: 'Kolhapuri Misal Pav',
    marathi: 'कोल्हापुरी मिसळ',
    slug: 'kolhapuri-misal',
    tag: 'Fiery & Crisp',
    desc: 'Fiery sprouted moth bean curry with zesty red rassa, crisp farsan, fresh onions, coriander, and warm buttered pav.',
  },
  {
    name: 'Masala Dosa',
    marathi: 'मसाला डोसा',
    slug: 'masala-dosa',
    tag: 'Golden Crisp',
    desc: 'Crispy golden fermented crepe filled with spiced potato masala, paired with fresh coconut chutney and hot sambar.',
  },
];

const VILLAGE_SPECIAL_ITEMS = [
  {
    name: 'Solkadhi',
    marathi: 'सोलकढी',
    slug: 'solkadhi',
    tag: 'Kokum & Coconut',
    desc: 'Refreshing pink digestive drink made from freshly pressed coconut milk, wild kokum extract, garlic, and fresh herbs.',
  },
  {
    name: 'Kosambari',
    marathi: 'पारंपरिक कोशिंबीर',
    slug: 'kosambari',
    tag: 'Fresh & Crisp',
    desc: 'Refreshing traditional tempered salad prepared with soaked yellow lentils, fresh grated carrots, coconut, green chillies, and coriander.',
  },
  {
    name: 'Puran Poli with Ghee',
    marathi: 'पारंपरिक पुरणपोळी',
    slug: 'puran-poli',
    tag: 'Pure Ghee & Jaggery',
    desc: 'Delicate hand-rolled flatbread stuffed with sweet aromatic chana dal, jaggery, cardamom, and nutmeg, served with warm ghee.',
  },
];

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
  {
    name: 'Kolhapuri Pandhra Rassa',
    marathi: 'कोल्हापुरी पांढरा रस्सा',
    category: 'Local Specialties',
    spice: 'Mild',
    slug: 'pandhra-rassa',
  },
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
      <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full isolate">
          <picture className="block w-full h-full">
            <source
              srcSet="/images/opt/dining-hero-1920.webp 1920w, /images/opt/dining-hero-1280.webp 1280w, /images/opt/dining-hero-640.webp 640w"
              sizes="100vw"
              type="image/webp"
            />
            <img
              src="/images/opt/dining-hero.jpg"
              alt="Fine dining and authentic Maharashtrian delicacies at Bambardara Estate"
              loading="eager"
              fetchPriority="high"
              className="w-full h-full object-cover object-center transform scale-[1.01]"
            />
          </picture>
          <div
            className="absolute inset-0 z-[5]"
            style={{
              background:
                'linear-gradient(180deg, rgba(6,32,24,0.52) 0%, rgba(6,32,24,0.32) 45%, rgba(6,32,24,0.72) 100%), radial-gradient(circle at center, transparent 40%, rgba(6,32,24,0.45) 100%)',
            }}
          />
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

          <div className="space-y-20 md:space-y-28">
            {DINING_VENUES.map((venue, idx) => (
              <Reveal key={venue.title} delay={idx * 100}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center ${idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                  <div className={idx % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-stone/50 bg-stone/20 group">
                      <picture className="block w-full h-full">
                        <source
                          srcSet={`/images/opt/${venue.image}-1920.webp 1920w, /images/opt/${venue.image}-1280.webp 1280w, /images/opt/${venue.image}-640.webp 640w`}
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          type="image/webp"
                        />
                        <img
                          src={`/images/opt/${venue.image}.jpg`}
                          alt={venue.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </picture>
                    </div>
                  </div>

                  <div className={idx % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <span className="inline-flex items-center gap-2 text-copper uppercase tracking-[0.22em] text-[0.72rem] font-medium font-body">
                      <span className="h-1.5 w-1.5 rounded-full bg-copper" />
                      {venue.subtitle}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-light text-forest-green mt-3 mb-4 font-heading">
                      {venue.title}
                    </h3>
                    <p className="text-light-charcoal font-light leading-relaxed mb-6 font-body text-sm md:text-base">
                      {venue.description}
                    </p>
                    
                    <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-warm-sand/70 border border-stone/80 text-copper mb-6 font-body">
                      <FaClock className="w-3.5 h-3.5" />
                      <span className="text-xs font-light tracking-wide text-forest-green">{venue.hours}</span>
                    </div>

                    <div className="flex flex-wrap gap-2.5 mb-8">
                      {venue.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3.5 py-1.5 rounded-full bg-warm-sand/50 text-forest-green text-[0.72rem] uppercase tracking-wider font-medium border border-copper/30"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <Link
                      to="/enquire"
                      className="inline-flex items-center gap-2 text-copper text-xs uppercase tracking-[0.2em] font-medium hover:text-forest-green transition-colors group"
                    >
                      <span>Book Now</span>
                      <span className="transform group-hover:translate-x-1.5 transition-transform">&rarr;</span>
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
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-copper/20 group">
                <EstateImage
                  slug="kolhapuri-food"
                  alt="Authentic Maharashtrian Grand Thali at Bambardara"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-green/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-ivory-white">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-copper font-medium block">Complete Experience</span>
                    <h3 className="text-xl md:text-2xl font-light font-heading">The Grand Maharashtrian Thali</h3>
                  </div>
                  <span className="px-3.5 py-1.5 bg-ivory-white/90 text-forest-green text-xs uppercase tracking-wider font-semibold rounded-full shadow-md backdrop-blur-sm">
                    {THALI_DISHES.length} Preparations
                  </span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-light text-forest-green">
                    An Authentic <span className="italic text-copper">Village Feast</span>
                  </h3>
                  <p className="mt-3 text-light-charcoal font-light text-sm md:text-base leading-relaxed">
                    Crafted with ancestral recipes, every thali is prepared with stone-ground masalas, cold-pressed oils, and farm-fresh ingredients harvested daily right from our agro-tourism estate.
                  </p>
                </div>
                <div className="p-6 bg-white/70 rounded-2xl border border-stone/60 shadow-sm backdrop-blur-sm">
                  <h4 className="text-xs uppercase tracking-widest text-copper font-medium mb-4">
                    All {THALI_DISHES.length} Thali Inclusions
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    {THALI_ITEMS.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-forest-green font-light text-sm">
                        <span className="h-2 w-2 flex-shrink-0 rounded-full bg-copper ring-2 ring-copper/20" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ALL DISHES PHOTO SHOWCASE */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <Reveal>
                <span className="text-copper uppercase tracking-[0.2em] text-xs font-body">Visual Menu</span>
              </Reveal>
              <Reveal delay={100}>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-forest-green mt-3">
                  Each Dish <span className="italic text-copper">Made Fresh Daily</span>
                </h3>
              </Reveal>
              <Reveal delay={150}>
                <p className="mt-2 text-light-charcoal text-sm max-w-xl mx-auto font-light">
                  Explore every individual element of our traditional Maharashtrian Thali, prepared with heirloom spices and wood-fired rustic flavours.
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {THALI_DISHES.map((dish, idx) => (
                <Reveal key={dish.slug} delay={(idx % 3) * 75}>
                  <div className="group bg-ivory-white rounded-2xl overflow-hidden border border-stone/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                    <div className="aspect-square overflow-hidden relative bg-stone/20">
                      <EstateImage
                        slug={dish.slug}
                        alt={dish.name}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {dish.tag && (
                        <span className="absolute top-3 left-3 px-3 py-1 bg-forest-green/85 backdrop-blur-sm text-ivory-white text-[11px] tracking-wider uppercase font-medium rounded-full shadow">
                          {dish.tag}
                        </span>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex items-baseline justify-between gap-2 flex-wrap">
                          <h4 className="text-forest-green font-medium text-base md:text-lg group-hover:text-copper transition-colors">
                            {dish.name}
                          </h4>
                          <span className="text-copper/90 text-sm font-serif italic">
                            {dish.marathi}
                          </span>
                        </div>
                        <p className="mt-2.5 text-light-charcoal/80 text-sm leading-relaxed line-clamp-2">
                          {dish.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Local Breakfast Section */}
          <div className="mt-20 border-t border-stone pt-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <Reveal>
                <span className="text-copper uppercase tracking-[0.2em] text-xs font-body block mb-2">
                  Estate Morning Traditions
                </span>
              </Reveal>
              <Reveal delay={100}>
                <h3 className="font-serif text-2xl md:text-3xl text-forest-green font-light">
                  Local Maharashtrian Breakfast
                </h3>
              </Reveal>
              <Reveal delay={150}>
                <p className="mt-2 text-light-charcoal text-sm max-w-xl mx-auto font-light">
                  Awaken to authentic countryside aromas — wholesome, handcrafted morning favorites prepared fresh on order with pure cow ghee and fragrant garden spices.
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {LOCAL_BREAKFAST_ITEMS.map((dish, idx) => (
                <Reveal key={dish.slug} delay={(idx % 3) * 75}>
                  <div className="group bg-ivory-white rounded-2xl overflow-hidden border border-stone/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                    <div className="aspect-square overflow-hidden relative bg-stone/20">
                      <EstateImage
                        slug={dish.slug}
                        alt={dish.name}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 bg-forest-green/85 backdrop-blur-sm text-ivory-white text-[11px] tracking-wider uppercase font-medium rounded-full shadow">
                        {dish.tag}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex items-baseline justify-between gap-2 flex-wrap">
                          <h4 className="text-forest-green font-medium text-base md:text-lg group-hover:text-copper transition-colors">
                            {dish.name}
                          </h4>
                          <span className="text-copper/90 text-sm font-serif italic">
                            {dish.marathi}
                          </span>
                        </div>
                        <p className="mt-2.5 text-light-charcoal/80 text-sm leading-relaxed line-clamp-2">
                          {dish.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Village Style Specials Section */}
          <div className="mt-20 border-t border-stone pt-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <Reveal>
                <span className="text-copper uppercase tracking-[0.2em] text-xs font-body block mb-2">
                  Rustic Culinary Heritage
                </span>
              </Reveal>
              <Reveal delay={100}>
                <h3 className="font-serif text-2xl md:text-3xl text-forest-green font-light">
                  Village Style Specials
                </h3>
              </Reveal>
              <Reveal delay={150}>
                <p className="mt-2 text-light-charcoal text-sm max-w-xl mx-auto font-light">
                  Slow-simmered earthen delicacies and traditional festive treasures celebrated across generations in rural Maharashtra.
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {VILLAGE_SPECIAL_ITEMS.map((dish, idx) => (
                <Reveal key={dish.slug} delay={(idx % 3) * 75}>
                  <div className="group bg-ivory-white rounded-2xl overflow-hidden border border-stone/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                    <div className="aspect-square overflow-hidden relative bg-stone/20">
                      <EstateImage
                        slug={dish.slug}
                        alt={dish.name}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 bg-forest-green/85 backdrop-blur-sm text-ivory-white text-[11px] tracking-wider uppercase font-medium rounded-full shadow">
                        {dish.tag}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex items-baseline justify-between gap-2 flex-wrap">
                          <h4 className="text-forest-green font-medium text-base md:text-lg group-hover:text-copper transition-colors">
                            {dish.name}
                          </h4>
                          <span className="text-copper/90 text-sm font-serif italic">
                            {dish.marathi}
                          </span>
                        </div>
                        <p className="mt-2.5 text-light-charcoal/80 text-sm leading-relaxed line-clamp-2">
                          {dish.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
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
                <div className="flex items-center gap-4 border-b border-stone pb-4 group hover:border-copper transition-colors">
                  {dish.slug && (
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden flex-shrink-0 bg-stone/20 border border-stone/50 shadow-sm">
                      <EstateImage
                        slug={dish.slug}
                        alt={dish.name}
                        sizes="80px"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2 flex-wrap">
                      <h4 className="text-lg font-light text-forest-green group-hover:text-copper transition-colors">
                        {dish.name}
                      </h4>
                      {dish.marathi && (
                        <span className="text-copper/90 text-sm font-serif italic">
                          {dish.marathi}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-copper mt-1">{dish.category}</p>
                  </div>
                  <span className="text-xs text-light-charcoal bg-ivory-white px-3 py-1 border border-stone flex-shrink-0">
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
