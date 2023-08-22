import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  homePageUrl,
  loginPageUrl,
  pageCreateUrl,
  pageListUrl,
  pageUpdateUrl,
} from "./helpers/url";
import LazyPageLoader from "./components/commons/LazyPageLoader";
import RootProvider from "./propviders/RootProvider";

const MainLayout = React.lazy(() => import("./components/layouts/MainLayout"));
const HomePage = React.lazy(() => import("./components/pages/HomePage"));
const PageListPage = React.lazy(() =>
  import("./components/pages/PageListPage"),
);
const PageCreatePage = React.lazy(() =>
  import("./components/pages/PageCreatePage"),
);
const PageUpdatePage = React.lazy(() =>
  import("./components/pages/PageUpdatePage"),
);
const LoginPage = React.lazy(() => import("./components/pages/LoginPage"));

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
      {
        path: pageUpdateUrl(),
        element: <PageUpdatePage />,
      },
    ],
  },
  {
    path: loginPageUrl(),
    element: <LoginPage />,
  },
]);

function App() {
  return (
    <RootProvider>
      <Suspense fallback={<LazyPageLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </RootProvider>
  );
}

export default App;
