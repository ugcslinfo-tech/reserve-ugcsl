import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { submitContact } from '../hooks/useApi';
import type { ContactForm } from '../types';
import SEO from '../components/SEO';
import './shared.css';
import './Contact.css';

const initialForm: ContactForm = { name: '', email: '', phone: '', subject: '', message: '' };

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const subjects = t('contact.form.subjects', { returnObjects: true }) as string[];

  const contactInfo = [
    { icon: '📍', label: 'Address', value: t('contact.address') },
    { icon: '✉️', label: 'Email', value: t('contact.email') },
    { icon: '🕐', label: 'Office Hours', value: t('contact.officeHours') },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await submitContact(form);
      setStatus('success');
      setForm(initialForm);
    } catch {
      setStatus('error');
    }
  };

  return (
    <main>
      <SEO 
        title="Contact Us | UGCSL - Get in Touch"
        description="Contact United Global Campus of Sri Lanka for admissions inquiries, program information, or general questions. We're here to help you start your educational journey."
        canonical="https://ugcsl.lk/contact"
      />
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <span className="section-label" style={{ color: 'var(--accent-light)' }}>{t('contact.label')}</span>
          <h1 className="page-hero-title">{t('contact.heroTitle1')}<br />{t('contact.heroTitle2')}</h1>
          <p>{t('contact.heroDesc')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>{t('contact.getInTouch')}</h2>
              <p>{t('contact.getInTouchDesc')}</p>
              <div className="contact-details">
                {contactInfo.map((c) => (
                  <div key={c.label} className="contact-detail">
                    <div className="contact-detail-icon">{c.icon}</div>
                    <div>
                      <span className="contact-detail-label">{c.label}</span>
                      <span className="contact-detail-value">{c.value}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="map-placeholder">
                <span>🗺️</span>
                <p>{t('contact.mapPlaceholder')}</p>
                <small>{t('contact.mapComingSoon')}</small>
              </div>
            </div>

            <div className="contact-form-wrap">
              <h2>{t('contact.sendMessage')}</h2>
              {status === 'success' ? (
                <div className="form-success">
                  <span>✅</span>
                  <h3>{t('contact.successTitle')}</h3>
                  <p>{t('contact.successDesc')}</p>
                  <button className="btn btn-dark" onClick={() => setStatus('idle')}>{t('contact.sendAnother')}</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>{t('contact.form.fullName')}</label>
                      <input name="name" value={form.name} onChange={handleChange} placeholder={t('contact.form.namePlaceholder')} required />
                    </div>
                    <div className="form-group">
                      <label>{t('contact.form.email')}</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder={t('contact.form.emailPlaceholder')} required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>{t('contact.form.phone')}</label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder={t('contact.form.phonePlaceholder')} />
                    </div>
                    <div className="form-group">
                      <label>{t('contact.form.subject')}</label>
                      <select name="subject" value={form.subject} onChange={handleChange} required>
                        <option value="">{t('contact.form.subjectPlaceholder')}</option>
                        {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>{t('contact.form.message')}</label>
                    <textarea name="message" value={form.message} onChange={handleChange} placeholder={t('contact.form.messagePlaceholder')} rows={5} required />
                  </div>
                  {status === 'error' && <p className="form-error">{t('contact.form.error')}</p>}
                  <button type="submit" className="btn btn-dark form-submit" disabled={status === 'loading'}>
                    {status === 'loading' ? t('contact.form.submitting') : t('contact.form.submit')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
