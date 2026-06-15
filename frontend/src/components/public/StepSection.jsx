import React from "react";
import isometric_6595c7 from "../../assets/st1.png";
import isometric_6595c8 from "../../assets/stt2.png";
import isometric_6595c9 from "../../assets/stt3.png";
import { GitBranch, Settings2, Rocket } from "lucide-react";

const StepsSection = () => {
  const stepsData = [
    {
      id: 1,
      title: "Connect Repository",
      description: "Connect your GitHub or GitLab repository. Velora automatically detects your framework and settings.",
      icon: <GitBranch size={20} className="text-[#a3e635]" />,
      iconBg: "bg-[#a3e635]/10",
      image: isometric_6595c7,
    },
    {
      id: 2,
      title: "Configure Build",
      description: "Set environment variables, build commands, and output directories. Override defaults as needed.",
      icon: <Settings2 size={20} className="text-[#a3e635]" />,
      iconBg: "bg-[#a3e635]/10",
      image: isometric_6595c8,
    },
    {
      id: 3,
      title: "Deploy Globally",
      description: "Push code to deploy instantly to our global edge network. Enjoy zero downtime and instant rollbacks.",
      icon: <Rocket size={20} className="text-[#a3e635]" />,
      iconBg: "bg-[#a3e635]/10",
      image: isometric_6595c9,
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
            Deploy your application in three simple steps. We handle the complex infrastructure so you can focus on writing code.
          </p>
        </div>

        {/* STEPS CONTAINER */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {stepsData.map((step, index) => (
            <div
              key={step.id}
              className="relative flex flex-col items-start w-full p-6 bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] rounded-2xl transition-all duration-300 group shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
            >
              {/* Card visual */}
              <div className="relative mb-6 w-full flex flex-col items-center justify-center">
                <img
                  src={step.image}
                  alt={`${step.title} visual`}
                  className="w-48 h-48 md:w-52 md:h-52 object-contain filter drop-shadow-2xl transition-transform duration-500 group-hover:-translate-y-2"
                />
              </div>

              {/* STEP TEXT CONTENT */}
              <div className="flex flex-col items-start w-full mt-auto">
                <div className="flex items-center gap-3 mb-4 font-sans">
                  <div className={`w-8 h-8 rounded-lg ${step.iconBg} flex items-center justify-center`}>
                    {step.icon}
                  </div>
                  <span className="px-2.5 py-0.5 text-[11px] font-semibold text-[#a3e635] bg-[#1a1a1c] border border-white/[0.04] rounded-full tracking-wide">
                    Step {step.id}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 tracking-tight font-sans">
                  {step.title}
                </h3>
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
