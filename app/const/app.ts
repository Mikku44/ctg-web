export const MENU_LIST = [
  { name: "Home", path: "/" },
  { name: "Tours", path: "/tours" },
  // { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
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