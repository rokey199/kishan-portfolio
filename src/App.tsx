import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import ParticleCanvas from "./components/ParticleCanvas";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import ServicesSection from "./components/ServicesSection";
import WhyHireMeSection from "./components/WhyHireMeSection";
import TestimonialSection from "./components/TestimonialSection";
import RecruiterSection from "./components/RecruiterSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Manually disable standard browser scroll-restoration memory
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // 2. Perform an initial proactive scroll snap to the top coordinates
    window.scrollTo({ top: 0 });
  }, []);

  const handleLoaderComplete = () => {
    setLoading(false);
    // 3. Reinforce scroll coordinates back to top when main content reveals
    setTimeout(() => {
      window.scrollTo({ top: 0 });
    }, 0);
  };

  return (
    <div className="relative min-h-screen bg-[#030308] text-zinc-100 overflow-x-hidden w-full select-none selection:bg-purple-500/30 selection:text-white pb-0">
      
      {/* Immersive Preload Screen */}
      <Loader onComplete={handleLoaderComplete} />

      {/* When loader yields, reveal active site */}
      {!loading && (
        <div className="flex flex-col min-h-screen relative w-full h-full">
          
          {/* Animated custom interactive cursor elements */}
          <CustomCursor />

          {/* Cinematic Floating 3D/Neon particles dynamic grid */}
          <ParticleCanvas />

          {/* Core navigation header deck */}
          <Navbar />

          <main className="flex-grow w-full h-full relative z-10">
            {/* 1. Core Hero Area */}
            <HeroSection />

            {/* 2. Biography specs */}
            <AboutSection />

            {/* 3. Tech stack progress display */}
            <SkillsSection />

            {/* 4. Filterable Code Showcase */}
            <ProjectsSection />

            {/* 5. Work history Timeline */}
            <ExperienceSection />

            {/* 6. Service arrays offering */}
            <ServicesSection />

            {/* 7. Why partner recruiter card */}
            <WhyHireMeSection />

            {/* 8. Moving slide Testimonials */}
            <TestimonialSection />

            {/* 9. Interactive proxy AI dialogue recruiter chatbot */}
            <RecruiterSection />

            {/* 10. Direct connection form deck */}
            <ContactSection />
          </main>

          {/* Comprehensive copyright & return anchor */}
          <Footer />

        </div>
      )}
    </div>
  );
}
