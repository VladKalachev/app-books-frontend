import LoginForm from "@/features/AuthByEmail/ui/LoginForm";
import { LendingHeader } from "@/widgets/LandingHeader";
import { Page } from "@/widgets/Page";

const RegistrationPage = () => {
  return (
    <Page data-testid="RegistrationPage">
      <section className="h-screen w-full overflow-hidden">
        <LendingHeader />
        <LoginForm />
      </section>
    </Page>
  );
};

export default RegistrationPage;
