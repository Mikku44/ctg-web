export const MENU_LIST = [
  { name: "Home", path: "/" },
  { name: "Tours", path: "/tours" },
  { name: "Guide Service", path: "/guide-service" },
  { name: "Boat Service", path: "/boat-service" },
  { name: "Contact us", path: "/contact" },
  { name: "Blogs", path: "/blogs" },
];

export const menuConfig = [
  {
    label: "Half Day Tours",
    layout: "grid",
    links: [
      { href: "/tours/half-day/bangkok", title: "Bangkok", description: "Quick sights and highlights." },
      { href: "/tours/half-day/chiang-mai", title: "Chiang Mai", description: "Morning or afternoon exploration." },
      { href: "/tours/half-day/phuket", title: "Phuket", description: "Short beach or town trips." },
    ],
  },
  {
    label: "One Day Tours",
    layout: "grid",
    links: [
      { href: "/tours/full-day/bangkok", title: "Bangkok City & Culture", description: "Full-day BKK immersion." },
      { href: "/tours/full-day/ayutthaya", title: "Ayutthaya", description: "Ancient temples and river cruises." }, // ADDED
      { href: "/tours/full-day/kanchanaburi", title: "Kanchanaburi", description: "River Kwai and historical sites." },
      { href: "/tours/full-day/pattaya", title: "Pattaya", description: "Coastal city escape." },
      { href: "/tours/full-day/chiang-mai", title: "Chiang Mai Exploration", description: "Doi Suthep and local villages." },
      { href: "/tours/full-day/phuket", title: "Phuket Island Hopping", description: "Beaches and viewpoints." },
      { href: "/tours/full-day/other-provinces", title: "Other Provinces", description: "Explore hidden gems across Thailand." }, // ADDED
    ],
  },
  {
    label: "Specialty Tours",
    layout: "flex",
    links: [
      { href: "/tours/specialty/walking", title: "Walking Tour", description: "Discover hidden local neighborhoods." },
      { href: "/tours/specialty/local-experience", title: "Local Transport Tour", description: "Experience Bangkok like a local." },
      // { href: "/tours/specialty/tuk-tuk", title: "Food Tour with Tuk Tuk", description: "Night market hopping on a Tuk Tuk." },
    ],
  },
  {
    label: "Unseen Tours & Services",
    layout: "grid",
    links: [
      {
        href: "/tours/unseen/night-tour",
        title: "Night Tour",
        description: "Discover hidden temples and markets that come alive after dark."
      },
      {
        href: "/tours/discover/thailand",
        title: "Around Thailand Tour",
        description: "Curated multi-day journeys exploring authentic regional culture."
      },
      {
        href: "/guide-service",
        title: "Your Private Local Expert",
        description: "Hire a dedicated guide to customize your itinerary."
      },
    ],
  },
  {
    label: "Dinner Cruises",
    layout: "grid",
    links: [
      { href: "/tours/dinner-cruise/bangkok", title: "Dinner Cruise: Bangkok", description: "Fine dining on the Chao Phraya River." },
      { href: "/tours/dinner-cruise/ayutthaya", title: "Dinner Cruise: Ayutthaya", description: "Sunset dining among ancient ruins." },
    ],
  },
  { label: "Check Your Booking", href: "/check-your-booking" },
  { label: "Book Now", href: "/contact" },
];




export const menuItems = [
  {
    label: "Destinations",
    links: [
      {
        href: "/destinations/islands",
        title: "Tropical Islands",
        description: "Explore Phuket, Koh Samui, and Krabi’s turquoise paradise.",
      },
      {
        href: "/destinations/north-thailand",
        title: "Northern Thailand",
        description: "Discover Chiang Mai and Chiang Rai’s rich culture and mountains.",
      },
      {
        href: "/destinations/bangkok",
        title: "Bangkok City",
        description: "Experience Thailand’s vibrant capital and local street life.",
      },
      {
        href: "/destinations/ayutthaya",
        title: "Ayutthaya",
        description: "Step into history with ancient temples and river cruises.",
      },
     
    ],
  },
  {
    label: "Adventures",
    links: [
      {
        href: "/adventures/diving",
        title: "Diving & Snorkeling",
        description: "Swim among colorful coral reefs and tropical marine life.",
      },
      {
        href: "/adventures/trekking",
        title: "Trekking & Nature Trails",
        description: "Hike through rainforests and meet hill tribes in the north.",
      },
      {
        href: "/adventures/culture",
        title: "Cultural Experiences",
        description: "Join Thai cooking classes, temples, and local festivals.",
      },
      {
        href: "/adventures/water-sports",
        title: "Water Sports",
        description: "Jet-ski, kayak, and enjoy adrenaline-packed beach fun.",
      },
      
    ],
  },
  {
    label: "Packages",
    links: [
      {
        href: "/packages/honeymoon",
        title: "Honeymoon Packages",
        description: "Romantic escapes on Thailand’s most beautiful beaches.",
      },
      {
        href: "/packages/family",
        title: "Family Trips",
        description: "Fun-filled itineraries for all ages with comfort and safety.",
      },
      {
        href: "/packages/adventure",
        title: "Adventure Tours",
        description: "Exciting outdoor activities for thrill seekers.",
      },
      {
        href: "/packages/custom",
        title: "Custom Tour",
        description: "Design your own private itinerary anywhere in Thailand.",
      },
    ],
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];


export const popularDestinations = [
  {
    image: "/popular/bangkok.jpg",
    title: "Bangkok",
    description: "Thailand's spiritual, cultural, and commercial heart. Famous for its glittering temples like Wat Arun & Wat Pho, bustling markets, and the Chao Phraya River.",
    link: "/destinations/bangkok",
  },
  {
    image: "/popular/chaingmai.jpg",
    title: "Chiang Mai",
    description: "A city blending Lanna culture with modern flair. Known for its mountainous scenery, Doi Suthep, night markets, and elephant sanctuaries.",
    link: "/destinations/chiang-mai",
  },
  {
    image: "/popular/phuket.jpg",
    title: "Phuket",
    description: "Thailand's largest island, famed for its magnificent beaches, clear seas, diverse nightlife, and historic Sino-Portuguese architecture in Old Town.",
    link: "/destinations/phuket",
  },
  {
    image: "/popular/Kanchanaburi.jpg",
    title: "Kanchanaburi",
    description: "Rich in WWII history, including the Bridge over the River Kwai and the Death Railway. Also home to stunning natural beauty like Erawan Waterfall.",
    link: "/destinations/kanchanaburi",
  },
  {
    image: "/popular/pattaya.jpg",
    title: "Pattaya",
    description: "A popular resort city on the east coast of the Gulf of Thailand, known for its beaches, numerous entertainment options, and the intricate Sanctuary of Truth temple.",
    link: "/destinations/pattaya",
  },
  {
    image: "/popular/Ayutthaya.jpg",
    title: "Ayutthaya",
    description: "The second Siamese capital, a UNESCO World Heritage Site featuring magnificent ruins of colossal monasteries and prangs (reliquary towers) from the Ayutthaya Kingdom.",
    link: "/destinations/ayuthaya",
  },

  {
    image: "/popular/chiang-rai.jpg",
    title: "Chiang Rai",
    description: "Thailand's northernmost major city, famous for its artistic temples like Wat Rong Khun (White Temple) and Baan Dam Museum (Black House), and a gateway to the Golden Triangle and mountain scenery.",
    link: "/destinations/chiang-rai",
  },
  {
    image: "/popular/Nakhon-Pathom.jpg",
    title: "Nakhon Pathom",
    description: "Home to Phra Pathom Chedi, the tallest stupa in Thailand, and a cultural center from the ancient Dvaravati Kingdom. Known for its floating markets and Samphran area attractions.",
    link: "/destinations/nakhon-pathom",
  },
  {
    image: "/popular/Samut-Songkhram.jpg",
    title: "Samut Songkhram",
    description: "A charming province near Bangkok, known for its authentic floating markets like Amphawa and Tha Kha, as well as the famous Maeklong Railway Market and the unique Wat Bang Kung.",
    link: "/destinations/samut-songkhram",
  },
  {
    image: "/popular/Nakhon-Ratchasima.jpg",
    title: "Nakhon Ratchasima (Khorat)",
    description: "The gateway to the Northeast (Isan), famous for the stunning, well-preserved Khmer temple ruins at Phimai Historical Park and the vast, biodiverse Khao Yai National Park.",
    link: "/destinations/nakhon-ratchasima",
  },
  {
    image: "/popular/Nakhon-Si-Thammarat.jpg",
    title: "Nakhon Si Thammarat",
    description: "An ancient southern city and former regional center, home to the magnificent Wat Phra Mahathat Woramahawihan and beautiful natural attractions like the pristine beaches of Khanom (pink dolphins).",
    link: "/destinations/nakhon-si-thammarat",
  },
  {
    image: "/popular/Sukhothai.jpg",
    title: "Sukhothai",
    description: "The first capital of the Siamese Kingdom and a UNESCO World Heritage Site. Features exquisite ruins of temples and royal palaces, reflecting the distinctive early \"Sukhothai style\" of art.",
    link: "/destinations/sukhothai",
  },
];



export const CATEGORY_OPTIONS = [
  { id: "half-day", label: "Half Day" },
  { id: "one-day", label: "One Day" },
  { id: "specialty", label: "Specialty" },
  { id: "unseen", label: "Unseen" },
  { id: "dinner-cruise", label: "Dinner Cruise" },
];


export const TYPE_MAPPING: Record<string, string> = {
  // Half Day
  "/tours/half-day/all": "Half Day Tours – All",
  "/tours/half-day/bangkok": "Half Day Tours – Bangkok",
  "/tours/half-day/chiang-mai": "Half Day Tours – Chiang Mai",
  "/tours/half-day/phuket": "Half Day Tours – Phuket",

  // One Day / Full Day
  "/tours/full-day/all": "One Day Tours – All",
  "/tours/full-day/bangkok": "One Day Tours – Bangkok City & Culture",
  "/tours/full-day/ayutthaya": "One Day Tours – Ayutthaya",
  "/tours/full-day/kanchanaburi": "One Day Tours – Kanchanaburi",
  "/tours/full-day/chiang-mai": "One Day Tours – Chiang Mai",
  "/tours/full-day/phuket": "One Day Tours – Phuket",
  "/tours/full-day/pattaya": "One Day Tours – Pattaya",
  "/tours/full-day/other-provinces": "One Day Tours – Other Provinces",

  // Specialty & Local
  "/tours/specialty/local-experience": "Specialty Tours – Local Experience",
  "/tours/specialty/walking": "Specialty Tours – Walking Tour",
  "/tours/specialty/tuk-tuk": "Specialty Tours – Food Tour with Tuk Tuk",

  // Unseen & Services
  "/tours/unseen/night-tour": "Unseen Tours & Services – Night Tour",
  "/tours/discover/thailand": "Unseen Tours & Services – Around Thailand Tour",
  "/guide-service": "Unseen Tours & Services – Your Private Local Expert",

  // Dinner Cruises
  "/tours/dinner-cruise/bangkok": "Dinner Cruise – Bangkok",
  "/tours/dinner-cruise/ayutthaya": "Dinner Cruise – Ayutthaya",
};