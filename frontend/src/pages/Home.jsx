import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Take Control of Your<br />Career Risk Today</h1>
          <p className="hero-subtitle">
            Join thousands who've transformed their job security with CareerRisk.ai. Access
            powerful AI tools designed to identify and mitigate career risks at no cost.
          </p>
          <button className="hero-cta" onClick={() => navigate("/register")}>
            SIGN UP FOR FREE
          </button>
        </div>
      </section>

      {/* Features strip */}
      <section className="features-strip">
        <div className="strip-inner">
          {[
            { icon: "🔍", title: "AI Risk Scanner", desc: "Identify career risks before they happen" },
            { icon: "📊", title: "Market Insights", desc: "Real-time industry trend analysis" },
            { icon: "🛡️", title: "Skill Protection", desc: "Future-proof your skill set with AI guidance" },
            { icon: "🚀", title: "Career Path AI", desc: "Personalized roadmaps to your dream role" },
          ].map((f) => (
            <div key={f.title} className="strip-card">
              <span className="strip-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
