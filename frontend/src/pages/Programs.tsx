import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFetch } from '../hooks/useApi';
import type { Program, PaginatedResponse } from '../types';
import './shared.css';
import './Programs.css';

// Filter values must match DB faculty field exactly
const FACULTY_FILTER_VALUES = [
  'All',
  'Faculty of Agriculture',
  'Faculty of Cosmetology and Aesthetic Science',
  'Faculty of Law and Human Rights',
  'Faculty of Sri Lankan Indigenous Medicine',
  'Faculty of Psychology and Counseling',
  'Faculty of Dance and Performing Arts',
  'Faculty of Political Science and Public Policy',
] as const;
type FacultyFilter = typeof FACULTY_FILTER_VALUES[number];

export default function Programs() {
  const { t, i18n } = useTranslation();
  const isSi = i18n.language === 'si';
  const { data: res, loading } = useFetch<PaginatedResponse<Program>>('/programs');
  const [filter, setFilter] = useState<FacultyFilter>('All');
  const [search, setSearch] = useState('');
  const filterLabels = t('programs.facultyFilters', { returnObjects: true }) as string[];

  const filtered = res?.data.filter((p) => {
    const matchFaculty = filter === 'All' || p.faculty === filter;
    const titleToSearch = isSi ? (p.title_si || p.title) : p.title;
    const matchSearch = titleToSearch.toLowerCase().includes(search.toLowerCase());
    return matchFaculty && matchSearch;
  }) ?? [];

  return (
    <main className="programs-page">
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <span className="section-label" style={{ color: 'var(--accent-light)' }}>{t('programs.label')}</span>
          <h1 className="page-hero-title">{t('programs.heroTitle')}</h1>
          <p>{t('programs.heroDesc')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="programs-toolbar">
            <div className="search-box">
              <span>🔍</span>
              <input
                type="text"
                placeholder={t('programs.searchPlaceholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="filter-tabs">
              {FACULTY_FILTER_VALUES.map((value, i) => (
                <button
                  key={value}
                  className={`filter-tab ${filter === value ? 'active' : ''}`}
                  onClick={() => setFilter(value)}
                >
                  {filterLabels[i] ?? value}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="spinner" />
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <span>🔍</span>
              <p>{t('programs.noResults')}</p>
            </div>
          ) : (
            <div className="grid-3">
              {filtered.map((p) => (
                <div key={p._id} className="program-card card">
                  <div className="program-icon">{p.icon}</div>
                  <div className="program-body">
                    <div className="program-meta">
                      <span className="tag">{isSi ? (p.degree_si || p.degree) : p.degree}</span>
                      <span className="program-duration">⏱ {isSi ? (p.duration_si || p.duration) : p.duration}</span>
                    </div>
                    <h3 className="program-title">{isSi ? (p.title_si || p.title) : p.title}</h3>
                    <p className="program-faculty">{isSi ? (p.faculty_si || p.faculty) : p.faculty}</p>
                    <p className="program-desc">{isSi ? (p.description_si || p.description) : p.description}</p>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                      <Link to={`/programs/${p.slug}`} className="btn btn-dark" style={{ fontSize: '13px', padding: '10px 20px' }}>
                        {t('programs.learnMore')}
                      </Link>
                      <Link to="/admissions" className="btn btn-primary" style={{ fontSize: '13px', padding: '10px 20px' }}>
                        {t('programs.applyNow')}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
