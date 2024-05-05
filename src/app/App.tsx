import { Suspense, useEffect } from "react";

import { observer } from "mobx-react-lite";

import useStore from "./providers/StoreProvider/config/useStore";
import { AppRouter } from "./providers/router";
import LoginPage from "@/pages/LoginPage/ui/LoginPage";
import { useLocation } from "react-router-dom";
import { getLoginPage, getRegistrationPage } from "@/shared/consts/router";
import { RegistrationPage } from "@/pages/RegistrationPage";
import { LandingPage } from "@/pages/LandingPage";
import { MainLayout } from "@/shared/layouts/MainLayout";
import { Sidebar } from "@/widgets/Sidebar";
import { Navbar } from "@/widgets/Navbar";
import { classNames } from "@/shared/libs/classNames/classNames";
import { ToastContainer } from "react-toastify";
import { useTheme } from "@/shared/hooks/useTheme/useTheme";

import "react-toastify/dist/ReactToastify.css";
import "./styles/App.scss";

const App = observer(() => {
  const { user } = useStore();
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      user?.checkAuth();
    }
  }, [user?.isAuth]);

  if (user?.isLoading) {
    return <>Lading...</>;
  }

  if (!user?.isAuth) {
    if (location?.pathname === getRegistrationPage()) {
      return (
        <Suspense fallback="">
          <ToastContainer hideProgressBar />
          <RegistrationPage />
        </Suspense>
      );
    }
    if (location?.pathname === getLoginPage()) {
      return (
        <Suspense fallback="">
          <ToastContainer hideProgressBar />
          <LoginPage />
        </Suspense>
      );
    }
    return (
      <Suspense fallback="">
        <ToastContainer hideProgressBar />
        <LandingPage />
      </Suspense>
    );
  }

  return (
    <div id="app" className={classNames("app_redesigned", {}, [theme])}>
      <ToastContainer hideProgressBar />
      <Suspense fallback="">
        <MainLayout
          header={<Navbar />}
          sidebar={<Sidebar />}
          content={<AppRouter />}
        />
      </Suspense>
    </div>
  );
});

export default App;
