import { LoginForm } from "@/features/AuthByEmail";
import { LendingHeader } from "@/widgets/LandingHeader";
import { Page } from "@/widgets/Page";

const LoginPage = () => {
  return (
    <Page data-testid="LoginPage">
      <section className="h-screen w-full overflow-hidden">
        <LendingHeader />
        <div className="h-screen py-24 px-6 text-center ">
          <div className="w-300">
            <LoginForm />
          </div>
        </div>
      </section>
    </Page>
  );
};

export default LoginPage;
