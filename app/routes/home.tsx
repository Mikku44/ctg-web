import { Helmet } from "react-helmet";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [{ title: "Creative Tour Guru (Thailand) | Explore Unique Adventures & Local Experiences" },
  { name: "description", content: "Discover unique tours, authentic local experiences, and hidden gems across Thailand with Creative Tour Guru — your travel companion for inspiration and unforgettable journeys.", },
  { name: "keywords", content: "Thailand tours, local travel, adventure, experiences, travel guide, Creative Tour Guru" },
  { name: "author", content: "Creative Tour Guru" },
  { property: "og:title", content: "Creative Tour Guru (Thailand)" },
  { property: "og:description", content: "Explore unique tours and authentic local experiences in Thailand." },
  { property: "og:type", content: "website" },
  { property: "og:locale", content: "en_US" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Creative Tour Guru (Thailand)" },
  { name: "twitter:description", content: "Discover Thailand through creative and local adventures." },];
}

export default function Home() {
  return (
    <main>

      <Helmet>
        <title>
          Creative Tour Guru (Thailand) | Explore Unique Adventures & Local
          Experiences
        </title>
        <meta
          name="description"
          content="Discover unique tours, authentic local experiences, and hidden gems across Thailand with Creative Tour Guru — your travel companion for inspiration and unforgettable journeys."
        />
        <meta
          name="keywords"
          content="Thailand tours, local travel, adventure, experiences, travel guide, Creative Tour Guru"
        />
        <meta name="author" content="Creative Tour Guru" />
        <meta property="og:title" content="Creative Tour Guru (Thailand)" />
        <meta
          property="og:description"
          content="Explore unique tours and authentic local experiences in Thailand."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_TH" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Creative Tour Guru (Thailand)"
        />
        <meta
          name="twitter:description"
          content="Discover Thailand through creative and local adventures."
        />
      </Helmet>



      <div className="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
          <div className="flex h-full grow flex-col">
            {/* ---- Navigation ---- */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-primary/20 dark:border-primary/10 px-10 py-4">
              <div className="flex items-center gap-10">
                <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                  
                  <h2 className="text-xl font-bold">Creative Tour Guru</h2>
                </div>
                <nav className="flex items-center gap-8">
                  <a
                    className="text-gray-600 dark:text-gray-300 hover:text-primary text-sm font-medium"
                    href="#"
                  >
                    Destinations
                  </a>
                  <a
                    className="text-gray-600 dark:text-gray-300 hover:text-primary text-sm font-medium"
                    href="#"
                  >
                    Tours
                  </a>
                  <a
                    className="text-gray-600 dark:text-gray-300 hover:text-primary text-sm font-medium"
                    href="#"
                  >
                    Blog
                  </a>
                  <a
                    className="text-gray-600 dark:text-gray-300 hover:text-primary text-sm font-medium"
                    href="#"
                  >
                    Support
                  </a>
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-64">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></path>
                    </svg>
                  </div>
                  <input
                    className="form-input w-full rounded-lg border-transparent bg-background-light dark:bg-background-dark placeholder-gray-400 dark:placeholder-gray-500 focus:ring-primary focus:border-primary pl-10 pr-4 py-2 text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button className="min-w-[84px] rounded-lg h-10 px-4 text-sm font-bold tracking-wide transition-colors duration-200 bg-primary text-white hover:bg-primary/90">
                    Sign up
                  </button>
                  <button className="min-w-[84px] rounded-lg h-10 px-4 text-sm font-bold tracking-wide transition-colors duration-200 bg-primary/20 dark:bg-primary/30 text-primary hover:bg-primary/30 dark:hover:bg-primary/40">
                    Log in
                  </button>
                </div>
              </div>
            </header>

            {/* --- Hero Section --- */}
            <main className="flex flex-1 justify-center py-5">
              <div className="flex w-full max-w-6xl flex-col">
                <div className="px-4">
                  <div
                    className="relative flex min-h-[520px] flex-col items-center justify-center gap-8 rounded-xl bg-cover bg-center p-8 text-center"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuD-RuQThdi3wTui_Tb7gJBED0KO2rTFm0fApIapuymtGWPXxY9HlNGWUgPhsx3MEvya__OBmDex91TE5hI7RmNQTQH9Ban_cS1I_KLibRaEZbCxzfWPDCU3IEEBVEXXYG1qLjT3UEGTb0fAPu5TyhR6lJOzQgq1K0sUddHwsHVUJQclgSfgr-4ZXlbGnhJyygC9DW-fsgHGIYaNqdT70VGLZTEeb8ergRvNKiAoMgytYbaZR-wPjr_SUq6utB1Ej-t7LMbZMIMEaG8")',
                    }}
                  >
                    <div className="flex flex-col gap-4">
                      <h1 className="text-5xl font-extrabold text-white">
                        Explore the world with Creative Tour Guru
                      </h1>
                      <p className="text-lg text-white/90">
                        Find and book amazing tours and activities in your
                        favorite destinations.
                      </p>
                    </div>
                    <div className="flex w-full max-w-2xl items-center rounded-lg bg-white p-2 shadow-lg dark:bg-background-dark">
                      <div className="pointer-events-none flex items-center pl-3">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                        </svg>
                      </div>
                      <input
                        className="form-input w-full flex-1 appearance-none border-none bg-transparent py-3 pl-2 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 dark:text-white"
                        placeholder="Where are you going?"
                      />
                      <button className="rounded-lg h-12 px-6 bg-primary text-white text-base font-bold tracking-wide transition-colors duration-200 hover:bg-primary/90">
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </main>
  );
}
