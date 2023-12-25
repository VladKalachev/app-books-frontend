import { RegistrationForm } from "@/features/RegistrationByEmail";
import { LendingHeader } from "@/widgets/LandingHeader";
import { Page } from "@/widgets/Page";

const RegistrationPage = () => {
  return (
    <Page data-testid="RegistrationPage">
      <section className="h-screen w-full overflow-hidden">
        <LendingHeader />
        <div className="display-inline h-screen py-24 px-6 text-center">
          <RegistrationForm />
        </div>
      </section>
    </Page>
  );
};

export default RegistrationPage;
