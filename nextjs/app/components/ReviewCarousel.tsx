"use client";

export interface Review {
  name: string;
  text: string;
  rating: number;
  date: string;
}

export const reviewList: Review[] = [
  { name: "Ananya Krishnan", text: "Sathya captured every little moment we didn't even know was happening. From the mehendi to the reception, every frame felt like a painting. We still cry looking at the album. Truly one of a kind.", rating: 5, date: "March 2024" },
  { name: "Rohan & Deepa Menon", text: "We hired Sathya for our Kerala wedding and couldn't be happier. He has an incredible eye for candid moments — the way he caught my mother's tears during the vidaai was breathtaking. Worth every rupee.", rating: 5, date: "January 2024" },
  { name: "Priya Sharma", text: "Professional, calm, and incredibly talented. Sathya blended into the crowd and the pictures came out absolutely stunning. Our guests keep asking who the photographer was. Highly recommend!", rating: 5, date: "November 2023" },
  { name: "Maria & Jose Santos", text: "We flew Sathya out for our destination wedding in Goa and it was the best decision we made. The golden hour portraits alone were worth it. He made us feel so comfortable in front of the camera.", rating: 5, date: "December 2023" },
  { name: "Kavitha Nair", text: "Sathya is an absolute artist. He photographed our daughter's wedding and we were moved to tears when we saw the final gallery. The colors, the composition — everything was perfect. Exceptional work.", rating: 5, date: "February 2024" },
  { name: "Arjun & Meera Pillai", text: "From the pre-wedding shoot to the final reception, Sathya was always there at the right moment. His patience and professionalism are unmatched. The photos tell our love story better than words ever could.", rating: 5, date: "October 2023" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width={14} height={14} viewBox="0 0 24 24" fill="none">
          {i < rating ? (
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="#b8860b" stroke="#b8860b" strokeWidth="1.5" strokeLinejoin="round" />
          ) : (
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="none" stroke="#b8860b" strokeWidth="1.5" strokeLinejoin="round" opacity="0.35" />
          )}
        </svg>
      ))}
    </div>
  );
}

function GoogleBadge() {
  return (
    <div className="inline-flex items-center gap-2.5 border border-[rgba(30,61,47,0.15)] rounded-full px-4 py-2 bg-[#f5efe3]">
      <svg width="18" height="18" viewBox="0 0 48 48">
        <path fill="#4285F4" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
        <path fill="#34A853" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
        <path fill="#FBBC05" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
        <path fill="#EA4335" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
      </svg>
      <span className="text-sm font-semibold text-[#1a3828]">4.9</span>
      <span className="text-xs text-[#7a6e5f]">127 reviews</span>
      <StarRating rating={5} />
    </div>
  );
}

export function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  return (
    <section id="reviews" className="py-24 md:py-32 bg-[#eee8da]">
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 30s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="text-center mb-12 px-6 md:px-12">
        <div className="flex justify-center mb-6"><GoogleBadge /></div>
        <p className="text-xs tracking-[0.4em] uppercase text-[#2d5a3d] mb-3">Reviews</p>
        <h2 className="text-5xl md:text-6xl text-[#1e3d2f] mb-3" style={{ fontFamily: "'Great Vibes', cursive" }}>What Couples Say</h2>
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-[#1e3d2f]/20" />
          <span className="text-[#1e3d2f]/30 text-sm">✦</span>
          <div className="h-px w-12 bg-[#1e3d2f]/20" />
        </div>
      </div>

      <div className="overflow-hidden w-full">
        <div className="marquee-track flex gap-4 w-max py-2 px-6">
          {[...reviews, ...reviews].map((review, i) => (
            <div key={i} className="flex-shrink-0 rounded-2xl p-6 flex flex-col gap-3 bg-[#f5efe3] border border-[rgba(30,61,47,0.15)]" style={{ width: "300px" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-base font-semibold shrink-0" style={{ backgroundColor: "rgba(45,90,61,0.12)", color: "#2d5a3d", fontFamily: "'Cormorant Garamond', serif" }}>
                  {review.name.trim()[0].toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#1a3828] truncate">{review.name}</p>
                  <p className="text-xs text-[#7a6e5f]">{review.date}</p>
                </div>
              </div>
              <StarRating rating={review.rating} />
              <p className="text-sm text-[#7a6e5f] leading-relaxed" style={{ display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                &#8220;{review.text}&#8221;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
