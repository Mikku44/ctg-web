
import { Outlet } from 'react-router'
import FloatingButtons from '~/components/floatingButton'
import Footer from '~/components/footer'

import SidebarMenu from '~/components/sidebar'

export function meta() {
  const title = "Creative Tour Guru Thailand - Private Tours, Local Guides & Unique Travel Experiences";
  const description =
    "Creative Tour Guru Thailand provides customized private tours, cultural experiences, corporate trips, and professional tour guide services across Thailand. Explore Thailand with tailor-made journeys led by expert local guides.";
  const url = "https://creativetourguruthailand.com";
  const image = `${url}/og-images/og-image.jpg`;

  return [
    // Basic SEO
    { title },
    { name: "description", content: description },

    // Open Graph
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://creativetourguruthailand.com" },
    { property: "og:image", content: "https://creativetourguruthailand.com/og-images/og-image.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },

    { rel: "icon", href: "/favicon.ico" },
    { rel: "apple-touch-icon", href: "/favicon.ico" },




    // Canonical URL
    { rel: "canonical", href: url },
  ];
}


export default function Layout() {
  return (
    <main>
      <FloatingButtons />
      <SidebarMenu />
      {/* <NavigationMenuBase items={menuItems} /> */}
      {/* <Header /> */}
      <Outlet />

      <Footer />
    </main>
  )
}
