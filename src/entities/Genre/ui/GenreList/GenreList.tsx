import { ReactNode } from "react";
import { HStack } from "@/shared/ui/Stack";
import { classNames } from "@/shared/libs/classNames/classNames";
import { IGenre } from "../..";

import cls from "./GenreList.module.scss";

interface GenreListProps {
  genre: IGenre[];
  renderList: (genre: IGenre) => ReactNode;
}

export const GenreList = (props: GenreListProps) => {
  const { genre, renderList } = props;

  if (!genre.length) {
    return <>Нет данных</>;
  }

  return (
    <HStack
      wrap="wrap"
      gap="16"
      className={classNames(cls.GenreList, {}, [])}
      data-testid="BookList"
    >
      {genre.map((item) => renderList(item))}
    </HStack>
  );
};
