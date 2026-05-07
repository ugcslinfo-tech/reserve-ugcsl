import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FaqItem from '../components/FaqItem';
import SEO from '../components/SEO';
import './shared.css';
import './Admissions.css';

const intakes = [
  { intake: '2026 Intake', deadline: 'December 31, 2026', statusKey: 'open' },
  { intake: '2027 Intake', deadline: 'December 31, 2027', statusKey: 'upcoming' },
  { intake: '2028 Intake', deadline: 'December 31, 2028', statusKey: 'upcoming' },
];

export default function Admissions() {
  const { t } = useTranslation();
  const steps = t('admissions.steps', { returnObjects: true }) as { title: string; desc: string }[];
  const diplomaReqs = t('admissions.diplomaRequirements', { returnObjects: true }) as string[];
  const faqs = t('admissions.faqs', { returnObjects: true }) as { q: string; a: string }[];

  const requirements = [
    { level: t('admissions.reqLevelDiploma'), icon: '🎓', items: diplomaReqs },
  ];

  return (
    <main>
      <SEO 
        title="Admissions | UGCSL - Apply for Online Diploma Programs"
        description="Apply to UGCSL for 2026 intake. Learn about entry requirements, application process, and deadlines for our online diploma programs. Applications now open."
        canonical="https://ugcsl.lk/admissions"
      />
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <span className="section-label" style={{ color: 'var(--accent-light)' }}>{t('admissions.label')}</span>
          <h1 className="page-hero-title">{t('admissions.heroTitle1')}<br />{t('admissions.heroTitle2')}</h1>
          <p>{t('admissions.heroDesc')}</p>
          <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary">{t('admissions.applyOnline')}</Link>
            <a href="#requirements" className="btn btn-outline">{t('admissions.viewRequirements')}</a>
          </div>
        </div>
      </section>

      {/* Intakes */}
      <section className="section-sm bg-soft">
        <div className="container">
          <div className="intakes-grid">
            {intakes.map((i) => (
              <div key={i.intake} className={`intake-card ${i.statusKey}`}>
                <div className="intake-status">{t(`admissions.status.${i.statusKey}`)}</div>
                <h3>{i.intake}</h3>
                <p>{t('admissions.deadline')} <strong>{i.deadline}</strong></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">{t('admissions.processLabel')}</span>
            <h2 className="section-title">{t('admissions.howToApply')}</h2>
            <p className="section-subtitle">{t('admissions.howToApplySubtitle')}</p>
          </div>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div key={i} className="step-card">
                <div className="step-num">{String(i + 1).padStart(2, '0')}</div>
                {i < steps.length - 1 && <div className="step-connector" />}
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section id="requirements" className="section bg-soft">
        <div className="container">
          <div className="section-header">
            <span className="section-label">{t('admissions.requirementsLabel')}</span>
            <h2 className="section-title">{t('admissions.requirementsTitle')}</h2>
          </div>
          <div className="grid-2">
            {requirements.map((r) => (
              <div key={r.level} className="req-card card">
                <div className="req-header">
                  <span className="req-icon">{r.icon}</span>
                  <h3>{r.level}</h3>
                </div>
                <ul className="req-list">
                  {r.items.map((item, i) => (
                    <li key={i}><span className="check">✓</span>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-soft">
        <div className="container">
          <div className="section-header">
            <span className="section-label">{t('admissions.faqLabel')}</span>
            <h2 className="section-title">{t('admissions.faqTitle')}</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
