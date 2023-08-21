import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { homePageUrl, pageCreateUrl, pageListUrl } from "./helpers/url";
import LazyPageLoader from "./components/commons/LazyPageLoader";

const MainLayout = React.lazy(() => import("./components/layouts/MainLayout"));
const HomePage = React.lazy(() => import("./components/pages/HomePage"));
const PageListPage = React.lazy(() =>
  import("./components/pages/PageListPage"),
);
const PageCreatePage = React.lazy(() =>
  import("./components/pages/PageCreatePage"),
);

const router = createBrowserRouter([
  {
    path: homePageUrl(),
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: pageListUrl(),
        element: <PageListPage />,
      },
      {
        path: pageCreateUrl(),
        element: <PageCreatePage />,
      },
    ],
  },
]);

function App() {
  return (
    <Suspense fallback={<LazyPageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
