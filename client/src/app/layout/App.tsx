import { useEffect, useState } from "react";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { useStoreContext } from "../context/StoreContext";
import agent from "../api/agent";
import { getCookie } from "../util/util";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../store/basketSlice";

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const palleteType = darkMode ? "dark" : "light";
    const [loading, setLoading] = useState(true);

    const dispatch = useAppDispatch();

    useEffect(() => {
      const buyerId = getCookie('buyerId');
      if (buyerId) {
        agent.Basket.get()
          .then(basket => dispatch(setBasket(basket)))
          .catch(error => console.log(error))
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }, [dispatch])
    
    
  
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

    if (loading) return <LoadingComponent message="Initialising app..." />

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer position="bottom-right" />
            <CssBaseline />
            <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
            <Container>
                <Outlet />
            </Container>
        </ThemeProvider>
    );
}

export default App;
