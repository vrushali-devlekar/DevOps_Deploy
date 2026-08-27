import React from "react";
import HeroSection from "../../components/public/HeroSection";
import VoxelCardsSection from "../../components/public/VoxelCardsSection";
import FeaturesSection from "../../components/public/Features";
import StepsSection from "../../components/public/StepSection";
import Footer from "../../components/public/Footer";

const Landing = () => {
  return (
    <div className="bg-[#000000] min-h-screen text-white">
      <HeroSection />
      <VoxelCardsSection />
      <div id="features">
        <FeaturesSection />
      </div>
      <div id="how-it-works">
        <StepsSection />
      </div>
      <div id="ready-to-deploy">
        <Footer/>
      </div>
    </div>
  );
};

export default Landing;
