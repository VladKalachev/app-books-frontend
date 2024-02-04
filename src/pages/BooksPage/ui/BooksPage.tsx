import { TabUserAuthor } from "@/features/TabUserAuthor";

import { Page } from "@/widgets/Page";

const BooksPage = () => {
  return (
    <Page data-testid="BooksPage">
      <h1>Мои книги</h1>
      <div>
        <TabUserAuthor />
      </div>
    </Page>
  );
};

export default BooksPage;
