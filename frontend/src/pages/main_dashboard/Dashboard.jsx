import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../../hooks/useSidebar";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/layout/Sidebar";
import Dock from "../../components/layout/Dock";
import PageWrapper from "../../components/layout/PageWrapper";
import TopNav from "../../components/layout/TopNav";
import GlassButton from "../../components/ui/GlassButton";
import { motion } from "framer-motion";
import {
  Rocket, Folder, Terminal, BrainCircuit, History,
  Settings, ArrowUpRight, ArrowDownRight,
  Clock, Plus, GitBranch, Globe, Activity, TrendingUp,
  Shield, Cpu, Sparkles
} from "lucide-react";
import quantumCoreImg from "../../assets/quantum_server_core.svg";
import {
  getProjects,
  getWorkspaceOverview
} from "../../api/api";

/* ── Status dot ── */
const StatusDot = ({ status }) => {
  const colors = { RUNNING: "bg-[#22c55e]", FAILED: "bg-[#ef4444]", BUILDING: "bg-[#eab308]" };
  return <span className={`inline-block w-2 h-2 rounded-full shrink-0 ${colors[status] || "bg-[#52525b]"}`} />;
};

/* ── Status badge ── */
const StatusBadge = ({ status }) => {
  const map = {
    RUNNING: { cls: "bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/20", label: "Running" },
    FAILED: { cls: "bg-[#ef4444]/10 text-[#ef4444] border-[#ef4444]/20", label: "Failed" },
    BUILDING: { cls: "bg-[#eab308]/10 text-[#eab308] border-[#eab308]/20", label: "Building" },
    SUCCESS: { cls: "bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/20", label: "Ready" },
  };
  const cfg = map[status] || { cls: "bg-white/5 text-[#71717a] border-white/10", label: status };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${cfg.cls}`}>
      <StatusDot status={status} />
      {cfg.label}
    </span>
  );
};

/* ── Micro sparkline ── */
const Spark = ({ data, color = "#22c55e" }) => {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const W = 56, H = 24;
  const pts = data.map((v, i) =>
    `${(i / (data.length - 1)) * W},${H - ((v - min) / range) * H}`
  ).join(" ");
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
      <polyline points={pts} stroke={color} strokeWidth="1.75"
        strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
};

/* ── Uptime bar ── */
const UptimeBar = ({ data = [] }) => {
  const bars = data.length ? data : [0];
  return (
    <div className="flex items-end gap-[2px] h-10 w-full">
      {bars.map((h, i) => (
        <div
          key={i}
          style={{ height: `${Math.max(8, h)}%` }}
          className={`flex-1 rounded-[2px] transition-colors ${h <= 0 ? "bg-white/[0.04]" : "bg-[#10b981]/50 hover:bg-[#10b981] shadow-[0_0_6px_rgba(16,185,129,0.3)]"}`}
        />
      ))}
    </div>
  );
};

/* ── Bento card wrapper ── */
const BentoCard = ({ children, className = "", onClick, hover = true }) => (
  <div
    onClick={onClick}
    className={`
      bg-[#0a0a0d]/90 backdrop-blur-xl border border-[#f59e0b]/20 rounded-2xl overflow-hidden
      ${hover ? "hover:border-[#f59e0b]/50 hover:shadow-[0_8px_32px_rgba(245,158,11,0.2)] cursor-pointer" : ""}
      transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.5)]
      ${className}
    `}
  >
    {children}
  </div>
);

/* ── Stat card ── */
const StatCard = ({ label, value, delta, isPositive, Icon, iconColor, sparkData, sparkColor }) => (
  <BentoCard hover={false} className="p-7 flex flex-col justify-between gap-6">
    <div className="flex items-start justify-between">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconColor}`}>
        <Icon size={18} strokeWidth={1.75} />
      </div>
      <Spark data={sparkData} color={sparkColor} />
    </div>
    <div>
      <p className="text-[30px] font-bold text-white tracking-tight leading-none">{value}</p>
      <div className="flex items-center justify-between mt-3">
        <p className="text-[12px] text-[#71717a] font-medium">{label}</p>
        <span className={`inline-flex items-center gap-0.5 text-[11px] font-bold ${isPositive ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
          {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {delta}
        </span>
      </div>
    </div>
  </BentoCard>
);

/* ═══════════════════════════════════════════
   Main Dashboard
   ═══════════════════════════════════════════ */
export default function Dashboard() {
  const { isCollapsed, toggleSidebar, navMode, toggleNavMode } = useSidebar();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [recentDeploys, setRecentDeploys] = useState([]);
  const [environmentPreview, setEnvironmentPreview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbStats, setDbStats] = useState({
    totalProjects: "0",
    totalDeployments: "0",
    successRate: "0%",
    avgBuildTime: "0s",
    activityBars: [],
    deltas: {}
  });

  const getGreeting = () => {
    const hrs = new Date().getHours();
    if (hrs < 12) return "Good morning";
    if (hrs < 17) return "Good afternoon";
    return "Good evening";
  };

  useEffect(() => {
    let dead = false;

    const fetchData = async (isFirstLoad = false) => {
      if (isFirstLoad) {
        setLoading(true);
      }
      try {
        const [projRes, overviewRes] = await Promise.all([
          getProjects(),
          getWorkspaceOverview()
        ]);
        if (dead) return;
        setProjects(
          (overviewRes.data?.data?.projects || projRes.data?.data || []).map((p) => ({
            id: p.id || p._id,
            name: p.name,
            status: p.status || "INACTIVE",
            branch: p.branch || "main",
            createdAt: p.createdAt,
          }))
        );
        setDbStats(overviewRes.data?.data?.stats || {
          totalProjects: "0",
          totalDeployments: "0",
          successRate: "0%",
          avgBuildTime: "0s",
          activityBars: [],
          deltas: {}
        });
        setRecentDeploys(overviewRes.data?.data?.recentDeployments || []);
        setEnvironmentPreview(overviewRes.data?.data?.environmentPreview || []);
      } catch {
        if (!dead && isFirstLoad) setProjects([]);
      } finally {
        if (!dead && isFirstLoad) setLoading(false);
      }
    };

    fetchData(true);

    const intervalId = setInterval(() => {
      fetchData(false);
    }, 3000);

    return () => {
      dead = true;
      clearInterval(intervalId);
    };
  }, []);

  const stats = [
    { label: "Total Projects", value: dbStats.totalProjects, delta: dbStats.deltas?.totalProjects || "0", isPositive: !String(dbStats.deltas?.totalProjects || "").startsWith("-"), Icon: Folder, iconColor: "bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30", sparkData: (dbStats.activityBars || []).slice(-8), sparkColor: "#f59e0b" },
    { label: "Deployments", value: dbStats.totalDeployments, delta: dbStats.deltas?.totalDeployments || "0", isPositive: !String(dbStats.deltas?.totalDeployments || "").startsWith("-"), Icon: Rocket, iconColor: "bg-[#fbbf24]/15 text-[#fbbf24] border border-[#fbbf24]/30", sparkData: (dbStats.activityBars || []).slice(-8), sparkColor: "#fbbf24" },
    { label: "Success Rate", value: dbStats.successRate, delta: dbStats.deltas?.successRate || "0/0", isPositive: true, Icon: Shield, iconColor: "bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30", sparkData: (dbStats.activityBars || []).slice(-8), sparkColor: "#10b981" },
    { label: "Avg Build", value: dbStats.avgBuildTime, delta: dbStats.deltas?.avgBuildTime || "0 samples", isPositive: true, Icon: Clock, iconColor: "bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30", sparkData: (dbStats.activityBars || []).slice(-8), sparkColor: "#38bdf8" },
  ];

  const activityBars = dbStats.activityBars || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  return (
    <div className="flex h-screen overflow-hidden bg-[#040406] text-white font-sans">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} navMode={navMode} toggleNavMode={toggleNavMode} />
      <Dock navMode={navMode} toggleNavMode={toggleNavMode} />

      <PageWrapper navMode={navMode} isCollapsed={isCollapsed}>
        <TopNav />

        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          <div className="p-8 max-w-[1400px] mx-auto">

            {/* ══ ANTIGRAVITY QUANTUM SERVER CORE BANNER ══ */}
            <div className="relative mb-8 rounded-2xl bg-gradient-to-r from-[#140b04] via-[#1f1005] to-[#080402] border border-[#f59e0b]/30 p-6 sm:p-8 overflow-hidden shadow-[0_10px_40px_rgba(245,158,11,0.15)]">
              {/* Background Volumetric Glow Overlay */}
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#f59e0b]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#fbbf24]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/30 text-[11px] font-bold text-[#fef08a] mb-4 tracking-wider uppercase">
                    <Sparkles size={12} className="text-[#fbbf24]" />
                    <span>Antigravity Quantum Core Active</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-2">
                    {getGreeting()}, <span className="text-[#fef08a]">{user?.name || user?.username || 'Operator'}</span>
                  </h1>

                  <p className="text-xs sm:text-sm text-[#d4d4d8] leading-relaxed mb-6 font-sans">
                    Dark vacuum chamber matrix operational. Shattered matte-black geometric blocks floating symmetrically around vertical laser light pillars.
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <GlassButton variant="primary" onClick={() => navigate("/deploy")}>
                      <Rocket size={14} /> Deploy Application
                    </GlassButton>
                    <GlassButton variant="secondary" onClick={() => navigate("/projects/new")}>
                      <Plus size={14} /> New Project
                    </GlassButton>
                  </div>
                </div>

                {/* Isometric 3D Quantum Server Core Visual */}
                <div className="relative shrink-0 w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-xl overflow-hidden bg-black/50 border border-[#f59e0b]/25 p-2 flex items-center justify-center shadow-2xl">
                  <img
                    src={quantumCoreImg}
                    alt="Antigravity Quantum Server Core"
                    className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(245,158,11,0.35)] animate-pulse duration-1000"
                  />
                </div>
              </div>
            </div>

            {/* ══ BENTO GRID ══ */}
            <div className="grid grid-cols-12 gap-5">

              {/* ─── Row 1: 4 stat cards ─── */}
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  className="col-span-12 sm:col-span-6 lg:col-span-3"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                >
                  <StatCard {...s} />
                </motion.div>
              ))}

              {/* ─── Row 2 left: Recent Deployments ─── */}
              <motion.div
                className="col-span-12 lg:col-span-7"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.28 }}
              >
                <BentoCard hover={false} className="h-full flex flex-col">
                  <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                        <Activity size={13} className="text-[#52525b]" />
                      </div>
                      <p className="text-[14px] font-semibold text-white">Recent Deployments</p>
                    </div>
                    <button
                      onClick={() => navigate("/deploy")}
                      className="text-[12px] text-[#52525b] hover:text-white transition-colors font-medium"
                    >
                      View all →
                    </button>
                  </div>

                  <div className="flex flex-col divide-y divide-white/[0.04] flex-1">
                    {recentDeploys.length === 0 && (
                      <div className="px-6 py-8 text-[13px] text-[#52525b]">No deployments yet.</div>
                    )}
                    {recentDeploys.map((d, i) => (
                      <div
                        key={d.id || i}
                        onClick={() => navigate(`/deploy?projectId=${d.projectId}`)}
                        className="flex items-center gap-5 px-6 py-5 hover:bg-white/[0.025] cursor-pointer transition-colors group"
                      >
                        <StatusDot status={d.status} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-semibold text-white truncate group-hover:text-[#e4e4e7] transition-colors">
                            {d.name}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <GitBranch size={10} className="text-[#3f3f46] shrink-0" />
                            <span className="text-[11px] text-[#3f3f46] font-mono truncate">
                              {d.branch} · {d.duration || "0s"}
                            </span>
                          </div>
                        </div>
                        <StatusBadge status={d.status} />
                        <span className="text-[11px] text-[#3f3f46] w-24 text-right shrink-0 tabular-nums">
                          {new Date(d.time).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </BentoCard>
              </motion.div>

              {/* ─── Row 2 right: stacked small cards ─── */}
              <div className="col-span-12 lg:col-span-5 flex flex-col gap-5">
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.32 }}
                >
                  <BentoCard hover={false} className="px-6 py-6">
                    <div className="flex items-center justify-between mb-5">
                      <p className="text-[14px] font-semibold text-white">System Uptime</p>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                        <span className="text-[13px] font-bold text-[#22c55e]">{dbStats.successRate}</span>
                      </div>
                    </div>
                    <UptimeBar data={activityBars} />
                    <div className="flex justify-between text-[10.5px] text-[#2d2d33] mt-3 font-mono select-none">
                      <span>30 days ago</span>
                      <span>Today</span>
                    </div>
                  </BentoCard>
                </motion.div>

                <div className="grid grid-cols-2 gap-5 flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.36 }}
                    className="h-full"
                  >
                    <BentoCard hover={false} className="px-5 py-5 h-full flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-[13px] font-semibold text-white">Activity</p>
                        <TrendingUp size={13} className="text-[#22c55e]" />
                      </div>
                      <div className="flex items-end gap-[2.5px] h-14 mb-4">
                        {activityBars.map((v, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-[2px] bg-[#22c55e]"
                            style={{ height: `${(v / 9) * 100}%`, opacity: 0.1 + (v / 9) * 0.8 }}
                          />
                        ))}
                      </div>
                      <p className="text-[11px] text-[#3f3f46] font-medium mt-auto">
                        {dbStats.totalDeployments} deploys tracked
                      </p>
                    </BentoCard>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.4 }}
                    className="h-full"
                  >
                    <BentoCard hover={false} className="h-full flex flex-col">
                      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]">
                        <p className="text-[13px] font-semibold text-white">Env</p>
                        <button
                          onClick={() => navigate("/environments")}
                          className="text-[11px] text-[#52525b] hover:text-white transition-colors font-medium"
                        >
                          Edit →
                        </button>
                      </div>
                      <div className="flex flex-col divide-y divide-white/[0.04] flex-1">
                        {environmentPreview.length === 0 && (
                          <div className="px-5 py-4 text-[11px] text-[#3f3f46]">No environment variables stored.</div>
                        )}
                        {environmentPreview.map((env) => (
                          <div key={`${env.projectId}-${env.key}`} className="flex items-center justify-between px-5 py-3.5">
                            <span className="text-[11px] font-mono text-[#3b82f6] truncate">{env.key}</span>
                            <span className="text-[11px] font-mono text-[#2d2d33] ml-2">{env.masked}</span>
                          </div>
                        ))}
                      </div>
                    </BentoCard>
                  </motion.div>
                </div>
              </div>

              {/* ─── Row 3: Projects ─── */}
              <div className="col-span-12 mt-2">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <p className="text-[16px] font-bold text-white">Projects</p>
                    {!loading && (
                      <span className="px-2.5 py-0.5 rounded-lg bg-white/[0.06] border border-white/[0.08] text-[11px] font-semibold text-[#71717a]">
                        {projects.length}
                      </span>
                    )}
                  </div>
                  <GlassButton variant="secondary" onClick={() => navigate("/applications")}>
                    View all
                  </GlassButton>
                </div>

                {loading && (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pb-10">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-44 bg-[#111113] border border-white/[0.06] rounded-2xl animate-pulse" />
                    ))}
                  </div>
                )}

                {!loading && projects.length === 0 && (
                  <BentoCard hover={false} className="flex flex-col items-center justify-center py-20 border-dashed mb-10">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-5">
                      <Rocket size={20} className="text-[#2d2d33]" />
                    </div>
                    <p className="text-[14px] font-semibold text-white mb-2">No projects yet</p>
                    <p className="text-[13px] text-[#52525b] mb-6">Deploy your first application</p>
                    <GlassButton variant="primary" onClick={() => navigate("/projects/new")}>
                      <Plus size={14} /> Create project
                    </GlassButton>
                  </BentoCard>
                )}

                {!loading && projects.length > 0 && (
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pb-10"
                    initial="hidden"
                    animate="show"
                    variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
                  >
                    {projects.map((p) => (
                      <motion.div
                        key={p.id}
                        variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                      >
                        <BentoCard
                          className="group flex flex-col"
                          onClick={() => navigate(`/deploy?projectId=${p.id}`)}
                        >
                          <div className="px-6 py-6 flex-1">
                            <div className="flex items-start justify-between gap-3 mb-5">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-9 h-9 rounded-xl bg-[#18181b] border border-white/[0.08] flex items-center justify-center text-[#22c55e] shrink-0">
                                  <Globe size={15} />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-[13.5px] font-semibold text-white truncate group-hover:text-[#22c55e] transition-colors">
                                    {p.name}
                                  </p>
                                  <div className="flex items-center gap-1.5 mt-1">
                                    <GitBranch size={10} className="text-[#3f3f46] shrink-0" />
                                    <span className="text-[11px] text-[#3f3f46] font-mono">{p.branch}</span>
                                  </div>
                                </div>
                              </div>
                              <StatusBadge status={p.status} />
                            </div>
                          </div>

                          <div className="flex border-t border-white/[0.05]">
                            {[
                              { icon: Terminal, label: "Logs", fn: () => navigate(`/deploy?projectId=${p.id}`) },
                              { icon: History, label: "Deploys", fn: () => navigate(`/deploy?projectId=${p.id}`) },
                              { icon: Settings, label: "Config", fn: () => navigate(`/settings?projectId=${p.id}`) },
                              { icon: BrainCircuit, label: "AI", fn: () => { } },
                            ].map(({ icon: Icon, label, fn }, i) => (
                              <button
                                key={i}
                                onClick={(e) => { e.stopPropagation(); fn(); }}
                                title={label}
                                className="flex-1 flex flex-col items-center justify-center gap-1.5 py-4 text-[#3f3f46] hover:text-white hover:bg-white/[0.04] transition-colors border-r border-white/[0.05] last:border-0"
                              >
                                <Icon size={13} strokeWidth={1.75} />
                                <span className="text-[9.5px] font-semibold uppercase tracking-[0.06em]">{label}</span>
                              </button>
                            ))}
                          </div>
                        </BentoCard>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
}
