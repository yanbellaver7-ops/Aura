"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LimelightNav } from "../components/ui/limelight-nav";
import { GlowCard } from "../components/ui/spotlight-card";
import { AnimateCheckbox } from "../components/ui/animate-checkbox";
import StackedArticleCards, { TaskItem } from "../components/ui/stacked-article-cards";

const navLinks = [
  { label: "Menu",              href: "/menu" },
  { label: "Financeiro",        href: "/financeiro" },
  { label: "Gym",               href: "/gym" },
  { label: "Tarefas",           href: "/tarefas" },
  { label: "Calendário",        href: "/calendario" },
  { label: "Quadro dos Sonhos", href: "/quadro-dos-sonhos" },
  { label: "Configurações",     href: "#" },
];

const defaultPriority: TaskItem[] = [
  {
    id: 1,
    title: "Revisar orçamento trimestral",
    subTitle: "Análise de gastos e projeção para os próximos 3 meses",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=200&fit=crop&q=80",
    tag: "Finanças",
  },
  {
    id: 2,
    title: "Reunião com o time às 15h",
    subTitle: "Alinhamento de metas e revisão de entregas da semana",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=200&fit=crop&q=80",
    tag: "Trabalho",
  },
  {
    id: 3,
    title: "Treino — Peito e Tríceps",
    subTitle: "Supino, crucifixo, tríceps pulley — 4 séries cada",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&q=80",
    tag: "Saúde",
  },
  {
    id: 4,
    title: "Ler 30 páginas",
    subTitle: "Continuar leitura de Pai Rico, Pai Pobre — cap. 5",
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=200&fit=crop&q=80",
    tag: "Desenvolvimento",
  },
];

interface TodoItem { id: number; text: string; done: boolean; }

const initialItems: TodoItem[] = [
  { id: 1, text: "Agendar consulta médica",      done: false },
  { id: 2, text: "Renovar seguro do carro",       done: true  },
  { id: 3, text: "Ligar para o banco",            done: false },
  { id: 4, text: "Enviar relatório semanal",      done: false },
  { id: 5, text: "Atualizar planilha de metas",   done: true  },
];

export default function TarefasPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<TodoItem[]>(initialItems);
  const [input, setInput] = useState("");

  const toggle = (id: number) =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));

  const add = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTasks(prev => [...prev, { id: Date.now(), text: trimmed, done: false }]);
    setInput("");
  };

  const remove = (id: number) => setTasks(prev => prev.filter(t => t.id !== id));

  const done  = tasks.filter(t => t.done).length;
  const total = tasks.length;

  return (
    <div className="min-h-screen bg-black text-white overflow-y-auto">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/5 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-[120px]">
          <span className="text-2xl font-bold leading-none">✦</span>
          <span className="text-lg font-semibold tracking-wide">Aura+</span>
        </div>
        <LimelightNav
          initialActive={3}
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

      <div className="max-w-7xl mx-auto px-6 py-8 pb-16 space-y-6">

        {/* HEADER */}
        <div>
          <p className="text-sm text-white/30 mb-1">Organize seu dia</p>
          <h1 className="text-4xl font-bold">Tarefas</h1>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total",      value: total },
            { label: "Concluídas", value: done  },
            { label: "Pendentes",  value: total - done },
            { label: "% Feito",    value: `${total ? Math.round((done / total) * 100) : 0}%` },
          ].map(({ label, value }) => (
            <GlowCard key={label} glowColor="blue" className="bg-black p-4">
              <p className="text-xs text-white/30 mb-1">{label}</p>
              <p className="text-2xl font-bold">{value}</p>
            </GlowCard>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* Stacked priority tasks */}
          <GlowCard glowColor="blue" className="bg-black p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-semibold text-white/70">Prioridades do dia</h2>
              <span className="text-xs text-white/25">Clique para expandir</span>
            </div>
            <StackedArticleCards items={defaultPriority} />
          </GlowCard>

          {/* Simple todo list */}
          <GlowCard glowColor="blue" className="bg-black p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white/70">Lista de tarefas</h2>
              <span className="text-xs text-white/25">{done}/{total} concluídas</span>
            </div>

            {/* Progress bar */}
            <div className="h-1 rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#6366f1] to-[#60a5fa] transition-all duration-500"
                style={{ width: `${total ? (done / total) * 100 : 0}%` }}
              />
            </div>

            <div className="flex flex-col gap-2">
              {tasks.map(({ id, text, done }) => (
                <div key={id} className="flex items-center gap-3 group py-1">
                  <AnimateCheckbox checked={done} onCheckedChange={() => toggle(id)} />
                  <span className={`text-sm flex-1 transition-all ${done ? "line-through text-white/25" : "text-white"}`}>
                    {text}
                  </span>
                  <button
                    onClick={() => remove(id)}
                    className="text-white/15 hover:text-white/50 text-xs opacity-0 group-hover:opacity-100 transition-all"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-3 border-t border-white/5 mt-auto">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && add()}
                placeholder="Nova tarefa..."
                className="flex-1 bg-white/5 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 outline-none border border-transparent focus:border-white/10"
              />
              <button
                onClick={add}
                className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm transition-all"
              >
                +
              </button>
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}
