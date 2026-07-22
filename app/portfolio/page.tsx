"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Menu, X } from "lucide-react";
import { WhatsAppButton } from "@/app/components/WhatsAppButton";

const NAV_LINKS = ["Home", "About", "Services", "Portfolio", "Reviews", "Contact"];

const ALL_PHOTOS = [
  { src: "/gallery1.png", alt: "Bride in traditional wedding attire", category: "Wedding" },
  { src: "/gallery2.png", alt: "Romantic couple portrait at sunset", category: "Couple" },
  { src: "/gallery3.png", alt: "Pre-wedding candid moment", category: "Pre-Wedding" },
  { src: "/gallery4.png", alt: "Newborn baby photoshoot", category: "Kids" },
  { src: "/gallery5.png", alt: "Engagement ring close-up", category: "Engagement" },
  { src: "/image-1.png", alt: "Wedding ceremony candid shot", category: "Wedding" },
  { src: "/image-2.png", alt: "Maternity glow photoshoot", category: "Maternity" },
  { src: "/image-3.png", alt: "Couple laughing candid moment", category: "Couple" },
  { src: "/image-4.png", alt: "Pre-wedding outdoor session", category: "Pre-Wedding" },
  { src: "/image-5.png", alt: "Wedding portrait in golden light", category: "Wedding" },
  { src: "/image-6.png", alt: "Mother and baby tender moment", category: "Maternity" },
  { src: "/image.png", alt: "Engagement ceremony candid", category: "Engagement" },
  { src: "/homeimage.png", alt: "Family photoshoot at home", category: "Kids" },
  { src: "/satya.jpeg", alt: "Sathya photography studio", category: "Wedding" },
];

const FILTERS = ["All", "Wedding", "Pre-Wedding", "Engagement", "Couple", "Maternity", "Kids"];

export default function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeFilter === "All" ? ALL_PHOTOS : ALL_PHOTOS.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <WhatsAppButton />

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-[#f5efe3]/95 backdrop-blur border-b border-[rgba(30,61,47,0.15)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          <Link href="/">
            <Image src="/logo.png" alt="Sathya Photography" width={120} height={56} className="h-12 md:h-14 w-auto object-contain" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <Link
                key={link}
                href={link === "Home" ? "/" : link === "Portfolio" ? "/portfolio" : `/#${link.toLowerCase()}`}
                className={`text-xs tracking-widest uppercase transition-colors duration-200 pb-0.5 ${link === "Portfolio" ? "text-primary border-b border-primary font-medium" : "text-muted-foreground hover:text-primary"}`}
              >
                {link}
              </Link>
            ))}
          </div>
          <button className="md:hidden text-primary" onClick={() => setMenuOpen(v => !v)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <div className={`md:hidden overflow-hidden transition-all duration-300 bg-[#f5efe3] border-b border-[rgba(30,61,47,0.15)] ${menuOpen ? "max-h-80" : "max-h-0"}`}>
          <div className="px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map(link => (
              <Link key={link} href={link === "Home" ? "/" : link === "Portfolio" ? "/portfolio" : `/#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors">
                {link}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* ── HEADER ── */}
      <div className="border-b border-border py-16 md:py-24 px-6 md:px-12 text-center relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(45,90,61,0.05) 0%, transparent 70%)" }} />
        <p className="text-xs tracking-[0.4em] uppercase text-accent mb-3">Complete Collection</p>
        <h1 className="text-6xl md:text-7xl text-primary mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>Full Portfolio</h1>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-primary/20" />
          <span className="text-primary/30">✦</span>
          <div className="h-px w-12 bg-primary/20" />
        </div>
        <p className="text-muted-foreground text-sm font-light max-w-md mx-auto">
          A curated collection of wedding, pre-wedding, engagement, maternity, kids, and couple photography from across Ongole, Guntur, Vijayawada, and Hyderabad.
        </p>
        <Link href="/" className="inline-flex items-center gap-2 mt-8 text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft size={13} /> Back to Home
        </Link>
      </div>

      {/* ── STICKY FILTERS ── */}
      <div className="sticky top-[65px] md:top-[81px] z-40 bg-[#f5efe3]/95 backdrop-blur border-b border-[rgba(30,61,47,0.15)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex gap-3 flex-wrap">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} className={`text-[11px] tracking-widest uppercase px-5 py-2 border transition-all duration-300 ${activeFilter === f ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>
              {f}
              <span className="ml-2 opacity-50">
                {f === "All" ? ALL_PHOTOS.length : ALL_PHOTOS.filter(p => p.category === f).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── GRID ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((item, i) => (
          <div key={i} className="relative overflow-hidden group bg-card aspect-square cursor-pointer" onClick={() => setLightbox(i)}>
            <Image src={item.src} alt={item.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/55 transition-all duration-500 flex flex-col items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                <p className="text-[10px] tracking-widest uppercase text-primary-foreground/70 mb-2">{item.category}</p>
                <p className="text-sm text-primary-foreground font-light leading-snug">{item.alt}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button className="absolute top-5 right-6 text-white/60 hover:text-white text-3xl transition-colors" onClick={() => setLightbox(null)}>✕</button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-4xl px-4 py-2 transition-colors" onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null); }}>‹</button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-4xl px-4 py-2 transition-colors" onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i + 1) % filtered.length : null); }}>›</button>
          <div className="max-w-4xl max-h-[85vh] px-16 relative" onClick={e => e.stopPropagation()}>
            <Image src={filtered[lightbox].src} alt={filtered[lightbox].alt} width={1200} height={900} className="max-w-full max-h-[80vh] object-contain" />
            <div className="text-center mt-4">
              <p className="text-[10px] tracking-widest uppercase text-white/40 mb-1">{filtered[lightbox].category}</p>
              <p className="text-white/70 text-sm font-light">{filtered[lightbox].alt}</p>
            </div>
          </div>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/30 text-xs tracking-widest">{lightbox + 1} / {filtered.length}</p>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer className="bg-primary text-primary-foreground px-6 md:px-12 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Image src="/logo.png" alt="Sathya Photography" width={120} height={56} className="h-14 w-auto object-contain brightness-0 invert" />
          <div className="text-center">
            <p className="text-xs text-primary-foreground/70 font-light mb-1">Photography &amp; Videography &nbsp;·&nbsp; Ongole · Guntur · Vijayawada · Hyderabad</p>
            <p className="text-xs text-primary-foreground/40 font-light">© {new Date().getFullYear()} Sathya Photography. All rights reserved.</p>
          </div>
          <div className="text-right">
            <a href="tel:+919010334999" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium tracking-wide block mb-1">+91 90103 34999</a>
            <p className="text-[11px] text-primary-foreground/40 leading-snug">Vamsi Complex, Shop 5, Ongole</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
