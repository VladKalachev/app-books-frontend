import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { useEffect, useState } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { useNavigate, useParams } from 'react-router-dom';
import { getBooksPage } from '@/shared/consts/router';
import { toast } from 'react-toastify';

import { GenresService, IGenre, IGenreCreate } from '@/entities/Genre';

import cls from './GenreEditForm.module.scss';
import { observer } from 'mobx-react-lite';
import useStore from '@/app/providers/StoreProvider/config/useStore';

interface GenreEditFormProps {
  className?: string;
}

export const GenreEditForm = observer((props: GenreEditFormProps) => {
  const params = useParams<'id'>();
  const { className } = props;
  const { user } = useStore();
  const navigate = useNavigate();

  const [title, setTitle] = useState<IGenre['title']>('');

  const [loading, setLoading] = useState(false);

  const getAuthorById = async (id: string) => {
    setLoading(true);
    try {
      const genre = await GenresService.getGenreById(id);

      const formData = genre.data;

      setTitle(formData.title);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      if (params?.id) {
        getAuthorById(params?.id);
      }
    } catch (error) {
      console.log(error);
    }
  }, [params.id]);

  const handleSubmit = async () => {
    const form: IGenreCreate = {
      title,
    };
    try {
      await GenresService.updateGenre(params.id as string, form);
      navigate(getBooksPage());
    } catch (error: any) {
      console.log(error);
    }
  };

  const onDeleteById = async (id: string) => {
    try {
      await GenresService.deleteGenreById(id);
      toast('Жанр успешно удален');
      navigate(getBooksPage());
    } catch (error: any) {
      console.log(error);
    }
  };

  if (loading) {
    return <>Загрузка...</>;
  }

  return (
    <VStack gap="16" className={classNames(cls.GenreForm, {}, [className])}>
      <h1>Редактировать Жанр</h1>
      <Input
        autofocus
        type="text"
        className={cls.input}
        placeholder={'Введите Жанр'}
        onChange={(value) => setTitle(value)}
        value={title}
      />

      <Button className={cls.loginBtn} onClick={handleSubmit}>
        {'Редактировать'}
      </Button>
      <Button
        className={cls.loginBtn}
        disabled={!user.user?.isAdmin}
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
});
