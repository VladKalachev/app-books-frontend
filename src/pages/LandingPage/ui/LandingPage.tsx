import { getLoginPage } from "@/shared/consts/router";
import { Page } from "@/widgets/Page";
import { useNavigate } from "react-router-dom";
import { LendingHeader } from "@/widgets/LandingHeader";
import logo from "@/shared/assets/wfh_1.svg";

const LandingPage = () => {
  const navigation = useNavigate();
  return (
    <Page data-testid="LandingPage">
      <section className="h-screen w-full">
        <LendingHeader />

        <div className="flex flex-col max-w-6xl px-6 py-16 mx-auto md:flex-row">
          <div className="flex flex-col justify-center pr-4 md:w-1/2">
            <h1 className="text-5xl font-extrabold leading-none tracking-tight text-gray-800 lg:text-6xl dark:text-gray-400">
              Приложение для твоих книг, <br />
              <span className="text-primary">
                Начни собирать свою коллекцию!
              </span>
            </h1>
            <p className="mt-6 mb-12 text-lg text-gray-700 dark:text-gray-400">
              Присоединяйся прямо сейчас
            </p>
            <div>
              <a
                className="px-6 py-2 font-semibold text-orange-100 bg-orange-600 rounded-full cursor-pointer hover:text-white"
                onClick={(e) => {
                  e.preventDefault();
                  navigation(getLoginPage());
                }}
              >
                Попробуй сейчас
              </a>
            </div>
          </div>
          <div className="md:w-1/2">
            <img className="w-full" src={logo} alt="Woman working from home" />
          </div>
        </div>
      </section>
    </Page>
  );
};

export default LandingPage;
