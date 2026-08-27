import React from "react";
import heroCard1 from "../../assets/hero_card_1.svg";
import heroCard2 from "../../assets/hero_card_2.svg";
import heroCard3 from "../../assets/hero_card_3.svg";
import { Sparkles, Layers, Box } from "lucide-react";

const VoxelCardsSection = () => {
  const cardsData = [
    {
      id: "card-1",
      number: "01",
      badge: "Card 1 · Zero-Gravity Void",
      title: "Dimensional Nether Core",
      subtitle: "Antigravity Obsidian Portal",
      promptText: "Isometric 3D render of a floating pixel-art obsidian island hovering in deep zero-gravity space. A glowing purple dimensional portal core pulses in the center, surrounded by weightlessly drifting stone blocks & energy crystals.",
      image: heroCard1,
      icon: <Layers size={18} className="text-[#c084fc]" />,
      accent: "#c084fc",
      bgGlow: "from-[#9333ea]/15 to-transparent",
      borderGlow: "border-[#c084fc]/30 hover:border-[#c084fc]/60 hover:shadow-[0_0_35px_rgba(192,132,252,0.2)]",
      tagBg: "bg-[#9333ea]/15 text-[#c084fc] border-[#c084fc]/30"
    },
    {
      id: "card-2",
      number: "02",
      badge: "Card 2 · Floating Gold Cubes",
      title: "Weightless Computing Matrix",
      subtitle: "Gold Voxel Cluster",
      promptText: "Isometric pixel-art render of floating golden computing cubes hovering weightlessly above an antigravity metallic bedrock platform with golden embers, neon yellow sparks, and circuit trace reflections.",
      image: heroCard2,
      icon: <Box size={18} className="text-[#facc15]" />,
      accent: "#facc15",
      bgGlow: "from-[#eab308]/15 to-transparent",
      borderGlow: "border-[#facc15]/30 hover:border-[#facc15]/60 hover:shadow-[0_0_35px_rgba(250,204,21,0.2)]",
      tagBg: "bg-[#eab308]/15 text-[#facc15] border-[#facc15]/30"
    },
    {
      id: "card-3",
      number: "03",
      badge: "Card 3 · Antigravity Beacon Fortress",
      title: "Sky Island Mesh",
      subtitle: "Luminous Emerald Beacon",
      promptText: "Isometric 3D pixel-art render of a floating grass-and-stone sky island drifting in zero gravity. A luminous emerald beacon beam projects upwards into the sky with severed tree roots and floating mossy stone fragments.",
      image: heroCard3,
      icon: <Sparkles size={18} className="text-[#a3e635]" />,
      accent: "#a3e635",
      bgGlow: "from-[#a3e635]/15 to-transparent",
      borderGlow: "border-[#a3e635]/30 hover:border-[#a3e635]/60 hover:shadow-[0_0_35px_rgba(163,230,53,0.2)]",
      tagBg: "bg-[#a3e635]/15 text-[#a3e635] border-[#a3e635]/30"
    }
  ];

  return (
    <section id="voxel-matrix" className="relative bg-[#050507] text-white font-sans py-24 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-white/[0.06] select-none">
      
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-[#9333ea]/10 via-[#a3e635]/10 to-[#38bdf8]/10 blur-[120px] rounded-full pointer-events-none opacity-40" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        
        {/* SECTION HEADER */}
        <div className="mb-16 text-center font-sans">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111113] border border-white/10 text-xs text-[#a3e635] mb-6 tracking-wide font-medium">
            <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-ping" />
            <span>VOXEL CLOUD MATRIX</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-5 font-['Press_Start_2P'] uppercase leading-snug">
            Antigravity <span className="text-[#a3e635]">Voxel</span> Infrastructure
          </h2>
          
          <p className="text-base sm:text-lg text-[#a1a1aa] max-w-2xl mx-auto leading-relaxed">
            High-performance zero-gravity floating island nodes designed for ultra-fast, resilient cloud deployments across global edge regions.
          </p>
        </div>

        {/* 3 VOXEL CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cardsData.map((card) => (
            <div
              key={card.id}
              className={`group relative bg-[#0c0c0e]/90 backdrop-blur-xl border rounded-2xl p-6 sm:p-7 transition-all duration-500 flex flex-col justify-between overflow-hidden ${card.borderGlow}`}
            >
              {/* Top Card Gradient Blur */}
              <div className={`absolute top-0 right-0 left-0 h-32 bg-gradient-to-b ${card.bgGlow} opacity-30 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none`} />

              <div>
                {/* Header Badge & Number */}
                <div className="flex items-center justify-between mb-5 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-black/50 border border-white/10">
                      {card.icon}
                    </div>
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border ${card.tagBg}`}>
                      {card.badge}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-white/30 font-bold">
                    {card.number}
                  </span>
                </div>

                {/* Card Titles */}
                <h3 className="text-xl font-bold text-white tracking-tight mb-1 group-hover:text-[#a3e635] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs font-semibold mb-4" style={{ color: card.accent }}>
                  {card.subtitle}
                </p>

                {/* Voxel Image Visual Container */}
                <div className="relative my-4 rounded-xl overflow-hidden bg-black/70 border border-white/[0.08] p-4 flex items-center justify-center group-hover:border-white/20 transition-all shadow-inner">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-52 sm:h-60 object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)] transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2"
                  />
                </div>

                {/* Prompt Description */}
                <p className="text-xs leading-relaxed text-[#a1a1aa] font-sans mb-6">
                  {card.promptText}
                </p>
              </div>

              {/* Card Footer Tag */}
              <div className="pt-4 border-t border-white/[0.08] mt-auto flex items-center justify-between text-[11px] font-mono text-white/50">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: card.accent }} />
                  8K VOXEL RENDER
                </span>
                <span className="text-white/30">1:1 RATIO</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default VoxelCardsSection;
