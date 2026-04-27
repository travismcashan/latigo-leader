import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import FadeInOnScroll from "@/components/FadeInOnScroll";

export default function About() {
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
    document.title = "About Latigo | Meet Our Founders & Our Story";
    const metaTags = [
      { name: "description", content: "Meet Jared Lyons and Dustin Sample, founders of Latigo Leadership Consulting." },
      { property: "og:title", content: "About Latigo | Meet Our Founders & Our Story" },
      { property: "og:description", content: "Why Latigo exists and the leaders behind it." },
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

      {/* -- HERO -- */}
      <section style={{
        position: "relative",
        width: "100%",
        minHeight: "50vh",
        overflow: "hidden",
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/images/stratop-planning.jpeg')",
          backgroundSize: "cover", backgroundPosition: "center",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }} />
        <div style={{
          position: "relative", zIndex: 1, textAlign: "center",
          padding: "8vw 4vw", maxWidth: 900, margin: "0 auto",
        }}>
          <h1 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)",
            fontWeight: 700, color: "#FAF8F5", lineHeight: 1.1,
            margin: "0 0 1.2rem 0",
          }}>
            The Story Behind the Strap
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
            color: "rgba(250,248,245,0.88)", lineHeight: 1.65,
            margin: 0, maxWidth: 620, marginLeft: "auto", marginRight: "auto",
          }}>
            Why Latigo exists — and the leaders behind it.
          </p>
        </div>
      </section>

      {/* -- THE METAPHOR -- */}
      <FadeInOnScroll>
        <section style={{ background: "#FAF8F5", padding: "8vw 4vw" }}>
          <div className="metaphor-block" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5vw", alignItems: "center" }}>
            <div>
              <div style={{ overflow: "hidden", borderRadius: 8 }}>
                <img
                  src="/images/latigo-strap.jpg"
                  alt="A latigo strap securing a saddle"
                  style={{
                    width: "100%", height: "auto", display: "block",
                    filter: "grayscale(100%) contrast(1.1) brightness(0.95)",
                  }}
                />
              </div>
            </div>
            <div>
              <h2 style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 700, color: "#1A1A1A", lineHeight: 1.1,
                margin: "0 0 1.5rem 0",
              }}>
                Without the Latigo,<br />the Saddle Slips.
              </h2>
              <p style={{
                fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
                lineHeight: 1.75, color: "#1A1A1A",
                margin: "0 0 2rem 0",
              }}>
                The <span style={{ color: c.accent, fontWeight: 600 }}>latigo</span> is the leather strap that secures the saddle to the horse. It's not glamorous, but without it, the ride fails. The saddle slips. In the same way, we help leaders and organizations fasten vision to action, tighten what's loose, and release potential into sustainable movement.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                    fontWeight: 700, color: c.primary, lineHeight: 1.2,
                    margin: "0 0 0.25rem 0",
                  }}>
                    Vision
                  </p>
                  <p style={{
                    fontSize: "0.75rem", letterSpacing: "0.15em",
                    textTransform: "uppercase", color: "#888",
                    fontWeight: 500, margin: 0,
                  }}>
                    Without Drift
                  </p>
                </div>
                <div>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                    fontWeight: 700, color: c.primary, lineHeight: 1.2,
                    margin: "0 0 0.25rem 0",
                  }}>
                    Strategy
                  </p>
                  <p style={{
                    fontSize: "0.75rem", letterSpacing: "0.15em",
                    textTransform: "uppercase", color: "#888",
                    fontWeight: 500, margin: 0,
                  }}>
                    Without Confusion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* -- PERSPECTIVE BEFORE PLANNING -- */}
      <FadeInOnScroll>
        <section style={{ background: "#FFFFFF", padding: "8vw 4vw", textAlign: "center" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              fontWeight: 700, color: "#1A1A1A", lineHeight: 1.15,
              margin: "0 0 1.5rem 0",
            }}>
              Perspective Before Planning
            </h2>
            <p style={{
              fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
              lineHeight: 1.75, color: "#1A1A1A",
              margin: "0 0 1.5rem 0",
            }}>
              We believe you can't plan well until you see clearly. That's why every engagement starts with discovery — not directives. We use a Socratic approach that guides leaders to their own best answers rather than prescribing solutions from the outside.
            </p>
            <p style={{
              fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
              lineHeight: 1.75, color: "#1A1A1A",
              margin: 0,
            }}>
              We didn't invent these tools — but we've mastered them. As certified Paterson Center facilitators, we bring rigor, relational depth, and decades of real-world leadership experience to every engagement.
            </p>
          </div>
        </section>
      </FadeInOnScroll>

      {/* -- MEET THE FOUNDERS -- */}
      <FadeInOnScroll>
        <section style={{ background: "#FAF8F5", padding: "8vw 4vw" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <div style={{ textAlign: "center", paddingBottom: 70 }}>
              <h2 style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                fontWeight: 700, color: "#1A1A1A", lineHeight: 1.15,
                margin: 0,
              }}>
                Meet the Founders
              </h2>
            </div>

            {/* Jared Lyons */}
            <div className="founder-block" style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: "4vw", alignItems: "center", marginBottom: "6vw",
            }}>
              <div style={{ overflow: "hidden" }}>
                <img src="/images/jared.jpg" alt="Jared Lyons" style={{
                  width: "100%", aspectRatio: "1/1", maxWidth: 420,
                  objectFit: "cover", objectPosition: "50% 20%",
                  display: "block", borderRadius: 8,
                }} />
              </div>
              <div style={{ padding: "2vw 0" }}>
                <h3 style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                  fontWeight: 700, color: "#1A1A1A", lineHeight: 1.2,
                  margin: "0 0 0.5rem 0",
                }}>
                  Jared Lyons
                </h3>
                <p style={{
                  fontSize: "0.8rem", letterSpacing: "0.12em",
                  textTransform: "uppercase", color: c.accent,
                  fontWeight: 500, margin: "0 0 1.25rem 0",
                }}>
                  Co-Founder & Certified LifePlan Guide
                </p>
                <p style={{
                  fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
                  lineHeight: 1.75, color: "#1A1A1A",
                  margin: "0 0 1rem 0",
                }}>
                  Jared is the Lead Pastor of Zao Church in Spicewood, Texas, which he planted in 2019 with his wife Ali. With over 20 years in ministry and leadership development, Jared is a certified LifePlan facilitator through the Paterson Center. His stated purpose is to help people live the life God has planned for them — and LifePlan is the tool that makes that tangible.
                </p>
                <p style={{
                  fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
                  lineHeight: 1.75, color: "#1A1A1A", margin: 0,
                }}>
                  Before pastoral ministry, Jared led leadership development programs at a team-building facility, giving him hands-on experience with experiential learning and group dynamics. Under Jared and Dustin's leadership, Zao Church ran a capital stewardship campaign that exceeded every goal — $3.6 million committed, 5.5x the operating budget.
                </p>
              </div>
            </div>

            {/* Dustin Sample */}
            <div className="founder-block founder-block-reverse" style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: "4vw", alignItems: "center",
            }}>
              <div style={{ padding: "2vw 0" }}>
                <h3 style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                  fontWeight: 700, color: "#1A1A1A", lineHeight: 1.2,
                  margin: "0 0 0.5rem 0",
                }}>
                  Dustin Sample
                </h3>
                <p style={{
                  fontSize: "0.8rem", letterSpacing: "0.12em",
                  textTransform: "uppercase", color: c.accent,
                  fontWeight: 500, margin: "0 0 1.25rem 0",
                }}>
                  Co-Founder & Certified StratOp Champion
                </p>
                <p style={{
                  fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
                  lineHeight: 1.75, color: "#1A1A1A",
                  margin: "0 0 1rem 0",
                }}>
                  Dustin serves as Executive Pastor at Zao Church and brings 21+ years of ministry experience alongside 20+ years of entrepreneurial ventures. He is a certified StratOp Champion through the Paterson Center, trained to guide leadership teams through the comprehensive strategic planning process that aligns vision, operations, and finances.
                </p>
                <p style={{
                  fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
                  lineHeight: 1.75, color: "#1A1A1A", margin: 0,
                }}>
                  Dustin's ability to sit across the table from a CEO and a pastor with equal credibility is what makes Latigo unique. He has facilitated StratOp engagements for organizations including Altrua HealthShare, where the process produced what the CEO called "greater directional buy-in and momentum than any strategy session before." He has been married to Monica for 25 years and is the father of Noah and Addison.
                </p>
              </div>
              <div style={{ overflow: "hidden" }}>
                <img src="/images/dustin.jpg" alt="Dustin Sample" style={{
                  width: "100%", aspectRatio: "1/1", maxWidth: 420,
                  objectFit: "cover", objectPosition: "50% 20%",
                  display: "block", borderRadius: 8, marginLeft: "auto",
                }} />
              </div>
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* -- BUILT ON A PROVEN FOUNDATION -- */}
      <FadeInOnScroll>
        <section style={{ background: "#FFFFFF", padding: "8vw 4vw", textAlign: "center" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              fontWeight: 700, color: "#1A1A1A", lineHeight: 1.15,
              margin: "0 0 1.5rem 0",
            }}>
              Built on a Proven Foundation
            </h2>
            <p style={{
              fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
              lineHeight: 1.75, color: "#1A1A1A",
              margin: "0 0 1.5rem 0",
            }}>
              Latigo is built on the Paterson LifePlan and StratOp methodologies — strategic frameworks developed by Tom Paterson and refined over decades of work with organizations ranging from IBM and NASA to churches and nonprofits. We are certified through the Paterson Center in Fort Collins, Colorado, and trained in their rigorous five-phase certification process.
            </p>
            <p style={{
              fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
              lineHeight: 1.75, color: "#1A1A1A",
              margin: "0 0 2.5rem 0",
            }}>
              What sets Latigo apart isn't just the certification — it's our rare dual capability. Most Paterson-certified guides hold one certification. Latigo offers both StratOp for organizations and LifePlan for individuals under one roof, creating a natural pathway from organizational clarity to personal alignment.
            </p>
            <a
              href="https://www.patersoncenter.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
                color: c.accent,
                textDecoration: "underline",
                fontWeight: 500,
              }}
            >
              Certified by the Paterson Center →
            </a>
          </div>
        </section>
      </FadeInOnScroll>

      {/* -- CTA -- */}
      <FadeInOnScroll>
        <section style={{
          background: c.primary, padding: "8vw 4vw", textAlign: "center",
        }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
              fontWeight: 700, color: "#FFFFFF", lineHeight: 1.15,
              margin: "0 0 2.5rem 0",
            }}>
              Ready to move forward?
            </h2>
            <Link
              to={createPageUrl("Contact")}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500, fontSize: "0.85rem",
                letterSpacing: "0.1em", textTransform: "uppercase",
                textDecoration: "none", display: "inline-block",
                padding: "16px 40px", borderRadius: 6,
                background: "transparent", color: "#FFFFFF",
                border: "1px solid #FFFFFF",
                transition: "background 0.3s ease", cursor: "pointer",
              }}
            >
              Book a Discovery Call
            </Link>
          </div>
        </section>
      </FadeInOnScroll>

      <style>{`
        @media (max-width: 768px) {
          .founder-block { grid-template-columns: 1fr !important; }
          .founder-block-reverse > div:last-child { order: -1 !important; }
          .metaphor-block { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
