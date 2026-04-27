import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import FadeInOnScroll from "../components/FadeInOnScroll";
import DiscoveryCallModal from "../components/DiscoveryCallModal";
import TestimonialCarousel from "../components/TestimonialCarousel";


export default function Home() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("latigo-theme") || "teal";
  });
  const [discoveryModalOpen, setDiscoveryModalOpen] = useState(false);

  // SEO Meta Tags and Structured Data
  useEffect(() => {
    // Update page title and meta tags
    document.title = "Latigo Leadership Consulting | Strategic Planning & Personal Leadership";
    
    const metaTags = [
      { name: "description", content: "Strategic planning and personal leadership intensives for executives. Certified StratOp and LifePlan facilitators helping leaders align vision with execution." },
      { name: "keywords", content: "strategic planning, leadership consulting, StratOp, LifePlan, executive coaching, organizational leadership" },
      { property: "og:title", content: "Latigo Leadership Consulting | Securing Vision to Action" },
      { property: "og:description", content: "We help leaders and organizations align strategy with execution — so the plan holds, the team moves, and real progress begins." },
      { property: "og:image", content: "/images/latigo-logo.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Latigo Leadership Consulting" },
      { name: "twitter:description", content: "Strategic planning and leadership development for executives and organizations." },
    ];

    metaTags.forEach(tag => {
      let element = document.querySelector(`meta[${tag.property ? 'property' : 'name'}="${tag.property || tag.name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(tag.property ? 'property' : 'name', tag.property || tag.name);
        document.head.appendChild(element);
      }
      element.content = tag.content;
    });

    // Add JSON-LD structured data
    const schemaScripts = [
      {
        id: "org-schema",
        data: {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Latigo Leadership Consulting",
          "url": "https://latigoleader.com",
          "email": "hello@latigoleader.com",
          "logo": "/images/latigo-logo.png"
        }
      },
      {
        id: "localbusiness-schema",
        data: {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Latigo Leadership Consulting",
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "hello@latigoleader.com",
            "contactType": "Customer Service"
          }
        }
      },
      {
        id: "service-schema",
        data: {
          "@context": "https://schema.org",
          "@type": ["Service", "AggregateOffer"],
          "name": "Strategic Planning and Leadership Development",
          "description": "StratOp and LifePlan intensives for organizational and personal leadership",
          "provider": {
            "@type": "Organization",
            "name": "Latigo Leadership Consulting"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Leadership Services",
            "itemListElement": [
              {
                "@type": "OfferCatalog",
                "name": "StratOp",
                "description": "Multi-day strategic planning intensive for leadership teams"
              },
              {
                "@type": "OfferCatalog",
                "name": "LifePlan",
                "description": "Two-day personal leadership intensive covering five life domains"
              }
            ]
          }
        }
      }
    ];

    schemaScripts.forEach(({ id, data }) => {
      let script = document.getElementById(id);
      if (!script) {
        script = document.createElement("script");
        script.id = id;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.innerHTML = JSON.stringify(data);
    });

    return () => {
      // Cleanup schemas on unmount
      schemaScripts.forEach(({ id }) => {
        const script = document.getElementById(id);
        if (script) script.remove();
      });
    };
  }, []);

  const heroSectionRef = useRef(null);
  const ctaVideoRef = useRef(null);
  const [heroVideoLoaded, setHeroVideoLoaded] = useState(false);
  const [ctaVideoLoaded, setCtaVideoLoaded] = useState(false);

  const heroVideos = [
    {
      src: "/videos/stratop-montage.mp4",
      poster: "/images/stratop-first-frame.jpg",
    },
    {
      src: "/videos/lifeplan-montage.mp4",
      poster: "/images/lifeplan-first-frame.png",
    },
  ];
  const [heroVideoIndex, setHeroVideoIndex] = useState(() => Math.floor(Math.random() * heroVideos.length));
  const heroVideo = heroVideos[heroVideoIndex];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setHeroVideoIndex(prev => (prev + 1) % heroVideos.length);
          setHeroVideoLoaded(false);
        }
      },
      { threshold: 0 }
    );
    if (heroSectionRef.current) observer.observe(heroSectionRef.current);
    return () => {
      if (heroSectionRef.current) observer.unobserve(heroSectionRef.current);
    };
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const newTheme = localStorage.getItem("latigo-theme") || "teal";
      const newMode = localStorage.getItem("latigo-landing-mode") === "true";
      setTheme(newTheme);
      setIsLandingPage(newMode);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const colors = {
    teal: {
      primary: "#2A5C5A",
      primaryText: "#FFFFFF",
      ctaBackground: "#2A5C5A",
      ctaButtonBackground: "#FAF8F5",
      ctaButtonText: "#2A5C5A",
      secondary: "#D4874D",
    },
    copper: {
      primary: "#bf9f4b",
      primaryText: "#4f2c37",
      ctaBackground: "#bf9f4b",
      ctaButtonBackground: "#4f2c37",
      ctaButtonText: "#bf9f4b",
      secondary: "#2A5C5A",
    },
  };

  const currentColors = colors[theme];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1A1A1A", background: "#FFFFFF" }}>
      <DiscoveryCallModal isOpen={discoveryModalOpen} onClose={() => setDiscoveryModalOpen(false)} />

      {/* ── 1. HERO ── */}
      <section ref={heroSectionRef} style={{ position: "relative", width: "100%", height: "100vh", minHeight: 600, overflow: "hidden", background: "#000" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('${heroVideo.poster}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: heroVideoLoaded ? 0 : 1,
            transition: "opacity 0.6s ease",
          }}
        />
        <video
          key={heroVideo.src}
          src={heroVideo.src}
          poster={heroVideo.poster}
          muted
          loop
          autoPlay
          playsInline
          onCanPlay={() => setHeroVideoLoaded(true)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 50%", opacity: heroVideoLoaded ? 1 : 0, transition: "opacity 0.6s ease" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.52)" }} />
        <div style={{ position: "absolute", inset: 0, background: theme === "teal" ? "rgba(42, 92, 90, 0.12)" : "rgba(191, 159, 75, 0.12)" }} />
        <div style={{
          position: "absolute",
          bottom: "8%",
          left: 0,
          right: 0,
          padding: "0 4vw",
        }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(3rem, 6vw, 5rem)",
              fontWeight: 700,
              color: "#FAF8F5",
              lineHeight: 1.1,
              margin: "0 0 1.2rem 0",
            }}>
              Securing Vision<br />to Action.
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
              color: "rgba(250,248,245,0.88)",
              lineHeight: 1.65,
              margin: 0,
              maxWidth: 580,
            }}>
              We help leaders and organizations align strategy with execution — so the plan holds, the team moves, and real progress begins.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. OUR APPROACH ── centered, cream bg */}
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
            Proven frameworks.<br />Real forward movement.
          </h2>
          <p style={{
            fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
            lineHeight: 1.75,
            color: "#1A1A1A",
            margin: "0 auto 3rem auto",
            maxWidth: 780,
          }}>
            We are certified facilitators of the Paterson LifePlan and StratOp methodologies — proven strategic frameworks refined over decades of work with organizations ranging from Fortune 500 companies to churches and nonprofits. We guide individuals through personal LifePlan intensives and leadership teams through the StratOp process to create clarity, alignment, and sustained forward movement. Whether you're a CEO navigating growth, a pastor leading through transition, or an executive searching for purpose — we help you see clearly and plan strategically.
          </p>
          {(
            <Link to={createPageUrl("About")} style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.85rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
            display: "inline-block",
            padding: "14px 32px",
            background: currentColors.primary,
            color: "#FAF8F5",
            borderRadius: 6,
            transition: "background 0.3s ease",
            }}>
            Learn More
            </Link>
          )}
        </div>
      </section>
      </FadeInOnScroll>

      {/* ── 3. WHO WE WORK WITH ── cream, 3-col grid */}
      {/* COMMENTED OUT
      <FadeInOnScroll>
      <section style={{ background: "#FAF8F5", padding: "6.6vmax 4vw" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
            fontWeight: 700,
            color: "#1A1A1A",
            lineHeight: 1.15,
            margin: "0 0 60px 0",
            textAlign: "center",
          }}>
            Who We Work With
          </h2>
          <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0 40px" }}>
            {[
              {
                img: "/images/ceo-team.jpg",
                title: "CEOs & Business Owners",
                desc: "You built something real — but growth has outpaced your plan. We help leadership teams align vision with execution.",
                link: "→ Explore StratOp",
                href: createPageUrl("Services"),
                imgFilter: "none",
              },
              {
                img: "/images/church-leader.jpg",
                title: "Pastors & Church Leaders",
                desc: "The old playbook no longer fits the season you're in. We bring pastoral understanding to strategic planning.",
                link: "→ Explore StratOp",
                href: createPageUrl("Services"),
                imgFilter: "none",
              },
              {
                img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80",
                title: "Leaders in Transition",
                desc: "You've achieved a lot, but something shifted. A two-day intensive to stop drifting and start building with clarity.",
                link: "→ Explore LifePlan",
                href: createPageUrl("Services"),
                imgFilter: "none",
              },
            ].map((card) => (
              <div key={card.title} style={{ textAlign: "center" }}>
                <div style={{ aspectRatio: "16/9", overflow: "hidden", marginBottom: "8%" }}>
                  <img src={card.img} alt={card.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: card.imgFilter, borderRadius: 8 }} />
                </div>
                <h4 style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  color: "#1A1A1A",
                  lineHeight: 1.3,
                  margin: "0 0 0.75rem 0",
                  maxWidth: 280,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}>
                  {card.title}
                </h4>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#555", marginBottom: "1rem", maxWidth: 300, marginLeft: "auto", marginRight: "auto" }}>{card.desc}</p>
                <Link to={card.href} style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.95rem",
                  color: "#bf9f4b",
                  textDecoration: "underline",
                  fontWeight: 500,
                }}>
                  {card.link}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeInOnScroll>
      */}

      {/* ── 4. STRATEGIC PLANNING — image left, text right ── */}
      <FadeInOnScroll>
      <section style={{ background: "transparent", padding: "8vw 4vw" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="float-block" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4vw", alignItems: "center" }}>
            <div style={{ overflow: "hidden", aspectRatio: "5/4" }}>
              <img
                src="/images/stratop-planning.jpeg"
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center bottom", display: "block", borderRadius: 8 }}
              />
            </div>
            <div style={{ padding: "3vw 2vw" }}>
              <h2 style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                fontWeight: 700,
                color: "#1A1A1A",
                lineHeight: 1.1,
                margin: "0 0 1.5rem 0",
              }}>
                Strategic Planning Your Team Owns.
              </h2>
              <p style={{ fontSize: "clamp(1rem, 1.6vw, 1.2rem)", lineHeight: 1.75, color: "#1A1A1A", margin: "0 0 1.75rem 0" }}>
                StratOp is a multi-day facilitated intensive that brings your entire leadership team together to build a strategic plan grounded in reality — not theory. We start with perspective, surface the hard truths, clarify priorities, and walk out with a plan your team will actually follow. Because they built it together.
              </p>
              {(
                <Link to={createPageUrl("Services")} style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1rem, 1.6vw, 1.2rem)", color: "#bf9f4b", textDecoration: "underline", fontWeight: 500 }}>
                  Explore StratOp →
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
      </FadeInOnScroll>

      {/* ── 5. LIFEPLAN — text left, image right ── */}
      <FadeInOnScroll>
      <section style={{ background: "#FAF8F5", padding: "8vw 4vw" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="float-block lifeplan-block" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4vw", alignItems: "center" }}>
            <div style={{ padding: "3vw 2vw" }}>
              <h2 style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                fontWeight: 700,
                color: "#1A1A1A",
                lineHeight: 1.1,
                margin: "0 0 1.5rem 0",
              }}>
                Clarity for the Life You're Building.
              </h2>
              <p style={{ fontSize: "clamp(1rem, 1.6vw, 1.2rem)", lineHeight: 1.75, color: "#1A1A1A", margin: "0 0 1.75rem 0" }}>
                LifePlan is a two-day personal intensive designed for leaders who have achieved a lot — but aren't sure they're headed in the right direction. Through a guided process covering five life domains, you'll uncover purpose, name what's been holding you back, and build a strategic plan for the most important organization you'll ever lead — your own life.
              </p>
              {(
                <Link to={createPageUrl("Services")} style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1rem, 1.6vw, 1.2rem)", color: "#bf9f4b", textDecoration: "underline", fontWeight: 500 }}>
                  Explore LifePlan →
                </Link>
              )}
            </div>
            <div style={{ overflow: "hidden", aspectRatio: "5/4" }}>
              <img
                src="/images/lifeplan-section.jpg"
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", borderRadius: 8 }}
              />
            </div>
          </div>
        </div>
      </section>
      </FadeInOnScroll>

      {/* ── 6. HOW WE WORK ── themed */}
      <FadeInOnScroll>
      <section style={{ background: theme === "teal" ? "#2A5C5A" : "#EDE9E3", padding: "8vw 4vw" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ textAlign: "center", paddingBottom: 70 }}>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
              fontWeight: 700,
              color: theme === "teal" ? "#FFFFFF" : "#1A1A1A",
              lineHeight: 1.15,
              margin: 0,
            }}>
              How We Work
            </h2>
          </div>
          <ul className="services-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0 40px",
            maxWidth: 1100,
            margin: "0 auto",
            padding: 0,
            listStyle: "none",
          }}>
            {[
              {
                image: "/images/discovery-icon.png",
                label: "Discovery Call",
                name: "Discovery Call",
                desc: "We start with a conversation to understand where you are, what's working, and what needs to change. No pitch — just clarity on whether we're the right fit.",
                iconSize: 112,
                linkPage: "Contact",
              },
              {
                image: "/images/intensive-icon.svg",
                label: "The Intensive",
                name: "The Intensive",
                desc: "Through a multi-day facilitated process, we guide your team (or you, individually) through proven frameworks that surface truth, build alignment, and produce a strategic plan grounded in reality.",
                iconSize: 112,
                linkPage: "Services",
              },
              {
                image: "/images/design-icon.png",
                label: "Sustained Movement",
                name: "Sustained Movement",
                desc: "The plan doesn't end when the intensive does. We provide follow-up coaching, quarterly reviews, and annual renewals to keep momentum alive and your strategy current.",
                iconSize: 112,
                linkPage: "Contact",
              },
            ].map((s) => {
              return (
              <li key={s.name} style={{ textAlign: "center", padding: "0 20px" }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 140, marginBottom: "1.25rem" }}><img src={s.image} alt={s.name} style={{ width: s.iconSize, height: s.iconSize, objectFit: "contain", filter: theme === "teal" ? "brightness(0) invert(1)" : "none" }} /></div>
                <h3 style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: theme === "teal" ? "#FFFFFF" : "#1A1A1A",
                  lineHeight: 1.3,
                  margin: "0 0 0.75rem 0",
                }}>{s.name}</h3>
                <p style={{ fontSize: "1rem", lineHeight: 1.7, color: theme === "teal" ? "#FFFFFF" : "#1A1A1A" }}>{s.desc}</p>
              </li>
            );
            })}
          </ul>
          <div style={{ textAlign: "center", marginTop: 70 }}>
           <button onClick={() => setDiscoveryModalOpen(true)} style={{
             fontFamily: "'Inter', sans-serif",
             fontWeight: 500,
             fontSize: "0.85rem",
             letterSpacing: "0.1em",
             textTransform: "uppercase",
             textDecoration: "none",
             display: "inline-block",
             padding: "14px 32px",
             borderRadius: 6,
             background: theme === "teal" ? "transparent" : currentColors.primary,
             color: "#FFFFFF",
             border: theme === "teal" ? "1px solid #FFFFFF" : "none",
             transition: "background 0.3s ease",
             cursor: "pointer",
           }}>Book a Discovery Call</button>
          </div>
        </div>
      </section>
      </FadeInOnScroll>

      {/* ── 7. TESTIMONIAL ── always teal */}
      <FadeInOnScroll>
      <TestimonialCarousel />
      </FadeInOnScroll>

      {/* ── 8. MEET THE GUIDES ── cream */}
      <FadeInOnScroll>
      <section style={{ background: "#FAF8F5", padding: "8vw 4vw" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ textAlign: "center", paddingBottom: 70 }}>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
              fontWeight: 700,
              color: "#1A1A1A",
              lineHeight: 1.15,
              margin: 0,
            }}>
              Two Leaders, One Mission
            </h2>
          </div>
          <ul className="team-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "60px 80px",
            maxWidth: 900,
            margin: "0 auto",
            padding: 0,
            listStyle: "none",
          }}>
            {[
              {
                img: "/images/jared.jpg",
                name: "Jared Lyons",
                title: "Lead Pastor, Zao Church",
                desc: "A visionary leader and certified StratOp and LifePlan facilitator with a passion for helping organizations grow with intention and seeing people live out their God-given purpose.",
              },
              {
                img: "/images/dustin.jpg",
                name: "Dustin Sample",
                title: "Executive Pastor, Zao Church",
                desc: "With 20+ years in ministry, Dustin is a certified facilitator, competitive CrossFit athlete, and business owner who brings intensity and clarity to every engagement.",
              },
            ].map((m) => (
              <li key={m.name} style={{ textAlign: "center" }}>
                <div style={{ aspectRatio: "1/1", overflow: "hidden", marginBottom: "8%", maxWidth: 380, margin: "0 auto 8% auto" }}>
                  <img src={m.img} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 20%", display: "block", borderRadius: 8 }} />
                </div>
                <h3 style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#1A1A1A",
                  lineHeight: 1.3,
                  margin: "0 0 0.35rem 0",
                }}>{m.name}</h3>
                <p style={{ fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#1f3d3c", marginBottom: "0.75rem" }}>{m.title}</p>
                <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "#1A1A1A" }}>{m.desc}</p>
              </li>
            ))}
          </ul>
          {(
            <div style={{ textAlign: "center", marginTop: 70 }}>
              <Link to={createPageUrl("About")} style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-block",
                padding: "14px 32px",
                borderRadius: 6,
                background: currentColors.primary,
                color: "#FAF8F5",
                transition: "background 0.3s ease",
              }}>Our Story →</Link>
            </div>
          )}
        </div>
      </section>
      </FadeInOnScroll>

      {/* ── 9. BOTTOM CTA ── thematic */}
      <FadeInOnScroll>
      <section style={{ 
        padding: "18vmax 4vw",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <video
          ref={ctaVideoRef}
          src="/videos/horses.mp4"
          poster="/images/lifeplan-first-frame.png"
          muted
          loop
          autoPlay
          playsInline
          onCanPlay={() => setCtaVideoLoaded(true)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: ctaVideoLoaded ? 1 : 0, transition: "opacity 0.6s ease" }}
        />
        <div style={{ position: "absolute", inset: 0, background: currentColors.ctaBackground, opacity: 0.88 }} />
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <h2 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
            fontWeight: 700,
            color: currentColors.primaryText,
            lineHeight: 1.15,
            margin: "0 0 2.5rem 0",
            transition: "color 0.3s ease",
          }}>
            Ready to move forward?

          </h2>
          <button onClick={() => setDiscoveryModalOpen(true)} style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: "0.85rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
            display: "inline-block",
            padding: "18px 48px",
            borderRadius: 6,
            background: currentColors.ctaButtonBackground,
            color: currentColors.ctaButtonText,
            transition: "background 0.3s ease, color 0.3s ease",
            cursor: "pointer",
            }}>
            Book a Discovery Call
          </button>
        </div>
      </section>
      </FadeInOnScroll>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Inter:wght@400;500&family=Lora:ital@1&display=swap');
        

        
        @media (max-width: 768px) {
          .float-block { grid-template-columns: 1fr !important; }
          .float-block > div { order: auto !important; }
          .lifeplan-block > div:last-child { order: -1 !important; }
          .services-grid { grid-template-columns: 1fr !important; gap: 48px 0 !important; }
          .team-grid { grid-template-columns: 1fr !important; gap: 40px 0 !important; }
          .blog-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .gallery-grid { grid-template-columns: 1fr !important; }
          .gallery-item:not(:first-child) { display: none !important; }
        }
      `}</style>
    </div>
  );
}