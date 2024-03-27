import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { Page } from "@/widgets/Page";

const SettingsPage = () => {
  return (
    <Page data-testid="SettingsPage">
      Изменить тему: <ThemeSwitcher />
    </Page>
  );
};

export default SettingsPage;
