import { RegistrationForm } from "@/features/RegistrationByEmail";
import { LendingHeader } from "@/widgets/LandingHeader";
import { Page } from "@/widgets/Page";

const RegistrationPage = () => {
  return (
    <Page data-testid="RegistrationPage">
      <section className="h-screen w-full overflow-hidden">
        <LendingHeader />
        <div className="display-inline h-screen bg-neutral-50 py-24 px-6 text-center lg:w-1/2 md:w-1/2">
          <RegistrationForm />
        </div>
      </section>
    </Page>
  );
};

export default RegistrationPage;
