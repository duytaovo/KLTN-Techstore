import useRouteElements from "./useRouteElements";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";

// import "./App.css";
// import "normalize.css";
// import "src/assets/styles/global.scss";
// import "simplebar/dist/simplebar.min.css";

import ErrorBoundary from "./components/ErrorBoundary";
import ThemeConfig from "./theme";
import Settings from "./components/settings";
import ThemePrimaryColor from "./components/ThemePrimaryColor";
import RtlLayout from "./components/RtlLayout";
import ScrollToTop from "./components/ScrollToTop";
import NotistackProvider from "./components/NotistackProvider";
import RightContact from "./components/Contact/RightContact";
import TopContact from "./components/Contact/TopContact";
import { SwitchEdit } from "./components/SwitchEdit";

function App() {
  const routeElements = useRouteElements();

  // const { reset } = useContext(AppContext);

  // useEffect(() => {
  //   LocalStorageEventTarget.addEventListener("clearLS", reset);
  //   return () => {
  //     LocalStorageEventTarget.removeEventListener("clearLS", reset);
  //   };
  // }, [reset]);

  return (
    // <SimpleBarReact style={{ maxHeight: "100vh" }}>
    <ThemeConfig>
      <ThemePrimaryColor>
        <RtlLayout>
          <NotistackProvider>
            <HelmetProvider>
              <TopContact />
              <ScrollToTop />
              <Settings />
              <ErrorBoundary>{routeElements}</ErrorBoundary>
              <ToastContainer />
              <SwitchEdit />
              <RightContact />
            </HelmetProvider>
          </NotistackProvider>
        </RtlLayout>
      </ThemePrimaryColor>
    </ThemeConfig>
    // </SimpleBarReact>
  );
}

export default App;

