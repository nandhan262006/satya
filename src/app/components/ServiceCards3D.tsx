"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import gallery1 from "@/imports/gallery1.png";
import gallery2 from "@/imports/gallery2.png";
import gallery3 from "@/imports/gallery3.png";
import gallery4 from "@/imports/gallery4.png";
import gallery5 from "@/imports/gallery5.png";

export interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export const serviceList: Service[] = [
  {
    id: "wedding",
    title: "Wedding Photography",
    description:
      "Full-day documentary coverage from the first ritual to the last dance — every emotion, every unscripted moment, preserved forever.",
    imageUrl: gallery1,
  },
  {
    id: "prewedding",
    title: "Pre-Wedding Shoots",
    description:
      "Romantic outdoor sessions that tell your love story before the big day — natural light, beautiful locations, and real moments.",
    imageUrl: gallery3,
  },
  {
    id: "engagement",
    title: "Engagement Sessions",
    description:
      "Celebrate your new chapter with candid, joyful portraits that capture the excitement of saying yes.",
    imageUrl: gallery5,
  },
  {
    id: "maternity",
    title: "Maternity Photography",
    description:
      "Glowing, timeless portraits that honour the beauty of expecting — soft light, genuine emotion, lasting memories.",
    imageUrl:
      "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=680&h=900&fit=crop&auto=format",
  },
  {
    id: "kids",
    title: "Kids & Baby Shoots",
    description:
      "Playful, authentic sessions that freeze the tiny smiles, curious eyes, and fleeting milestones of childhood.",
    imageUrl: gallery4,
  },
  {
    id: "couple",
    title: "Couple Shoots",
    description:
      "Relaxed sessions for couples at any stage — anniversary, just-for-fun, or a gift to each other that lasts a lifetime.",
    imageUrl: gallery2,
  },
];

const FALLBACK_GRADIENTS = [
  "from-emerald-900 to-teal-800",
  "from-stone-800 to-neutral-700",
  "from-slate-800 to-zinc-700",
  "from-green-900 to-emerald-800",
  "from-neutral-800 to-stone-700",
  "from-teal-900 to-cyan-900",
];

function getCardTransform(offset: number): React.CSSProperties {
  const abs = Math.abs(offset);

  if (offset === 0) {
    return {
      transform: "translateX(0px) translateZ(0px) rotateY(0deg) scale(1)",
      opacity: 1,
      zIndex: 10,
    };
  }

  if (abs === 1) {
    const dir = Math.sign(offset);
    return {
      transform: `translateX(${dir * 120}px) translateZ(-80px) rotateY(${-dir * 25}deg) scale(0.88)`,
      opacity: 0.7,
      zIndex: 5,
    };
  }

  const dir = Math.sign(offset);
  return {
    transform: `translateX(${dir * 220}px) translateZ(-200px) rotateY(${-dir * 35}deg) scale(0.4)`,
    opacity: 0.1,
    zIndex: 1,
  };
}

interface CardProps {
  service: Service;
  offset: number;
  index: number;
  onClick: () => void;
}

function ServiceCard({ service, offset, index, onClick }: CardProps) {
  const style = getCardTransform(offset);
  const fallback = FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length];

  return (
    <div
      onClick={onClick}
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[240px] sm:w-[280px] md:w-[340px] cursor-pointer select-none"
      style={{
        ...style,
        transition: "transform 500ms ease-out, opacity 500ms ease-out",
        aspectRatio: "3 / 4",
      }}
    >
      <div className={`relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b ${fallback}`}>
        {/* Background image */}
        <img
          src={service.imageUrl}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Text content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <h3 className="text-white font-semibold text-base md:text-lg leading-snug mb-1"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {service.title}
          </h3>
          <p className="text-white/75 text-xs md:text-sm font-light leading-relaxed line-clamp-3"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            {service.description}
          </p>
        </div>

        {/* Active ring */}
        {offset === 0 && (
          <div className="absolute inset-0 rounded-2xl ring-2 ring-white/20 pointer-events-none" />
        )}
      </div>
    </div>
  );
}

interface ServiceCards3DProps {
  services: Service[];
}

export function ServiceCards3D({ services }: ServiceCards3DProps) {
  const [active, setActive] = useState(0);
  const total = services.length;

  // Wheel accumulator
  const wheelAcc = useRef(0);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Drag / swipe
  const dragStart = useRef<number | null>(null);
  const isDragging = useRef(false);

  const goTo = useCallback(
    (index: number) => setActive(((index % total) + total) % total),
    [total]
  );
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);

  // Mouse wheel
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      wheelAcc.current += e.deltaY;
      if (wheelTimer.current) clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(() => { wheelAcc.current = 0; }, 200);
      if (Math.abs(wheelAcc.current) >= 80) {
        wheelAcc.current > 0 ? next() : prev();
        wheelAcc.current = 0;
      }
    },
    [next, prev]
  );

  // Drag start
  const handlePointerDown = (e: React.PointerEvent) => {
    dragStart.current = e.clientX;
    isDragging.current = false;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    if (Math.abs(e.clientX - dragStart.current) > 5) isDragging.current = true;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    const delta = e.clientX - dragStart.current;
    if (isDragging.current && Math.abs(delta) >= 60) {
      delta < 0 ? next() : prev();
    }
    dragStart.current = null;
    isDragging.current = false;
  };

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  return (
    <section id="services" className="py-24 md:py-32 bg-card px-6 md:px-12 overflow-hidden">
      {/* Section header */}
      <div className="text-center mb-14">
        <p className="text-xs tracking-[0.4em] uppercase text-accent mb-3">What I Offer</p>
        <h2
          className="text-5xl md:text-6xl text-primary mb-3"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          Services
        </h2>
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-primary/20" />
          <span className="text-primary/30 text-sm">✦</span>
          <div className="h-px w-12 bg-primary/20" />
        </div>
      </div>

      {/* Carousel */}
      <div
        className="relative h-[420px] sm:h-[500px] md:h-[600px] flex items-center justify-center touch-none"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {services.map((service, i) => {
          // Compute shortest-path offset so cards wrap correctly
          let offset = i - active;
          if (offset > Math.floor(total / 2)) offset -= total;
          if (offset < -Math.floor(total / 2)) offset += total;

          return (
            <ServiceCard
              key={service.id}
              service={service}
              offset={offset}
              index={i}
              onClick={() => !isDragging.current && goTo(i)}
            />
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2.5 mt-8">
        {services.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? "24px" : "8px",
              height: "8px",
              backgroundColor:
                i === active ? "var(--accent)" : "var(--primary)",
              opacity: i === active ? 1 : 0.25,
              transform: i === active ? "scale(1.2)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
