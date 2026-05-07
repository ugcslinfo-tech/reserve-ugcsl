import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import './shared.css';
import './Research.css';

const areaIcons = ['🧠', '🕊️', '📈', '🌍'];

export default function Research() {
  const { t } = useTranslation();
  const areas = t('research.areas', { returnObjects: true }) as { name: string; desc: string }[];

  return (
    <main>
      <SEO 
        title="Research | UGCSL - Building a Culture of Inquiry"
        description="Explore UGCSL's research focus areas in Psychology, Human Rights, Business Development, and Social Development. Partner with us for collaborative research."
        canonical="https://ugcsl.lk/research"
      />
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <span className="section-label" style={{ color: 'var(--accent-light)' }}>{t('research.label')}</span>
          <h1 className="page-hero-title">{t('research.heroTitle1')}<br />{t('research.heroTitle2')}</h1>
          <p>{t('research.heroDesc')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">{t('research.focusLabel')}</span>
            <h2 className="section-title">{t('research.focusTitle')}</h2>
            <p className="section-subtitle">{t('research.focusSubtitle')}</p>
          </div>
          <div className="grid-2">
            {areas.map((c, i) => (
              <div key={i} className="research-card card">
                <div className="research-icon">{areaIcons[i]}</div>
                <h3>{c.name}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-soft">
        <div className="container">
          <div className="collab-banner">
            <div className="collab-content">
              <span className="section-label">{t('research.collaborateLabel')}</span>
              <h2 className="section-title">{t('research.collaborateTitle')}</h2>
              <p className="section-subtitle">{t('research.collaborateDesc')}</p>
              <Link to="/contact" className="btn btn-dark" style={{ marginTop: '28px' }}>{t('research.getInTouch')}</Link>
            </div>
            <div className="collab-visual">
              {['🏛️', '🌐', '🤝', '💡', '📚', '🔍'].map((e, i) => (
                <div key={i} className="collab-bubble">{e}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
