import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import banner from '../assets/campus/banner.jpeg';
import './shared.css';
import './About.css';

const roadmapYears = ['2025', '2026', '2027', '2028'];

export default function About() {
  const { t } = useTranslation();
  const objectives = t('about.objectives', { returnObjects: true }) as string[];
  const roadmap = t('about.roadmap', { returnObjects: true }) as string[];
  const board = t('about.board', { returnObjects: true }) as { name: string; role: string; bio: string; icon: string }[];
  const academic = t('about.academic', { returnObjects: true }) as { name: string; role: string; bio: string; icon: string }[];

  return (
    <main className="about-page">
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <span className="section-label" style={{ color: 'var(--accent-light)' }}>{t('about.label')}</span>
          <h1 className="page-hero-title">{t('about.heroTitle1')}<br />{t('about.heroTitle2')}</h1>
          <p>{t('about.heroDesc')}</p>
        </div>
      </section>

      <section className="campus-banner">
        <img src={banner} alt="United Global Campus of Sri Lanka" />
      </section>

      <section className="section">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card vision">
              <div className="mv-icon">🔭</div>
              <h3>{t('about.visionTitle')}</h3>
              <p>{t('about.visionDesc')}</p>
            </div>
            <div className="mv-card mission">
              <div className="mv-icon">🎯</div>
              <h3>{t('about.missionTitle')}</h3>
              <p>{t('about.missionDesc')}</p>
            </div>
            <div className="mv-card values">
              <div className="mv-icon">💎</div>
              <h3>{t('about.objectivesTitle')}</h3>
              <ul style={{ textAlign: 'left', paddingLeft: '1.2rem', margin: 0 }}>
                {objectives.map((obj, i) => <li key={i}>{obj}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Board */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">{t('about.boardLabel')}</span>
            <h2 className="section-title">{t('about.boardTitle')}</h2>
            <p className="section-subtitle">{t('about.boardSubtitle')}</p>
          </div>
          <div className="staff-grid">
            {board.map((member, i) => (
              <div key={i} className="staff-card card">
                <div className="staff-avatar">{member.icon}</div>
                <h4>{member.name}</h4>
                <p className="staff-role">{member.role}</p>
                <p className="staff-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Staff */}
      <section className="section bg-soft">
        <div className="container">
          <div className="section-header">
            <span className="section-label">{t('about.academicLabel')}</span>
            <h2 className="section-title">{t('about.academicTitle')}</h2>
            <p className="section-subtitle">{t('about.academicSubtitle')}</p>
          </div>
          {Array.isArray(academic) && academic.length > 0 ? (
            <div className="staff-grid">
              {academic.map((member, i) => (
                <div key={i} className="staff-card card">
                  <div className="staff-avatar">{member.icon}</div>
                  <h4>{member.name}</h4>
                  <p className="staff-role">{member.role}</p>
                  <p className="staff-bio">{member.bio}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="leadership-placeholder">
              <span>🎓</span>
              <p>{t('about.academicPlaceholder')}</p>
              <Link to="/contact" className="btn btn-dark" style={{ marginTop: '24px' }}>{t('about.getInTouch')}</Link>
            </div>
          )}
        </div>
      </section>

      {/* Roadmap */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">{t('about.roadmapLabel')}</span>
            <h2 className="section-title">{t('about.roadmapTitle')}</h2>
          </div>
          <div className="timeline">
            {roadmap.map((event, i) => (
              <div key={roadmapYears[i]} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content">
                  <span className="timeline-year">{roadmapYears[i]}</span>
                  <p>{event}</p>
                </div>
                <div className="timeline-dot" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
