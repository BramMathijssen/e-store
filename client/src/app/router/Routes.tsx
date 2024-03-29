import { Navigate, createBrowserRouter } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ProductDetails from "../../features/catalog/ProductDetails";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import ContactPage from "../../features/contact/ContactPage";
import Register from "../../features/account/Register";
import Login from "../../features/account/Login";
import RequireAuth from "./RequireAuth";
import Orders from "../../features/orders/Orders";
import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";
import Inventory from "../../features/admin/Inventory";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                // authenticated routes
                element: <RequireAuth />,
                children: [
                    { path: "checkout", element: <CheckoutWrapper /> },
                    { path: "orders", element: <Orders /> },
                ],
            },
            {
                // admin role routes
                element: <RequireAuth roles={["Admin"]} />,
                children: [{ path: "inventory", element: <Inventory /> }],
            },
            { path: "", element: <HomePage /> },
            { path: "catalog", element: <Catalog /> },
            { path: "catalog/:id", element: <ProductDetails /> },
            { path: "about", element: <AboutPage /> },
            { path: "contact", element: <ContactPage /> },
            { path: "basket", element: <BasketPage /> },
            { path: "register", element: <Register /> },
            { path: "login", element: <Login /> },
            { path: "server-error", element: <ServerError /> },
            { path: "not-found", element: <NotFound /> },
            { path: "*", element: <Navigate replace to="/not-found" /> },
        ],
    },
]);

export default router;
