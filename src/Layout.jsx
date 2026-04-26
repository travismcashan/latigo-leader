import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import PageComingSoon from "./components/PageComingSoon";

const LOGO_WHITE = "/images/latigo-logo.png";

export default function Layout({ children, currentPageName }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [isLandingPage, setIsLandingPage] = useState(() => {
    return localStorage.getItem("latigo-landing-mode") === "true";
  });
  const location = useLocation();

  const isHomePage = currentPageName === "Home";
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("latigo-theme") || "teal";
    }
    return "teal";
  });

  const themePrimary = theme === "teal" ? "#2A5C5A" : "#bf9f4b";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem("latigo-theme") || "teal");
      setIsLandingPage(localStorage.getItem("latigo-landing-mode") === "true");
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
    { label: "About", page: "About" },
    { label: "StratOp", page: "Services" },
    { label: "LifePlan", page: "Team" },
  ];

  const handleLinkClick = (e, page) => {
    e.preventDefault();
    setComingSoonOpen(true);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1A1A1A", background: "#FAF8F5", minHeight: "100vh" }}>
      <PageComingSoon isOpen={comingSoonOpen} onClose={() => setComingSoonOpen(false)} />
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

        .burger-line {
          display: block;
          width: 22px;
          height: 2.5px;
          background: currentColor;
          margin: 4px 0;
        }
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
        <div className="header-container" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25vw 4vw",
          position: "relative",
        }}>
          {/* Logo */}
          <Link to={createPageUrl("Home")} style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none", cursor: "pointer" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {isTransparent ? (
                <img src={LOGO_WHITE} alt="Latigo" style={{ height: 31, width: "auto" }} />
              ) : (
                <img src={LOGO_WHITE} alt="Latigo" style={{ height: 31, width: "auto", filter: "brightness(0) saturate(100%) invert(20%) sepia(15%) saturate(300%) hue-rotate(310deg) brightness(75%) contrast(95%)" }} />
              )}
            </div>
          </Link>

          {/* Desktop Nav */}
          {!isLandingPage && (
            <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="desktop-nav">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  onClick={(e) => handleLinkClick(e, link.page)}
                  className="clove-nav-link"
                  style={{ color: isTransparent ? "#FAF8F5" : "#4f2d37", fontSize: "1.2rem" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {/* CTA */}
          <div className="desktop-cta">
            <Link
              to={createPageUrl("Contact")}
              onClick={(e) => handleLinkClick(e, "Contact")}
              className="btn-primary"
              style={{
                background: "#bf9f4b",
                color: "#FAF8F5",
                transition: "background 0.3s ease",
              }}
            >
              Book a Call
            </Link>
          </div>

        </div>
      </header>

      {/* Page Content */}
      <main>{children}</main>

      {/* ── FOOTER ── white */}
      <footer style={{
        background: "#FFFFFF",
        paddingTop: "4rem",
        paddingBottom: "2.5rem",
      }}>
        <div style={{ padding: "0 4vw" }}>
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
              {!isLandingPage && (
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "#1A1A1A", marginBottom: "1rem", marginTop: "-0.3rem" }}>How We Help</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <Link to={createPageUrl("Services")} onClick={(e) => handleLinkClick(e, "Services")} style={{ color: "#1A1A1A", fontSize: "0.95rem", textDecoration: "none", lineHeight: 1.3 }}>StratOp</Link>
                    <Link to={createPageUrl("Team")} onClick={(e) => handleLinkClick(e, "Team")} style={{ color: "#1A1A1A", fontSize: "0.95rem", textDecoration: "none", lineHeight: 1.3 }}>LifePlan</Link>
                  </div>
                </div>
              )}
              {/* Questions */}
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "#1A1A1A", marginBottom: "1rem", marginTop: "-0.3rem" }}>Questions?</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <Link to={createPageUrl("Contact")} style={{ fontSize: "0.95rem", color: "#1A1A1A", textDecoration: "none", lineHeight: 1.3 }}>Contact us</Link>
                  <a href="mailto:dustin@latigoleader.com" style={{ fontSize: "0.95rem", color: "#1A1A1A", textDecoration: "none", lineHeight: 1.3 }}>dustin@latigoleader.com</a>
                  <a href="mailto:jared@latigoleader.com" style={{ fontSize: "0.95rem", color: "#1A1A1A", textDecoration: "none", lineHeight: 1.3 }}>jared@latigoleader.com</a>
                </div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "1.5rem", fontSize: "0.75rem", color: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span>© 2025 Latigo Leadership Consulting. All rights reserved. </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer", fontSize: "0.7rem" }}>
                  <input
                    type="checkbox"
                    checked={isLandingPage}
                    onChange={() => {
                      const newMode = !isLandingPage;
                      localStorage.setItem("latigo-landing-mode", newMode);
                      setIsLandingPage(newMode);
                      window.dispatchEvent(new Event("storage"));
                    }}
                    style={{ width: "14px", height: "14px", cursor: "pointer" }}
                  />
                  Landing Mode
                </label>
              </div>
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
        }
        @media (min-width: 769px) {
          .mobile-burger { display: none !important; }
        }
      `}</style>
    </div>
  );
}