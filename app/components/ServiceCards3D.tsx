"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";

export interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export const serviceList: Service[] = [
  { id: "wedding", title: "Wedding Photography", description: "Full-day documentary coverage from the first ritual to the last dance — every emotion, every unscripted moment, preserved forever.", imageUrl: "/gallery1.png" },
  { id: "prewedding", title: "Pre-Wedding Shoots", description: "Romantic outdoor sessions that tell your love story before the big day — natural light, beautiful locations, and real moments.", imageUrl: "/gallery3.png" },
  { id: "engagement", title: "Engagement Sessions", description: "Celebrate your new chapter with candid, joyful portraits that capture the excitement of saying yes.", imageUrl: "/gallery5.png" },
  { id: "maternity", title: "Maternity Photography", description: "Glowing, timeless portraits that honour the beauty of expecting — soft light, genuine emotion, lasting memories.", imageUrl: "/image-2.png" },
  { id: "kids", title: "Kids & Baby Shoots", description: "Playful, authentic sessions that freeze the tiny smiles, curious eyes, and fleeting milestones of childhood.", imageUrl: "/gallery4.png" },
  { id: "couple", title: "Couple Shoots", description: "Relaxed sessions for couples at any stage — anniversary, just-for-fun, or a gift to each other that lasts a lifetime.", imageUrl: "/gallery2.png" },
];

const FALLBACK_GRADIENTS = ["from-emerald-900 to-teal-800", "from-stone-800 to-neutral-700", "from-slate-800 to-zinc-700", "from-green-900 to-emerald-800", "from-neutral-800 to-stone-700"];

function getCardTransform(offset: number): React.CSSProperties {
  if (offset === 0) return { transform: "translateX(0px) translateZ(0px) rotateY(0deg) scale(1)", opacity: 1, zIndex: 10 };
  if (Math.abs(offset) === 1) {
    const dir = Math.sign(offset);
    return { transform: `translateX(${dir * 120}px) translateZ(-80px) rotateY(${-dir * 25}deg) scale(0.88)`, opacity: 0.7, zIndex: 5 };
  }
  const dir = Math.sign(offset);
  return { transform: `translateX(${dir * 220}px) translateZ(-200px) rotateY(${-dir * 35}deg) scale(0.4)`, opacity: 0.1, zIndex: 1 };
}

function ServiceCard({ service, offset, index, onClick }: { service: Service; offset: number; index: number; onClick: () => void }) {
  const style = getCardTransform(offset);
  return (
    <div onClick={onClick} className="absolute top-0 left-1/2 -translate-x-1/2 w-[240px] sm:w-[280px] md:w-[340px] cursor-pointer select-none" style={{ ...style, transition: "transform 500ms ease-out, opacity 500ms ease-out", aspectRatio: "3 / 4" }}>
      <div className={`relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b ${FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length]}`}>
        <Image src={service.imageUrl} alt={service.title} fill className="object-cover" draggable={false} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <h3 className="text-white font-semibold text-base md:text-lg leading-snug mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{service.title}</h3>
          <p className="text-white/75 text-xs md:text-sm font-light leading-relaxed line-clamp-3">{service.description}</p>
        </div>
        {offset === 0 && <div className="absolute inset-0 rounded-2xl ring-2 ring-white/20 pointer-events-none" />}
      </div>
    </div>
  );
}

export function ServiceCards3D({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const total = services.length;
  const wheelAcc = useRef(0);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStart = useRef<number | null>(null);
  const isDragging = useRef(false);

  const goTo = useCallback((index: number) => setActive(((index % total) + total) % total), [total]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    wheelAcc.current += e.deltaY;
    if (wheelTimer.current) clearTimeout(wheelTimer.current);
    wheelTimer.current = setTimeout(() => { wheelAcc.current = 0; }, 200);
    if (Math.abs(wheelAcc.current) >= 80) { wheelAcc.current > 0 ? next() : prev(); wheelAcc.current = 0; }
  }, [next, prev]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "ArrowLeft") prev(); if (e.key === "ArrowRight") next(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  return (
    <section id="services" className="py-24 md:py-32 bg-[#eee8da] px-6 md:px-12 overflow-hidden">
      <div className="text-center mb-14">
        <p className="text-xs tracking-[0.4em] uppercase text-[#2d5a3d] mb-3">What I Offer</p>
        <h2 className="text-5xl md:text-6xl text-[#1e3d2f] mb-3" style={{ fontFamily: "'Great Vibes', cursive" }}>Services</h2>
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-[#1e3d2f]/20" />
          <span className="text-[#1e3d2f]/30 text-sm">✦</span>
          <div className="h-px w-12 bg-[#1e3d2f]/20" />
        </div>
      </div>

      <div className="relative h-[420px] sm:h-[500px] md:h-[600px] flex items-center justify-center touch-none" style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        onWheel={handleWheel}
        onPointerDown={e => { dragStart.current = e.clientX; isDragging.current = false; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); }}
        onPointerMove={e => { if (dragStart.current !== null && Math.abs(e.clientX - dragStart.current) > 5) isDragging.current = true; }}
        onPointerUp={e => { if (dragStart.current !== null) { const delta = e.clientX - dragStart.current; if (isDragging.current && Math.abs(delta) >= 60) { delta < 0 ? next() : prev(); } dragStart.current = null; isDragging.current = false; } }}
      >
        {services.map((service, i) => {
          let offset = i - active;
          if (offset > Math.floor(total / 2)) offset -= total;
          if (offset < -Math.floor(total / 2)) offset += total;
          return <ServiceCard key={service.id} service={service} offset={offset} index={i} onClick={() => !isDragging.current && goTo(i)} />;
        })}
      </div>

      <div className="flex items-center justify-center gap-2.5 mt-8">
        {services.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`} className="rounded-full transition-all duration-300" style={{ width: i === active ? "24px" : "8px", height: "8px", backgroundColor: i === active ? "#2d5a3d" : "#1e3d2f", opacity: i === active ? 1 : 0.25, transform: i === active ? "scale(1.2)" : "scale(1)" }} />
        ))}
      </div>
    </section>
  );
}
