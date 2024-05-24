import { lazyImport } from "@/utils/lazyImports";

const { AuthRoutes } = lazyImport(() => import('@/features/Auth'), 'AuthRoutes');

export const publicRoutes = [
  {
    path: '/auth/*',
    element: <AuthRoutes />,
  },
];
