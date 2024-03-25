import { ReactNode } from "react";
import { HStack } from "@/shared/ui/Stack";
import { classNames } from "@/shared/libs/classNames/classNames";
import { IPublishing } from "../..";

import cls from "./PublishingList.module.scss";

interface PublishingListProps {
  publishing: IPublishing[];
  renderList: (genre: IPublishing) => ReactNode;
}

export const PublishingList = (props: PublishingListProps) => {
  const { publishing, renderList } = props;

  if (!publishing.length) {
    return <>Нет данных</>;
  }

  return (
    <HStack
      wrap="wrap"
      gap="16"
      className={classNames(cls.PublishingList, {}, [])}
      data-testid="PublishingList"
    >
      {publishing.map((item) => renderList(item))}
    </HStack>
  );
};
