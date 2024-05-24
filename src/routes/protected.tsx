import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Spinner } from "@/components/elements";
import { MainLayout } from "@/components/Layout";
import { lazyImport } from "@/utils/lazyImports";

const { TaskRoutes } = lazyImport(
  () => import("@/features/TaskManagement"),
  "TaskRoutes"
);

const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            <Spinner size="xl" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: "/app",
    element: <App />,
    children: [
      { path: "task/*", element: <TaskRoutes /> },
    ],
  },
];