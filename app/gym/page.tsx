"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GlowCard } from "../components/ui/spotlight-card";
import { LimelightNav } from "../components/ui/limelight-nav";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Area, AreaChart,
} from "recharts";

const navLinks = [
  { label: "Menu", href: "/menu" },
  { label: "Financeiro", href: "/financeiro" },
  { label: "Gym", href: "/gym" },
  { label: "Tarefas", href: "/tarefas" },
  { label: "Calendário", href: "/calendario" },
  { label: "Quadro dos Sonhos", href: "/quadro-dos-sonhos" },
  { label: "Configurações", href: "#" },
];

const activityData = [
  { mes: "Jan", kg: 60 }, { mes: "Fev", kg: 75 }, { mes: "Mar", kg: 55 },
  { mes: "Abr", kg: 80 }, { mes: "Mai", kg: 45 }, { mes: "Jun", kg: 30 },
  { mes: "Jul", kg: 48 }, { mes: "Ago", kg: 70 },
];

const heartData = [
  { d: "Dom", bpm: 0 }, { d: "Seg", bpm: 72 }, { d: "Ter", bpm: 85 },
  { d: "Qua", bpm: 0 }, { d: "Qui", bpm: 78 }, { d: "Sex", bpm: 90 }, { d: "Sáb", bpm: 0 },
];

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const trainedDays = [false, true, true, false, true, true, false];

const monthCalendar = Array.from({ length: 31 }, (_, i) => ({
  day: i + 1,
  trained: [1,3,5,6,8,10,12,13,15,17,19,20,22,24,26,27,29].includes(i + 1),
}));

const recentWorkouts = [
  { name: "Supino reto", date: "Hoje, 07:30", kg: "85 kg × 8", trainer: "Peito" },
  { name: "Agachamento livre", date: "Ontem, 08:00", kg: "100 kg × 6", trainer: "Pernas" },
  { name: "Remada curvada", date: "24 Mar, 07:45", kg: "70 kg × 10", trainer: "Costas" },
];

const mealPlan = [
  { day: 1, title: "Frango & Arroz", sub: "Pré-treino", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200&q=80", highlight: false },
  { day: 2, title: "Omelete proteico", sub: "Café da manhã", img: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=200&q=80", highlight: false },
  { day: 3, title: "Salada verde", sub: "Almoço leve", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&q=80", highlight: true },
  { day: 4, title: "Whey + Banana", sub: "Pós-treino", img: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=200&q=80", highlight: false },
];

function MonthDot({ trained, day }: { trained: boolean; day: number }) {
  return (
    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-medium transition-all
      ${trained ? "bg-white text-black" : "bg-white/5 text-white/20"}`}>
      {day}
    </div>
  );
}

export default function GymPage() {
  const router = useRouter();
  const [, setActiveBar] = useState<number | null>(null);

  const totalTrained = monthCalendar.filter(d => d.trained).length;
  const calories = totalTrained * 420;
  const weekTrained = trainedDays.filter(Boolean).length;

  return (
    <div className="min-h-screen bg-black text-white overflow-y-auto">
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/5 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-[120px]">
          <span className="text-2xl font-bold leading-none">✦</span>
          <span className="text-lg font-semibold tracking-wide">Aura+</span>
        </div>
        <LimelightNav
          initialActive={2}
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

        {/* ROW 1 — cards + foto TikTok alinhados */}
        <div className="flex gap-4 items-stretch">

          {/* Cards empilhados à esquerda */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">

            {/* Avanço de carga */}
            <GlowCard glowColor="blue" className="relative overflow-hidden flex-1">
              {/* Foto de fundo */}
              <img
                src="/carga2.jpeg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

              {/* Conteúdo */}
              <div className="relative z-10 p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="font-semibold text-white">Avanço de carga</h2>
                    <p className="text-xs text-white/50 mt-0.5">Peso máximo por mês (kg)</p>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/40 hover:text-white text-sm transition-all">⊞</button>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={activityData} barCategoryGap="30%" onClick={(_, idx) => setActiveBar(idx as unknown as number)}>
                    <XAxis dataKey="mes" tick={{ fill: "#ffffff50", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#ffffff50", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}kg`} />
                    <Tooltip contentStyle={{ background: "#111", border: "1px solid #222", borderRadius: 10, fontSize: 12 }} labelStyle={{ color: "#fff" }} formatter={v => [`${v} kg`, ""]} />
                    <Bar dataKey="kg" radius={[6, 6, 4, 4]}
                      label={{ position: "insideTop", fill: "rgba(255,255,255,0.6)", fontSize: 10, formatter: (v: unknown) => `${v}%` }}
                      fill="rgba(255,255,255,0.2)"
                      activeBar={{ fill: "rgba(255,255,255,0.95)" }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlowCard>

            {/* Treino semanal */}
            <GlowCard glowColor="blue" className="bg-black p-6 flex-1">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-white">Treino semanal</h2>
                <span className="text-xs text-white/30">{weekTrained}/7 dias</span>
              </div>
              <div className="grid grid-cols-7 gap-2 mb-6">
                {weekDays.map((d, i) => (
                  <div key={d} className="flex flex-col items-center gap-2">
                    <span className="text-[10px] text-white/30">{d}</span>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium transition-all
                      ${trainedDays[i] ? "bg-white text-black" : "bg-white/5 text-white/20"}`}>
                      {trainedDays[i] ? "✓" : "–"}
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Calorias esta semana", value: `${weekTrained * 420} kcal` },
                  { label: "Volume semanal", value: "12.400 kg" },
                  { label: "Tempo médio", value: "58 min" },
                  { label: "Maior carga", value: "100 kg" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/[0.03] rounded-xl p-3">
                    <p className="text-[10px] text-white/30 mb-1">{label}</p>
                    <p className="text-sm font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </GlowCard>
          </div>

          {/* Foto TikTok 9:16 — mesma altura dos cards */}
          <div className="hidden lg:block flex-shrink-0 w-[230px]">
            <GlowCard glowColor="blue" className="bg-black overflow-hidden h-full">
              <img
                src="/disciplina.jpg"
                alt="Disciplina"
                className="w-full h-full object-cover"
              />
            </GlowCard>
          </div>
        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-12 gap-4">

          {/* Resultados */}
          <GlowCard glowColor="blue" className="col-span-12 lg:col-span-3 bg-black p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-white">Resultados</h2>
              <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white text-sm transition-all">↗</button>
            </div>
            <div className="space-y-3">
              {[
                { label: "Calorias gastas", value: `${calories.toLocaleString("pt-BR")} kcal`, sub: "Este mês" },
                { label: "Volume total", value: "186.000 kg", sub: "Este mês" },
                { label: "Corrida acumulada", value: "24 km", sub: "Este mês" },
                { label: "Treinos concluídos", value: `${totalTrained}`, sub: "Este mês" },
              ].map(({ label, value, sub }) => (
                <div key={label} className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-0">
                  <div>
                    <p className="text-sm font-medium text-white">{label}</p>
                    <p className="text-xs text-white/30">{sub}</p>
                  </div>
                  <span className="text-sm font-semibold text-white/70">{value}</span>
                </div>
              ))}
            </div>
          </GlowCard>

          {/* Progressão de carga — linha */}
          <GlowCard glowColor="blue" className="col-span-12 lg:col-span-5 bg-black p-6">
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-semibold text-white">Frequência semanal</h2>
              <span className="text-xs font-semibold text-white/50">70 bpm médio</span>
            </div>
            <p className="text-xs text-white/30 mb-4">Sessões de treino por dia</p>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={heartData}>
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fff" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                <XAxis dataKey="d" tick={{ fill: "#ffffff30", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#ffffff30", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={v => `${v}b`} />
                <Tooltip contentStyle={{ background: "#111", border: "1px solid #222", borderRadius: 10, fontSize: 12 }} labelStyle={{ color: "#fff" }} formatter={v => [`${v} bpm`, ""]} />
                <Area type="monotone" dataKey="bpm" stroke="white" strokeWidth={2} fill="url(#grad)" dot={{ fill: "white", r: 3 }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </GlowCard>

          {/* Nutrição recomendada */}
          <GlowCard glowColor="blue" className="col-span-12 lg:col-span-4 bg-black p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-white">Nutrição recomendada</h2>
              <button className="text-xs text-white/30 hover:text-white transition-colors">Ver mais</button>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {mealPlan.map(({ day, title, sub, img, highlight }) => (
                <div key={day} className={`relative rounded-xl overflow-hidden ${highlight ? "bg-white/10" : "bg-white/[0.03]"} p-3`}>
                  <div className="flex items-start gap-2 mb-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${highlight ? "bg-white text-black" : "bg-white/10 text-white/50"}`}>{day}</span>
                    <span className="text-[10px] text-white/30">Dia {day}</span>
                  </div>
                  <p className={`text-xs font-semibold leading-tight mb-1 ${highlight ? "text-white" : "text-white/80"}`}>{title}</p>
                  <p className="text-[10px] text-white/30">{sub}</p>
                  <img src={img} alt={title} className="absolute right-0 bottom-0 w-12 h-12 object-cover opacity-40 rounded-tl-xl" />
                </div>
              ))}
            </div>
          </GlowCard>
        </div>

        {/* ROW 3 */}
        <div className="grid grid-cols-12 gap-4">

          {/* Histórico de treinos */}
          <GlowCard glowColor="blue" className="col-span-12 lg:col-span-8 bg-black p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-white">Histórico de treinos</h2>
              <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white text-sm transition-all">⊞</button>
            </div>
            <div className="space-y-3">
              {recentWorkouts.map((w, i) => (
                <div key={i} className="flex items-center gap-4 py-2.5 border-b border-white/[0.04] last:border-0">
                  <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-white/40 flex-shrink-0">
                    {w.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{w.name}</p>
                    <p className="text-xs text-white/30">{w.date}</p>
                  </div>
                  <span className="text-xs text-white/30 hidden sm:block w-28 text-center">{w.kg}</span>
                  <span className="text-xs text-white/50 w-20 text-right">{w.trainer}</span>
                </div>
              ))}
            </div>
            {/* Progressão semanal vs mensal */}
            <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-white/5">
              {[
                { label: "Progresso semanal", value: "+3,2 kg" },
                { label: "Progresso mensal", value: "+8,5 kg" },
                { label: "Meta atingida", value: "72%" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/[0.03] rounded-xl p-3 text-center">
                  <p className="text-[10px] text-white/30 mb-1">{label}</p>
                  <p className="text-sm font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </GlowCard>

          {/* Dias treinados no mês */}
          <GlowCard glowColor="blue" className="col-span-12 lg:col-span-4 bg-black p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-white">Dias treinados</h2>
              <span className="text-xs text-white/30">{totalTrained}/31 dias</span>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-4">
              {["D","S","T","Q","Q","S","S"].map((d, i) => (
                <span key={i} className="text-center text-[9px] text-white/20 mb-1">{d}</span>
              ))}
              {monthCalendar.map(({ day, trained }) => (
                <MonthDot key={day} day={day} trained={trained} />
              ))}
            </div>
            <div className="pt-3 border-t border-white/5 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-white/30">Taxa de consistência</span>
                <span className="text-white font-medium">{Math.round(totalTrained / 31 * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-white/70 rounded-full" style={{ width: `${Math.round(totalTrained / 31 * 100)}%` }} />
              </div>
            </div>
          </GlowCard>
        </div>

      </div>
    </div>
  );
}
