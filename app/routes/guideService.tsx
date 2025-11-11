import React from "react";

export default function GuideService() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="container-x py-16">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="h-[600px] overflow-hidden">
                        <img
                            src="/images/album911 (68).jpg"
                            className="w-full h-full object-cover"
                            alt="Creative Tour Guru - Guide Service"
                        />
                    </div>

                    <div className="space-y-5">
                        <h1 className="text-4xl font-bold text-gray-900">
                            Guide Service in Thailand
                        </h1>
                        <p className="text-gray-700 leading-relaxed">
                            Hire a professional English-speaking guide to accompany your
                            private journey across Thailand — knowledgeable, caring, and
                            certified by the Tourism Authority of Thailand (TAT).
                        </p>

                        <div className="space-y-2 text-gray-700">
                            <p className="font-semibold">🇹🇭 Around Thailand Tour</p>
                            <p>
                                <strong>Route:</strong> Bangkok – Ayutthaya – Chiang Mai – Phuket
                                (10 Days)
                            </p>
                            <p>
                                The ultimate Thailand experience — from royal palaces and
                                floating markets to northern temples and southern beaches.
                            </p>
                        </div>

                        <button className="button text-white font-medium px-6 py-3 rounded-lg transition duration-200">
                            Hire a Guide
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-gray-50 border-t border-gray-100 py-16">
                <div className="container-x text-center">
                    {/* <h2 className="text-2xl font-bold mb-6">
                        Some of our customer gallery
                    </h2> */}

                    <div className="columns-3 gap-5">


                        {[
                            "/images/thailand2 (5).jpg",
                            "/images/thailand6 (2).jpg",
                            "/images/thailand2 (4).jpg",
                            "/images/album911 (77).jpg",
                            "/images/album911 (76).jpg",
                            "/images/album911 (66).jpg",
                            "/images/album911 (22).jpg",
                        ].map((item, index) => <div
                            key={index}
                            className=" bg-white mt-5 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                            <img
                                src={item}
                                className="w-full h-auto object-cover"
                                alt="Flexible schedules"
                            />

                        </div>)}



                    </div>
                </div>
            </section>

        </main>
    );
}
