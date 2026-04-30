import { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  aspectRatio?: string;
}

export default function LazyImage({ 
  src, 
  alt, 
  className = '', 
  style, 
  placeholder,
  aspectRatio 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '50px' }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isInView ? src : placeholder || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E'}
      alt={alt}
      className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
      style={{
        ...style,
        ...(aspectRatio && { aspectRatio }), // Reserve space if aspect ratio provided
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease',
        backgroundColor: isLoaded ? 'transparent' : '#f1f5f9',
      }}
      onLoad={() => setIsLoaded(true)}
      loading="lazy"
    />
  );
}
