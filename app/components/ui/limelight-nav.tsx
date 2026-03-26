"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";

type NavItem = {
  id: string | number;
  label: string;
  onClick?: () => void;
};

type LimelightNavProps = {
  items: NavItem[];
  initialActive?: number;
  className?: string;
};

export const LimelightNav = ({
  items,
  initialActive = 0,
  className = "",
}: LimelightNavProps) => {
  const [active, setActive] = useState(initialActive);
  const [lightStyle, setLightStyle] = useState<React.CSSProperties>({ opacity: 0, left: 0 });
  const [ready, setReady] = useState(false);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const navRef = useRef<HTMLElement>(null);

  const updateLight = (index: number, animate: boolean) => {
    const btn = btnRefs.current[index];
    const nav = navRef.current;
    if (!btn || !nav) return;
    const btnLeft = btn.offsetLeft;
    const btnWidth = btn.offsetWidth;
    const lightWidth = 56;
    const newLeft = btnLeft + btnWidth / 2 - lightWidth / 2;

    setLightStyle({
      left: newLeft,
      opacity: 1,
      transition: animate ? "left 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s" : "opacity 0.2s",
    });
  };

  // Position on mount without animation
  useLayoutEffect(() => {
    updateLight(initialActive, false);
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Reposition when active changes (with animation after ready)
  useEffect(() => {
    if (ready) updateLight(active, true);
  }, [active, ready]);

  const handleClick = (index: number, item: NavItem) => {
    setActive(index);
    item.onClick?.();
  };

  return (
    <nav
      ref={navRef}
      className={`relative inline-flex items-center h-11 rounded-full bg-white/5 px-1 overflow-visible ${className}`}
    >
      {items.map((item, index) => (
        <button
          key={item.id}
          ref={(el) => { btnRefs.current[index] = el; }}
          onClick={() => handleClick(index, item)}
          className={`relative z-20 px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 whitespace-nowrap ${
            active === index ? "text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          {item.label}
        </button>
      ))}

      {/* Limelight */}
      <div
        className="absolute top-0 z-10 w-14 h-[3px] rounded-full bg-white"
        style={{
          ...lightStyle,
          boxShadow: "0 0 10px 2px rgba(255,255,255,0.5), 0 0 30px 6px rgba(255,255,255,0.15)",
        }}
      >
        {/* Light cone */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: "-40%",
            top: "3px",
            width: "180%",
            height: "44px",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.18), transparent)",
            clipPath: "polygon(10% 100%, 28% 0, 72% 0, 90% 100%)",
          }}
        />
      </div>
    </nav>
  );
};
