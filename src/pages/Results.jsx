import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import FadeInOnScroll from "@/components/FadeInOnScroll";

export default function Results() {
  const [theme, setTheme] = useState(() => localStorage.getItem("latigo-theme") || "teal");

  useEffect(() => {
    const handleStorageChange = () => {
      setTheme(localStorage.getItem("latigo-theme") || "teal");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const colors = {
    teal: { primary: "#2A5C5A", accent: "#bf9f4b", primaryText: "#FFFFFF" },
    copper: { primary: "#bf9f4b", accent: "#2A5C5A", primaryText: "#FAF8F5" },
  };
  const c = colors[theme];

  useEffect(() => {
    document.title = "Results | Real Leaders, Real Clarity, Real Movement";
    const metaTags = [
      { name: "description", content: "Hear from leaders and organizations Latigo has served." },
      { property: "og:title", content: "Results | Real Leaders, Real Clarity, Real Movement" },
      { property: "og:description", content: "Hear from leaders and organizations Latigo has served." },
      { property: "og:type", content: "website" },
    ];
    metaTags.forEach(tag => {
      let el = document.querySelector(`meta[${tag.property ? "property" : "name"}="${tag.property || tag.name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(tag.property ? "property" : "name", tag.property || tag.name); document.head.appendChild(el); }
      el.content = tag.content;
    });
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1A1A1A", background: "#FFFFFF" }}>

      {/* -- 1. HEADER -- */}
      <FadeInOnScroll>
        <section style={{ background: "#FAF8F5", padding: "14vw 4vw 6vw 4vw", textAlign: "center" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <h1 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)",
              fontWeight: 700,
              color: "#1A1A1A",
              lineHeight: 1.15,
              margin: "0 0 1.5rem 0",
            }}>
              Real Leaders. Real Clarity. Real Movement.
            </h1>
            <p style={{
              fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
              lineHeight: 1.75,
              color: "#1A1A1A",
              margin: "0 auto",
              maxWidth: 600,
            }}>
              Don't take our word for it. Hear from the leaders and organizations Latigo has served.
            </p>
          </div>
        </section>
      </FadeInOnScroll>

      {/* -- 2. ALTRUA HEALTHSHARE FEATURE -- */}
      <FadeInOnScroll>
        <section style={{ background: c.primary, padding: "8vw 4vw", textAlign: "center" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <img
              src="/images/altrua-logo.png"
              alt="Altrua HealthShare"
              style={{
                height: 140,
                width: "auto",
                display: "block",
                margin: "0 auto 0.75rem",
                filter: "brightness(0) invert(1)",
              }}
            />
            <p style={{
              fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
              color: "rgba(255,255,255,0.8)",
              margin: "0 0 2.5rem 0",
            }}>
              Multi-day StratOp engagement with the executive leadership team
            </p>

            {/* Quote 1 */}
            <div style={{ marginBottom: "3rem" }}>
              <p style={{
                fontSize: "3rem",
                color: c.accent,
                lineHeight: 1,
                margin: "0 0 0.5rem 0",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {"\u201C"}
              </p>
              <p style={{
                fontFamily: "'Lora', serif",
                fontStyle: "italic",
                fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                lineHeight: 1.75,
                color: "#FFFFFF",
                maxWidth: 700,
                margin: "0 auto 1.5rem auto",
              }}>
                The investment is not just the money paid to Latigo — it's the time spent as a team working through initiatives that will bring the most value to the organization in the shortest period of time. Because the entire team was involved, there is greater directional buy-in and momentum than any traditional strategy session.
              </p>
              <p style={{
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "1rem",
                margin: "0 0 0.25rem 0",
              }}>
                Francis Curry
              </p>
              <p style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "0.9rem",
                margin: 0,
              }}>
                CFO, Altrua HealthShare
              </p>
            </div>

            {/* Quote 2 */}
            <div>
              <p style={{
                fontSize: "3rem",
                color: c.accent,
                lineHeight: 1,
                margin: "0 0 0.5rem 0",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {"\u201C"}
              </p>
              <p style={{
                fontFamily: "'Lora', serif",
                fontStyle: "italic",
                fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                lineHeight: 1.75,
                color: "#FFFFFF",
                maxWidth: 700,
                margin: "0 auto 1.5rem auto",
              }}>
                StratOp allowed our offices to better understand each other and how to work better together. It created confidence within the staff because things shifted right after — including the implementation of a new COO position.
              </p>
              <p style={{
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "1rem",
                margin: "0 0 0.25rem 0",
              }}>
                Randall Sluder
              </p>
              <p style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "0.9rem",
                margin: 0,
              }}>
                CEO, Altrua HealthShare
              </p>
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* -- 3. LIFEPLAN TESTIMONIALS -- */}
      <FadeInOnScroll>
        <section style={{ background: "#c5d0d6", padding: "8vw 4vw", textAlign: "center" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
              fontWeight: 700,
              color: "#1f3d3c",
              lineHeight: 1.15,
              margin: "0 0 3rem 0",
            }}>
              LifePlan Testimonials
            </h2>
            {[
              {
                quote: "LifePlan gave me a sense of direction and peace in many aspects of my life. I\u2019m now working to be the person I believe God has called me to be.",
                name: "Kevin Burke",
              },
              {
                quote: "Going through LifePlan was exactly what I needed at this point in my life. It helped me clearly identify the things that were hindering me from fully stepping into my purpose and calling. The clarity I gained has already made it easier to say yes to what truly matters \u2014 and no to what doesn\u2019t.",
                name: "Beaty Bass",
              },
            ].map((t, i) => (
              <div key={t.name} style={{
                marginBottom: i === 0 ? "3rem" : 0,
              }}>
                <p style={{
                  fontFamily: "'Lora', serif",
                  fontStyle: "italic",
                  fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)",
                  lineHeight: 1.75,
                  color: "#1f3d3c",
                  maxWidth: 700,
                  margin: "0 auto 1rem auto",
                }}>
                  {"\u201C"}{t.quote}{"\u201D"}
                </p>
                <p style={{
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

      {/* -- 4. TRANSFORMATION IN ACTION -- */}
      <FadeInOnScroll>
        <section style={{ background: "#FAF8F5", padding: "8vw 4vw", textAlign: "center" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
              fontWeight: 700,
              color: "#1A1A1A",
              lineHeight: 1.15,
              margin: "0 0 1.5rem 0",
            }}>
              Transformation in Action
            </h2>
            <p style={{
              fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
              lineHeight: 1.75,
              color: "#1A1A1A",
              margin: "0 0 3rem 0",
              maxWidth: 700,
              marginLeft: "auto",
              marginRight: "auto",
            }}>
              Every LifePlan and StratOp engagement starts with a leader who is stuck, unclear, or ready for the next level — and ends with clarity, alignment, and forward movement.
            </p>
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              <div className="case-study-card" style={{
                borderLeft: `4px solid ${c.primary}`,
                padding: "1.5rem 2rem",
                background: "#FFFFFF",
                marginBottom: "1.5rem",
                textAlign: "left",
              }}>
                <p style={{
                  fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
                  lineHeight: 1.75,
                  color: "#1A1A1A",
                  margin: 0,
                }}>
                  A CEO of a $45M healthcare company came in with misaligned departments and staff turnover. After a 2-day StratOp intensive, the team identified five core initiatives, restructured leadership roles, and achieved greater buy-in than any previous planning process.
                </p>
              </div>
              <div className="case-study-card" style={{
                borderLeft: `4px solid ${c.accent}`,
                padding: "1.5rem 2rem",
                background: "#FFFFFF",
                textAlign: "left",
              }}>
                <p style={{
                  fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
                  lineHeight: 1.75,
                  color: "#1A1A1A",
                  margin: 0,
                }}>
                  A senior pastor navigating burnout and a sense of lost purpose spent two days in a LifePlan intensive. He walked away with a clear understanding of his calling, a plan for the next season, and the freedom to say no to what didn't align.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* -- 5. CTA -- */}
      <FadeInOnScroll>
        <section style={{ background: c.primary, padding: "8vw 4vw", textAlign: "center" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.15,
              margin: "0 0 1.5rem 0",
            }}>
              Ready to move forward?
            </h2>
            <Link
              to={createPageUrl("Contact")}
              style={{
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
                cursor: "pointer",
              }}
            >
              Book a Discovery Call
            </Link>
          </div>
        </section>
      </FadeInOnScroll>

      <style>{`
        @media (max-width: 768px) {
          .testimonial-grid { grid-template-columns: 1fr !important; }
          .case-study-card { width: 100% !important; }
        }
      `}</style>
    </div>
  );
}
