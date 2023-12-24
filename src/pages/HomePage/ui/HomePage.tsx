import useStore from "@/app/providers/StoreProvider/config/useStore";
import { getLoginPage } from "@/shared/consts/router";
import { Page } from "@/widgets/Page";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { user } = useStore();
  const navigate = useNavigate();

  return (
    <Page data-testid="HomePage">
      HomePage
      <h1>
        {user?.isAuth
          ? `Пользователь авторизован ${user.user.email}`
          : "АВТОРИЗУЙТЕСЬ"}
      </h1>
      <h1>
        {user.user.isActivated
          ? "Аккаунт подтвержден по почте"
          : "ПОДТВЕРДИТE АККАУНТ!"}
      </h1>
      <button
        onClick={() => {
          user?.logout();
          navigate(getLoginPage());
        }}
      >
        Выйти
      </button>
    </Page>
  );
};

export default observer(HomePage);
