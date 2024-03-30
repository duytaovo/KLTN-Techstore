import React from "react";
import ReactDOM from "react-dom/client";
import App from "src/App";
import "src/i18n/i18n";
// simplebar-react
// import "simplebar/dist/simplebar.min.css";
// import "simplebar/src/simplebar.css";
import "./utils/highlight";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
// import { ConfigProvider } from "antd";
import { AppProvider } from "./contexts/app.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SettingsProvider } from "./contexts/SettingsContext";
import "./index.css";
import PageContextProvider from "./contexts/PageContext";

// import "simplebar/dist/simplebar.min.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <BrowserRouter>
    {/* <ConfigProvider theme={theme}> */}
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        {/* <GlobalStyles> */}
        <SettingsProvider>
          <AppProvider>
            <PageContextProvider>
              <App />
            </PageContextProvider>
          </AppProvider>
        </SettingsProvider>
        {/* </GlobalStyles> */}
      </Provider>
    </QueryClientProvider>
    {/* </ConfigProvider> */}
  </BrowserRouter>,
  // </React.StrictMode>
);

