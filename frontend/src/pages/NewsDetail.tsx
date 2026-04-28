import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useApi';
import type { NewsItem } from '../types';
import './shared.css';
import './NewsDetail.css';

export default function NewsDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: news, loading, error } = useFetch<NewsItem>(slug ? `/news/${slug}` : '');

  if (loading) return <main><div className="spinner" style={{ marginTop: '160px' }} /></main>;
  if (error || !news) return (
    <main style={{ paddingTop: '160px', textAlign: 'center' }}>
      <p>News article not found.</p>
      <Link to="/news" className="btn btn-dark" style={{ marginTop: '24px' }}>← Back to News</Link>
    </main>
  );

  return (
    <main>
      {/* Hero with Image */}
      <section className="news-detail-hero">
        {news.image && (
          <div className="news-detail-hero-img" style={{ backgroundImage: `url(${news.image})` }}>
            <div className="news-detail-hero-overlay" />
          </div>
        )}
        <div className="container news-detail-hero-content">
          <Link to="/news" className="news-detail-back">
            ← Back to News
          </Link>
          <span className="tag">{news.category}</span>
          <h1 className="news-detail-title">{news.title}</h1>
          <div className="news-detail-meta">
            <span className="news-detail-date">
              {new Date(news.date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
            {news.author && (
              <>
                <span className="news-detail-separator">•</span>
                <span className="news-detail-author">By {news.author}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container">
          <div className="news-detail-content">
            <div 
              className="news-detail-body"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
            
            {/* Share Section */}
            <div className="news-detail-share">
              <h4>Share this article</h4>
              <div className="news-detail-share-buttons">
                <button 
                  className="share-btn"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: news.title,
                        text: news.excerpt,
                        url: window.location.href,
                      });
                    }
                  }}
                >
                  Share
                </button>
                <button 
                  className="share-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }}
                >
                  Copy Link
                </button>
              </div>
            </div>

            {/* Back to News */}
            <div className="news-detail-footer">
              <Link to="/news" className="btn btn-dark">
                ← Back to All News
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
