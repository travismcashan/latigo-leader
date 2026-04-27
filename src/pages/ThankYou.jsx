import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import FadeInOnScroll from "@/components/FadeInOnScroll";

export default function ThankYou() {
  const [theme, setTheme] = useState(() => localStorage.getItem("latigo-theme") || "teal");
  useEffect(() => {
    const sync = () => setTheme(localStorage.getItem("latigo-theme") || "teal");
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  const accent = theme === "teal" ? "#bf9f4b" : "#2A5C5A";

  useEffect(() => {
    document.title = "Thank You | Latigo Leadership Consulting";

    const metaTags = [
      { name: "description", content: "Thank you for reaching out to Latigo Leadership Consulting. We will be in touch soon." },
      { property: "og:title", content: "Thank You | Latigo Leadership Consulting" },
      { property: "og:description", content: "Thank you for reaching out. One of our team members will be in touch soon." },
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

    return () => {
      metaTags.forEach(tag => {
        const selector = `meta[${tag.property ? "property" : "name"}="${tag.property || tag.name}"]`;
        const el = document.querySelector(selector);
        if (el) el.remove();
      });
    };
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "#000" }}>
      {/* Background Video */}
      <video
        src="/videos/stratop-montage.mp4"
        poster="/images/stratop-first-frame.jpg"
        muted
        loop
        autoPlay
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <FadeInOnScroll>
          {/* Eyebrow */}
          <p
            style={{
              color: accent,
              fontSize: "0.85rem",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontFamily: "'Inter', sans-serif",
              margin: "0 0 1.25rem 0",
            }}
          >
            WE GOT YOUR MESSAGE
          </p>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.1,
              margin: "0 0 1.5rem 0",
            }}
          >
            Help Is on the Way.
          </h1>

          {/* Subhead */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
              fontWeight: 400,
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.7,
              maxWidth: 550,
              margin: "0 auto 2.5rem auto",
            }}
          >
            Thank you for reaching out. One of our team members will be in touch soon to learn more about you and how we can help.
          </p>

          {/* Button */}
          <Link
            to="/"
            style={{
              display: "inline-block",
              border: "2px solid #FFFFFF",
              color: "#FFFFFF",
              background: "transparent",
              borderRadius: 6,
              padding: "14px 32px",
              fontSize: "0.85rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              fontFamily: "'Inter', sans-serif",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FFFFFF";
              e.currentTarget.style.color = "#1A1A1A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#FFFFFF";
            }}
          >
            Back to Home
          </Link>
        </FadeInOnScroll>
      </div>
    </div>
  );
}
