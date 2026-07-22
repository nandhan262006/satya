import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Menu, X } from "lucide-react";
import logo from "@/imports/logo.png";
import img0 from "@/imports/image.png";
import img1 from "@/imports/image-1.png";
import img2 from "@/imports/image-2.png";
import img6 from "@/imports/image-6.png";

const NAV_LINKS = ["Home", "About", "Services", "Portfolio", "Testimonials", "Contact"];

const ALL_PHOTOS = [
  { src: img0, alt: "Bride portrait — bridal jewellery and lehenga", category: "Wedding" },
  { src: img1, alt: "Pre-wedding shoot — couple with vintage car", category: "Pre-Wedding" },
  { src: img2, alt: "Wedding — Nikitha & Charan", category: "Wedding" },
  { src: img6, alt: "Wedding — couple silhouette with fairy lights", category: "Wedding" },
  { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&h=750&fit=crop&auto=format", alt: "Romantic pre-wedding outdoors", category: "Pre-Wedding" },
  { src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=600&h=750&fit=crop&auto=format", alt: "Couple portrait session", category: "Couple" },
  { src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=750&fit=crop&auto=format", alt: "Engagement session candid", category: "Engagement" },
  { src: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=600&h=750&fit=crop&auto=format", alt: "Maternity portrait — golden hour", category: "Maternity" },
  { src: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&h=750&fit=crop&auto=format", alt: "Kids portrait — joyful childhood", category: "Kids" },
  { src: "https://images.unsplash.com/photo-1508185140592-283327020902?w=600&h=750&fit=crop&auto=format", alt: "Wedding reception portrait", category: "Wedding" },
  { src: "https://images.unsplash.com/photo-1532170579297-281918c8ae72?w=600&h=750&fit=crop&auto=format", alt: "Pre-wedding editorial look", category: "Pre-Wedding" },
  { src: "https://images.unsplash.com/photo-1568038479111-87bf80659645?w=600&h=750&fit=crop&auto=format", alt: "Couple candid moment", category: "Couple" },
];

const FILTERS = ["All", "Wedding", "Pre-Wedding", "Engagement", "Couple", "Maternity", "Kids"];

export default function Portfolio() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeFilter === "All" ? ALL_PHOTOS : ALL_PHOTOS.filter(p => p.category === activeFilter);

  const goHome = () => navigate("/");

  const prev = () => setLightbox(i => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  const next = () => setLightbox(i => (i !== null ? (i + 1) % filtered.length : null));

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Jost', sans-serif" }}>

      {/* ── FLOATING WHATSAPP ── */}
      <a
        href="https://wa.me/919010334999"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 group overflow-hidden"
        style={{ paddingBlock: "13px", paddingInline: "16px" }}
        aria-label="Chat on WhatsApp"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="text-xs font-semibold tracking-wide max-w-0 group-hover:max-w-[120px] overflow-hidden whitespace-nowrap transition-all duration-500">
          Chat with us
        </span>
      </a>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          <button onClick={goHome}>
            <img src={logo} alt="Sathya Photography logo" className="h-12 md:h-14 w-auto object-contain" />
          </button>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <button
                key={link}
                onClick={() => link === "Home" ? goHome() : navigate(`/#${link.toLowerCase()}`)}
                className={`text-xs tracking-widest uppercase transition-colors duration-200 pb-0.5 ${
                  link === "Portfolio"
                    ? "text-primary border-b border-primary font-medium"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link}
              </button>
            ))}
          </div>
          <button className="md:hidden text-primary" onClick={() => setMenuOpen(v => !v)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <div className={`md:hidden overflow-hidden transition-all duration-400 bg-background border-b border-border ${menuOpen ? "max-h-80" : "max-h-0"}`}>
          <div className="px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => { link === "Home" ? goHome() : navigate(`/#${link.toLowerCase()}`); setMenuOpen(false); }} className="text-left text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors">
                {link}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── PAGE HEADER ── */}
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
          A curated collection of portraits, landscapes, documentary work, and editorial commissions.
        </p>
        <button
          onClick={goHome}
          className="inline-flex items-center gap-2 mt-8 text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft size={13} /> Back to Home
        </button>
      </div>

      {/* ── FILTERS ── */}
      <div className="sticky top-[65px] md:top-[81px] z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex gap-3 flex-wrap">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-[11px] tracking-widest uppercase px-5 py-2 border transition-all duration-300 ${
                activeFilter === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
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
          <div
            key={`${item.src}-${i}`}
            className="relative overflow-hidden group bg-card aspect-square cursor-pointer"
            onClick={() => setLightbox(i)}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
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
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-5 right-6 text-white/60 hover:text-white text-3xl transition-colors" onClick={() => setLightbox(null)}>✕</button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-4xl px-4 py-2 transition-colors" onClick={e => { e.stopPropagation(); prev(); }}>‹</button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-4xl px-4 py-2 transition-colors" onClick={e => { e.stopPropagation(); next(); }}>›</button>
          <div className="max-w-4xl max-h-[85vh] px-16" onClick={e => e.stopPropagation()}>
            <img
              src={filtered[lightbox].src.replace("w=600", "w=1200").replace("h=750", "h=900")}
              alt={filtered[lightbox].alt}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <div className="text-center mt-4">
              <p className="text-[10px] tracking-widest uppercase text-white/40 mb-1">{filtered[lightbox].category}</p>
              <p className="text-white/70 text-sm font-light">{filtered[lightbox].alt}</p>
            </div>
          </div>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/30 text-xs tracking-widest">
            {lightbox + 1} / {filtered.length}
          </p>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer className="bg-primary text-primary-foreground px-6 md:px-12 py-10 mt-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <img src={logo} alt="Sathya Photography" className="h-14 w-auto object-contain brightness-0 invert" />
          <div className="text-center">
            <p className="text-xs text-primary-foreground/70 font-light mb-1">Photography &amp; Videography &nbsp;·&nbsp; Ongole · Guntur · Vijayawada · Hyderabad</p>
            <p className="text-xs text-primary-foreground/40 font-light">© {new Date().getFullYear()} Sathya Photography. All rights reserved.</p>
          </div>
          <div className="text-right">
            <a href="tel:+919010334999" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium tracking-wide block mb-1">
              +91 90103 34999
            </a>
            <p className="text-[11px] text-primary-foreground/40 leading-snug">Vamsi Complex, Shop 5, Ongole</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
