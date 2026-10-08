import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Home } from '../pages/Home';

export const router = createBrowserRouter([
  {
    path: '/', Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'projects/:slug', lazy: async () => ({ Component: (await import('../pages/ProjectCase')).ProjectCase }) },
      { path: '*', lazy: async () => ({ Component: (await import('../pages/NotFound')).NotFound }) },
    ],
  },
]);
