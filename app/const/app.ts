export const MENU_LIST = [
  { name: "Home", path: "/" },
  { name: "Tours", path: "/tours" },
  { name: "Guide Service", path: "/guide-service" },
  // { name: "Blog", path: "/blog" },
  // { name: "About", path: "/about" },
  { name: "Contact us", path: "/contact" },
];

export const menuConfig = [
  {
    label: "Half Day Tours",
    layout: "grid", // Suitable for a concise list
    links: [
      { href: "/tours/half-day/bangkok", title: "Bangkok", description: "Quick sights and highlights." },
      { href: "/tours/half-day/chiang-mai", title: "Chiang Mai", description: "Morning or afternoon exploration." },
      { href: "/tours/half-day/phuket", title: "Phuket", description: "Short beach or town trips." },
    ],
  },
  {
    label: "One Day Tours",
    layout: "grid", // Suitable for a slightly longer list
    links: [
      { href: "/tours/one-day/bangkok", title: "Bangkok City & Culture", description: "Full-day BKK immersion." },
      { href: "/tours/one-day/kanchanaburi", title: "Kanchanaburi", description: "River Kwai and historical sites." },
      { href: "/tours/one-day/pattaya", title: "Pattaya", description: "Coastal city escape." },
      { href: "/tours/one-day/chiang-mai", title: "Chiang Mai Exploration", description: "Doi Suthep and local villages." },
      { href: "/tours/one-day/phuket", title: "Phuket Island Hopping", description: "Beaches and viewpoints." },
    ],
  },
  {
    label: "Specialty Tours & Services",
    layout: "flex", // Good for a mixed list of unique tours
    links: [
      { href: "/tours/specialty/walking", title: "Walking Tour", description: "Discover hidden local neighborhoods." },
      { href: "/tours/specialty/local-transport", title: "Local Transport Tour", description: "Experience Bangkok like a local." },
      { href: "/tours/specialty/food-tuk-tuk", title: "Food Tour with Tuk Tuk", description: "Night market hopping on a Tuk Tuk." },
      { href: "/tours/specialty/unseen", title: "Unseen Tour", description: "Explore off-the-beaten-path destinations." },
      { href: "/tours/specialty/night", title: "Night Tour", description: "Temples, markets, and neon lights after dark." },
      { href: "/services/guide", title: "Private Guide Service", description: "Hire a certified personal tour guide." },
    ],
  },
  {
    label: "Around Thailand & Cruises",
    layout: "grid",
    links: [
      { href: "/tours/around-thailand", title: "Around Thailand Tour", description: "Multi-day trips across regions." },
      { href: "/tours/dinner-cruise/bangkok", title: "Dinner Cruise: Bangkok", description: "Fine dining on the Chao Phraya River." },
      { href: "/tours/dinner-cruise/ayuthaya", title: "Dinner Cruise: Ayuthaya", description: "Sunset dining among ancient ruins." },
    ],
  },
  // You can keep a direct link, perhaps to a main booking page or contacts
  { label: "Book Now", href: "/contact" }, 
];




export const menuItems =[
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


// mock up tour data

export const tourList = [
  // --- Classic Temple & History Tours (Full/Half Day) ---
  {
    id: 1,
    image: "https://cdn.prod.website-files.com/5c729f15fd0819dbaf8e66c6/66fac4a19aed9295ee21490c_bangkok2.webp",
    title: "Grand Palace, Wat Pho & Wat Arun Temple Tour",
    description: "The essential Bangkok experience! Visit the revered Emerald Buddha at the Grand Palace, the Reclining Buddha at Wat Pho, and the iconic Temple of Dawn (Wat Arun).",
    price: "฿1,500",
    priceUSD: "$42",
    rating: 4.8,
    duration: "4 Hours (Morning)",
    category: "Culture & History",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/19054297/pexels-photo-19054297/free-photo-of-wat-chaiwatthanaram-in-ayutthaya.jpeg",
    title: "Ayutthaya Historical Park Day Trip by River Cruise",
    description: "Explore the ancient capital of Thailand, Ayutthaya, and its majestic ruins. Includes round-trip transport and a scenic return via the Chao Phraya River.",
    price: "฿2,200",
    priceUSD: "$60",
    rating: 4.7,
    duration: "9 Hours (Full Day)",
    category: "Day Trip",
  },
  {
    id: 3,
    image: "https://www.jammingthailand.com/wp-content/uploads/2022/07/98.jpg",
    title: "Maeklong Railway & Damnoen Saduak Floating Markets",
    description: "Witness the train passing through the Maeklong 'Umbrella Pulldown' Market, then paddle a boat through the colorful Damnoen Saduak Floating Market.",
    price: "฿1,350",
    priceUSD: "$37",
    rating: 4.6,
    duration: "6 Hours (Morning)",
    category: "Markets & Day Trip",
  },
  {
    id: 4,
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/c2/2c/95/caption.jpg?w=1200&h=-1&s=1",
    title: "Bangkok Canal (Klong) Longtail Boat Tour",
    description: "Discover the 'Venice of the East.' Glide along the winding canals of Thonburi, seeing traditional wooden homes and local life away from the city bustle.",
    price: "฿850",
    priceUSD: "$23",
    rating: 4.5,
    duration: "2 Hours (Afternoon)",
    category: "Local Life & River",
  },
  // --- Food & Nightlife Tours ---
  {
    id: 5,
    image: "https://media.tacdn.com/media/attractions-splice-spp-360x240/15/71/e8/01.jpg",
    title: "Chinatown Street Food Midnight Tuk-Tuk Tour",
    description: "An exhilarating evening ride through Bangkok by Tuk-Tuk, stopping to sample the best of Yaowarat's famous street food and hidden local eateries.",
    price: "฿2,400",
    priceUSD: "$65",
    rating: 4.9,
    duration: "4 Hours (Evening)",
    category: "Food & Night",
  },
  {
    id: 6,
    image: "https://taotailangthai.com/wp-content/uploads/2019/01/ttl-chaophraya-princess-1.jpg",
    title: "Chao Phraya Princess Dinner Cruise (International Buffet)",
    description: "A luxurious evening cruise on the Chao Phraya River, featuring a grand international buffet, live music, and stunning views of illuminated temples.",
    price: "฿1,300",
    priceUSD: "$36",
    rating: 4.4,
    duration: "2 Hours (Evening)",
    category: "River & Night",
  },
  {
    id: 7,
    image: "https://tourscanner.com/blog/wp-content/uploads/ghost-move/ghost/food-tour-in-Bangkok.jpg",
    title: "Local Bangkok Food & Backstreets Walking Tour",
    description: "A deep dive into local flavors. Explore hidden alleys, century-old markets, and taste 10+ authentic Thai dishes and desserts in the Old Town area.",
    price: "฿1,800",
    priceUSD: "$50",
    rating: 4.9,
    duration: "3.5 Hours (Afternoon)",
    category: "Food & Local Life",
  },
  // --- Active & Unique Experiences ---
  {
    id: 8,
    image: "https://aws-tiqets-cdn.imgix.net/images/content/bff62bd61b52460887a71a4f25d00ba1.jpeg?auto=format%2Ccompress&fit=crop&ixlib=python-4.0.0&q=70&w=600&s=274920a29b751621bb8c83e39b5df583",
    title: "Bangkok Hidden Gems Bicycle Tour",
    description: "Cycle through the narrow alleys, green spaces, and local communities of Bangkok and Thonburi, discovering sights unreachable by car or bus.",
    price: "฿1,450",
    priceUSD: "$40",
    rating: 4.7,
    duration: "4 Hours (Morning)",
    category: "Active & Local Life",
  },
  {
    id: 9,
    image: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/1f/d2/28.jpg",
    title: "Thai Cooking Class with Market Visit",
    description: "Learn to cook classic Thai dishes like Pad Thai and Green Curry with a local chef. Includes a fresh market shopping trip to select ingredients.",
    price: "฿1,900",
    priceUSD: "$53",
    rating: 4.9,
    duration: "3 Hours (Half Day)",
    category: "Cooking & Workshop",
  },
  {
    id: 10,
    image: "https://image.kkday.com/v2/image/get/c_fit%2Cq_55%2Ct_webp%2Cw_960/s1.kkday.com/product_152948/20250822090156_tJzaI/png",
    title: "Rajadamnern Stadium Muay Thai Boxing Tickets",
    description: "Experience the electric atmosphere of a live professional Muay Thai match at the legendary Rajadamnern Boxing Stadium. VIP seating available.",
    price: "฿2,000",
    priceUSD: "$55",
    rating: 4.5,
    duration: "3 Hours (Evening)",
    category: "Night & Entertainment",
  },
  // --- Day Trips & Extended Excursions ---
  {
    id: 11,
    image: "https://www.bangkokbeyond.com/en/wp-content/uploads/2019/09/river-kwai-bridge-by-bangkokbeyond.com_.jpg",
    title: "Kanchanaburi & Bridge Over the River Kwai Day Tour",
    description: "Visit the famous Bridge Over the River Kwai, the War Cemetery, and learn about the WWII history of this area west of Bangkok.",
    price: "฿2,300",
    priceUSD: "$63",
    rating: 4.6,
    duration: "10 Hours (Full Day)",
    category: "Day Trip & History",
  },
  
];