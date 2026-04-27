import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "The investment is not just the money paid to Latigo — it's the time spent as a team working through initiatives that will bring the most value in the shortest period of time. Because the entire team was involved, there is greater directional buy-in and momentum.",
    author: "FRANCIS CURRY, CFO, ALTRUA HEALTHSHARE",
  },
  {
    quote: "StratOp was a blessing to me as a CEO and Founder. I was able to see my staff engage in a personal journey of self-awareness and personal growth. I would absolutely recommend it.",
    author: "RANDALL SLUDER, CEO, ALTRUA HEALTHSHARE",
  },
  {
    quote: "LifePlan gave me a sense of direction and peace in many aspects of my life. I'm now working to be the person I believe God has called me to be.",
    author: "KEVIN BURKE",
  },
  {
    quote: "LifePlan was exactly what I needed. It helped me clearly identify the things hindering me from fully stepping into my purpose and calling. The clarity I gained has already made it easier to say yes to what truly matters — and no to what doesn't.",
    author: "BEATY BASS",
  },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const resetAutoAdvance = (id) => {
    if (id) clearInterval(id);
    const newInterval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
        setIsTransitioning(false);
      }, 500);
    }, 8000);
    setIntervalId(newInterval);
  };

  useEffect(() => {
    resetAutoAdvance(null);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Force animation restart by resetting and reapplying
    const activeDot = document.querySelector('[data-active-dot="true"]');
    if (activeDot) {
      activeDot.style.animation = 'none';
      void activeDot.offsetWidth; // Trigger reflow
      activeDot.style.animation = 'fillDot 8s linear forwards';
    }
  }, [current]);

  const handleNavigate = (direction) => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (direction === 'next') {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      } else {
        setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      }
      setIsTransitioning(false);
    }, 500);
    // Reset auto-advance timer when manually navigating
    resetAutoAdvance(intervalId);
  };

  const next = () => handleNavigate('next');
  const prev = () => handleNavigate('prev');

  return (
    <section 
      style={{ background: "#c5d0d6", padding: "8vw 4vw", textAlign: "center", position: "relative", overflow: "hidden" }}
      onMouseEnter={(e) => {
        const buttons = e.currentTarget.querySelectorAll("button[aria-label*='testimonial']");
        buttons.forEach((btn) => (btn.style.opacity = "1"));
      }}
      onMouseLeave={(e) => {
        const buttons = e.currentTarget.querySelectorAll("button[aria-label*='testimonial']");
        buttons.forEach((btn) => (btn.style.opacity = "0.3"));
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          button[aria-label*='Previous'],
          button[aria-label*='Next'] { display: none !important; }
        }
      `}</style>
      {/* Left Arrow */}
      <button
        onClick={prev}
        style={{
          position: "absolute",
          left: "2vw",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#1f3d3c",
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.3,
          transition: "opacity 0.2s",
          zIndex: 40,
        }}
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={96} strokeWidth={1} />
      </button>

      <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative" }}>
        <div style={{ minHeight: 420, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {/* Testimonial Content */}
          <h3
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#1f3d3c",
              lineHeight: 1.6,
              margin: "0 0 1.5rem 0",
              opacity: isTransitioning ? 0 : 1,
              transition: "opacity 0.5s ease",
            }}
          >
            "{testimonials[current].quote}"
          </h3>
          <p
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.14em",
              color: "#1f3d3c",
              margin: 0,
              textTransform: "uppercase",
              opacity: isTransitioning ? 0 : 1,
              transition: "opacity 0.5s ease",
            }}
          >
            — {testimonials[current].author}
          </p>
        </div>

        {/* Pager Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "2rem" }}>
          <style>{`
            @keyframes fillDot {
              from {
                background: linear-gradient(to right, #1f3d3c 0%, #1f3d3c 0%, rgba(31, 61, 60, 0.3) 0%, rgba(31, 61, 60, 0.3) 100%);
              }
              to {
                background: linear-gradient(to right, #1f3d3c 0%, #1f3d3c 100%, rgba(31, 61, 60, 0.3) 100%, rgba(31, 61, 60, 0.3) 100%);
              }
            }
          `}</style>
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              data-active-dot={current === idx ? "true" : "false"}
              style={{
                width: current === idx ? 28 : 8,
                height: 8,
                borderRadius: 4,
                background: current === idx ? "#1f3d3c" : "rgba(31, 61, 60, 0.3)",
                border: "none",
                cursor: "pointer",
                transition: current === idx ? "none" : "all 0.3s ease",
                animation: current === idx ? "fillDot 5s linear forwards" : "none",
              }}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={next}
        style={{
          position: "absolute",
          right: "2vw",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#1f3d3c",
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.3,
          transition: "opacity 0.2s",
          zIndex: 40,
        }}
        aria-label="Next testimonial"
      >
        <ChevronRight size={96} strokeWidth={1} />
      </button>
    </section>
  );
}