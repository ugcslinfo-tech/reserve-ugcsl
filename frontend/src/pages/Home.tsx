import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFetch } from '../hooks/useApi';
import type { Program, NewsItem, PaginatedResponse } from '../types';
import LazyImage from '../components/LazyImage';
import banner from '../assets/campus/banner.jpeg';
import './Home.css';

const whyKeys = ['online', 'aligned', 'faculty', 'career', 'inclusive'] as const;
const whyIcons: Record<string, string> = {
  online: '💻', aligned: '🌍', faculty: '🎓', career: '🎯', inclusive: '🤝',
};

const CLD = 'https://res.cloudinary.com/dxkfytlpu/image/upload/f_auto,q_auto,w_900';

const facultyImages: Record<string, string> = {
  'Faculty of Agriculture': `${CLD}/Agriculture_wedsor`,
  'Faculty of Cosmetology and Aesthetic Science': `${CLD}/Beauticulture_ntrvzb`,
  'Faculty of Law and Human Rights': `${CLD}/LawHumanRights_prh0ew`,
  'Faculty of Sri Lankan Indigenous Medicine': `${CLD}/SLMedicine_cukymm`,
  'Faculty of Psychology and Counseling': `${CLD}/psyNCounselling_gl2ojc`,
  'Faculty of Dance and Performing Arts': `${CLD}/Dance_ke9ocz`,
  'Faculty of Political Science and Public Policy': `${CLD}/PoliticalScience_fry4ut`,
};

const programImages: Record<string, string> = {
  'human-rights': `${CLD}/HumanRights_pfoha8`,
  'natural-beauticulture': `${CLD}/NaturalCosmetics_dssaen`,
};

export default function Home() {
  const { t, i18n } = useTranslation();
  const isSi = i18n.language === 'si';
  const faculties = t('home.faculties', { returnObjects: true }) as { name: string; desc: string; icon: string; count: number }[];
  const { data: programsRes, loading: pLoading } = useFetch<PaginatedResponse<Program>>('/programs');
  const { data: newsRes, loading: nLoading } = useFetch<PaginatedResponse<NewsItem>>('/news');

  const featured = programsRes?.data.filter((p) => p.featured).slice(0, 6) ?? [];
  const news = newsRes?.data ?? [];

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-overlay" />
          <div className="hero-shapes">
            <div className="shape shape-1" />
            <div className="shape shape-2" />
            <div className="shape shape-3" />
          </div>
        </div>
        <div className="container hero-content">
          <div className="hero-badge">🎓 {t('home.badge')}</div>
          <h1 className="hero-title">
            {t('home.heroTitle1')}<br />
            <span className="hero-highlight">{t('home.heroTitle2')}</span><br />
            {t('home.heroTitle3')}
          </h1>
          <p className="hero-subtitle">{t('home.heroSubtitle')}</p>
          <div className="hero-actions">
            <Link to="/admissions" className="btn btn-primary">{t('home.explorePrograms')}</Link>
            <Link to="/about" className="btn btn-outline">{t('home.discoverUGCSL')}</Link>
          </div>
          {/* accreditation badge – hidden for now
          <div className="hero-accreditation">
            <span className="accred-badge">🏛️ {t('accreditation')}</span>
          </div>
          */}
          <div className="hero-stats">
            {[
              { value: '2', key: 'home.stats.programs' },
              { value: '2026', key: 'home.stats.established' },
              { value: '100%', key: 'home.stats.faculty' },
              { value: '100%', key: 'home.stats.online' },
            ].map((s) => (
              <div key={s.key} className="hero-stat">
                <span className="hero-stat-value">{s.value}</span>
                <span className="hero-stat-label">{t(s.key)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-indicator" />
        </div>
      </section>

      {/* Banner */}
      <section className="home-banner">
        <LazyImage src={banner} alt="United Global Campus of Sri Lanka" style={{ width: '100%', height: '480px', objectFit: 'cover', objectPosition: 'center top' }} />
      </section>

      {/* Areas of Study */}
      <section className="section bg-soft">
        <div className="container">
          <div className="section-header">
            <span className="section-label">{t('home.areasLabel')}</span>
            <h2 className="section-title">{t('home.areasOfStudy')}</h2>
            <p className="section-subtitle">{t('home.areasSubtitle')}</p>
          </div>
          <div className="grid-2 faculties-grid">
            {faculties.map((f) => (
              <Link to={`/programs?faculty=${encodeURIComponent(f.name)}`} key={f.name} className="faculty-card card">
                <div className="faculty-img-wrap">
                  <LazyImage src={facultyImages[f.name]} alt={f.name} className="faculty-img" />
                  <div className="faculty-overlay" />
                  <span className={`faculty-count-badge ${f.count === 0 ? 'coming-soon' : ''}`}>
                    {f.count > 0 
                      ? `${f.count} ${f.count === 1 ? t('home.programs_count_one') : t('home.programs_count_other')}`
                      : t('home.comingSoon')
                    }
                  </span>
                </div>
                <div className="faculty-body">
                  <h3>{f.name}</h3>
                  <p className="faculty-desc">{f.desc}</p>
                  <span className="faculty-link">{t('home.explorePrograms')} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-label">{t('home.academics')}</span>
              <h2 className="section-title">{t('home.featuredPrograms')}</h2>
            </div>
            <Link to="/programs" className="btn btn-dark">{t('home.viewAllPrograms')}</Link>
          </div>
          {pLoading ? (
            <div className="spinner" />
          ) : (
            <div className="grid-3">
              {featured.map((p) => (
                <Link key={p._id} to={`/programs/${p.slug}`} className="program-card card">
                  <div className="program-img-wrap">
                    {programImages[p.slug]
                      ? <LazyImage src={programImages[p.slug]} alt={p.title} className="program-img" />
                      : <div className="program-img-fallback">{p.icon}</div>
                    }
                    <div className="program-img-overlay" />
                    <span className="program-degree-badge">{isSi ? (p.degree_si || p.degree) : p.degree}</span>
                  </div>
                  <div className="program-body">
                    <p className="program-faculty">{isSi ? (p.faculty_si || p.faculty) : p.faculty}</p>
                    <h3 className="program-title">{isSi ? (p.title_si || p.title) : p.title}</h3>
                    <p className="program-desc">{isSi ? (p.description_si || p.description) : p.description}</p>
                    <div className="program-footer">
                      <span className="program-duration">⏱ {isSi ? (p.duration_si || p.duration) : p.duration}</span>
                      <span className="program-link">{t('home.explorePrograms')} →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why UGCSL */}
      <section className="section why-section">
        <div className="container">
          <div className="why-inner">
            <div className="why-left">
              <span className="section-label">{t('home.whyLabel')}</span>
              <h2 className="section-title">{t('home.whyTitle')}</h2>
              <p className="section-subtitle">{t('home.whySubtitle')}</p>
              <Link to="/about" className="btn btn-dark" style={{ marginTop: '32px' }}>{t('home.learnMore')}</Link>
            </div>
            <div className="why-right">
              {whyKeys.map((key) => (
                <div key={key} className="why-card">
                  <div className="why-icon">{whyIcons[key]}</div>
                  <div>
                    <h4>{t(`home.why.${key}.title`)}</h4>
                    <p>{t(`home.why.${key}.desc`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="section bg-soft">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-label">{t('home.latestLabel')}</span>
              <h2 className="section-title">{t('home.newsTitle')}</h2>
            </div>
            <Link to="/news" className="btn btn-dark">{t('home.allNews')}</Link>
          </div>
          {nLoading ? (
            <div className="spinner" />
          ) : (
            <div className="grid-3">
              {news?.map((item) => (
                <article key={item._id} className="news-card card">
                  {item.image ? (
                    <div className="news-img-wrap">
                      <LazyImage src={item.image} alt={item.title} className="news-img" />
                    </div>
                  ) : (
                    <div className="news-img-placeholder">
                      <span>{item.category[0]}</span>
                    </div>
                  )}
                  <div className="news-body">
                    <span className="tag">{item.category}</span>
                    <h3 className="news-title">{item.title}</h3>
                    <p className="news-excerpt">{item.excerpt}</p>
                    <div className="news-footer">
                      <span className="news-date">
                        {new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="news-read">{t('home.readMore')}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container cta-inner">
          <div>
            <h2>{t('home.ctaTitle')}</h2>
            <p>{t('home.ctaDesc')}</p>
          </div>
          <div className="cta-actions">
            <Link to="/admissions" className="btn btn-primary">{t('home.applyNow')}</Link>
            <Link to="/contact" className="btn btn-outline">{t('home.requestInfo')}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
