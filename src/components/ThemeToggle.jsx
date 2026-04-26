import { useEffect } from "react";

export default function ThemeToggle({ theme, onThemeChange }) {
  useEffect(() => {
    // Store theme preference in localStorage
    localStorage.setItem("latigo-theme", theme);
  }, [theme]);

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      }}
    >
      <style>{`
        .theme-toggle {
          display: flex;
          background: #FFFFFF;
          border-radius: 20px;
          padding: 3px;
          width: 160px;
          height: 36px;
          cursor: pointer;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .theme-toggle-btn {
          flex: 1;
          border: none;
          background: none;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border-radius: 16px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1A1A1A;
        }

        .theme-toggle-btn.active {
          color: #FFFFFF;
          font-weight: 700;
        }

        .theme-toggle-btn.active.teal {
          background: #2A5C5A;
        }

        .theme-toggle-btn.active.copper {
          background: #D4874D;
        }

        @media (max-width: 768px) {
          .theme-toggle {
            width: 120px;
            height: 32px;
            bottom: 20px;
            right: 20px;
            top: auto;
          }

          .theme-toggle-btn {
            font-size: 0.7rem;
          }
        }
      `}</style>

      <div className="theme-toggle">
        <button
          className={`theme-toggle-btn ${theme === "teal" ? "active teal" : ""}`}
          onClick={() => onThemeChange("teal")}
          aria-label="Switch to Teal theme"
        >
          Teal
        </button>
        <button
          className={`theme-toggle-btn ${theme === "copper" ? "active copper" : ""}`}
          onClick={() => onThemeChange("copper")}
          aria-label="Switch to Copper theme"
        >
          Copper
        </button>
      </div>
    </div>
  );
}