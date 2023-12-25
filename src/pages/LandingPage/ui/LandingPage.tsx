import { getLoginPage } from "@/shared/consts/router";
import { Page } from "@/widgets/Page";
import { useNavigate } from "react-router-dom";
import { LendingHeader } from "@/widgets/LandingHeader";

const LandingPage = () => {
  const navigation = useNavigate();
  return (
    <Page data-testid="LandingPage">
      <section className="h-screen w-full overflow-hidden">
        <LendingHeader />

        <div className="h-screen bg-neutral-50 py-24 px-6 text-center dark:bg-neutral-900">
          <h1 className="mt-2 mb-16 text-3xl font-bold tracking-tight md:text-4xl xl:text-5xl">
            Приложение для твоих книг, <br />
            <span className="text-primary">Начни собирать свою коллекцию!</span>
          </h1>

          <a
            className="inline-block bg-yellow-300 hover:text-white rounded-2xl px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out"
            onClick={(e) => {
              e.preventDefault();
              navigation(getLoginPage());
            }}
            role="button"
          >
            Попробуй сейчас
          </a>
        </div>
      </section>
    </Page>
  );
};

export default LandingPage;
