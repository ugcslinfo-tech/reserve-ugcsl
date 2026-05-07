import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFetch } from '../hooks/useApi';
import type { NewsItem, PaginatedResponse } from '../types';
import SEO from '../components/SEO';
import './shared.css';
import './News.css';

export default function News() {
  const { t } = useTranslation();
  const { data: res, loading } = useFetch<PaginatedResponse<NewsItem>>('/news');
  const categories = t('news.categories', { returnObjects: true }) as string[];
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const news = res?.data.filter((item) =>
    activeCategory === categories[0] || item.category === activeCategory
  );

  return (
    <main>
      <SEO 
        title="News & Events | UGCSL - Latest Updates"
        description="Stay updated with the latest news, events, and achievements from United Global Campus of Sri Lanka. Read about admissions, academic updates, and campus announcements."
        canonical="https://ugcsl.lk/news"
      />
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <span className="section-label" style={{ color: 'var(--accent-light)' }}>{t('news.label')}</span>
          <h1 className="page-hero-title">{t('news.heroTitle')}</h1>
          <p>{t('news.heroDesc')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="news-categories">
            {categories.map((c) => (
              <button
                key={c}
                className={`filter-tab ${c === activeCategory ? 'active' : ''}`}
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="spinner" />
          ) : news && news.length > 0 ? (
            <div className="news-grid">
              {news.map((item: NewsItem, i: number) => (
                <Link 
                  key={item._id} 
                  to={`/news/${item.slug}`}
                  className={`news-article card ${i === 0 ? 'featured' : ''}`}
                >
                  {item.image ? (
                    <div className="news-article-img" style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                      <div className="news-article-cat">{item.category}</div>
                    </div>
                  ) : (
                    <div className="news-article-img">
                      <span>{item.category[0]}</span>
                      <div className="news-article-cat">{item.category}</div>
                    </div>
                  )}
                  <div className="news-article-body">
                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>
                    <div className="news-article-footer">
                      <span>{new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      <span className="news-read-more">{t('news.readMore')}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>No news found</p>
              <p style={{ fontSize: '14px' }}>Check back later for updates</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
