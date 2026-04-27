import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";

const LOGO_WHITE = "/images/latigo-logo.png";

export default function Layout({ children, currentPageName }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isHomePage = currentPageName === "home";

  const stratOpPhotos = Array.from({ length: 15 }, (_, i) => `/images/footer-gallery/${String(i + 1).padStart(2, "0")}.jpg`);
  const lifePlanPhotos = Array.from({ length: 10 }, (_, i) => `/images/wall-of-fame/${i + 1}a.jpg`);
  const galleryPhotos = useMemo(() => {
    const pickStratOp = [...stratOpPhotos].sort(() => Math.random() - 0.5).slice(0, 3);
    const pickLifePlan = [...lifePlanPhotos].sort(() => Math.random() - 0.5).slice(0, 2);
    return [...pickStratOp, ...pickLifePlan].sort(() => Math.random() - 0.5);
  }, [location.pathname]);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("latigo-theme") || "teal";
    }
    return "teal";
  });


  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem("latigo-theme") || "teal");
    };
    window.addEventListener("storage", handleThemeChange);
    return () => window.removeEventListener("storage", handleThemeChange);
  }, []);

  const isTransparent = isHomePage && !scrolled;

  const themeButtons = (
    <div style={{ display: "flex", gap: "0.75rem" }}>
      <button
        onClick={() => {
          localStorage.setItem("latigo-theme", "teal");
          setTheme("teal");
          window.dispatchEvent(new Event("storage"));
        }}
        style={{
          padding: "6px 12px",
          background: theme === "teal" ? "#2A5C5A" : "rgba(42, 92, 90, 0.1)",
          color: theme === "teal" ? "#FAF8F5" : "#2A5C5A",
          border: "none",
          borderRadius: "3px",
          cursor: "pointer",
          fontSize: "0.7rem",
          fontWeight: 500,
          transition: "all 0.2s ease",
        }}
      >
        Teal
      </button>
      <button
        onClick={() => {
          localStorage.setItem("latigo-theme", "copper");
          setTheme("copper");
          window.dispatchEvent(new Event("storage"));
        }}
        style={{
          padding: "6px 12px",
          background: theme === "copper" ? "#D4874D" : "rgba(212, 135, 77, 0.1)",
          color: theme === "copper" ? "#FAF8F5" : "#D4874D",
          border: "none",
          borderRadius: "3px",
          cursor: "pointer",
          fontSize: "0.7rem",
          fontWeight: 500,
          transition: "all 0.2s ease",
        }}
      >
        Copper
      </button>
    </div>
  );

  const navLinks = [
    { label: "About", page: "about" },
    { label: "StratOp", page: "services" },
    { label: "LifePlan", page: "team" },
    { label: "Results", page: "results" },
  ];

  return (
    <div data-theme={theme} style={{ fontFamily: "'Inter', sans-serif", color: "#1A1A1A", background: "#FAF8F5", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Inter:wght@400;500&family=Lora:ital@1&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          line-height: 1.65;
          color: #1A1A1A;
          background: #FAF8F5;
        }

        [data-theme="copper"] img:not([alt="Latigo"]):not([alt="Altrua HealthShare"]):not([data-no-tint]),
        [data-theme="copper"] video:not([data-no-tint]),
        [data-theme="copper"] .hero-bg {
          filter: sepia(15%) saturate(90%) brightness(98%);
        }
        [data-theme="teal"] img:not([alt="Latigo"]):not([alt="Altrua HealthShare"]):not([data-no-tint]),
        [data-theme="teal"] video:not([data-no-tint]),
        [data-theme="teal"] .hero-bg {
          filter: sepia(12%) saturate(80%) brightness(96%);
        }

        .clove-nav-link {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          font-weight: 400;
          letter-spacing: 0.01em;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .clove-nav-link:hover { opacity: 0.6; }

        .btn-primary {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          display: inline-block;
          padding: 11px 22px;
          border-radius: 6px;
          cursor: pointer;
          transition: opacity 0.2s;
          white-space: nowrap;
        }
        .btn-primary:hover { opacity: 0.85; }

      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        transition: "background 0.3s, box-shadow 0.3s",
        background: isTransparent ? "transparent" : "rgba(250,248,245,0.98)",
        boxShadow: isTransparent ? "none" : "0 1px 0 rgba(0,0,0,0.08)",
      }}>
        <nav style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isTransparent ? "2.5vw 4vw 1.25vw 4vw" : "0.75vw 4vw",
          transition: "padding 0.3s ease",
        }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", padding: "8px 0" }}>
            <img
              src={LOGO_WHITE}
              alt="Latigo"
              style={{
                height: 34,
                width: "auto",
                display: "block",
                filter: isTransparent ? "none" : "brightness(0) saturate(100%) invert(20%) sepia(15%) saturate(300%) hue-rotate(310deg) brightness(75%) contrast(95%)",
              }}
            />
          </Link>

          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {navLinks.map((link) => {
              const isActive = currentPageName === link.page;
              return (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className="clove-nav-link"
                  style={{
                    color: isTransparent ? "#FAF8F5" : "#4f2d37",
                    fontSize: "1.2rem",
                    borderBottom: isActive ? `2px solid ${isTransparent ? "#FAF8F5" : "#bf9f4b"}` : "2px solid transparent",
                    paddingBottom: "4px",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <Link to={createPageUrl("Contact")} className="btn-primary desktop-cta" style={{ background: "#bf9f4b", color: "#FAF8F5" }}>
            Contact Us
          </Link>

          <button
            className="mobile-burger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "10px",
              color: isTransparent ? "#FAF8F5" : "#1A1A1A",
              display: "none",
              lineHeight: 0,
            }}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </nav>

        {mobileOpen && (
          <div style={{ background: "rgba(250,248,245,0.98)", padding: "0.5rem 4vw 1.5rem" }}>
            {navLinks.map((link) => (
              <Link
                key={link.page}
                to={createPageUrl(link.page)}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 400,
                  color: "#1A1A1A",
                  textDecoration: "none",
                  padding: "0.75rem 0",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to={createPageUrl("Contact")}
              onClick={() => setMobileOpen(false)}
              className="btn-primary"
              style={{
                display: "block",
                background: "#bf9f4b",
                color: "#FAF8F5",
                textAlign: "center",
                marginTop: "0.75rem",
              }}
            >
              Contact Us
            </Link>
          </div>
        )}
      </header>

      {/* Page Content */}
      <main>{children}</main>

      {/* ── GALLERY ── */}
      <section style={{ background: "#FFFFFF", padding: "4vw 4vw 0" }}>
        <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", maxWidth: 1400, margin: "0 auto" }}>
          {galleryPhotos.map((src, idx) => (
            <div key={idx} className="gallery-item" style={{ aspectRatio: "16/9", overflow: "hidden", borderRadius: 8 }}>
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── white */}
      <footer style={{
        background: "#FFFFFF",
        paddingTop: "4rem",
        paddingBottom: "2.5rem",
        padding: "4rem 4vw 2.5rem",
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", marginBottom: "3rem", alignItems: "flex-start" }}>
            {/* Left: Logo and tagline */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", width: "fit-content" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={LOGO_WHITE} alt="Latigo" style={{ height: 31, width: "auto", filter: "brightness(0) saturate(100%) invert(20%) sepia(15%) saturate(300%) hue-rotate(310deg) brightness(75%) contrast(95%)" }} />
              </div>
              <p style={{ fontSize: "0.95rem", color: "#1A1A1A", fontStyle: "italic", margin: "0.75rem 0 0 0", lineHeight: 1.4 }}>Securing vision to action<br />for leaders and organizations.</p>
            </div>
            {/* Right: Two columns */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" }}>
              {/* How we help */}
              {(
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "#1A1A1A", marginBottom: "1rem", marginTop: "-0.3rem" }}>How We Help</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <Link to={createPageUrl("Services")} style={{ color: "#1A1A1A", fontSize: "0.95rem", textDecoration: "none", lineHeight: 1.3 }}>StratOp for Organizations</Link>
                    <Link to={createPageUrl("Team")} style={{ color: "#1A1A1A", fontSize: "0.95rem", textDecoration: "none", lineHeight: 1.3 }}>LifePlan for Individuals</Link>
                  </div>
                </div>
              )}
              {/* Questions */}
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "#1A1A1A", marginBottom: "1rem", marginTop: "-0.3rem" }}>Questions?</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <Link to={createPageUrl("About")} style={{ fontSize: "0.95rem", color: "#1A1A1A", textDecoration: "none", lineHeight: 1.3 }}>About Us</Link>
                  <Link to={createPageUrl("Contact")} style={{ fontSize: "0.95rem", color: "#1A1A1A", textDecoration: "none", lineHeight: 1.3 }}>Contact Us</Link>
                </div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "1.5rem", fontSize: "0.75rem", color: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span>© 2025 Latigo Leadership Consulting. All rights reserved. </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {themeButtons}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav, .desktop-cta { display: none !important; }
          .mobile-burger { display: block !important; }
          .header-container { padding: "1.5vw 6vw" !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 40px 0 !important; text-align: left !important; }
          .footer-grid > div:nth-child(2),
          .footer-grid > div:nth-child(3) { display: none !important; }
          .footer-grid > div { text-align: left !important; }
          .footer-grid > div:first-child { align-self: flex-start !important; }
          .gallery-grid { grid-template-columns: 1fr !important; }
          .gallery-item:not(:first-child) { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-burger { display: none !important; }
        }
      `}</style>
    </div>
  );
}