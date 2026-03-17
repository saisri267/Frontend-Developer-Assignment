"use client";
import { useState, useEffect, useRef } from "react";
import styles from "../styles/Navbar.module.css";

const NAV_LINKS = [
  {
    label: "Dashboard",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="8.5" y="1" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="1" y="8.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    label: "Shipments",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <path d="M2 4.5L7.5 1.5L13 4.5V10.5L7.5 13.5L2 10.5V4.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M7.5 1.5V13.5M2 4.5L13 10.5M13 4.5L2 10.5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
    active: true,
  },
  {
    label: "Tracking",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7.5 1.5V3M7.5 12V13.5M1.5 7.5H3M12 7.5H13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Reports",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <rect x="2" y="1.5" width="11" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5 5.5H10M5 8H10M5 10.5H8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Navbar({ theme, onToggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userMenuRef = useRef(null);

  /* Detect scroll for elevated header shadow */
  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 4); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close user menu on outside click */
  useEffect(() => {
    function onClick(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  /* Close mobile on Escape */
  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") setMobileOpen(false); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className={[styles.header, scrolled ? styles.headerScrolled : ""].join(" ")}>
        <div className={styles.inner}>
          {/* ── Brand ── */}
          <div className={styles.brand}>
            <div className={styles.brandLogo} aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 1L18.66 6V14L10 19L1.34 14V6L10 1Z" fill="url(#logoGrad)" />
                <path d="M10 5L15 7.8V13L10 15.8L5 13V7.8L10 5Z" fill="rgba(255,255,255,0.25)" />
                <defs>
                  <linearGradient id="logoGrad" x1="1.34" y1="1" x2="18.66" y2="19" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3b82f6" />
                    <stop offset="1" stopColor="#1d4ed8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className={styles.brandName}>LogiX</span>
            <span className={styles.brandDivider} aria-hidden="true">/</span>
            <span className={styles.brandCrumb}>New Shipment</span>
          </div>

          {/* ── Desktop Nav ── */}
          <nav className={styles.nav} aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={[styles.navLink, link.active ? styles.navLinkActive : ""].join(" ")}
                aria-current={link.active ? "page" : undefined}
                onClick={(e) => e.preventDefault()}
              >
                <span className={styles.navIcon}>{link.icon}</span>
                {link.label}
              </a>
            ))}
          </nav>

          {/* ── Right Controls ── */}
          <div className={styles.controls}>
            {/* Theme Toggle */}
            <button
              className={styles.themeToggle}
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <span className={[styles.themeTrack, theme === "dark" ? styles.themeTrackDark : ""].join(" ")}>
                <span className={styles.themeThumb}>
                  {theme === "dark" ? (
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M10.5 7.5A5 5 0 014.5 1.5a5 5 0 100 9 5 5 0 006-3z" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <circle cx="6" cy="6" r="2.5" fill="currentColor" />
                      <path d="M6 1v1M6 10v1M1 6h1M10 6h1M2.64 2.64l.71.71M8.65 8.65l.71.71M2.64 9.36l.71-.71M8.65 3.35l.71-.71" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  )}
                </span>
              </span>
            </button>

            {/* Notifications */}
            <button className={styles.iconBtn} aria-label="Notifications">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 1.5A5 5 0 003 6.5v3l-1.5 2h13L13 9.5v-3A5 5 0 008 1.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                <path d="M6.5 13.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <span className={styles.notifDot} aria-hidden="true" />
            </button>

            {/* User menu */}
            <div className={styles.userMenuWrap} ref={userMenuRef}>
              <button
                className={styles.avatarBtn}
                onClick={() => setUserMenuOpen((v) => !v)}
                aria-label="Open user menu"
                aria-expanded={userMenuOpen}
                aria-haspopup="menu"
              >
                <span className={styles.avatar}>SS</span>
                <svg
                  className={[styles.avatarChevron, userMenuOpen ? styles.avatarChevronOpen : ""].join(" ")}
                  width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
                >
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {userMenuOpen && (
                <div className={styles.userMenu} role="menu">
                  <div className={styles.userMenuHeader}>
                    <span className={styles.userMenuName}>Sai Sri</span>
                    <span className={styles.userMenuEmail}>saisri@logix.in</span>
                  </div>
                  <div className={styles.userMenuDivider} />
                  {[
                    { label: "Profile Settings", icon: "👤" },
                    { label: "Billing", icon: "💳" },
                    { label: "Team", icon: "👥" },
                  ].map((item) => (
                    <button key={item.label} className={styles.userMenuItem} role="menuitem">
                      <span>{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                  <div className={styles.userMenuDivider} />
                  <button className={[styles.userMenuItem, styles.userMenuItemDanger].join(" ")} role="menuitem">
                    <span>🚪</span> Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className={styles.hamburger}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span className={[styles.hamburgerBar, mobileOpen ? styles.hamburgerBar1Open : ""].join(" ")} />
              <span className={[styles.hamburgerBar, mobileOpen ? styles.hamburgerBarMidHide : ""].join(" ")} />
              <span className={[styles.hamburgerBar, mobileOpen ? styles.hamburgerBar3Open : ""].join(" ")} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className={styles.mobileOverlay} onClick={() => setMobileOpen(false)} aria-hidden="true" />
      )}
      <nav
        className={[styles.mobileDrawer, mobileOpen ? styles.mobileDrawerOpen : ""].join(" ")}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        <div className={styles.mobileDrawerHeader}>
          <span className={styles.mobileDrawerTitle}>Navigation</span>
          <button className={styles.mobileCloseBtn} onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={[styles.mobileNavLink, link.active ? styles.mobileNavLinkActive : ""].join(" ")}
            aria-current={link.active ? "page" : undefined}
            onClick={(e) => { e.preventDefault(); setMobileOpen(false); }}
          >
            <span className={styles.navIcon}>{link.icon}</span>
            {link.label}
          </a>
        ))}
        <div className={styles.mobileDivider} />
        <div className={styles.mobileThemeRow}>
          <span className={styles.mobileThemeLabel}>
            {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </span>
          <button
            className={styles.themeToggle}
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <span className={[styles.themeTrack, theme === "dark" ? styles.themeTrackDark : ""].join(" ")}>
              <span className={styles.themeThumb}>
                {theme === "dark" ? (
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M10.5 7.5A5 5 0 014.5 1.5a5 5 0 100 9 5 5 0 006-3z" fill="currentColor" />
                  </svg>
                ) : (
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <circle cx="6" cy="6" r="2.5" fill="currentColor" />
                    <path d="M6 1v1M6 10v1M1 6h1M10 6h1M2.64 2.64l.71.71M8.65 8.65l.71.71M2.64 9.36l.71-.71M8.65 3.35l.71-.71" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                )}
              </span>
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
