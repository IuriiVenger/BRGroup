import { lazy } from 'react';

export const LazyNewsListPage = lazy(() => {
  return Promise.all([
    import('@/pages/NewsListPage/NewsListPage'),
    new Promise(resolve => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

export const LazyNewsDetailPage = lazy(() => {
  return Promise.all([
    import('@/pages/NewsDetailPage/NewsDetailPage'),
    new Promise(resolve => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});
