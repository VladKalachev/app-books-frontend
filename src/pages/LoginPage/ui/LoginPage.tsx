import LoginForm from "@/features/AuthByEmail/ui/LoginForm";
import { Page } from "@/widgets/Page";

const LoginPage = () => {
  return (
    <Page data-testid="LoginPage">
      <LoginForm />
    </Page>
  );
};

export default LoginPage;
