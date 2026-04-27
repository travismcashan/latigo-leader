import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import TestimonialCarousel from "@/components/TestimonialCarousel";

export default function Services() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("latigo-theme") || "teal";
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const newTheme = localStorage.getItem("latigo-theme") || "teal";
      setTheme(newTheme);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // SEO Meta Tags
  useEffect(() => {
    document.title = "StratOp | Align Your Strategy, Operations & Financials";

    const metaTags = [
      { name: "description", content: "StratOp is a proven framework for organizations to clarify their mission, align teams, and create actionable plans." },
      { name: "keywords", content: "StratOp, strategic planning, leadership intensive, Paterson Center, organizational strategy, team alignment" },
      { property: "og:title", content: "StratOp | Align Your Strategy, Operations & Financials" },
      { property: "og:description", content: "StratOp is a proven framework for organizations to clarify their mission, align teams, and create actionable plans." },
      { property: "og:image", content: "/images/stratop-planning.jpeg" },
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

  const colors = {
    teal: {
      primary: "#2A5C5A",
      primaryText: "#FFFFFF",
      accent: "#bf9f4b",
    },
    copper: {
      primary: "#bf9f4b",
      primaryText: "#4f2c37",
      accent: "#2A5C5A",
    },
  };

  const currentColors = colors[theme];

  const allPhotos = [
    "/images/stratop-photos/01.jpg",
    "/images/stratop-photos/02.jpg",
    "/images/stratop-photos/03.jpg",
    "/images/stratop-photos/04.jpg",
    "/images/stratop-photos/05.jpg",
    "/images/stratop-photos/06.jpg",
    "/images/stratop-photos/07.jpg",
    "/images/stratop-photos/08.jpg",
    "/images/stratop-photos/09.jpg",
    "/images/stratop-photos/10.jpg",
  ];
  const selectedPhotos = useMemo(() => {
    const shuffled = [...allPhotos].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  }, []);

  const phases = [
    {
      number: "01",
      title: "Perspective",
      desc: "Where are we now? We conduct pre-work interviews and guide your team through proven tools that surface the full truth of your current reality.",
    },
    {
      number: "02",
      title: "Planning",
      desc: "Where are we going? We clarify mission, vision, values, and strategic priorities \u2014 built by the team, not imposed from outside.",
    },
    {
      number: "03",
      title: "Action",
      desc: "What must we do? We identify the 4\u20135 key initiatives that will create the most impact in the shortest time and assign ownership to each.",
    },
    {
      number: "04",
      title: "Structure",
      desc: "How do we organize? We align your organizational structure, roles, and resources to support the plan.",
    },
    {
      number: "05",
      title: "Management",
      desc: "How do we stay on track? We build in quarterly reviews, accountability rhythms, and progress metrics.",
    },
    {
      number: "06",
      title: "Renewal",
      desc: "How do we keep growing? We return annually to reassess, recalibrate, and plan the next cycle of strategic movement.",
    },
  ];

  const deliverables = [
    { bold: "Strategic Dashboard", rest: "your organization's health at a glance" },
    { bold: "W.I.N. Wheel", rest: "What's Important Now, visualized and prioritized" },
    { bold: "Plan-on-a-Page", rest: "your entire strategic plan in one clear view" },
    { bold: "Action Initiative Profiles", rest: "detailed plans for each strategic priority with owners, timelines, and budgets" },
    { bold: "", rest: "Quarterly review framework for sustained accountability" },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1A1A1A", background: "#FFFFFF" }}>

      {/* -- 1. HERO -- */}
      <section style={{
        position: "relative",
        width: "100%",
        minHeight: "60vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        backgroundImage: "url('/images/stratop-planning.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />
        <div className="hero-content" style={{
          position: "relative",
          zIndex: 1,
          padding: "8vw 4vw",
          maxWidth: 700,
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8rem",
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: currentColors.accent,
            margin: "0 0 1rem 0",
          }}>
            For Organizations
          </p>
          <h1 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)",
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.1,
            margin: "0 0 1.2rem 0",
          }}>
            Align Your Team. Clarify the Plan. Move Forward.
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
            color: "rgba(255,255,255,0.85)",
            lineHeight: 1.65,
            margin: 0,
            maxWidth: 550,
          }}>
            StratOp is a comprehensive strategic planning process for leadership teams who need more than a retreat — they need a real plan that sticks.
          </p>
        </div>
      </section>

      {/* -- 2. INTRO TEXT -- */}
      <FadeInOnScroll>
        <section style={{ background: "#FAF8F5", padding: "8vw 4vw", textAlign: "center" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <p style={{
              fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
              lineHeight: 1.75,
              color: "#1A1A1A",
              margin: "0 0 1.5rem 0",
            }}>
              Your team is talented. Your mission is clear — or at least it was. But somewhere between the vision and the day-to-day, things drifted. Priorities compete. Departments pull in different directions. The plan from last year's offsite is sitting in a binder no one opens.
            </p>
            <p style={{
              fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
              lineHeight: 1.75,
              color: "#1A1A1A",
              fontWeight: 600,
              margin: 0,
            }}>
              StratOp changes that. It's not a motivational retreat. It's a structured, facilitated process that produces a strategic plan your team will actually use — because they built it together.
            </p>
          </div>
        </section>
      </FadeInOnScroll>

      {/* -- 3. THE SIX PHASES -- */}
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
              The Six Phases of StratOp
            </h2>
            <div className="phases-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "32px",
              maxWidth: 1200,
              margin: "0 auto",
            }}>
              {phases.map((phase) => (
                <div key={phase.number} style={{
                  padding: "2.5rem",
                  background: "#FAF8F5",
                  borderRadius: 8,
                  textAlign: "center",
                }}>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    color: currentColors.accent,
                    lineHeight: 1,
                    marginBottom: "0.75rem",
                  }}>
                    {phase.number}
                  </div>
                  <h3 style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#1A1A1A",
                    lineHeight: 1.3,
                    margin: "0 0 0.6rem 0",
                  }}>
                    {phase.title}
                  </h3>
                  <p style={{
                    fontSize: "1rem",
                    lineHeight: 1.75,
                    color: "#1A1A1A",
                    margin: 0,
                  }}>
                    {phase.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* -- 4. WHAT STRATOP PRODUCES -- */}
      <FadeInOnScroll>
        <section style={{ background: "#FAF8F5", padding: "8vw 4vw", textAlign: "center" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
              fontWeight: 700,
              color: "#1A1A1A",
              lineHeight: 1.15,
              margin: "0 0 2rem 0",
            }}>
              What StratOp Produces
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr 1fr",
              gridTemplateRows: "192px 192px",
              gap: "12px",
              marginBottom: "2.5rem",
            }}>
              <div style={{ borderRadius: 8, overflow: "hidden", gridRow: "span 2" }}>
                <img src={selectedPhotos[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ borderRadius: 8, overflow: "hidden" }}>
                <img src={selectedPhotos[1]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ borderRadius: 8, overflow: "hidden" }}>
                <img src={selectedPhotos[2]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ borderRadius: 8, overflow: "hidden", gridColumn: "2 / 4" }}>
                <img src={selectedPhotos[3]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            </div>
            <div style={{ textAlign: "left", maxWidth: 640, margin: "0 auto" }}>
              {deliverables.map((item, idx) => (
                <p key={idx} style={{
                  position: "relative",
                  paddingLeft: "2rem",
                  fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
                  lineHeight: 1.75,
                  color: "#1A1A1A",
                  margin: "0 0 0.75rem 0",
                }}>
                  <span style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    color: currentColors.accent,
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    lineHeight: 1.75,
                  }}>
                    ✓
                  </span>
                  {item.bold && <strong>{item.bold}</strong>}{item.bold ? " — " : ""}{item.rest}
                </p>
              ))}
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* -- 5. WHO STRATOP SERVES -- */}
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
              StratOp serves leaders<br />at inflection points.
            </h2>
            <div className="audience-grid" style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              maxWidth: 1200,
              margin: "0 auto",
            }}>
              <div style={{
                padding: "2.5rem",
                background: "#FAF8F5",
                borderRadius: 8,
              }}>
                <h3 style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#1A1A1A",
                  lineHeight: 1.3,
                  margin: "0 0 1rem 0",
                }}>
                  Companies
                </h3>
                <p style={{
                  fontSize: "1rem",
                  lineHeight: 1.75,
                  color: "#1A1A1A",
                  margin: 0,
                }}>
                  Growth-stage businesses ($10M–$75M) navigating rapid expansion, leadership transitions, succession planning, or a post-pandemic strategic reset. StratOp is particularly powerful for founder-led companies where the vision lives in one person's head and needs to be shared, structured, and sustained.
                </p>
              </div>
              <div style={{
                padding: "2.5rem",
                background: "#FAF8F5",
                borderRadius: 8,
              }}>
                <h3 style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#1A1A1A",
                  lineHeight: 1.3,
                  margin: "0 0 1rem 0",
                }}>
                  Churches & Nonprofits
                </h3>
                <p style={{
                  fontSize: "1rem",
                  lineHeight: 1.75,
                  color: "#1A1A1A",
                  margin: 0,
                }}>
                  Congregations (500–3,000 weekly attendance) and mission-driven organizations facing growth plateaus, multi-site expansion, capital campaigns, pastoral transitions, or staff realignment. The Paterson methodology has deep roots in the faith-based space, and Latigo brings pastoral understanding to the process that secular consultants cannot match.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* -- TESTIMONIALS -- */}
      <FadeInOnScroll>
        <TestimonialCarousel />
      </FadeInOnScroll>

      {/* -- 6. CTA SECTION -- */}
      <FadeInOnScroll>
        <section style={{
          background: currentColors.primary,
          padding: "8vw 4vw",
          textAlign: "center",
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
              Ready to align your team?
            </h2>
            <p style={{
              fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
              lineHeight: 1.75,
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
              background: "transparent",
              color: "#FFFFFF",
              border: "1px solid #FFFFFF",
              transition: "background 0.3s ease",
            }}>
              Book a Discovery Call
            </Link>
          </div>
        </section>
      </FadeInOnScroll>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Inter:wght@400;500&display=swap');

        @media (max-width: 768px) {
          .phases-grid { grid-template-columns: 1fr !important; }
          .audience-grid { grid-template-columns: 1fr !important; }
          .hero-content { text-align: center !important; }
        }
      `}</style>
    </div>
  );
}
