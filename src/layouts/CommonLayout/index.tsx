import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Footer from "src/components/Footer/Footer";
import Header from "src/components/Header/Header";
import HeaderV2 from "src/components/HeaderV2";
import Loading from "src/components/Loading";
import { PageContext } from "src/contexts/PageContext";
import useSettings from "src/hooks/useSettings";
function CommonLayout({ children }: any) {
  const { isHome } = useContext(PageContext);
  const { themeHeader } = useSettings();
  return (
    <div className={`bg w-full ${isHome === false ? "" : "pt-[110px]"}`}>
      <Loading />
      {themeHeader === "old" ? <Header /> : <HeaderV2 home={isHome} />}

      <main role="main" className="wrapper h-full">
        <div className="content bg ">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default React.memo(CommonLayout);

