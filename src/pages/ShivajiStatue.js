import { Link } from 'react-router-dom';
import {
  FaMonument,
  FaMountain,
  FaCameraRetro,
  FaBookOpen,
  FaCheckCircle,
  FaSun,
  FaLandmark,
  FaPalette,
  FaBinoculars,
  FaUserFriends,
  FaClock,
  FaMapMarkerAlt,
  FaWater,
  FaCrown,
  FaFlag,
  FaGraduationCap,
  FaLeaf,
  FaImages,
  FaParking,
  FaTint,
  FaSchool,
  FaHiking,
} from 'react-icons/fa';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';
import SectionHeading from '../components/shared/SectionHeading';

const VANTAGE_POINTS = [
  {
    slug: 'pratapgad-victory-full',
    badge: 'POSE 01 · VICTORY',
    tag: 'PRATAPGAD',
    subtitle: 'प्रतापगड विजय — The Decisive Stand',
    title: 'The Pratapgad Victory Pose',
    body: 'A mounted victory pose, sword drawn — a tribute to the courage shown at Pratapgad.',
    meta: [
      { icon: FaMapMarkerAlt, label: 'Setting', value: 'On Horseback' },
      { icon: FaPalette, label: 'Material', value: 'Cast Bronze' },
    ],
  },
  {
    slug: 'coronation',
    badge: 'POSE 02 · SOVEREIGNTY',
    tag: 'RAJGAD',
    subtitle: 'राजगड राज्याभिषेक — The Enthroned King',
    title: 'The Rajgad Coronation Pose',
    body: 'Seated in full royal regalia, marking the sovereignty of Swarajya.',
    meta: [
      { icon: FaLandmark, label: 'Setting', value: 'Enthroned' },
      { icon: FaPalette, label: 'Material', value: 'Cast Bronze' },
    ],
  },
  {
    slug: 'hindavi-swarajya-full',
    badge: 'POSE 03 · VISION',
    tag: 'HINDAVI SWARAJYA',
    subtitle: 'हिंदवी स्वराज्य — The Founding Ideal',
    title: 'The Hindavi Swarajya Pose',
    body: 'Standing tall, arm raised toward the horizon — the pose that names the ideal of self-rule.',
    meta: [
      { icon: FaMountain, label: 'Setting', value: 'Standing' },
      { icon: FaBinoculars, label: 'Gesture', value: 'Arm Raised' },
    ],
  },
  {
    slug: 'strategic-leader-full',
    badge: 'POSE 04 · STRATEGY',
    tag: 'STRATEGIC LEADER',
    subtitle: 'मुत्सद्दी नेतृत्व — The Seated Strategist',
    title: 'The Strategic Leader Pose',
    body: 'Seated with sceptre in hand, composed and watchful — the strategist behind the sword.',
    meta: [
      { icon: FaLandmark, label: 'Setting', value: 'Seated' },
      { icon: FaBookOpen, label: 'Attribute', value: 'Sceptre in Hand' },
    ],
  },
  {
    slug: 'visionary-king-full',
    badge: 'POSE 05 · LEGACY',
    tag: 'THE VISIONARY KING',
    subtitle: 'दूरदर्शी राजा — A Portrait in Profile',
    title: 'The Visionary King',
    body: "A close portrait study, garlanded, gazing toward the hills — the estate's most photographed angle.",
    meta: [
      { icon: FaCameraRetro, label: 'Setting', value: 'Portrait' },
      { icon: FaSun, label: 'Best For', value: 'Photography' },
    ],
  },
  {
    slug: 'fort-protector-full',
    badge: 'POSE 06 · GUARDIAN',
    tag: 'FORT PROTECTOR',
    subtitle: 'दुर्ग रक्षक — Guarding the Ramparts',
    title: 'The Fort Protector Pose',
    body: "Sword raised before a fort's stone walls, honouring Shivaji Maharaj as protector of the Sahyadri forts.",
    meta: [
      { icon: FaMonument, label: 'Setting', value: 'Standing Guard' },
      { icon: FaLandmark, label: 'Backdrop', value: 'Fort Ramparts' },
    ],
  },
];

const VISIT_NOTES = [
  {
    icon: FaMountain,
    title: 'A Hilltop Vantage',
    body: 'Set on the highest clear ground on the estate, with the whole valley opening out beneath it.',
  },
  {
    icon: FaBookOpen,
    title: 'Maratha Heritage',
    body: 'A tribute to Chhatrapati Shivaji Maharaj, whose forts and legacy still mark this stretch of the Western Ghats.',
  },
  {
    icon: FaCameraRetro,
    title: 'Best at Golden Hour',
    body: 'Guides time the walk up for late afternoon, when the valley light is at its softest.',
  },
  {
    icon: FaMonument,
    title: 'A Short, Guided Walk',
    body: 'A gentle climb from the main path — easy enough for most ages, with a naturalist along the way.',
  },
];

const FORT_HERITAGE = [
  {
    num: '01', kind: 'hill', slug: 'raigad-fort', type: 'Hill Fortress (Giri Durg)',
    badge: 'Imperial Capital', tag: '~820m MSL', location: 'Mahad, Raigad',
    name: 'Raigad Fort', nameMr: 'रायगड',
    desc: "The Maratha capital Shivaji Maharaj chose for himself — site of his 1674 coronation, with the ruins of the Rajsabha still standing at the summit.",
    stats: [['Trek Grade', 'Moderate / Ropeway Available'], ['Distance', '~130 km from Pune'], ['Best Season', 'Oct – Mar & Monsoon']],
  },
  {
    num: '02', kind: 'hill', slug: 'shivneri-fort', type: 'Hill Fortress (Giri Durg)',
    badge: 'Birthplace Sanctum', tag: '~1,065m MSL', location: 'Junnar, Pune',
    name: 'Shivneri Fort', nameMr: 'शिवनेरी',
    desc: 'The birthplace of Chhatrapati Shivaji Maharaj in 1630 — a well-fortified hill station with concentric gateways guarding the approach.',
    stats: [['Trek Grade', 'Easy (Paved Steps)'], ['Distance', '~95 km from Pune'], ['Best Season', 'All Year Round']],
  },
  {
    num: '03', kind: 'hill', slug: 'pratapgad-fort', type: 'Hill Fortress (Giri Durg)',
    badge: 'Citadel of Valor', tag: '~1,080m MSL', location: 'Satara, Mahabaleshwar',
    name: 'Pratapgad Fort', nameMr: 'प्रतापगड',
    desc: 'Built on Moropant Pingale\'s orders — the site of the 1659 encounter between Shivaji Maharaj and Afzal Khan.',
    stats: [['Trek Grade', 'Easy to Moderate'], ['Distance', '~140 km from Pune'], ['Best Season', 'Monsoon to Winter']],
  },
  {
    num: '04', kind: 'hill', slug: 'sinhagad-fort', type: 'Hill Fortress (Giri Durg)',
    badge: "Lion's Fort", tag: '~1,312m MSL', location: 'Haveli, Pune',
    name: 'Sinhagad Fort', nameMr: 'सिंहगड',
    desc: '"Gad aala, pan Sinha gela" — immortalised by Tanaji Malusare\'s 1670 night assault to reclaim the fort.',
    stats: [['Trek Grade', 'Moderate Trek / Motor Road'], ['Distance', '~30 km from Pune City'], ['Best Season', 'Monsoon to Winter']],
  },
  {
    num: '05', kind: 'ocean', slug: 'sindhudurg-fort', type: 'Ocean Fortress (Jal Durg)',
    badge: 'Supreme Ocean Fortress', tag: 'Sea Level', location: 'Malvan, Konkan',
    name: 'Sindhudurg Fort', nameMr: 'सिंधुदुर्ग',
    desc: 'Raised on a rocky islet off the Malvan coast, its foundations reputedly sealed with molten lead against the tides.',
    stats: [['Access', 'Ferry Boat from Malvan Jetty'], ['Distance', '~500 km from Pune / Mumbai'], ['Best Season', 'Oct – May (Fair Sea)']],
  },
  {
    num: '06', kind: 'hill', slug: 'rajgad-fort', type: 'Hill Fortress (Giri Durg)',
    badge: 'King of Forts', tag: '~1,376m MSL', location: 'Velhe, Pune',
    name: 'Rajgad Fort', nameMr: 'राजगड',
    desc: "The Maratha capital for 26 formative years before the seat moved to Raigad, with its Padmavati and Suvela ridgelines.",
    stats: [['Trek Grade', 'Demanding / Strenuous'], ['Distance', '~60 km from Pune'], ['Best Season', 'Oct – Feb']],
  },
  {
    num: '07', kind: 'hill', slug: 'torna-fort', type: 'Hill Fortress (Giri Durg)',
    badge: 'The Genesis', tag: '~1,403m MSL', location: 'Velhe, Pune',
    name: 'Torna Fort', nameMr: 'तोरणा',
    desc: 'The first fort captured by Shivaji Maharaj, at just sixteen — the founding stone of Swarajya.',
    stats: [['Trek Grade', 'Difficult & Steep'], ['Distance', '~70 km from Pune'], ['Best Season', 'Post-Monsoon & Winter']],
  },
  {
    num: '08', kind: 'hill', slug: 'panhala-fort', type: 'Hill Fortress (Giri Durg)',
    badge: 'The Great Siege', tag: '~845m MSL', location: 'Kolhapur',
    name: 'Panhala Fort', nameMr: 'पन्हाळा',
    desc: 'Site of Baji Prabhu Deshpande\'s legendary stand at the Pavan Khind siege — and the closest of these forts to the estate.',
    stats: [['Trek Grade', 'Easy / Well Connected'], ['Distance', '~20 km from Kolhapur'], ['Best Season', 'All-Weather Destination']],
  },
  {
    num: '09', kind: 'ocean', slug: 'vijaydurg-fort', type: 'Ocean Fortress (Jal Durg)',
    badge: 'Naval Gibraltar', tag: 'Sea Bastion', location: 'Sindhudurg District',
    name: 'Vijaydurg Fort', nameMr: 'विजयदुर्ग',
    desc: 'A formidable naval stronghold along the Konkan coast, expanded to anchor the Maratha fleet\'s western reach.',
    stats: [['Access', 'Direct Road Access'], ['Distance', '~450 km from Pune'], ['Best Season', 'Nov – Mar']],
  },
  {
    num: '10', kind: 'hill', slug: 'lohagad-fort', type: 'Hill Fortress (Giri Durg)',
    badge: 'The Iron Fort', tag: '~1,033m MSL', location: 'Lonavala, Pune',
    name: 'Lohagad Fort', nameMr: 'लोहगड',
    desc: 'Guarded the old Bor Ghat trade route, and is famous today for its narrow, monsoon-lush connecting ridge.',
    stats: [['Trek Grade', 'Easy to Moderate'], ['Distance', '~65 km from Pune'], ['Best Season', 'Monsoon Spectacular']],
  },
  {
    num: '11', kind: 'ocean', slug: 'suvarnadurg-fort', type: 'Ocean Fortress (Jal Durg)',
    badge: 'Golden Marine Fort', tag: 'Offshore Island', location: 'Dapoli, Ratnagiri',
    name: 'Suvarnadurg Fort', nameMr: 'सुवर्णदुर्ग',
    desc: 'An island fort built on an isolated rock reef, once a key base for the Maratha navy along the Konkan.',
    stats: [['Access', 'Fishing Trawler from Harne'], ['Distance', '~220 km from Pune'], ['Best Season', 'Nov – Apr']],
  },
  {
    num: '12', kind: 'ocean', slug: 'kolaba-fort', type: 'Ocean Fortress (Jal Durg)',
    badge: 'Coastal Bastion', tag: 'Tidal Fortress', location: 'Alibaug, Raigad',
    name: 'Kolaba Fort', nameMr: 'कुलाबा',
    desc: 'A sea fort walkable from Alibaug beach at low tide — among the last coastal fortifications raised under Shivaji Maharaj.',
    stats: [['Access', 'Walk / Horse Cart at Low Tide'], ['Distance', '~100 km from Mumbai'], ['Best Season', 'Oct – May']],
  },
];

const STATUE_HIGHLIGHTS = [
  { icon: FaCrown, title: 'Majestic Statues', body: 'Grand statues of Chhatrapati Shivaji Maharaj in royal poses.' },
  { icon: FaLandmark, title: 'Historical Significance', body: 'Relive the glory of the Maratha Empire and its rich heritage.' },
  { icon: FaFlag, title: 'Inspiring Generations', body: 'Motivating values of bravery, leadership & self-respect.' },
  { icon: FaMountain, title: 'Scenic Locations', body: 'Beautifully located with breathtaking views.' },
  { icon: FaCameraRetro, title: 'Perfect for All', body: 'Ideal for history lovers, students, tourists & families.' },
];

const WHY_VISIT = [
  { icon: FaFlag, text: 'Feel Proud of Our Heritage' },
  { icon: FaBookOpen, text: 'Learn the Inspiring History' },
  { icon: FaGraduationCap, text: 'Great for Education & Tours' },
  { icon: FaLeaf, text: 'Peaceful & Scenic Environment' },
  { icon: FaImages, text: 'Memorable Experience' },
];

const VISITOR_INFO = [
  { icon: FaMapMarkerAlt, label: 'Location', value: 'Bambardara, Maharashtra' },
  { icon: FaClock, label: 'Timings', value: '6:00 AM – 8:00 PM (Open All Days)' },
  { icon: FaParking, label: 'Parking', value: 'Ample Parking Available' },
  { icon: FaTint, label: 'Facilities', value: 'Drinking Water, Toilets, Seating, Shade, Clean Area' },
];

const PERFECT_FOR = [
  { icon: FaUserFriends, label: 'Family Outing' },
  { icon: FaSchool, label: 'School / College Trips' },
  { icon: FaGraduationCap, label: 'History Education' },
  { icon: FaCameraRetro, label: 'Photography Lovers' },
  { icon: FaUserFriends, label: 'Group Visits' },
  { icon: FaHiking, label: 'Weekend Getaways' },
];

const FORT_CIRCUITS = [
  {
    num: '01', label: 'Weekend Friendly', title: '3-Day Capital & Valley Trail',
    days: [
      { d: 'D1', title: 'Junnar & Shivneri Sanctum', body: "Morning visit to Shivneri, Shivaji Maharaj's birthplace fort, with an overnight stay near Junnar." },
      { d: 'D2', title: 'Ascent to Raigad Capital', body: 'Trek or ropeway up to the coronation fort, exploring the Rajsabha ruins along the way.' },
      { d: 'D3', title: 'Sinhagad Bastion & Pune Return', body: "A tribute stop at Tanaji Malusare's memorial before the drive back via Pune." },
    ],
  },
  {
    num: '02', label: 'Land & Ocean Mastery', title: '5-Day Konkan Naval Circuit', featured: true,
    days: [
      { d: 'D1', title: 'Pratapgad & Mahabaleshwar', body: 'The site of the Afzal Khan encounter, followed by a scenic hill-station stay.' },
      { d: 'D2', title: 'Panhala to Konkan Coast', body: 'A descent through the Sahyadri ghats toward the coastal plains.' },
      { d: 'D5', title: 'Sindhudurg & Vijaydurg Dockyards', body: "A ferry crossing to the island fort, then on to Vijaydurg's sea bastion." },
    ],
  },
  {
    num: '03', label: 'Grand Pilgrimage', title: '7-Day Great Swarajya Odyssey',
    days: [
      { d: 'D1', title: 'Junnar, Shivneri & Lohagad', body: 'From the birthplace fort along the old ghat trade routes.' },
      { d: 'D3', title: 'Torna, Rajgad & Raigad Ridge', body: 'High-ridge trekking connecting the first fort captured to the coronation seat.' },
      { d: 'D7', title: 'Pratapgad, Panhala & the Sea Forts', body: 'A grand conclusion at the Konkan coastal fortresses.' },
    ],
  },
];

export default function ShivajiStatue() {
  return (
    <main className="bg-ivory-white">
      {/* HERO */}
      <section className="relative flex min-h-screen items-end overflow-hidden bg-deep-forest">
        <div className="absolute inset-0 isolate">
          <video
            src="/videos/shivaji-maharaj.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-label="The Shivaji Maharaj statue on the estate's hilltop"
            className="h-full w-full scale-[1.9] object-cover"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-editorial px-6 pb-0 md:px-10">
          <Reveal delay={120}>
            <h1 className="mt-6 max-w-3xl font-heading text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[1.05] text-ivory-white">
              छत्रपती शिवाजी महाराज
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-3 max-w-2xl font-heading text-[clamp(1.15rem,2.6vw,1.65rem)] italic font-semibold leading-tight text-muted-gold">
              The Sovereign of Swarajya &amp; Guardian of the Sahyadris
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-5 max-w-prose font-body text-[0.9rem] font-light leading-[1.9] text-ivory-white/75">
              A tribute to the Maratha king on the estate's highest ground, a
              short guided climb above the valley — the same hills his forts
              once watched over.
            </p>
          </Reveal>

          <Reveal delay={320} className="pb-16 pt-8 md:pb-24">
            <Link to="/enquire" className="lux-btn-light inline-flex">
              <span>Plan a Cultural Visit</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* INTRO */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-editorial grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading
              label="On the Highest Ground"
              title={
                <>
                  A Tribute,
                  <span className="block italic text-luxury-gold">Not a Monument for Show</span>
                </>
              }
              lede="Kolhapur and the surrounding Sahyadri ranges sit at the heart of Maratha history, and Chhatrapati Shivaji Maharaj's legacy is still close at hand here — in the fort silhouettes on the ridgelines and the stories the estate's own guides grew up with."
            />
          </div>
          <Reveal className="lg:col-span-6">
            <div className="lux-frame aspect-[4/5] w-full">
              <EstateImage
                slug="shivaji-maharaj"
                alt="The Chhatrapati Shivaji Maharaj statue on the estate's hilltop"
                sizes="(min-width: 1024px) 40vw, 90vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATUE HIGHLIGHTS, WHY VISIT & VISITOR INFO */}
      <section className="bg-warm-sand px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-editorial">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <SectionHeading label="Statues Highlights" title="A Legacy Worth Honouring" />
              <div className="mt-8 space-y-6">
                {STATUE_HIGHLIGHTS.map((item, idx) => (
                  <Reveal key={item.title} delay={idx * 60}>
                    <div className="flex gap-4">
                      <item.icon className="mt-1 h-6 w-6 shrink-0 text-luxury-gold" aria-hidden="true" />
                      <div>
                        <h3 className="font-heading text-base font-semibold text-forest-green">
                          {item.title}
                        </h3>
                        <p className="mt-1 font-body text-[0.85rem] font-light leading-[1.7] text-light-charcoal">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="space-y-6 lg:col-span-5">
              <Reveal>
                <div className="rounded-lg border border-stone bg-white p-7">
                  <h3 className="font-heading text-lg font-semibold text-forest-green">Why Visit?</h3>
                  <ul className="mt-4 space-y-3">
                    {WHY_VISIT.map((item) => (
                      <li key={item.text} className="flex items-center gap-3 font-body text-[0.85rem] text-light-charcoal">
                        <item.icon className="h-4 w-4 shrink-0 text-luxury-gold" aria-hidden="true" />
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div className="rounded-lg border border-stone bg-white p-7">
                  <h3 className="font-heading text-lg font-semibold text-forest-green">Visitor Information</h3>
                  <ul className="mt-4 space-y-4">
                    {VISITOR_INFO.map((item) => (
                      <li key={item.label} className="flex gap-3">
                        <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-luxury-gold" aria-hidden="true" />
                        <div>
                          <p className="font-body text-[0.7rem] uppercase tracking-wide text-light-charcoal/60">
                            {item.label}
                          </p>
                          <p className="font-body text-[0.85rem] text-forest-green">{item.value}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>

          {/* PERFECT FOR */}
          <Reveal delay={260}>
            <div className="mt-12">
              <h3 className="text-center font-heading text-lg font-semibold text-forest-green">Perfect For</h3>
              <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
                {PERFECT_FOR.map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-2 text-center">
                    <item.icon className="h-6 w-6 text-luxury-gold" aria-hidden="true" />
                    <span className="font-body text-[0.75rem] text-light-charcoal">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT THE STATUE */}
      <section className="relative bg-warm-sand px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-editorial">
          <Reveal>
            <span className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-copper">
              Memorial Sculpture
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-3 max-w-2xl font-heading text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold leading-tight text-forest-green">
              A Tribute Cast in Bronze
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-2 max-w-2xl font-heading text-[1.05rem] italic font-light text-luxury-gold">
              एक आदरांजली — A Single, Enduring Gesture
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 max-w-prose font-body text-[0.85rem] font-light leading-[1.9] text-light-charcoal">
              The estate raised a single tribute rather than a gallery of
              monuments — cast to be seen from the valley below at any hour,
              and at its most striking at golden hour, when the bronze
              catches the last light over the Sahyadris.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#visiting-the-statue"
                className="rounded-full bg-luxury-gold px-5 py-2 font-body text-[0.65rem] uppercase tracking-wider text-deep-forest"
              >
                Visiting the Statue
              </a>
              <a
                href="#visiting-the-statue"
                className="rounded-full border border-stone px-5 py-2 font-body text-[0.65rem] uppercase tracking-wider text-light-charcoal transition-colors hover:border-luxury-gold/50 hover:text-forest-green"
              >
                The Setting
              </a>
              <a
                href="#visiting-the-statue"
                className="rounded-full border border-stone px-5 py-2 font-body text-[0.65rem] uppercase tracking-wider text-light-charcoal transition-colors hover:border-luxury-gold/50 hover:text-forest-green"
              >
                Photography Tips
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* THE SIX STATUE POSES */}
      <section className="bg-ivory-white px-6 pb-20 pt-4 md:px-10 md:pb-28">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="Six Statue Poses"
            title="The Six Poses of the Statue Collection"
            lede="Bambardara's tribute to Chhatrapati Shivaji Maharaj is cast across six statues, each capturing a different facet of his legacy — from battlefield valour to quiet vision."
          />

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VANTAGE_POINTS.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 60}>
                <div className="group overflow-hidden rounded-lg border border-stone bg-white">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <EstateImage
                      slug={item.slug}
                      alt={`${item.title} — Chhatrapati Shivaji Maharaj statue`}
                      className="h-full w-full"
                    />
                    <span className="absolute left-3 top-3 rounded bg-luxury-gold px-2 py-1 font-body text-[0.6rem] font-semibold uppercase tracking-wide text-deep-forest">
                      {item.badge}
                    </span>
                    <span className="absolute right-3 top-3 rounded bg-forest-green/90 px-2 py-1 font-body text-[0.6rem] uppercase tracking-wide text-ivory-white/90">
                      {item.tag}
                    </span>
                  </div>

                  <div className="p-6">
                    <p className="font-heading text-[0.8rem] italic text-luxury-gold">
                      {item.subtitle}
                    </p>
                    <h3 className="mt-1 font-heading text-lg font-semibold text-forest-green">
                      {item.title}
                    </h3>
                    <p className="mt-3 font-body text-[0.8rem] font-light leading-[1.8] text-light-charcoal">
                      {item.body}
                    </p>

                    <div className="mt-5 space-y-2 border-t border-stone pt-4">
                      {item.meta.map((m) => (
                        <div
                          key={m.label}
                          className="flex items-center gap-2 font-body text-[0.7rem]"
                        >
                          <m.icon className="h-3.5 w-3.5 shrink-0 text-copper" aria-hidden="true" />
                          <span className="text-light-charcoal/60">{m.label}:</span>
                          <span className="text-forest-green">{m.value}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to="/enquire"
                      className="mt-5 block rounded border border-stone py-2 text-center font-body text-[0.65rem] uppercase tracking-wider text-light-charcoal transition-colors hover:border-luxury-gold/50 hover:text-forest-green"
                    >
                      Add to Your Visit
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED: THE ESTATE'S TRIBUTE */}
      <section className="bg-warm-sand px-6 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-editorial">
          <Reveal>
            <div className="grid grid-cols-1 gap-0 overflow-hidden rounded-lg border border-stone bg-white lg:grid-cols-12">
              <div className="relative aspect-[4/3] lg:col-span-5 lg:aspect-auto">
                <EstateImage
                  slug="tribute"
                  alt="The Chhatrapati Shivaji Maharaj tribute statue on the estate"
                  className="h-full w-full"
                />
                <span className="absolute left-3 top-3 rounded bg-luxury-gold px-2 py-1 font-body text-[0.6rem] font-semibold uppercase tracking-wide text-deep-forest">
                  Featured · The Estate's Tribute
                </span>
              </div>

              <div className="flex flex-col justify-center p-8 lg:col-span-7 lg:p-12">
                <span className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-luxury-gold">
                  Bambardara Estate
                </span>
                <p className="mt-3 font-heading text-[0.9rem] italic font-light text-luxury-gold">
                  एका आदरांजलीची कथा — The Story Behind the Tribute
                </p>
                <h3 className="mt-2 font-heading text-[clamp(1.35rem,2.8vw,1.85rem)] font-semibold leading-tight text-forest-green">
                  A Tribute,<br className="hidden sm:block" /> Rooted in History
                </h3>
                <p className="mt-5 max-w-prose font-body text-[0.85rem] font-light leading-[1.9] text-light-charcoal">
                  This is the estate's own tribute to Chhatrapati Shivaji
                  Maharaj, whose legacy runs through this whole stretch of the
                  Sahyadris. It stands alone on the property's highest ridge,
                  facing the same valley and fort-marked hills that legacy
                  still watches over.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-6 border-t border-stone pt-6 sm:grid-cols-3">
                  <div>
                    <p className="font-body text-[0.6rem] uppercase tracking-[0.15em] text-copper">
                      Statue Material
                    </p>
                    <p className="mt-1 font-heading text-sm text-forest-green">
                      Cast Bronze
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-[0.6rem] uppercase tracking-[0.15em] text-copper">
                      Statue Location
                    </p>
                    <p className="mt-1 font-heading text-sm text-forest-green">
                      Estate's Highest Ridge
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-[0.6rem] uppercase tracking-[0.15em] text-copper">
                      Visitor Access
                    </p>
                    <p className="mt-1 font-heading text-sm text-forest-green">
                      Guided Walk, ~20 Minutes
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <Link
                    to="/enquire"
                    className="rounded bg-luxury-gold px-6 py-3 text-center font-body text-[0.65rem] font-semibold uppercase tracking-wider text-deep-forest"
                  >
                    Enquire About a Visit
                  </Link>
                  <p className="font-heading text-[0.8rem] italic font-light text-light-charcoal/70">
                    A private estate tribute, not a heritage listing.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* REGIONAL FORT HERITAGE CONTEXT */}
      <section className="bg-ivory-white px-6 py-10 md:px-10 md:py-12">
        <div className="mx-auto max-w-editorial">
          <Reveal>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 font-body text-[0.65rem] uppercase tracking-[0.2em] text-luxury-gold">
                  <FaCheckCircle className="h-3 w-3" aria-hidden="true" />
                  UNESCO World Heritage · Regional Context
                </span>
                <h2 className="mt-3 font-heading text-[clamp(1.4rem,3.2vw,2rem)] font-bold leading-tight text-forest-green">
                  The Maratha Fort Heritage of the Sahyadris
                </h2>
                <p className="mt-2 font-heading text-base italic font-light text-luxury-gold">
                  गिरिदुर्ग व जलदुर्ग — Hill Forts and Sea Forts of the Marathas
                </p>
                <p className="mt-4 font-body text-[0.8rem] font-light leading-[1.85] text-light-charcoal">
                  The ridgelines visible from the estate's hilltop belong to the
                  same network of forts raised under Chhatrapati Shivaji
                  Maharaj — hill bastions and coastal strongholds across the
                  Sahyadris and the Konkan coast, part of the "Maratha
                  Military Landscapes" recognised as a UNESCO World Heritage
                  site. Several of these silhouettes can be picked out from
                  where the tribute statue stands.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="rounded border border-stone bg-warm-sand px-5 py-3 text-center">
                  <p className="font-body text-[0.6rem] uppercase tracking-wide text-light-charcoal/60">
                    Hill Forts (Giri Durg)
                  </p>
                  <p className="mt-1 font-heading text-sm text-forest-green">
                    Visible on the Horizon
                  </p>
                </div>
                <div className="rounded border border-stone bg-warm-sand px-5 py-3 text-center">
                  <p className="font-body text-[0.6rem] uppercase tracking-wide text-light-charcoal/60">
                    Sea Forts (Jal Durg)
                  </p>
                  <p className="mt-1 font-heading text-sm text-forest-green">
                    Along the Konkan Coast
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FORT HERITAGE GRID */}
      <section className="bg-ivory-white px-6 pb-24 pt-4 md:px-10 md:pb-32">
        <div className="mx-auto max-w-editorial">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FORT_HERITAGE.map((fort, idx) => (
              <Reveal key={fort.name} delay={(idx % 4) * 60}>
                <div className="flex h-full flex-col overflow-hidden rounded-lg border border-stone bg-white">
                  <div className="relative flex aspect-[4/3] items-center justify-center bg-warm-sand">
                    {fort.slug ? (
                      <EstateImage
                        slug={fort.slug}
                        alt={`${fort.name} — ${fort.type}`}
                        className="h-full w-full"
                      />
                    ) : fort.kind === 'ocean' ? (
                      <FaWater className="h-10 w-10 text-forest-green/20" aria-hidden="true" />
                    ) : (
                      <FaMountain className="h-10 w-10 text-forest-green/20" aria-hidden="true" />
                    )}
                    <span className="absolute left-2 top-2 rounded bg-copper px-2 py-1 font-body text-[0.55rem] font-semibold uppercase tracking-wide text-deep-forest">
                      {fort.badge}
                    </span>
                    <span className="absolute right-2 top-2 rounded bg-forest-green/90 px-2 py-1 font-body text-[0.55rem] uppercase tracking-wide text-ivory-white/90">
                      {fort.tag}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between font-body text-[0.6rem] uppercase tracking-wide text-light-charcoal/50">
                      <span>{fort.num}. {fort.type}</span>
                      <span>{fort.location}</span>
                    </div>
                    <h3 className="mt-2 font-heading text-base font-semibold text-forest-green">
                      {fort.name} <span className="font-normal text-light-charcoal/60">({fort.nameMr})</span>
                    </h3>
                    <p className="mt-2 flex-1 font-body text-[0.75rem] font-light leading-[1.7] text-light-charcoal">
                      {fort.desc}
                    </p>

                    <div className="mt-4 space-y-1.5 border-t border-stone pt-3">
                      {fort.stats.map(([label, value]) => (
                        <div key={label} className="flex items-baseline justify-between gap-2 font-body text-[0.65rem]">
                          <span className="shrink-0 text-light-charcoal/50">{label}:</span>
                          <span className="text-right text-forest-green">{value}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to="/enquire"
                      className="mt-4 block rounded border border-stone py-2 text-center font-body text-[0.6rem] uppercase tracking-wider text-light-charcoal transition-colors hover:border-luxury-gold/50 hover:text-forest-green"
                    >
                      Enquire About Fort Excursions
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FORT NETWORK LAYOUT */}
      <section className="bg-ivory-white px-6 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-editorial">
          <Reveal>
            <div className="grid grid-cols-1 gap-10 rounded-lg border border-stone bg-warm-sand p-8 lg:grid-cols-12 lg:gap-12 lg:p-12">
              <div className="lg:col-span-7">
                <span className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-luxury-gold">
                  Regional Layout
                </span>
                <h3 className="mt-3 font-heading text-[clamp(1.35rem,2.8vw,1.85rem)] font-bold leading-tight text-forest-green">
                  The Sahyadri–Konkan Fort Network
                </h3>
                <p className="mt-4 max-w-prose font-body text-[0.85rem] font-light leading-[1.9] text-light-charcoal">
                  These twelve forts span two distinct terrains — hill
                  bastions along the Sahyadri ranges near Pune and Satara,
                  and sea forts strung along the Konkan coast. Panhala, the
                  nearest to the estate, sits roughly 20 km from Kolhapur;
                  the rest are better planned as day trips or an overnight
                  excursion from wherever you're travelling from.
                </p>
                <Link
                  to="/enquire"
                  className="mt-6 inline-flex rounded bg-luxury-gold px-6 py-3 font-body text-[0.65rem] font-semibold uppercase tracking-wider text-deep-forest"
                >
                  Plan a Multi-Fort Itinerary
                </Link>
                <p className="mt-4 font-body text-[0.7rem] font-light italic text-light-charcoal/60">
                  Distances above are approximate; see individual fort details
                  in the grid.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded border border-stone bg-white p-5">
                    <p className="flex items-center gap-2 font-body text-[0.6rem] uppercase tracking-wide text-copper">
                      <FaMountain className="h-3 w-3" aria-hidden="true" />
                      Sahyadri Hill Forts
                    </p>
                    <ul className="mt-3 space-y-1.5 font-body text-[0.75rem] font-light text-light-charcoal">
                      {FORT_HERITAGE.filter((f) => f.kind === 'hill').map((f) => (
                        <li key={f.name}>{f.name}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded border border-stone bg-white p-5">
                    <p className="flex items-center gap-2 font-body text-[0.6rem] uppercase tracking-wide text-copper">
                      <FaWater className="h-3 w-3" aria-hidden="true" />
                      Konkan Sea Forts
                    </p>
                    <ul className="mt-3 space-y-1.5 font-body text-[0.75rem] font-light text-light-charcoal">
                      {FORT_HERITAGE.filter((f) => f.kind === 'ocean').map((f) => (
                        <li key={f.name}>{f.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FORT EXPEDITION CIRCUITS */}
      <section className="bg-ivory-white px-6 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-editorial">
          <Reveal>
            <span className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-copper">
              Expedition Architect
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-3 max-w-2xl font-heading text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold leading-tight text-forest-green">
              Plan Your Maratha Fort Expedition
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-2 max-w-2xl font-heading text-[1.05rem] italic font-light text-luxury-gold">
              मार्गदर्शन व दुर्ग मोहीम नियोजन — Custom Heritage Circuits
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 max-w-prose font-body text-[0.85rem] font-light leading-[1.9] text-light-charcoal">
              Select curated trails balanced for endurance, historical
              narrative, and breathtaking natural terrain across the
              Western Ghats.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {FORT_CIRCUITS.map((circuit, idx) => (
              <Reveal key={circuit.num} delay={260 + idx * 80}>
                <div
                  className={`flex h-full flex-col rounded-lg border p-6 ${
                    circuit.featured
                      ? 'border-copper/50 bg-copper/[0.06]'
                      : 'border-stone bg-warm-sand'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-body text-[0.6rem] uppercase tracking-wide text-light-charcoal/50">
                      Circuit {circuit.num}
                    </span>
                    <span
                      className={`rounded px-2 py-1 font-body text-[0.55rem] uppercase tracking-wide ${
                        circuit.featured
                          ? 'bg-copper text-deep-forest'
                          : 'text-light-charcoal/50'
                      }`}
                    >
                      {circuit.label}
                    </span>
                  </div>

                  <h3 className="mt-3 font-heading text-lg font-bold text-forest-green">
                    {circuit.title}
                  </h3>

                  <div className="mt-5 flex-1 space-y-4">
                    {circuit.days.map((day) => (
                      <div key={day.d} className="flex gap-3">
                        <span className="mt-0.5 shrink-0 rounded bg-luxury-gold px-1.5 py-0.5 font-body text-[0.6rem] font-semibold text-deep-forest">
                          {day.d}
                        </span>
                        <div>
                          <p className="font-heading text-[0.85rem] font-semibold text-forest-green">
                            {day.title}
                          </p>
                          <p className="mt-0.5 font-body text-[0.75rem] font-light leading-[1.6] text-light-charcoal">
                            {day.body}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/enquire"
                    className={`mt-6 block rounded py-2.5 text-center font-body text-[0.6rem] uppercase tracking-wider ${
                      circuit.featured
                        ? 'bg-luxury-gold text-deep-forest font-semibold'
                        : 'border border-stone text-light-charcoal transition-colors hover:border-luxury-gold/50 hover:text-forest-green'
                    }`}
                  >
                    Enquire About This Circuit
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VISIT NOTES */}
      <div id="visiting-the-statue" className="bg-warm-sand">
        <div className="mx-auto max-w-editorial px-6 py-24 md:px-10 md:py-32">
          <SectionHeading
            label="For Guests"
            title={
              <>
                Visiting
                <span className="block italic text-luxury-gold">the Statue</span>
              </>
            }
            align="center"
            className="mb-16 md:mb-20"
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {VISIT_NOTES.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 80}>
                <div className="flex h-full flex-col border border-stone bg-white p-8 transition-shadow duration-700 hover:shadow-xl">
                  <item.icon className="h-9 w-9 text-luxury-gold" aria-hidden="true" />
                  <h3 className="mt-4 font-heading text-lg font-light text-forest-green">
                    {item.title}
                  </h3>
                  <span className="lux-rule mt-4" />
                  <p className="mt-4 flex-1 font-body text-[0.85rem] font-light leading-[1.85] text-light-charcoal">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="border-t border-stone bg-ivory-white px-6 py-20 text-center md:px-10">
        <p className="mx-auto max-w-prose font-body text-[0.9rem] font-light leading-[1.85] text-light-charcoal">
          A cultural specialist can fold the walk up into a longer heritage
          trail, timed for the best light over the valley.
        </p>
        <Link to="/cultural-experience" className="lux-btn-dark mt-8 inline-flex">
          <span>Back to Cultural Experience</span>
        </Link>
      </section>
    </main>
  );
}
