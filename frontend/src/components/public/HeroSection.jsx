import React from "react";
import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import BrandLogo from "../ui/BrandLogo";

const HeroSection = () => {
  const navItems = [
    { label: "Features", href: "#features" },
    { label: "Workflow", href: "#how-it-works" },
    { label: "Deploy", href: "#ready-to-deploy" },
    { label: "Docs", to: "/documentation" },
  ];

  return (
    <section id="hero" className="relative min-h-[92vh] w-full bg-[#000000] font-sans overflow-hidden select-none flex flex-col justify-between">
      {/* Background Video: High Visibility Minecraft Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover transition-all duration-700 pointer-events-none"
        style={{
          filter: 'brightness(0.85) contrast(1.05)'
        }}
      >
        <source src="/minecraft.mp4" type="video/mp4" />
      </video>

      {/* Light Overlays for Maximum Video Visibility */}
      <div className='absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.65)_90%)]' />
      <div className='absolute inset-0 z-10 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent' />

      <div className="relative z-10 flex flex-col h-full grow">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-6 py-5 md:px-12 border-b border-white/[0.08] bg-[#09090b]/70 backdrop-blur-md">
          <BrandLogo to="/" textClassName="text-lg font-semibold tracking-tight normal-case" iconClassName="rounded-md" />

          <div className="hidden md:flex gap-8 text-[13px] font-medium text-[#a1a1aa]">
            {navItems.map((item) =>
              item.to ? (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className="hover:text-white transition-colors"
                >
                  {item.label}
                </NavLink>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              )
            )}
          </div>

          <div className="flex items-center gap-4 font-sans">
            <NavLink to="/login" className="hidden sm:flex items-center justify-center h-8 px-4 text-[12px] font-medium text-white border border-white/20 rounded-md hover:bg-white/10 transition-colors">
              Sign In
            </NavLink>
            <NavLink to="/register">
              <button className="h-8 px-4 bg-[#a3e635] text-black text-[12px] font-bold rounded-md hover:bg-[#bef264] transition-colors cursor-pointer">
                Get Started
              </button>
            </NavLink>
          </div>
        </nav>

        {/* Hero Main Area */}
        <main className="grow flex flex-col items-center justify-center px-4 py-16 sm:py-24 text-center max-w-5xl mx-auto w-full">
          <div className="flex flex-col items-center max-w-4xl">

            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111113]/80 backdrop-blur-md border border-[#a3e635]/30 text-[11px] text-[#a3e635] mb-8 font-sans transition-all duration-300 hover:border-[#a3e635]/60 shadow-[0_0_15px_rgba(163,230,53,0.15)]">
              <div className='w-1.5 h-1.5 bg-[#a3e635] rounded-full animate-pulse' />
              <span className="font-semibold">Velora 2.0 Antigravity Deployment</span>
              <div className="w-px h-3 bg-white/[0.15] mx-1"></div>
              <NavLink to="/documentation" className="flex items-center gap-1 text-white hover:text-[#a3e635] transition-colors font-medium">
                Explore Voxel Edge Network <ChevronRight size={11} />
              </NavLink>
            </div>

            {/* Headline with Generous Spacing */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[38px] text-white tracking-tight leading-[1.45] my-6 py-2 font-['Press_Start_2P'] uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              Your Complete <br />
              <span className="text-[#a3e635]">
                Deployment
              </span>{" "}
              <span className="text-[#facc15]">
                Platform
              </span>
            </h1>

            {/* Subheading */}
            <p className="max-w-xl text-[#d4d4d8] text-sm sm:text-base md:text-lg font-normal leading-relaxed mb-10 font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Zero-gravity cloud infrastructure blending pixel-art floating voxel islands with ultra-fast edge deployment pipelines.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto font-sans">
              <NavLink to="/register" className="w-full sm:w-auto">
                <button className="h-11 sm:h-12 px-8 text-xs sm:text-sm font-semibold w-full sm:w-auto flex items-center justify-center gap-2 bg-[#a3e635] hover:bg-[#bef264] text-black rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(163,230,53,0.25)] hover:shadow-[0_0_30px_rgba(163,230,53,0.45)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                  Get Started Free <span>→</span>
                </button>
              </NavLink>
              <NavLink to="/documentation" className="w-full sm:w-auto">
                <button className="h-11 sm:h-12 px-8 text-xs sm:text-sm font-semibold w-full sm:w-auto flex items-center justify-center gap-2 bg-black/60 backdrop-blur-md border border-white/20 hover:border-white/40 hover:bg-white/10 text-white rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                  View Documentation <span>→</span>
                </button>
              </NavLink>
            </div>

          </div>
        </main>
      </div>
    </section>
  );
};

export default HeroSection;
