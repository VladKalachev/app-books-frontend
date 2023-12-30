import { Button } from "@/shared/ui/Button";

export const DeleteBookBtn = () => {
  const onClickDelBook = () => {
    console.log("onClickDelBook");
  };
  return <Button onClick={onClickDelBook}>Удалить книгу</Button>;
};
