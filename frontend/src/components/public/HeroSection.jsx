import React from "react";
import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import BrandLogo from "../ui/BrandLogo";
import heroBg from "../../assets/mcrft-bg.png";

const HeroSection = () => {
  const navItems = [
    { label: "Features", href: "#features" },
    { label: "Workflow", href: "#how-it-works" },
    { label: "Deploy", href: "#ready-to-deploy" },
    { label: "Docs", to: "/documentation" },
  ];

  return (
    <section id="hero" className="relative min-h-screen w-full bg-[#000000] font-sans overflow-hidden select-none flex flex-col">
      {/* Background Image */}
      <div
        className='absolute inset-0 z-0 h-full w-full bg-cover bg-no-repeat'
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundPosition: 'center 60%',
          filter: 'brightness(0.35) contrast(1.15)'
        }}
      />
      {/* Overlays: Radial mask + smooth bottom fade to pitch black */}
      <div className='absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1)_0%,#000000_90%)]' />
      <div className='absolute inset-0 z-10 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent' />

      <div className="relative z-10 flex flex-col h-full grow">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-6 py-6 md:px-12 border-b border-white/[0.06] bg-[#09090b]/80 backdrop-blur-md">
          <BrandLogo to="/" textClassName="text-lg font-semibold tracking-tight normal-case" iconClassName="rounded-md" />

          <div className="hidden md:flex gap-8 text-[13px] font-medium text-[#71717a]">
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
            <NavLink to="/login" className="hidden sm:flex items-center justify-center h-8 px-4 text-[12px] font-medium text-white border border-white/20 rounded-md hover:bg-white/5 transition-colors">
              Sign In
            </NavLink>
            <NavLink to="/register">
              <button className="h-8 px-4 bg-[#a3e635] text-black text-[12px] font-bold rounded-md hover:bg-[#bef264] transition-colors cursor-pointer">
                Get Started
              </button>
            </NavLink>
          </div>
        </nav>

        {/* Hero Content */}
        <main className="grow flex flex-col items-center justify-center px-4 pt-20 pb-32 text-center">
          <div className="max-w-4xl flex flex-col items-center">

            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111113]/60 backdrop-blur-md border border-[#a3e635]/20 text-xs text-[#a3e635] mb-8 font-sans transition-all duration-300 hover:border-[#a3e635]/40">
              <div className='w-1.5 h-1.5 bg-[#a3e635] rounded-full animate-pulse' />
              <span>Velora 2.0 is now available</span>
              <div className="w-px h-3 bg-white/[0.1] mx-1"></div>
              <NavLink to="/documentation" className="flex items-center gap-1 text-white hover:text-[#a3e635] transition-colors font-medium">
                Read release notes <ChevronRight size={12} />
              </NavLink>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white tracking-tighter leading-[1.3] mb-6 font-['Press_Start_2P'] uppercase">
              Your Complete <br />
              <span className="text-[#a3e635]">
                Deployment
              </span>{" "}
              <span className="text-[#facc15]">
                Platform
              </span>
            </h1>

            <p className="max-w-2xl text-[#a1a1aa] text-lg md:text-xl font-normal leading-relaxed mb-10 font-sans">
              Velora provides the developer tools and cloud infrastructure to build, scale, and secure a faster, more personalized web.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto font-sans">
              <NavLink to="/register" className="w-full sm:w-auto">
                <button className="h-12 px-8 text-sm font-semibold w-full sm:w-auto flex items-center justify-center gap-2 bg-[#a3e635] hover:bg-[#bef264] text-black rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(163,230,53,0.15)] hover:shadow-[0_0_25px_rgba(163,230,53,0.3)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                  Get Started Free <span>→</span>
                </button>
              </NavLink>
              <NavLink to="/documentation" className="w-full sm:w-auto">
                <button className="h-12 px-8 text-sm font-semibold w-full sm:w-auto flex items-center justify-center gap-2 bg-black/40 backdrop-blur-sm border border-white/10 hover:border-white/30 hover:bg-white/5 text-white rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
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
