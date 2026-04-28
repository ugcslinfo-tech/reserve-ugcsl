import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFetch } from '../hooks/useApi';
import type { Program } from '../types';
import './shared.css';
import './ProgramDetail.css';

const programImages: Record<string, string> = {
  'human-rights': '/images/programs/HumanRights.jpg',
  'natural-beauticulture': '/images/programs/NaturalCosmetics.jpg',
};

const facultyImages: Record<string, string> = {
  'Faculty of Agriculture': '/images/faculties/Agriculture.jpg',
  'Faculty of Cosmetology and Aesthetic Science': '/images/faculties/Beauticulture.jpg',
  'Faculty of Law and Human Rights': '/images/faculties/law&HumanRights.jpg',
  'Faculty of Sri Lankan Indigenous Medicine': '/images/faculties/SLMedicine.jpg',
  'Faculty of Psychology and Counseling': '/images/faculties/psyNCounselling.jpg',
  'Faculty of Dance and Performing Arts': '/images/faculties/Dance.jpg',
  'Faculty of Political Science and Public Policy': '/images/faculties/PoliticalScience.jpg',
};

function getProgramImage(p: Program): string | null {
  return programImages[p.slug] ?? facultyImages[p.faculty] ?? null;
}

export default function ProgramDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const isSi = i18n.language === 'si';
  const { data: p, loading, error } = useFetch<Program>(slug ? `/programs/${slug}` : '');

  if (loading) return <main><div className="spinner" style={{ marginTop: '160px' }} /></main>;
  if (error || !p) return (
    <main style={{ paddingTop: '160px', textAlign: 'center' }}>
      <p>{t('programDetail.notFound')}</p>
      <Link to="/programs" className="btn btn-dark" style={{ marginTop: '24px' }}>{t('programDetail.backToPrograms')}</Link>
    </main>
  );

  const title = isSi ? (p.title_si || p.title) : p.title;
  const description = isSi ? (p.description_si || p.description) : p.description;
  const overview = isSi ? (p.overview_si || p.overview) : p.overview;
  const faculty = isSi ? (p.faculty_si || p.faculty) : p.faculty;
  const degree = isSi ? (p.degree_si || p.degree) : p.degree;
  const duration = isSi ? (p.duration_si || p.duration) : p.duration;
  const modules = isSi ? (p.modules_si?.length ? p.modules_si : p.modules) : p.modules;
  const outcomes = isSi ? (p.outcomes_si?.length ? p.outcomes_si : p.outcomes) : p.outcomes;
  const careers = isSi ? (p.careers_si?.length ? p.careers_si : p.careers) : p.careers;
  const requirements = isSi ? (p.requirements_si?.length ? p.requirements_si : p.requirements) : p.requirements;
  const fees = isSi ? (p.fees_si || p.fees) : p.fees;
  const intake = isSi ? (p.intake_si || p.intake) : p.intake;

  return (
    <main>
      <section className="page-hero pd-hero">
        <div className="page-hero-bg" />
        {getProgramImage(p) && <img src={getProgramImage(p)!} alt={title} className="pd-hero-img" />}
        <div className="container page-hero-content">
          <div className="pd-breadcrumb">
            <Link to="/programs">{t('programDetail.breadcrumbParent')}</Link>
            <span>›</span>
            <span>{title}</span>
          </div>
          <h1 className="page-hero-title">{title}</h1>
          <p>{description}</p>
          <div className="pd-hero-meta">
            <span className="pd-meta-pill">🎓 {degree}</span>
            <span className="pd-meta-pill">⏱ {duration}</span>
            <span className="pd-meta-pill">🏛 {faculty}</span>
            {p.intake && <span className="pd-meta-pill pd-meta-open">📅 {intake}</span>}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container pd-overview-grid">
          <div className="pd-overview">
            <h2 className="pd-section-title">{t('programDetail.overviewTitle')}</h2>
            <p className="pd-overview-text">{overview}</p>

            {modules && modules.length > 0 && (
              <div className="pd-block">
                <h3 className="pd-block-title">📚 {t('programDetail.modulesTitle')}</h3>
                <ul className="pd-list pd-list-modules">
                  {modules.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
            )}

            {outcomes && outcomes.length > 0 && (
              <div className="pd-block">
                <h3 className="pd-block-title">🎯 {t('programDetail.outcomesTitle')}</h3>
                <ul className="pd-list pd-list-check">
                  {outcomes.map((o, i) => (
                    <li key={i}><span className="check">✓</span>{o}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="pd-sidebar">
            <div className="pd-sidebar-card">
              <h3>{t('programDetail.sidebarTitle')}</h3>
              <ul className="pd-details-list">
                <li><span>{t('programDetail.qualification')}</span><strong>{degree}</strong></li>
                <li><span>{t('programDetail.duration')}</span><strong>{duration}</strong></li>
                <li><span>{t('programDetail.faculty')}</span><strong>{faculty}</strong></li>
                <li><span>{t('programDetail.mode')}</span><strong>{t('programDetail.modeValue')}</strong></li>
                {p.intake && <li><span>{t('programDetail.intake')}</span><strong>{intake}</strong></li>}
                {p.fees && <li><span>{t('programDetail.fees')}</span><strong>{fees}</strong></li>}
              </ul>
              <Link to="/admissions" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '24px' }}>
                {t('programDetail.applyNow')}
              </Link>
              <Link to="/contact" className="btn btn-dark" style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}>
                {t('programDetail.enquire')}
              </Link>
            </div>

            {requirements && requirements.length > 0 && (
              <div className="pd-sidebar-card">
                <h3>{t('programDetail.requirementsTitle')}</h3>
                <ul className="pd-list pd-list-check" style={{ marginTop: '12px' }}>
                  {requirements.map((r, i) => (
                    <li key={i}><span className="check">✓</span>{r}</li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      {careers && careers.length > 0 && (
        <section className="section bg-soft">
          <div className="container">
            <div className="section-header">
              <span className="section-label">{t('programDetail.careersLabel')}</span>
              <h2 className="section-title">{t('programDetail.careersTitle')}</h2>
            </div>
            <div className="pd-careers-grid">
              {careers.map((c, i) => (
                <div key={i} className="pd-career-card">
                  <span className="pd-career-icon">💼</span>
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="cta-section">
        <div className="container cta-inner">
          <div>
            <h2>{t('programDetail.ctaTitle')} {title}?</h2>
            <p>{t('programDetail.ctaDesc')}</p>
          </div>
          <div className="cta-actions">
            <Link to="/admissions" className="btn btn-primary">{t('programDetail.ctaApply')}</Link>
            <Link to="/programs" className="btn btn-outline">{t('programDetail.ctaBack')}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
