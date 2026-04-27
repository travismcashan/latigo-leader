import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import FadeInOnScroll from "@/components/FadeInOnScroll";

export default function Team() {
  const [theme, setTheme] = useState(() => localStorage.getItem("latigo-theme") || "teal");

  useEffect(() => {
    const handleStorageChange = () => {
      setTheme(localStorage.getItem("latigo-theme") || "teal");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // SEO Meta Tags
  useEffect(() => {
    document.title = "LifePlan | Discover Purpose and Design a Life That Matters";

    const metaTags = [
      { name: "description", content: "LifePlan is a two-day personal intensive that helps leaders uncover purpose, clarify calling, and build a strategic plan for the most important organization they'll ever lead —their life." },
      { property: "og:title", content: "LifePlan | Discover Purpose and Design a Life That Matters" },
      { property: "og:description", content: "LifePlan is a two-day personal intensive that helps leaders uncover purpose, clarify calling, and build a strategic plan for their life." },
      { property: "og:type", content: "website" },
    ];

    metaTags.forEach(tag => {
      let element = document.querySelector(`meta[${tag.property ? "property" : "name"}="${tag.property || tag.name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(tag.property ? "property" : "name", tag.property || tag.name);
        document.head.appendChild(element);
      }
      element.content = tag.content;
    });
  }, []);

  const primary = theme === "teal" ? "#2A5C5A" : "#bf9f4b";
  const accent = theme === "teal" ? "#bf9f4b" : "#2A5C5A";

  const allLifePlanPhotos = [
    "/images/lifeplan-photos/01.jpg",
    "/images/lifeplan-photos/02.jpg",
    "/images/lifeplan-photos/03.jpg",
    "/images/lifeplan-photos/04.jpg",
    "/images/lifeplan-photos/05.jpg",
    "/images/lifeplan-photos/06.jpg",
    "/images/lifeplan-photos/07.jpg",
    "/images/lifeplan-photos/08.jpg",
  ];
  const selectedPhotos = useMemo(() => {
    const shuffled = [...allLifePlanPhotos].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  }, []);

  const domains = [
    { number: "01", name: "Personal", desc: "Who are you at your core? What drives you, what drains you, and what patterns keep showing up?" },
    { number: "02", name: "Vocational", desc: "Is your work aligned with your calling — or are you building someone else's dream?" },
    { number: "03", name: "Family", desc: "Are you present and intentional in the relationships that matter most?" },
    { number: "04", name: "Community", desc: "How are you contributing beyond yourself — and where do you want to make your mark?" },
    { number: "05", name: "Faith", desc: "What anchors you? What is the deeper purpose your life is organized around?" },
  ];

  const produces = [
    { bold: "LifePlan Playbook", rest: "a comprehensive personal strategic plan covering all five life domains" },
    { bold: "LifePlan-on-a-Page", rest: "your entire plan distilled into one clear, actionable view" },
    { bold: "", rest: "Clarity on purpose, calling, and the specific next steps for your current season" },
    { bold: "", rest: "Freedom from past limitations that have been holding you back" },
    { bold: "", rest: "A framework for ongoing self-evaluation and course correction" },
  ];

  const testimonials = [
    {
      quote: "LifePlan gave me a sense of direction and peace in many aspects of my life. I'm now working to be the person I believe God has called me to be.",
      name: "Kevin Burke",
    },
    {
      quote: "Going through LifePlan was exactly what I needed at this point in my life. It helped me clearly identify the things that were hindering me from fully stepping into my purpose and calling. The clarity I gained has already made it easier to say yes to what truly matters —and no to what doesn't.",
      name: "Beaty Bass",
    },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1A1A1A", background: "#FFFFFF" }}>

      {/* 1. HERO */}
      <section style={{
        position: "relative",
        width: "100%",
        minHeight: "60vh",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/lifeplan-wall.jpg')", backgroundSize: "cover", backgroundPosition: "center", filter: theme === "copper" ? "sepia(20%) saturate(90%) brightness(98%)" : "sepia(8%) saturate(80%) brightness(96%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
        <div style={{
          position: "relative",
          zIndex: 1,
          textAlign: "left",
          padding: "8vw 4vw",
          maxWidth: 1400,
          width: "100%",
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8rem",
            fontWeight: 500,
            color: accent,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            margin: "0 0 1rem 0",
          }}>
            For Individuals
          </p>
          <h1 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)",
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.1,
            margin: "0 0 1.2rem 0",
          }}>
            Discover Who You Are.<br />Design Where You're Going.
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
            color: "rgba(255,255,255,0.85)",
            lineHeight: 1.65,
            margin: 0,
            maxWidth: 550,
          }}>
            LifePlan is a two-day personal intensive that helps leaders uncover purpose, clarify calling, and build a strategic plan for the most important organization they'll ever lead —their life.
          </p>
        </div>
      </section>

      {/* 2. INTRO TEXT */}
      <FadeInOnScroll>
        <section style={{ background: "#FAF8F5", padding: "8vw 4vw", textAlign: "center" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <p style={{
              fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
              lineHeight: 1.75,
              color: "#1A1A1A",
              margin: "0 0 1.5rem 0",
            }}>
              You've achieved a lot. But somewhere along the way, the clarity you once had about who you are and why you're here started to blur. You're successful —but you're not sure you're fulfilled. You're busy —but you're not sure you're moving in the right direction.
            </p>
            <p style={{
              fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
              lineHeight: 1.75,
              color: "#1A1A1A",
              fontWeight: 700,
              margin: 0,
            }}>
              LifePlan is a two-day guided experience designed to cut through the noise and help you see your life with fresh perspective. Not a self-help seminar. Not a personality test. A deeply personal, facilitated process rooted in your story, your values, and your God-given purpose.
            </p>
          </div>
        </section>
      </FadeInOnScroll>

      {/* 3. FIVE DOMAINS */}
      <FadeInOnScroll>
        <section style={{ background: "#FFFFFF", padding: "8vw 4vw" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
              fontWeight: 700,
              color: "#1A1A1A",
              lineHeight: 1.15,
              margin: "0 0 3rem 0",
              textAlign: "center",
            }}>
              Five Domains. One Integrated Life.
            </h2>
            <div className="lifeplan-domains-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "32px",
            }}>
              {domains.map((domain) => (
                <div key={domain.name} style={{
                  padding: "2.5rem",
                  background: "#FAF8F5",
                  borderRadius: 8,
                  textAlign: "center",
                }}>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    color: accent,
                    lineHeight: 1,
                    marginBottom: "0.75rem",
                  }}>
                    {domain.number}
                  </div>
                  <h3 style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#1A1A1A",
                    lineHeight: 1.3,
                    margin: "0 0 0.6rem 0",
                  }}>
                    {domain.name}
                  </h3>
                  <p style={{
                    fontSize: "1rem",
                    lineHeight: 1.75,
                    color: "#1A1A1A",
                    margin: 0,
                  }}>
                    {domain.desc}
                  </p>
                </div>
              ))}
              <div style={{
                padding: "2.5rem 2rem",
                background: primary,
                borderRadius: 8,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <h3 style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  margin: "0 0 1rem 0",
                }}>
                  Ready to start yours?
                </h3>
                <Link
                  to={createPageUrl("Contact")}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.85rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    padding: "12px 24px",
                    borderRadius: 6,
                    background: "transparent",
                    color: "#FFFFFF",
                    border: "1px solid #FFFFFF",
                  }}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* 4. WHAT LIFEPLAN PRODUCES */}
      <FadeInOnScroll>
        <section style={{ background: "#FAF8F5", padding: "8vw 4vw", textAlign: "center" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
              fontWeight: 700,
              color: "#1A1A1A",
              lineHeight: 1.15,
              margin: "0 0 2.5rem 0",
            }}>
              What LifePlan Produces
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.5fr",
              gridTemplateRows: "396px",
              gap: "12px",
              marginBottom: "2.5rem",
            }}>
              <div style={{ borderRadius: 8, overflow: "hidden" }}>
                <img src="/images/lifeplan-section.jpg" alt="LifePlan facilitation session" style={{ width: "115%", height: "115%", objectFit: "cover", objectPosition: "top left", display: "block" }} />
              </div>
              <div style={{ borderRadius: 8, overflow: "hidden" }}>
                <img src="/images/jared-lifeplan.jpg" alt="Jared facilitating a LifePlan session" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, textAlign: "left" }}>
              {produces.map((item, idx) => (
                <li key={idx} style={{
                  fontSize: "clamp(1rem, 1.6vw, 1.1rem)",
                  lineHeight: 1.75,
                  color: "#1A1A1A",
                  marginBottom: "0.75rem",
                  paddingLeft: "2rem",
                  position: "relative",
                }}>
                  <span style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    color: accent,
                    fontWeight: 700,
                    fontSize: "1.2rem",
                  }}>
                    ✓
                  </span>
                  {item.bold && <strong>{item.bold}</strong>}{item.bold ? " — " : ""}{item.rest}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </FadeInOnScroll>

      {/* 5. WHO IT'S FOR */}
      <FadeInOnScroll>
        <section style={{ background: "#FFFFFF", padding: "8vw 4vw", textAlign: "center" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
              fontWeight: 700,
              color: "#1A1A1A",
              lineHeight: 1.15,
              margin: "0 0 2.5rem 0",
            }}>
              Who LifePlan Is For
            </h2>
            <p style={{
              fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
              lineHeight: 1.75,
              color: "#1A1A1A",
              margin: "0 0 1.5rem 0",
            }}>
              LifePlan is for executives, business owners, pastors, and high-capacity leaders who are ready to invest two days in the most important strategic planning they'll ever do —planning their own life. It's especially powerful for leaders navigating mid-career transitions, burnout recovery, post-success restlessness, or a desire to reconnect with purpose.
            </p>
            <p style={{
              fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
              lineHeight: 1.75,
              color: "#1A1A1A",
              margin: 0,
            }}>
              We also offer a 3-day Couples LifePlan for leaders who want to do this work alongside their spouse.
            </p>
          </div>
        </section>
      </FadeInOnScroll>

      {/* 6. TESTIMONIALS */}
      <FadeInOnScroll>
        <section style={{ background: "#c5d0d6", padding: "8vw 4vw" }}>
          <div style={{
            maxWidth: 860,
            margin: "0 auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "4rem",
          }}>
            {testimonials.map((t, idx) => (
              <div key={idx}>
                <p style={{
                  fontFamily: "'Lora', serif",
                  fontStyle: "italic",
                  fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)",
                  lineHeight: 1.75,
                  color: "#1f3d3c",
                  margin: "0 0 1.5rem 0",
                }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#1f3d3c",
                  margin: 0,
                }}>
                  {t.name}
                </p>
              </div>
            ))}
          </div>
        </section>
      </FadeInOnScroll>

      {/* 7. CTA */}
      <FadeInOnScroll>
        <section style={{
          background: primary,
          padding: "8vw 4vw",
          textAlign: "center",
          transition: "background 0.3s ease",
        }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.15,
              margin: "0 0 1rem 0",
            }}>
              Your story could be next.
            </h2>
            <p style={{
              fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.88)",
              margin: "0 0 2.5rem 0",
            }}>
              Book a free discovery call and take the first step.
            </p>
            <Link to={createPageUrl("Contact")} style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-block",
              padding: "16px 40px",
              borderRadius: 6,
              background: accent,
              color: "#FFFFFF",
              transition: "opacity 0.3s ease",
              cursor: "pointer",
            }}>
              Contact Us
            </Link>
          </div>
        </section>
      </FadeInOnScroll>

      {/* Responsive overrides */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        @media (max-width: 768px) {
          .lifeplan-domains-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
