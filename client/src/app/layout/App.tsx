import { useCallback, useEffect, useState } from "react";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStoreContext } from "../context/StoreContext";
import agent from "../api/agent";
import { getCookie } from "../util/util";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync, setBasket } from "../store/basketSlice";
import { fetchCurrentUser } from "../store/accountSlice";
import CheckoutPage from "../../features/checkout/CheckoutPage";

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const palleteType = darkMode ? "dark" : "light";
    const [loading, setLoading] = useState(true);

    const dispatch = useAppDispatch();

    const initApp = useCallback(async () => {
        try {
            await dispatch(fetchCurrentUser());
            await dispatch(fetchBasketAsync());
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        initApp().then(() => setLoading(false));
    }, [initApp]);

    // --------- useContext solution ---------------
    // const {setBasket} = useStoreContext();
    // useEffect(() => {
    //   const buyerId = getCookie('buyerId');
    //   if (buyerId) {
    //     agent.Basket.get()
    //       .then(basket => setBasket(basket))
    //       .catch(error => console.log(error))
    //       .finally(() => setLoading(false));
    //   } else {
    //     setLoading(false);
    //   }
    // }, [setBasket])

    const theme = createTheme({
        palette: {
            mode: palleteType,
            background: {
                default: palleteType === "light" ? "#eaeaea" : "#121212",
            },
        },
    });

    function handleThemeChange() {
        setDarkMode(!darkMode);
    }

    if (loading) return <LoadingComponent message="Initialising app..." />;

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
            <CssBaseline />
            <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
            <Container>
                <Outlet />
            </Container>
        </ThemeProvider>
    );
}

export default App;
