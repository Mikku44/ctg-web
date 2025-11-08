import React from "react";

export default function AboutUs() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 lg:py-20">
      <section className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">About Creative Tour Guru</h1>
          <p className="text-lg leading-relaxed text-slate-700">
            Welcome to <strong>Creative Tour Guru</strong> — your trusted partner for
            authentic, thoughtfully curated travel experiences. We craft journeys
            that go beyond sightseeing: cultural immersion, meaningful local
            connections, and memories that last a lifetime.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white border rounded-lg p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-600">Who we are</h3>
              <p className="mt-2 text-sm text-slate-700">
                A passionate team of local guides and travel curators dedicated to
                designing personalized tours — from island escapes to cultural
                deep-dives.
              </p>
            </div>

            <div className="bg-white border rounded-lg p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-600">What we do</h3>
              <p className="mt-2 text-sm text-slate-700">
                Tailor-made itineraries, private and group tours, and seamless
                logistics so you can focus on enjoying the journey.
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-600">
            Whether you’re an adventurer, a culture lover, or looking for a
            relaxing getaway — we design trips that become stories you’ll tell
            again and again.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4">
            <a
              href="tel:+66993210694"
              className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-emerald-600 text-white font-medium shadow hover:bg-emerald-700"
            >
              Call us: 099 321 0694
            </a>

            <a
              href="mailto:creativetourguru@hotmail.com"
              className="inline-flex items-center justify-center px-5 py-3 rounded-md border border-slate-200 text-slate-800 bg-white hover:bg-slate-50"
            >
              Email us
            </a>
          </div>

          <p className="text-xs text-slate-500 mt-4">© {new Date().getFullYear()} Creative Tour Guru</p>
        </div>

        <aside className="order-first lg:order-last">
          <div className="w-full h-72 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-emerald-50 via-white to-sky-50 flex items-center justify-center">
            {/* Replace the block below with an <img> when you have a hero image */}
            <div className="text-center px-6">
              <h4 className="text-lg font-semibold text-slate-700">Ready to explore?</h4>
              <p className="text-sm text-slate-600 mt-2">Tell us what you dream of and we’ll design the rest.</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <div className="flex items-start gap-3 p-3 bg-white border rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 grid place-items-center font-semibold text-emerald-700">P</div>
              <div>
                <p className="text-sm font-medium">Personalized Plans</p>
                <p className="text-xs text-slate-500">Itineraries tailored to your interests and pace.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white border rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-100 grid place-items-center font-semibold text-sky-700">L</div>
              <div>
                <p className="text-sm font-medium">Local Experts</p>
                <p className="text-xs text-slate-500">Experienced guides who know the places and people.</p>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-12 bg-slate-50 border rounded-lg p-6">
        <h3 className="text-lg font-semibold">Get in touch</h3>
        <p className="text-sm text-slate-600 mt-2">We’re happy to answer questions or start planning your trip.</p>

        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <a href="tel:+66993210694" className="text-sm underline">Phone: 099 321 0694</a>
          <a href="mailto:creativetourguru@hotmail.com" className="text-sm underline">Email: creativetourguru@hotmail.com</a>
        </div>
      </section>
    </main>
  );
}
