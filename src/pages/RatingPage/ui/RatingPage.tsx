import {
  IUserWithBooks,
  UserList,
  UserListItem,
  UsersService,
} from "@/entities/User";
import { Page } from "@/widgets/Page";
import { useEffect, useState } from "react";

const RatingPage = () => {
  const [users, setUsers] = useState<IUserWithBooks[]>([]);

  const getUsers = async () => {
    try {
      const userList = await UsersService.getUsersWithBooks();
      setUsers(userList.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
    () => {
      setUsers([]);
    };
  }, []);

  return (
    <Page data-testid="RatingPage">
      <h1>Рейтинг</h1>
      <div>
        <UserList
          users={users}
          renderList={(user) => <UserListItem key={user.id} user={user} />}
        />
      </div>
    </Page>
  );
};

export default RatingPage;
