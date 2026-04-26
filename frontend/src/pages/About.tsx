import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import banner from '../assets/campus/banner.jpeg';
import './shared.css';
import './About.css';

const roadmapYears = ['2025', '2026', '2027', '2028'];
const CARDS_PER_VIEW = 3;
const CARD_GAP = 24;

export default function About() {
  const { t } = useTranslation();
  const objectives = t('about.objectives', { returnObjects: true }) as string[];
  const roadmap = t('about.roadmap', { returnObjects: true }) as string[];
  const board = t('about.board', { returnObjects: true }) as { name: string; role: string; bio: string; photo: string | null }[];
  const [carouselIndex, setCarouselIndex] = useState(0);
  const trackWrapRef = useRef<HTMLDivElement>(null);
  const maxIndex = Math.max(0, board.length - CARDS_PER_VIEW);
  const prev = () => setCarouselIndex((i) => Math.max(0, i - 1));
  const next = () => setCarouselIndex((i) => Math.min(maxIndex, i + 1));

  const getOffset = () => {
    const wrap = trackWrapRef.current;
    if (!wrap) return 0;
    const cardW = (wrap.offsetWidth - CARD_GAP * (CARDS_PER_VIEW - 1)) / CARDS_PER_VIEW;
    return carouselIndex * (cardW + CARD_GAP);
  };

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
          <div className="board-carousel-wrap">
            <div className="board-carousel-track-wrap" ref={trackWrapRef}>
              <div
                className="board-carousel-track"
                style={{ transform: `translateX(-${getOffset()}px)` }}
              >
                {board.map((member, i) => (
                  <div key={i} className="board-card">
                    <div className="board-photo-wrap">
                      {member.photo
                        ? <img src={member.photo} alt={member.name} className="board-photo" />
                        : <div className="board-photo-placeholder">👤</div>
                      }
                    </div>
                    <div className="board-info">
                      <h4>{member.name}</h4>
                      <p className="board-role">{member.role}</p>
                      <p className="board-bio">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="carousel-nav">
              <button className="carousel-btn" onClick={prev} disabled={carouselIndex === 0} aria-label="Previous">‹</button>
              <div className="carousel-dots">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                  <button key={i} className={`carousel-dot ${i === carouselIndex ? 'active' : ''}`} onClick={() => setCarouselIndex(i)} aria-label={`Slide ${i + 1}`} />
                ))}
              </div>
              <button className="carousel-btn" onClick={next} disabled={carouselIndex === maxIndex} aria-label="Next">›</button>
            </div>
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
          <div className="leadership-placeholder">
            <span>🎓</span>
            <p>{t('about.academicPlaceholder')}</p>
            <Link to="/contact" className="btn btn-dark" style={{ marginTop: '24px' }}>{t('about.getInTouch')}</Link>
          </div>
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
