import { Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import Header from '../Header/Header';

import Preloader from '@/components/Preloader/Preloader';
import { LazyNewsDetailPage, LazyNewsListPage } from '@/services/lazyLoaders';

const AppContent: React.FunctionComponent = () => {
  const routes = useRoutes([
    { path: '/main', element: <LazyNewsListPage /> },
    {
      path: '/news',
      children: [{ path: '/news/:id', element: <LazyNewsDetailPage /> }],
    },
    { path: '*', element: <Navigate to={'/main'} /> },
  ]);

  return (
    <>
      <Header />
      <Suspense fallback={<Preloader />}>{routes}</Suspense>
    </>
  );
};

export default AppContent;
