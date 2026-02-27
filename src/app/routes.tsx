import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import { Root } from "./components/Root";

// Lazy loaded routes
const HomePage = lazy(() => import("./pages/HomePage").then(m => ({ default: m.HomePage })));
const CollectionPage = lazy(() => import("./pages/CollectionPage").then(m => ({ default: m.CollectionPage })));
const ShopPage = lazy(() => import("./pages/ShopPage").then(m => ({ default: m.ShopPage })));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage").then(m => ({ default: m.ProductDetailPage })));
const AboutPage = lazy(() => import("./pages/AboutPage").then(m => ({ default: m.AboutPage })));

// Fallback loader while route chunks are downloading
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh] w-full bg-[#FAF8F5]">
    <div className="w-8 h-8 border-2 border-[#0a0a0a]/20 border-t-[#0a0a0a] rounded-full animate-spin"></div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, element: <Suspense fallback={<PageLoader />}><HomePage /></Suspense> },
      { path: "colecciones", element: <Suspense fallback={<PageLoader />}><CollectionPage /></Suspense> },
      { path: "tienda", element: <Suspense fallback={<PageLoader />}><ShopPage /></Suspense> },
      { path: "producto/:id", element: <Suspense fallback={<PageLoader />}><ProductDetailPage /></Suspense> },
      { path: "nosotros", element: <Suspense fallback={<PageLoader />}><AboutPage /></Suspense> },
    ],
  },
]);