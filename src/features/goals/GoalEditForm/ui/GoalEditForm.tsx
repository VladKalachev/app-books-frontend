import { Button } from '@/shared/ui/Button';
import { useEffect, useState } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { useNavigate, useParams } from 'react-router-dom';
import { getGoalsPage } from '@/shared/consts/router';
import { toast } from 'react-toastify';
import { GoalService, IGoal, IGoalCreate } from '@/entities/Goal';
import cls from './GoalEditForm.module.scss';
import { Select } from '@/shared/ui/Select';
import { BooksService } from '@/entities/Book';
import { InputNumber } from '@/shared/ui/InputNumber';

interface GenreEditFormProps {
  className?: string;
}

export const GoalEditForm = (props: GenreEditFormProps) => {
  const params = useParams<'id'>();
  const { className } = props;

  const navigate = useNavigate();

  const [title, setTitle] = useState<IGoal['title']>('');
  const [currentPages, setCurrentPages] = useState<IGoal['currentPages']>(0);
  const [books, setBooks] = useState<any[]>([]);
  const [bookId, setBookId] = useState<any>('null');

  const [loading, setLoading] = useState(false);

  const getGoalById = async (id: string) => {
    setLoading(true);
    try {
      const goal = await GoalService.getGoalById(id);

      const formData = goal.data;

      setTitle(formData.title);
      setBookId(formData.BookId);
      setCurrentPages(formData.currentPages);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getBooks = async () => {
    try {
      const bookList = await BooksService.fetchUBooks();

      const optionsBook = bookList.data?.map((book) => ({
        value: book.id,
        content: book.title,
      }));

      const data: any = [...optionsBook, { value: 'null', content: 'Не выбран' }];
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks();
    try {
      if (params?.id) {
        getGoalById(params?.id);
      }
    } catch (error) {
      console.log(error);
    }
  }, [params.id]);

  const handleSubmit = async () => {
    const form: IGoalCreate = {
      title,
      currentPages,
    };

    try {
      await GoalService.updateGoal(params.id as string, form);
      navigate(getGoalsPage());
    } catch (error: any) {
      console.log(error);
    }
  };

  const onDeleteById = async (id: string) => {
    try {
      await GoalService.deleteGoalById(id);
      toast('Цель успешно удален');
      navigate(getGoalsPage());
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSelectBook = (value: string) => {
    if (value !== 'null') {
      const selectValue = books?.find((book) => book.value === Number(value));
      setTitle(selectValue?.content);
    } else {
      setTitle('');
    }
    setBookId(value);
  };

  if (loading) {
    return <>Загрузка...</>;
  }

  return (
    <VStack gap="16" className={classNames(cls.GoalForm, {}, [className])}>
      <h1>Редактировать Цель</h1>

      <Select
        label={'Введите Название Книги'}
        value={bookId}
        options={books}
        readonly
        className={cls.selectedBook}
        onChange={(value) => handleSelectBook(value)}
      />

      <InputNumber
        type="number"
        className={cls.input}
        label={'Количество страниц которое прочитано'}
        placeholder={'Введите значение'}
        onChange={(value) => setCurrentPages(value)}
        value={currentPages}
      />

      <Button className={cls.loginBtn} onClick={handleSubmit}>
        {'Редактировать'}
      </Button>
      <Button
        className={cls.loginBtn}
        onClick={() => {
          if (params.id) {
            onDeleteById(params.id.toString());
          }
        }}
      >
        {'Удалить'}
      </Button>
    </VStack>
  );
};
