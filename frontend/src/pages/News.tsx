import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetch } from '../hooks/useApi';
import type { NewsItem, PaginatedResponse } from '../types';
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
          ) : (
            <div className="news-grid">
              {news?.map((item: NewsItem, i: number) => (
                <article key={item._id} className={`news-article card ${i === 0 ? 'featured' : ''}`}>
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
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
