import path from "src/constants/path";
import { Suspense, useEffect, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import {
  productDetailRoutes,
  productRoutes,
  routeAuth,
  routeMain,
  routePayment,
  routeUser,
} from "./routes";
import CommonLayout from "./layouts/CommonLayout";
import AuthLayout from "./layouts/AuthLayout";
import Loading from "./components/Loading";
import UserLayout from "./pages/User/layouts/UserLayout";
import UnAuthenticatedGuard from "./guards/UnAuthenticatedGuard";
import AuthenticatedGuard from "./guards/AuthenticatedGuard";
import { useAppDispatch } from "./hooks/useRedux";
import { _getData, _getDataUser } from "./store/dataSlice";
import { getUser, getUserById } from "./store/user/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
// import Test from "./pages/test";

export default function useRouteElements() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(_getDataUser(""));
  }, []);
  useEffect(() => {
    const _getData = async () => {
      const res = await dispatch(getUser(""));
      await unwrapResult(res);
      await dispatch(getUserById(res?.payload?.data.data.id));
    };
    _getData();
  }, []);
  const renderRouter = useMemo(() => {
    return routeMain.map(({ path, Component }, index) => {
      return (
        <Route
          key={index}
          path={path}
          element={
            <Suspense>
              <Component title="" />
            </Suspense>
          }
        />
      );
    });
  }, [path]);

  const renderRouterPayment = useMemo(() => {
    return routePayment.map(({ path, Component }, index) => {
      return (
        <Route
          key={index}
          path={path}
          element={
            <Suspense>
              <Component />
            </Suspense>
          }
        />
      );
    });
  }, [path]);

  const renderRouterDetail = useMemo(() => {
    return productDetailRoutes.map(({ path, Component }, index) => {
      return (
        <Route
          key={index}
          path={path}
          element={
            <Suspense fallback={<Loading />}>
              <Component />
            </Suspense>
          }
        />
      );
    });
  }, [path]);

  const renderRouterProduct = useMemo(() => {
    return productRoutes.map(({ path, Component }, index) => {
      return (
        <Route
          key={index}
          path={path}
          element={
            <Suspense fallback={<Loading />}>
              <Component />
            </Suspense>
          }
        />
      );
    });
  }, [path]);
  const renderRouterAuth = useMemo(() => {
    return routeAuth.map(({ path, Component }, index) => {
      return (
        <Route
          key={index}
          path={path}
          element={
            <Suspense fallback={<Loading />}>
              <Component />
            </Suspense>
          }
        />
      );
    });
  }, [path]);

  const renderRouterUser = useMemo(() => {
    return routeUser.map(({ path, Component }, index) => {
      return (
        <Route
          key={index}
          path={path}
          element={
            <Suspense fallback={<Loading />}>
              <Component />
            </Suspense>
          }
        />
      );
    });
  }, [path]);
  const routeElements = (
    <Routes>
      <Route path="" element={<CommonLayout />}>
        {renderRouter}
      </Route>
      <Route path="" element={<UserLayout />}>
        {renderRouterPayment}
      </Route>
      <Route path="/" element={<CommonLayout />}>
        {renderRouterDetail}
      </Route>
      <Route path={"/"} element={<CommonLayout />}>
        {renderRouterProduct}
      </Route>
      {/* <Route path={"/"} element={<CommonLayout />}>
        <Route
          path={"test"}
          element={
            <Suspense fallback={<Loading />}>
              <Test />
            </Suspense>
          }
        />
      </Route> */}
      <Route
        path=""
        element={
          <AuthenticatedGuard>
            <AuthLayout />
          </AuthenticatedGuard>
        }
      >
        {renderRouterAuth}
      </Route>
      <Route
        path="/user"
        element={
          <UnAuthenticatedGuard>
            <UserLayout />
          </UnAuthenticatedGuard>
        }
      >
        {renderRouterUser}
      </Route>
    </Routes>
  );

  return <>{routeElements}</>;
}

