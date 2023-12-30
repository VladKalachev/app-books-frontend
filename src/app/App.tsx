import { Suspense, useEffect } from "react";
import "./styles/App.css";

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

const App = observer(() => {
  const { user } = useStore();
  const location = useLocation();

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
          <RegistrationPage />
        </Suspense>
      );
    }
    if (location?.pathname === getLoginPage()) {
      return (
        <Suspense fallback="">
          <LoginPage />
        </Suspense>
      );
    }
    return (
      <Suspense fallback="">
        <LandingPage />
      </Suspense>
    );
  }

  return (
    <MainLayout
      header={<>Header</>}
      sidebar={<Sidebar />}
      content={<AppRouter />}
    />
  );
});

export default App;
