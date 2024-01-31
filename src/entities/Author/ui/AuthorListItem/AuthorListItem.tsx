import { Card } from "@/shared/ui/Card";
import { VStack } from "@/shared/ui/Stack";

import { Text } from "@/shared/ui/Text";

import { classNames } from "@/shared/libs/classNames/classNames";
import { AppLink } from "@/shared/ui/AppLink";
import { getBookEdit } from "@/shared/consts/router";
import cls from "./AuthorListItem.module.scss";
import { IAuthor } from "../../model/types/author";

interface AuthorListItemProps {
  author: IAuthor;
  className?: string;
}

export const AuthorListItem = (props: AuthorListItemProps) => {
  const { author, className } = props;
  return (
    <div className={classNames(cls.BookListItem, {}, [className])}>
      <Card className={cls.card} border="partial" padding="0" variant="light">
        <VStack className={cls.info} gap="4">
          <AppLink to={getBookEdit(author.id.toString())}>
            <Text title={author.fullName} className={cls.title} />
          </AppLink>
        </VStack>
      </Card>
    </div>
  );
};
