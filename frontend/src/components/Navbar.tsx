import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo/ugcsl.jpeg';
import './Navbar.css';

const navLinks = [
  { key: 'nav.about', href: '/about' },
  { key: 'nav.programs', href: '/programs' },
  { key: 'nav.admissions', href: '/admissions' },
  { key: 'nav.research', href: '/research' },
  { key: 'nav.news', href: '/news' },
  { key: 'nav.contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  // const { t, i18n } = useTranslation();
  // const isSinhala = i18n.language === 'si';
  // const toggleLang = () => i18n.changeLanguage(isSinhala ? 'en' : 'si');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="UGCSL Logo" className="logo-img" />
          <div className="logo-text">
            <span className="logo-name">UGCSL</span>
            <span className="logo-tagline">United Global Campus of Sri Lanka</span>
          </div>
        </Link>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={location.pathname === link.href ? 'active' : ''}
              >
                {t(link.key)}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/admissions" className="btn btn-primary navbar-cta">{t('nav.applyNow')}</Link>
          </li>
        </ul>

        <div className="navbar-right">
          {/* Language toggle — hidden until Sinhala locale is re-enabled
          <button className="lang-toggle" onClick={toggleLang} aria-label="Toggle language">
            <span className="lang-globe">🌐</span>
            <span className="lang-label">{isSinhala ? 'සිං' : 'EN'}</span>
          </button>
          */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
}
