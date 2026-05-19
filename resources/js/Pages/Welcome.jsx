import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import Navbar from "@/Layouts/Navbar";
import Hero from "@/Components/Sections/Hero";
import FacilitySection from "@/Components/Sections/FacilitySection";
import StepsSection from "@/Components/Sections/StepsSection";
import CTASection from "@/Components/Sections/CTASection";
import MapSection from "@/Components/Sections/MapSection";
import Footer from "@/Layouts/Footer";

export default function WelcomePage({ auth, facilities }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <Head title="SIMPEL — Teknik Elektro Unila" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
                * { font-family: 'Plus Jakarta Sans', sans-serif; scroll-behavior: smooth; }
                @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
                .fade-up { animation: fadeUp .6s ease both; }
            `}</style>

            <div className="min-h-screen bg-white">
                <Navbar scrolled={scrolled} auth={auth} />
                <main>
                    <Hero />
                    <FacilitySection facilities={facilities} />
                    <StepsSection />

                    {/* Section ajakan peminjaman diletakkan di sini */}
                    <CTASection />

                    <MapSection />
                </main>
                <Footer />
            </div>
        </>
    );
}
