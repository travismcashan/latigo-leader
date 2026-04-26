import { useState } from "react";

export default function PageComingSoon({ isOpen, onClose }) {
  return isOpen ? (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#FFFFFF",
          padding: "3rem",
          borderRadius: "8px",
          textAlign: "center",
          maxWidth: 400,
          position: "relative",
          zIndex: 10000,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1.8rem",
            fontWeight: 700,
            color: "#1A1A1A",
            margin: "0 0 1rem 0",
          }}
        >
          Page Coming Soon
        </h2>
        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.6,
            color: "#555",
            margin: "0 0 2rem 0",
          }}
        >
          We're working on this page. Check back soon!
        </p>
        <button
          onClick={onClose}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: "0.85rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "12px 32px",
            background: "#2A5C5A",
            color: "#FAF8F5",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          Got it
        </button>
      </div>
    </div>
  ) : null;
}