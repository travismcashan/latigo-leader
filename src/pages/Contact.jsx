import { useState, useEffect } from "react";
import FadeInOnScroll from "@/components/FadeInOnScroll";

export default function Contact() {
  const [theme, setTheme] = useState(() => localStorage.getItem("latigo-theme") || "teal");
  useEffect(() => {
    const sync = () => setTheme(localStorage.getItem("latigo-theme") || "teal");
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  const accent = theme === "teal" ? "#bf9f4b" : "#2A5C5A";
  const primary = theme === "teal" ? "#2A5C5A" : "#bf9f4b";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Contact Latigo | Schedule a Discovery Call";

    const metaTags = [
      { name: "description", content: "Ready to clarify your purpose or align your organization? Book a free discovery call with Latigo." },
      { property: "og:title", content: "Contact Latigo | Schedule a Discovery Call" },
      { property: "og:description", content: "Ready to clarify your purpose or align your organization? Book a free discovery call with Latigo." },
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("https://formsubmit.co/ajax/dustin@latigoleader.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "Not provided",
          interest: formData.interest || "Not specified",
          message: formData.message,
          _subject: `Latigo Website Inquiry: ${formData.interest || "General"}`,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", interest: "", message: "" });
      } else {
        setError("Something went wrong. Please try again or email us directly.");
      }
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.85rem",
    fontWeight: 500,
    color: "#1A1A1A",
    marginBottom: "0.5rem",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "1rem",
    fontFamily: "'Inter', sans-serif",
    boxSizing: "border-box",
  };

  const fieldWrapStyle = {
    marginBottom: "1.25rem",
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1A1A1A", background: "#FAF8F5", minHeight: "100vh" }}>
      <FadeInOnScroll>
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "max(100px, 12vw) 4vw 8vw 4vw" }}>
          <div
            className="contact-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 3fr",
              gap: "6vw",
              alignItems: "start",
            }}
          >
            {/* Left Column */}
            <div>
              <h1
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: "#1A1A1A",
                  margin: "0 0 1.5rem 0",
                }}
              >
                Let's Start the Conversation.
              </h1>
              <p
                style={{
                  fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
                  lineHeight: 1.75,
                  color: "#1A1A1A",
                  margin: "0 0 2.5rem 0",
                }}
              >
                Book a discovery call and take the first step toward clarity. Whether you're exploring LifePlan for yourself or StratOp for your organization, we'd love to hear from you.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <a
                  href="mailto:dustin@latigoleader.com"
                  style={{
                    fontSize: "1rem",
                    color: "#1A1A1A",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}
                >
                  dustin@latigoleader.com
                </a>
                <a
                  href="mailto:jared@latigoleader.com"
                  style={{
                    fontSize: "1rem",
                    color: "#1A1A1A",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}
                >
                  jared@latigoleader.com
                </a>
              </div>
            </div>

            {/* Right Column */}
            <div>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "3rem 0" }}>
                  <h2
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: primary,
                      margin: "0 0 0.75rem 0",
                    }}
                  >
                    Thank You!
                  </h2>
                  <p style={{ fontSize: "1rem", color: "#555", lineHeight: 1.6 }}>
                    We'll be in touch soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={fieldWrapStyle}>
                    <label style={labelStyle}>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      style={inputStyle}
                    />
                  </div>
                  <div style={fieldWrapStyle}>
                    <label style={labelStyle}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      style={inputStyle}
                    />
                  </div>
                  <div style={fieldWrapStyle}>
                    <label style={labelStyle}>Phone (optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                      style={inputStyle}
                    />
                  </div>
                  <div style={fieldWrapStyle}>
                    <label style={labelStyle}>What are you interested in?</label>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      style={{
                        ...inputStyle,
                        appearance: "auto",
                      }}
                    >
                      <option value="">Select an option</option>
                      <option value="LifePlan">LifePlan</option>
                      <option value="StratOp">StratOp</option>
                      <option value="Coaching">Coaching</option>
                      <option value="Speaking">Speaking</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div style={fieldWrapStyle}>
                    <label style={labelStyle}>Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us a bit about what you're looking for..."
                      style={{
                        ...inputStyle,
                        minHeight: "120px",
                        resize: "vertical",
                      }}
                    />
                  </div>
                  {error && (
                    <p style={{ color: "#c0392b", fontSize: "0.9rem", marginBottom: "1rem" }}>{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: "100%",
                      background: submitting ? (theme === "teal" ? "#d4c08a" : "#4a8a87") : accent,
                      color: "#FAF8F5",
                      border: "none",
                      borderRadius: 6,
                      padding: "14px 24px",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      cursor: submitting ? "wait" : "pointer",
                      transition: "opacity 0.2s",
                      fontFamily: "'Inter', sans-serif",
                    }}
                    onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.opacity = "0.85"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                  >
                    {submitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </div>
  );
}