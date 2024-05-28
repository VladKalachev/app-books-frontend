import { BooksService, IBook } from '@/entities/Book';
import { Page } from '@/widgets/Page';
import { Text } from '@/shared/ui/Text';
import { useEffect, useState } from 'react';
import cls from './StatisticsPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { getBookEdit } from '@/shared/consts/router';

const StatisticsPage = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [formatBooks, setFormatBooks] = useState<any>({});

  const navigate = useNavigate();

  const getBooks = async () => {
    try {
      const bookList = await BooksService.fetchUBooks();
      setBooks(bookList.data);
      setFormatBooks(count(bookList.data));
    } catch (error) {
      console.log(error);
    }
  };
  const count = (dataSet: any) => {
    const finalObj: any = {};
    dataSet
      .filter((data: any) => data.read && data.year)
      .forEach((item: any) => {
        const date = item.year;
        if (finalObj[date]) {
          finalObj[date].push(item);
        } else {
          finalObj[date] = [item];
        }
      });
    return finalObj;
  };

  useEffect(() => {
    getBooks();
    () => {
      setBooks([]);
    };
  }, []);

  return (
    <Page data-testid="StatisticsPage">
      <h1>Моя статистика</h1>
      <div>
        <Text
          title={`Общее количество моих книг в коллекции: ${books.length}`}
          className={cls.textTitle}
          size="s"
        />
        <Text
          title={`Общее количество моих прочитанных книг: ${
            books.filter((book) => book.read).length
          }`}
          className={cls.textTitle}
          size="s"
        />

        {formatBooks.length && <>Общее количество прочитанных книг по годам:</>}
        <table>
          <thead>
            <tr>
              {Object.keys(formatBooks).map((item, i) => {
                const listBooks = formatBooks[item];
                return (
                  <th key={i}>
                    {item} ({listBooks.length})
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            <tr>
              {Object.keys(formatBooks).map((item, i) => {
                const listBooks = formatBooks[item];
                return (
                  <td key={i}>
                    {listBooks?.map((book: any) => (
                      <div
                        key={book.id}
                        className={cls.link}
                        onClick={() => {
                          navigate(getBookEdit(book.id));
                        }}
                      >
                        {book.title} {book.fullName}
                      </div>
                    ))}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </Page>
  );
};

export default StatisticsPage;
