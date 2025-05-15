import { useCallback, useEffect, useRef } from 'react';

export function useInfiniteScroll(
  loadMore: () => void,
  options: IntersectionObserverInit = {
    threshold: 1,
    rootMargin: '20px',
  }
) {
  const loaderRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        loadMore();
      }
    },
    [loadMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, options);
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [handleObserver, options]);

  return loaderRef;
}
