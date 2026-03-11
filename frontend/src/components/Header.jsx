import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

const DROPDOWNS = {
  Features: {
    cols: 2,
    items: [
      { icon: "🧭", label: "AI Risk Scanner",      desc: "Track and manage your career risks all in one place", active: true },
      { icon: "📋", label: "Job Autofill",          desc: "Autofill forms and apply faster to jobs that match your profile." },
      { icon: "📝", label: "AI Cover Letter",       desc: "Create personalized cover letters that match job descriptions.", badge: "Trending", badgeColor: "green" },
      { icon: "📄", label: "Resume Optimizer",      desc: "Improve your resume to match job roles and pass ATS scans easily." },
      { icon: "💼", label: "LinkedIn Optimizer",    desc: "Enhance your LinkedIn profile to attract recruiters.", badge: "New!", badgeColor: "orange" },
      { icon: "🎥", label: "AI Mock Interview",     desc: "Simulate real interviews and get instant feedback to improve.", badge: "New!", badgeColor: "orange" },
      { icon: "🤝", label: "Networking Tracker",   desc: "Effortlessly track and manage your professional connections." },
      { isAllLink: true, label: "All Features →" },
    ],
  },
  Services: {
    cols: 1,
    items: [
      { icon: "💎", label: "Premium Toolkit",    desc: "Self-service product with AI features to supercharge your job search." },
      { icon: "📄", label: "Resume Review",       desc: "Get an expertly crafted review on your resume with personalized feedback, examples, and tips!", badge: "Trending", badgeColor: "green" },
      { icon: "💼", label: "LinkedIn Makeover",   desc: "Get a completely re-written LinkedIn Profile with a personalized expert analysis!" },
      { icon: "🎁", label: "Bundled Service",     desc: "Resume Review + LinkedIn Makeover for an additional discount!", badge: "60% Off", badgeColor: "pink" },
    ],
  },
  "For Orgs": {
    cols: 2,
    items: [
      { icon: "👁️", label: "Overview →",                  desc: "Discover how CareerRisk.ai supports organizations" },
      { icon: "🎓", label: "Bootcamps",                    desc: "Streamline job readiness with AI-powered training" },
      { icon: "🎓", label: "University Career Centres",    desc: "Equip students with AI-driven career tools" },
      { icon: "💪", label: "Workforce Development",        desc: "Upskill teams & bridge workforce gaps" },
      { icon: "🧑‍💼", label: "Career Coaches",             desc: "Enhance coaching with expert-backed AI solutions" },
      { icon: "🧭", label: "Outplacement",                 desc: "Offer seamless career transition support" },
      { icon: "🔌", label: "Integrations",                 desc: "Power up workflows with plug and play connections" },
      { icon: "👥", label: "Bench Sales Recruiters",       desc: "Place consultants faster with AI-driven tools" },
    ],
  },
  Resources: {
    cols: 2,
    items: [
      { icon: "📰", label: "Blog",               desc: "Career tips, industry insights and AI trends" },
      { icon: "📑", label: "Career Templates",   desc: "Free templates for resumes, cover letters & more" },
      { icon: "🌐", label: "Community",          desc: "Connect with thousands of career-focused professionals" },
      { icon: "💼", label: "Job Openings",       desc: "Browse curated opportunities matched by AI" },
      { icon: "📊", label: "Industry Reports",   desc: "Deep-dive into career risk trends by sector" },
      { icon: "🎁", label: "Gift Cards",         desc: "Give the gift of career growth to someone you know" },
    ],
  },
};

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleMouseEnter = (key) => {
    clearTimeout(timerRef.current);
    setOpenDropdown(key);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  return (
    <header className="site-header" ref={headerRef}>
      <div className="header-inner">
        {/* Logo */}
        <a href="/" className="header-logo">
          <span className="logo-icon">C</span>
          <span className="logo-text">CareerRisk.ai</span>
        </a>

        {/* Nav */}
        <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
          <div className="nav-item">
            <a href="#" className="nav-link">AI Risk Scanner</a>
          </div>

          {Object.keys(DROPDOWNS).map((key) => (
            <div
              key={key}
              className="nav-item has-dropdown"
              onMouseEnter={() => handleMouseEnter(key)}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href="#"
                className={`nav-link ${openDropdown === key ? "active" : ""}`}
                onClick={(e) => e.preventDefault()}
              >
                {key}
                <span className={`chevron ${openDropdown === key ? "up" : ""}`}>▾</span>
              </a>

              {openDropdown === key && (
                <div
                  className={`dropdown-panel cols-${DROPDOWNS[key].cols}`}
                  onMouseEnter={() => handleMouseEnter(key)}
                  onMouseLeave={handleMouseLeave}
                >
                  {DROPDOWNS[key].items.map((item) =>
                    item.isAllLink ? (
                      <a key="all" href="#" className="di-all-link" onClick={(e) => e.preventDefault()}>
                        All Features &rarr;
                      </a>
                    ) : (
                      <a
                        key={item.label}
                        href="#"
                        className={`di-row ${item.active ? "di-active" : ""}`}
                        onClick={(e) => e.preventDefault()}
                      >
                        <span className="di-icon">{item.icon}</span>
                        <span className="di-body">
                          <span className="di-title">
                            {item.label}
                            {item.badge && (
                              <span className={`di-badge badge-${item.badgeColor}`}>{item.badge}</span>
                            )}
                          </span>
                          <span className="di-desc">{item.desc}</span>
                        </span>
                      </a>
                    )
                  )}
                </div>
              )}
            </div>
          ))}

          <div className="nav-item">
            <a href="#" className="nav-link">
              Human Data <span className="external-icon">↗</span>
            </a>
          </div>
        </nav>

        {/* Auth */}
        <div className="header-actions">
          <button className="btn-login" onClick={() => navigate("/login")}>LOG IN</button>
          <button className="btn-signup" onClick={() => navigate("/register")}>SIGN UP</button>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
