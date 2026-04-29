import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo/ugcsl.jpeg';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={logo} alt="UGCSL Logo" className="footer-logo-img" />
              <div>
                <div className="footer-logo-name">UGCSL</div>
                <div className="footer-logo-sub">United Global Campus of Sri Lanka</div>
              </div>
            </div>
            <p className="footer-desc">{t('footer.desc')}</p>
            <div className="footer-socials">
              <a href="#" className="social-btn" aria-label="X">𝕏</a>
              <a href="#" className="social-btn" aria-label="LinkedIn">in</a>
              <a href="https://www.facebook.com/share/1A2nxpyHiU/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook">f</a>
              <a href="#" className="social-btn" aria-label="YouTube">▶</a>
            </div>
          </div>

          <div className="footer-links-group">
            <h4>{t('footer.academics')}</h4>
            <ul>
              <li><Link to="/programs">{t('footer.allPrograms')}</Link></li>
              <li><Link to="/programs">{t('footer.diplomaPrograms')}</Link></li>
              <li><Link to="/research">{t('footer.research')}</Link></li>
              <li><Link to="/admissions">{t('footer.admissions')}</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>{t('footer.onlineLearning')}</h4>
            <ul>
              <li><a href="#">{t('footer.studentPortal')}</a></li>
              <li><a href="#">{t('footer.learningResources')}</a></li>
              <li><a href="#">{t('footer.academicCalendar')}</a></li>
              <li><a href="#">{t('footer.studentSupport')}</a></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>{t('footer.contact')}</h4>
            <ul>
              <li><a href="#">📍 {t('contact.address')}</a></li>
              <li><a href="mailto:info@ugcsl.edu.lk">✉️ info@ugcsl.edu.lk</a></li>
              <li><Link to="/contact">💬 {t('footer.sendMessage')}</Link></li>
              <li><Link to="/admissions">🎓 {t('footer.applyNow')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} United Global Campus of Sri Lanka. {t('footer.rights')}</p>
          {/* accreditation badge – hidden for now
          <div className="footer-accred">🏛️ {t('accreditation')}</div>
          */}
          <div className="footer-bottom-links">
            <a href="#">{t('footer.privacy')}</a>
            <a href="#">{t('footer.terms')}</a>
            <a href="#">{t('footer.accessibility')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
