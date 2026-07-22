"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight, Instagram, Mail, Phone, MapPin, Video } from "lucide-react";
import { ServiceCards3D, serviceList } from "@/app/components/ServiceCards3D";
import { ReviewCarousel, reviewList } from "@/app/components/ReviewCarousel";
import { WhatsAppButton } from "@/app/components/WhatsAppButton";

const NAV_LINKS = ["Home", "About", "Services", "Portfolio", "Videos", "Reviews", "Contact"];

const GALLERY = [
  { src: "https://images.unsplash.com/photo-1568038479111-87bf80659645?w=600&h=750&fit=crop&auto=format", alt: "Dramatic portrait with light and shadow", category: "Portrait" },
  { src: "https://images.unsplash.com/photo-1536766768598-e09213fdcf22?w=600&h=750&fit=crop&auto=format", alt: "Woman in headscarf documentary portrait", category: "Documentary" },
  { src: "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?w=600&h=750&fit=crop&auto=format", alt: "River flowing through forest", category: "Landscape" },
  { src: "https://images.unsplash.com/photo-1560529621-67dda50eeb8d?w=600&h=750&fit=crop&auto=format", alt: "Sea of clouds scenic view", category: "Landscape" },
  { src: "https://images.unsplash.com/photo-1674932668403-33398b81c92f?w=600&h=750&fit=crop&auto=format", alt: "Woman with flowing hair editorial", category: "Editorial" },
  { src: "https://images.unsplash.com/photo-1508185140592-283327020902?w=600&h=750&fit=crop&auto=format", alt: "Cinematic portrait with warm tones", category: "Portrait" },
];

const WHATSAPP_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [activeFilter, setActiveFilter] = useState("All");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
    setMenuOpen(false);
  };

  const filters = ["All", "Portrait", "Landscape", "Documentary", "Editorial"];
  const filtered = activeFilter === "All" ? GALLERY : GALLERY.filter(g => g.category === activeFilter);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi Sathya Photography! 👋\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`;
    window.open(`https://wa.me/919010334999?text=${encodeURIComponent(text)}`, "_blank");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <WhatsAppButton />

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-[#f5efe3]/95 backdrop-blur border-b border-[rgba(30,61,47,0.15)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          <button onClick={() => scrollTo("Home")}>
            <Image src="/logo.png" alt="Sathya Photography" width={120} height={56} className="h-12 md:h-14 w-auto object-contain" />
          </button>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              link === "Portfolio" ? (
                <Link key={link} href="/portfolio" className="text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-200">
                  {link}
                </Link>
              ) : (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className={`text-xs tracking-widest uppercase transition-colors duration-200 pb-0.5 ${activeNav === link ? "text-primary border-b border-primary font-medium" : "text-muted-foreground hover:text-primary"}`}
                >
                  {link}
                </button>
              )
            ))}
          </div>
          <button className="md:hidden text-primary" onClick={() => setMenuOpen(v => !v)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <div className={`md:hidden overflow-hidden transition-all duration-300 bg-[#f5efe3] border-b border-[rgba(30,61,47,0.15)] ${menuOpen ? "max-h-80" : "max-h-0"}`}>
          <div className="px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map(link => (
              link === "Portfolio" ? (
                <Link key={link} href="/portfolio" onClick={() => setMenuOpen(false)} className="text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors">
                  {link}
                </Link>
              ) : (
                <button key={link} onClick={() => scrollTo(link)} className="text-left text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors">
                  {link}
                </button>
              )
            ))}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="relative overflow-hidden bg-background min-h-[88vh] flex flex-col items-center justify-center">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(45,90,61,0.06) 0%, transparent 70%)" }} />
        <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-[rgba(30,61,47,0.2)]" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-[rgba(30,61,47,0.2)]" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-[rgba(30,61,47,0.2)]" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-[rgba(30,61,47,0.2)]" />

        <div className="relative z-10 flex flex-col items-center text-center px-6 py-16">
          <Image src="/logo.png" alt="Sathya Photography" width={320} height={256} className="h-48 md:h-64 w-auto object-contain mb-8" />
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-16 md:w-24 bg-primary/25" />
            <span className="text-primary/40 text-base tracking-widest">✦ ✦ ✦</span>
            <div className="h-px w-16 md:w-24 bg-primary/25" />
          </div>
          <p className="text-2xl md:text-3xl text-primary/85 italic mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Capturing Moments, Creating Memories
          </p>
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="flex items-center gap-1.5 text-xs tracking-widest uppercase text-muted-foreground">
              <Video size={12} className="text-accent" /> Videography
            </span>
            <span className="text-primary/25">·</span>
            <span className="text-xs tracking-widest uppercase text-muted-foreground">Photography</span>
          </div>
          <p className="text-[11px] tracking-wide text-muted-foreground font-light mb-2">
            Ongole &nbsp;·&nbsp; Guntur &nbsp;·&nbsp; Vijayawada &nbsp;·&nbsp; Hyderabad
          </p>
          <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-md mb-10">
            Every picture tells a story. Let us capture yours beautifully and timelessly.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button onClick={() => scrollTo("Contact")} className="flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-xs tracking-[0.25em] uppercase hover:bg-accent transition-colors duration-300">
              Let&apos;s Capture Your Story <ArrowUpRight size={14} />
            </button>
            <Link href="/portfolio" className="flex items-center gap-3 border border-primary/30 text-primary px-8 py-4 text-xs tracking-[0.25em] uppercase hover:border-primary hover:bg-primary/5 transition-all duration-300">
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden bg-card relative">
              <Image src="/about.png" alt="Sathya — Photographer & Videographer" fill className="object-cover object-top" />
            </div>
            <div className="absolute -bottom-5 -right-5 w-20 h-20 border border-primary/20" />
            <div className="absolute -top-5 -left-5 w-20 h-20 border border-primary/20" />
          </div>
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4">About the Studio</p>
            <h2 className="text-4xl md:text-5xl text-primary mb-2 leading-tight" style={{ fontFamily: "'Great Vibes', cursive" }}>Ongole&apos;s Finest</h2>
            <h3 className="text-2xl md:text-3xl text-primary mb-6 tracking-wide italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Photography & Videography Studio</h3>

            <div className="space-y-4 text-muted-foreground font-light leading-relaxed text-sm md:text-base">
              <p>Since 2000, Sathya Photography has been Ongole&apos;s most trusted name in professional photography and videography. Over two decades of craft, dedication, and thousands of stories told through the lens have made this studio the first choice for families, couples, and businesses across Andhra Pradesh.</p>
              <p>We provide the finest wedding photography, cinematic videography, pre-wedding shoots, engagement sessions, maternity portraits, and kids photography — not just in Ongole, but across Guntur, Vijayawada, and Hyderabad. Every frame is composed with intention, every edit is finished with care.</p>
              <p>What sets Sathya Photography apart is a deep commitment to authentic storytelling. We don&apos;t manufacture moments — we find them. Whether it&apos;s the quiet glance between a couple during the ceremony, the joy on a child&apos;s face, or the golden light falling on a new mother, our job is to be ready when life is at its most beautiful.</p>
            </div>

            <blockquote className="mt-6 pl-4 border-l-2 border-accent italic text-accent text-sm font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              &ldquo;A photograph is not just an image — it is the story of a feeling that cannot be put into words.&rdquo;
            </blockquote>

            <div className="mt-10 flex gap-8 flex-wrap">
              {[["20+", "Years Experience"], ["2000+", "Sessions Shot"], ["500+", "Happy Reviews"], ["4", "Cities Served"]].map(([n, l]) => (
                <div key={l} className="text-center">
                  <p className="text-3xl text-primary mb-1" style={{ fontFamily: "'Great Vibes', cursive" }}>{n}</p>
                  <p className="text-[10px] tracking-widest uppercase text-muted-foreground">{l}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {["Wedding", "Pre-Wedding", "Engagement", "Maternity", "Kids", "Couple Shoots", "Videography"].map(tag => (
                <span key={tag} className="text-[10px] tracking-widest uppercase border border-border text-muted-foreground px-3 py-1">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES 3D CAROUSEL ── */}
      <ServiceCards3D services={serviceList} />

      {/* ── PORTFOLIO PREVIEW ── */}
      <section id="portfolio" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] uppercase text-accent mb-3">Visual Stories</p>
          <h2 className="text-5xl md:text-6xl text-primary mb-3" style={{ fontFamily: "'Great Vibes', cursive" }}>Portfolio</h2>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-primary/20" />
            <span className="text-primary/30 text-sm">✦</span>
            <div className="h-px w-12 bg-primary/20" />
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            {filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} className={`text-[11px] tracking-widest uppercase px-5 py-2 border transition-all duration-300 ${activeFilter === f ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((item, i) => (
            <div key={i} className="relative overflow-hidden group bg-card aspect-[4/5]">
              <Image src={item.src} alt={item.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/50 transition-all duration-500 flex items-end p-5">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-[10px] tracking-widest uppercase text-primary-foreground/70 mb-1">{item.category}</p>
                  <p className="text-sm text-primary-foreground font-light">{item.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Link href="/portfolio" className="flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 text-xs tracking-[0.25em] uppercase hover:bg-accent transition-colors duration-300">
            View Full Portfolio <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── VIDEOS ── */}
      <section id="videos" className="py-24 md:py-32 bg-[#1a3828]">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.4em] uppercase text-[#a8c5a0] mb-3">Behind the Moments</p>
            <h2 className="text-5xl md:text-6xl text-[#f5efe3] mb-3" style={{ fontFamily: "'Great Vibes', cursive" }}>Films & Reels</h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-[#f5efe3]/20" />
              <span className="text-[#f5efe3]/30 text-sm">✦</span>
              <div className="h-px w-12 bg-[#f5efe3]/20" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="relative group overflow-hidden rounded-xl bg-[#0f2318] aspect-video flex items-center justify-center border border-[#f5efe3]/10">
                <div className="text-center px-6">
                  <div className="w-14 h-14 rounded-full border border-[#f5efe3]/20 flex items-center justify-center mx-auto mb-4">
                    <Video size={22} className="text-[#f5efe3]/40 ml-1" />
                  </div>
                  <p className="text-[#f5efe3]/30 text-xs tracking-widest uppercase">Video {n}</p>
                  <p className="text-[#f5efe3]/20 text-[10px] mt-1">Upload to replace</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-[#f5efe3]/30 text-xs tracking-wide mt-10">
            Upload your video files and I&apos;ll replace these placeholders instantly.
          </p>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <ReviewCarousel reviews={reviewList} />

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-accent mb-3">Get in Touch</p>
            <h2 className="text-5xl md:text-6xl text-primary mb-2" style={{ fontFamily: "'Great Vibes', cursive" }}>Let&apos;s Connect</h2>
            <p className="text-lg text-primary/70 italic mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Every great photograph begins with a conversation.</p>
            <div className="space-y-5">
              <a href="tel:+919010334999" className="flex items-center gap-4 text-sm text-muted-foreground hover:text-primary transition-colors group">
                <div className="w-9 h-9 border border-border group-hover:border-primary flex items-center justify-center transition-colors shrink-0"><Phone size={15} className="text-accent" /></div>
                +91 90103 34999
              </a>
              <div className="flex items-start gap-4 text-sm text-muted-foreground">
                <div className="w-9 h-9 border border-border flex items-center justify-center shrink-0 mt-0.5"><MapPin size={15} className="text-accent" /></div>
                <p className="leading-relaxed">Opp: Sai Saroj Mayuri Theatre,<br />Vamsi Complex, Shop No. 5,<br />Ongole, Andhra Pradesh</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="w-9 h-9 border border-border flex items-center justify-center shrink-0"><Video size={15} className="text-accent" /></div>
                <p>Photography &amp; Videography</p>
              </div>
              <a href="#" className="flex items-center gap-4 text-sm text-muted-foreground hover:text-primary transition-colors group">
                <div className="w-9 h-9 border border-border group-hover:border-primary flex items-center justify-center transition-colors shrink-0"><Instagram size={15} className="text-accent" /></div>
                @sathyaphotography
              </a>
            </div>
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Serving</p>
              <p className="text-sm text-foreground font-light">Ongole &nbsp;·&nbsp; Guntur &nbsp;·&nbsp; Vijayawada &nbsp;·&nbsp; Hyderabad</p>
            </div>
          </div>
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            {[
              { label: "Full Name", key: "name", type: "text", placeholder: "Your name" },
              { label: "Email Address", key: "email", type: "email", placeholder: "your@email.com" },
              { label: "Phone Number", key: "phone", type: "tel", placeholder: "+91 00000 00000" },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label className="block text-[11px] tracking-widest uppercase text-muted-foreground mb-2">{label}</label>
                <input type={type} placeholder={placeholder} value={form[key as keyof typeof form]} onChange={e => setForm(s => ({ ...s, [key]: e.target.value }))} className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 text-foreground text-sm placeholder:text-muted-foreground/40 transition-colors duration-300" />
              </div>
            ))}
            <div>
              <label className="block text-[11px] tracking-widest uppercase text-muted-foreground mb-2">Message</label>
              <textarea rows={4} placeholder="Tell me about your shoot..." value={form.message} onChange={e => setForm(s => ({ ...s, message: e.target.value }))} className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 text-foreground text-sm placeholder:text-muted-foreground/40 transition-colors duration-300 resize-none" />
            </div>
            <button type="submit" className="flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 text-xs tracking-[0.25em] uppercase hover:bg-[#1ebe5d] transition-colors duration-300">
              {WHATSAPP_ICON} Send on WhatsApp
            </button>
          </form>
        </div>

        {/* ── MAP ── */}
        <div className="mt-16 overflow-hidden rounded-xl border border-border">
          <iframe
            src="https://maps.google.com/maps?q=Sai+Saroj+Mayuri+Theatre,+Vamsi+Complex,+Ongole,+Andhra+Pradesh&output=embed"
            width="100%"
            height="320"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sathya Photography Location"
          />
        </div>
      </section>

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
