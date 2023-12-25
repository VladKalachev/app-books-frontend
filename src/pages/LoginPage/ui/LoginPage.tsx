import LoginForm from "@/features/AuthByEmail/ui/LoginForm";
import { LendingHeader } from "@/widgets/LandingHeader";
import { Page } from "@/widgets/Page";

const LoginPage = () => {
  return (
    <Page data-testid="LoginPage">
      <section className="h-screen w-full overflow-hidden">
        <LendingHeader />
        <LoginForm />
      </section>
    </Page>
  );
};

export default LoginPage;
