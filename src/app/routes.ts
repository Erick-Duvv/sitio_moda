import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { HomePage } from "./pages/HomePage";
import { CollectionPage } from "./pages/CollectionPage";
import { ShopPage } from "./pages/ShopPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { AboutPage } from "./pages/AboutPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "colecciones", Component: CollectionPage },
      { path: "tienda", Component: ShopPage },
      { path: "producto/:id", Component: ProductDetailPage },
      { path: "nosotros", Component: AboutPage },
    ],
  },
]);