import { ContactPage } from "@mui/icons-material";
import { Navigate, createBrowserRouter } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ProductDetails from "../../features/catalog/ProductDetails";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "catalog", element: <Catalog /> },
      { path: "catalog/:id", element: <ProductDetails /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);

export default router;
