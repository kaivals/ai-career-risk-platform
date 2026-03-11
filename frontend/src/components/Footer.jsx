import React from "react";
import "../styles/Footer.css";

const footerColumns = [
  {
    title: "Products",
    links: [
      { label: "AI Risk Scanner", href: "#" },
      { label: "Resume Analyzer", href: "#" },
      { label: "Career Path Advisor", href: "#" },
      { label: "Skill Gap Tracker", href: "#" },
      { label: "Job Market Trends", href: "#" },
    ],
  },
  {
    title: "Important",
    links: [
      { label: "Free Risk Assessment", href: "#" },
      { label: "Industry Reports", href: "#" },
      { label: "Premium Toolkit", href: "#" },
      { label: "Interview Guides", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#" },
      { label: "Career Templates", href: "#" },
      { label: "Community", href: "#" },
      { label: "Job Openings", href: "#" },
      { label: "Gift Cards", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Your Privacy Rights", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* Brand Column */}
        <div className="footer-brand">
          <a href="/" className="footer-logo">
            <span className="logo-icon">C</span>
            <span className="logo-text">CareerRisk.ai</span>
          </a>
          <p className="footer-tagline">
            Your Career Copilot. AI-powered tools to identify career risks and
            opportunities at top tech companies 10X faster.
          </p>
        </div>

        {/* Link Columns */}
        {footerColumns.map((col) => (
          <div key={col.title} className="footer-col">
            <h4 className="footer-col-title">{col.title}</h4>
            <ul className="footer-links">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CareerRisk.ai · All rights reserved.</p>
      </div>
    </footer>
  );
}
