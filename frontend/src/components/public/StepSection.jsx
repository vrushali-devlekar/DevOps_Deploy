import React from "react";
import heroCard1 from "../../assets/hero_card_1.svg";
import heroCard2 from "../../assets/hero_card_2.svg";
import heroCard3 from "../../assets/hero_card_3.svg";
import { GitBranch, Settings2, Rocket } from "lucide-react";

const StepsSection = () => {
  const stepsData = [
    {
      id: 1,
      title: "Connect Repository",
      subtitle: "The Floating Void Repository",
      description: "Connect your GitHub or GitLab repository. Velora automatically detects your framework and settings within the zero-gravity void matrix.",
      icon: <GitBranch size={20} className="text-[#c084fc]" />,
      iconBg: "bg-[#9333ea]/15",
      accent: "#c084fc",
      image: heroCard1,
    },
    {
      id: 2,
      title: "Configure Build",
      subtitle: "The Weightless Build Matrix",
      description: "Set environment variables, build commands, and golden compute clusters. Instant matrix compilation with zero downtime.",
      icon: <Settings2 size={20} className="text-[#facc15]" />,
      iconBg: "bg-[#eab308]/15",
      accent: "#facc15",
      image: heroCard2,
    },
    {
      id: 3,
      title: "Deploy Globally",
      subtitle: "The Edge Floating Island",
      description: "Push code to deploy instantly to our global cyber fortress edge network. Enjoy zero downtime, automatic SSL, and instant rollbacks.",
      icon: <Rocket size={20} className="text-[#a3e635]" />,
      iconBg: "bg-[#a3e635]/15",
      accent: "#a3e635",
      image: heroCard3,
    },
  ];

  return (
    <section className="bg-[#000000] text-white font-sans py-24 px-6 md:px-12 lg:px-24 overflow-hidden select-none">
      <div className="max-w-[1200px] mx-auto">
        {/* SECTION HEADING */}
        <div className="mb-16 text-center font-sans">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-white mb-4 font-['Press_Start_2P'] uppercase">
            From Code to <span className="text-[#facc15]">Live</span>
          </h2>
          <p className="text-[15px] text-[#a1a1aa] max-w-2xl mx-auto leading-relaxed mt-8">
            Deploy your application in three simple steps across floating voxel edge nodes. We handle the complex infrastructure so you can focus on writing code.
          </p>
        </div>

        {/* STEPS CONTAINER */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {stepsData.map((step) => (
            <div
              key={step.id}
              className="relative flex flex-col items-start w-full p-6 bg-[#09090b]/80 backdrop-blur-xl hover:bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.2] rounded-2xl transition-all duration-500 group shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.6)] overflow-hidden justify-between"
            >
              {/* Card visual */}
              <div className="relative mb-6 w-full flex flex-col items-center justify-center bg-black/40 rounded-xl p-4 border border-white/[0.04]">
                <img
                  src={step.image}
                  alt={`${step.title} visual`}
                  className="w-48 h-48 md:w-56 md:h-56 object-contain filter drop-shadow-2xl transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2"
                />
              </div>

              {/* STEP TEXT CONTENT */}
              <div className="flex flex-col items-start w-full mt-auto">
                <div className="flex items-center gap-3 mb-4 font-sans">
                  <div className={`w-8 h-8 rounded-lg ${step.iconBg} flex items-center justify-center`}>
                    {step.icon}
                  </div>
                  <span className="px-2.5 py-0.5 text-[11px] font-semibold text-[#a3e635] bg-[#1a1a1c] border border-white/[0.06] rounded-full tracking-wide">
                    Step {step.id}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1 tracking-tight font-sans">
                  {step.title}
                </h3>
                <p className="text-xs font-semibold mb-3" style={{ color: step.accent }}>
                  {step.subtitle}
                </p>
                <p className="text-[14px] leading-relaxed text-[#a1a1aa] font-sans">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
