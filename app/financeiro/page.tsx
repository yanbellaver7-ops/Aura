"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LimelightNav } from "../components/ui/limelight-nav";
import { GlowCard } from "../components/ui/spotlight-card";
import {
  AreaChart, Area, XAxis, Tooltip,
  ResponsiveContainer,
} from "recharts";

function DraggableVideo() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    e.preventDefault();
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    setPos(p => ({
      x: Math.max(0, Math.min(100, p.x - dx * 0.15)),
      y: Math.max(0, Math.min(100, p.y - dy * 0.3)),
    }));
  };
  const onMouseUp = () => { dragging.current = false; };

  return (
    <div
      className="absolute inset-0 z-0 group"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      style={{ cursor: dragging.current ? "grabbing" : "grab" }}
    >
      <video src="/Video.mp4" autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ objectPosition: `${pos.x}% ${pos.y}%` }}
      />
      <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm text-white/60 text-[11px] px-2.5 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Arraste para ajustar
      </div>
    </div>
  );
}

const navLinks = [
  { label: "Menu", href: "/menu" },
  { label: "Financeiro", href: "/financeiro" },
  { label: "Gym", href: "/gym" },
  { label: "Tarefas", href: "/tarefas" },
  { label: "Calendário", href: "/calendario" },
  { label: "Quadro dos Sonhos", href: "/quadro-dos-sonhos" },
  { label: "Configurações", href: "#" },
];

const balanceData = [
  { d: "15", v: 32000 }, { d: "16", v: 34500 }, { d: "17", v: 31000 },
  { d: "18", v: 36000 }, { d: "19", v: 33000 }, { d: "20", v: 38000 },
  { d: "21", v: 37000 }, { d: "22", v: 40111 }, { d: "23", v: 39000 }, { d: "24", v: 40111 },
];

const transactions = [
  { name: "PlayStation", card: "**** 0224", date: "31 Mar, 3:20 PM", amount: "-R$19,99" },
  { name: "Netflix",     card: "**** 0224", date: "29 Mar, 5:11 PM", amount: "-R$30,00" },
  { name: "Airbnb",      card: "**** 4432", date: "29 Mar, 1:20 PM", amount: "-R$300,00" },
  { name: "Tommy C.",    card: "**** 0224", date: "27 Mar, 2:31 AM", amount: "+R$27,00" },
  { name: "Apple",       card: "**** 4432", date: "27 Mar, 11:04 PM", amount: "-R$10,00" },
];

const spending = [
  { label: "Roupas",     pct: 28 },
  { label: "Mercado",    pct: 42 },
  { label: "Pets",       pct: 15 },
  { label: "Contas",     pct: 55 },
  { label: "Lazer",      pct: 33 },
];


export default function FinanceiroPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white overflow-y-auto">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/5 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-[120px]">
          <span className="text-2xl font-bold leading-none">✦</span>
          <span className="text-lg font-semibold tracking-wide">Aura+</span>
        </div>
        <LimelightNav
          initialActive={1}
          items={navLinks.map(item => ({
            id: item.href,
            label: item.label,
            onClick: () => setTimeout(() => router.push(item.href), 350),
          }))}
        />
        <div className="min-w-[120px] flex justify-end">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-sm font-bold">Y</div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-6 pb-16 space-y-4">
        {/* HERO CARD */}
        <div className="relative rounded-3xl overflow-hidden min-h-[280px] flex items-center p-10">
          <div className="absolute inset-0 bg-black/55 z-10 pointer-events-none" />
          <DraggableVideo />
          <div className="flex-1 z-20">
            <p className="text-sm text-gray-300 mb-1">Saldo total</p>
            <p className="text-5xl font-bold tracking-tight">R$375.928<span className="opacity-40">,00</span></p>
            <p className="text-sm text-emerald-400 mt-2">+R$4.821,00 este mês</p>
          </div>
          <div className="grid grid-cols-2 gap-3 z-20">
            {[
              { label: "Receita líquida", value: "R$18.742" },
              { label: "Crescimento",     value: "+12,4%"  },
              { label: "Metas atingidas", value: "92,8%"   },
              { label: "Pendentes",       value: "3"       },
            ].map(({ label, value }, i) => (
              <div key={i} className="bg-black/40 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[130px]">
                <p className="text-[11px] text-gray-300 mb-1">{label}</p>
                <p className="text-base font-bold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TOP BAR */}
        <div className="flex items-center justify-between">
          <button className="px-4 py-1.5 border border-white/15 rounded-full text-sm text-white/70 hover:text-white hover:border-white/30 transition-all">
            Este mês
          </button>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 border border-white/15 rounded-full text-sm text-white/50 hover:text-white hover:border-white/30 transition-all">
              Gerenciar widgets
            </button>
            <button className="px-4 py-1.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-all">
              + Novo widget
            </button>
          </div>
        </div>

        {/* ROW 1 — 3 cards */}
        <div className="grid grid-cols-12 gap-4">

          {/* AI Insights */}
          <GlowCard glowColor="blue" className="col-span-12 lg:col-span-5 relative overflow-hidden bg-black min-h-[220px] flex flex-col justify-end p-6">
            <div className="absolute top-3 left-4 z-10">
              <span className="text-xs font-medium bg-white/10 border border-white/10 px-3 py-1 rounded-full">AI Insights</span>
            </div>
            <div className="relative z-10 mt-auto">
              <div className="flex gap-1.5 mb-3">
                {[1,2,3,4].map(i => <span key={i} className={`w-2 h-2 rounded-full ${i === 1 ? "bg-white" : "bg-white/20"}`} />)}
              </div>
              <p className="text-lg font-bold leading-snug max-w-xs">
                Seu volume de transações aumentou 5% desde o último mês
              </p>
            </div>
            <button className="absolute bottom-5 right-5 w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all text-sm z-10">↗</button>
          </GlowCard>

          {/* Balance Overview */}
          <GlowCard glowColor="blue" className="col-span-12 lg:col-span-3 bg-black p-5 flex flex-col">
            <div className="flex items-start justify-between mb-1">
              <span className="text-sm font-semibold text-white/70">Visão geral do saldo</span>
              <button className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white text-sm">↗</button>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold">R$40.111</span>
              <span className="text-xs text-emerald-400">▲ 12% do último mês</span>
            </div>
            <div className="flex gap-2 mb-3">
              <span className="text-[11px] border border-white/10 rounded-full px-2.5 py-0.5 text-white/40">44 transações</span>
              <span className="text-[11px] border border-white/10 rounded-full px-2.5 py-0.5 text-white/40">12 categorias</span>
            </div>
            <div className="flex-1 min-h-[80px]">
              <ResponsiveContainer width="100%" height={90}>
                <AreaChart data={balanceData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffffff" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="d" tick={{ fill: "#ffffff30", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#111", border: "1px solid #333", borderRadius: 8, fontSize: 11 }} labelStyle={{ color: "#fff" }} formatter={(v) => [`R$${Number(v).toLocaleString("pt-BR")}`, ""]} />
                  <Area type="monotone" dataKey="v" stroke="white" strokeWidth={1.5} fill="url(#balGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlowCard>

          {/* Earnings */}
          <GlowCard glowColor="blue" className="col-span-12 lg:col-span-4 bg-black p-5 flex flex-col">
            <div className="flex items-start justify-between mb-1">
              <span className="text-sm font-semibold text-white/70">Ganhos</span>
              <button className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white text-sm">↗</button>
            </div>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold">R$40.111</span>
              <span className="text-xs text-emerald-400">▲ 7% do último mês</span>
            </div>
            <div className="space-y-3">
              {[
                { label: "Meta mensal", value: "R$50.000", pct: 80 },
                { label: "Meta anual",  value: "R$600.000", pct: 58 },
              ].map(({ label, value, pct }) => (
                <div key={label}>
                  <div className="flex justify-between text-xs text-white/40 mb-1.5">
                    <span>{label}</span>
                    <span>{value}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#6366f1] to-[#60a5fa]" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-12 gap-4">

          {/* Transactions */}
          <GlowCard glowColor="blue" className="col-span-12 lg:col-span-8 bg-black p-5">
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm font-semibold text-white/70">Transações</span>
              <div className="flex gap-2">
                <button className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white text-sm">≡</button>
                <button className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white text-sm">↗</button>
              </div>
            </div>
            <div className="space-y-3">
              {transactions.map((t, i) => (
                <div key={i} className="flex items-center gap-4 py-2 border-b border-white/[0.04] last:border-0">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-white/40 flex-shrink-0">
                    {t.name[0]}
                  </div>
                  <span className="text-sm font-medium text-white flex-1">{t.name}</span>
                  <span className="text-xs text-white/30 w-24 text-center">{t.card}</span>
                  <span className="text-xs text-white/30 flex-1 text-center">{t.date}</span>
                  <span className={`text-sm font-semibold w-24 text-right ${t.amount.startsWith("+") ? "text-emerald-400" : "text-white"}`}>
                    {t.amount}
                  </span>
                </div>
              ))}
            </div>
          </GlowCard>

          {/* Spending */}
          <GlowCard glowColor="blue" className="col-span-12 lg:col-span-4 bg-black p-5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-white/70">Gastos</span>
              <button className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white text-sm">↗</button>
            </div>
            <div className="flex items-baseline gap-2 mb-5">
              <span className="text-3xl font-bold">47.411</span>
              <span className="text-xs text-red-400">▼ 2 do último mês</span>
            </div>
            <div className="space-y-3">
              {spending.map(({ label, pct }) => (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/50">{label}</span>
                    <span className="text-white/30">{pct}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-white/70 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}
