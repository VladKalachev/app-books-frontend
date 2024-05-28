import { BooksService, FileUploadWithLoader, IBook, IBookCreate } from '@/entities/Book';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { useEffect, useState } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { useNavigate, useParams } from 'react-router-dom';
import { getBooksPage } from '@/shared/consts/router';
import { toast } from 'react-toastify';

import cls from './BookEditForm.module.scss';
import { Textarea } from '@/shared/ui/Textarea';
import { InputNumber } from '@/shared/ui/InputNumber';
import { Switch } from '@/shared/ui/Switch';
// import { Skeleton } from '@/shared/ui/Skeleton';
// import { AppImage } from '@/shared/ui/AppImage';
// import { ImageLoader } from '@/shared/ui/ImageLoader';
import { AuthorsService } from '@/entities/Author';
import { Select } from '@/shared/ui/Select';
import { GenresService } from '@/entities/Genre';
import { PublishingService } from '@/entities/Publishing';
// import { API_URL } from '@/shared/plugins/http';

interface AddBookFormProps {
  className?: string;
}

export const BookEditForm = (props: AddBookFormProps) => {
  const params = useParams<'id'>();
  const { className } = props;

  const navigate = useNavigate();

  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [publishing, setPublishing] = useState([]);

  const [authorId, setAuthorId] = useState<IBook['authorId']>('null');
  const [genreId, setGenreId] = useState<IBook['genreId']>('null');
  const [publishingId, setPublishingId] = useState<IBook['publishingId']>('null');

  const [title, setTitle] = useState<IBook['title']>('');
  const [description, setDescription] = useState<IBook['description']>('');

  const [fullName, setFullName] = useState<IBook['fullName']>('');
  const [image, setImage] = useState<IBook['image']>('');
  const [year, setYear] = useState<IBook['year']>(new Date().getFullYear());
  const [numberPages, setNumberPages] = useState<IBook['numberPages']>(0);

  const [notes, setNotes] = useState<IBook['notes']>('');
  const [read, setRead] = useState<IBook['read']>(false);
  const [buy, setBuy] = useState<IBook['buy']>(false);

  const [loading, setLoading] = useState(false);

  const getGenres = async () => {
    setLoading(true);
    try {
      const genreList = await GenresService.fetchGenres();
      const optionsGenre = genreList.data?.map((genre) => ({
        value: genre.id,
        content: genre.title,
      }));

      const data: any = [...optionsGenre, { value: 'null', content: 'Не выбран' }];
      setGenres(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getPublishing = async () => {
    setLoading(true);
    try {
      const publishingList = await PublishingService.fetchPublishing();
      const optionsPublishing = publishingList.data?.map((publishing) => ({
        value: publishing.id,
        content: publishing.title,
      }));

      const data: any = [...optionsPublishing, { value: 'null', content: 'Не выбран' }];
      setPublishing(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getAuthors = async () => {
    setLoading(true);
    try {
      const authorList = await AuthorsService.fetchAuthors();
      const optionsAuthor: any = authorList.data?.map((author) => ({
        value: author.id,
        content: author.fullName,
      }));

      const data: any = [...optionsAuthor, { value: 'null', content: 'Не выбран' }];
      setAuthors(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getBookById = async (id: string) => {
    setLoading(true);
    try {
      const book = await BooksService.getBookById(id);

      const formData = book.data;

      setTitle(formData.title);
      setDescription(formData.description);
      setFullName(formData.fullName);
      setImage(formData.image);

      if (formData.year) {
        setYear(formData.year);
      }

      setNumberPages(formData.numberPages);
      setNotes(formData.notes);
      setRead(formData.read);
      setBuy(formData.buy);
      setPublishingId(formData.publishingId ? formData.publishingId : 'null');
      setAuthorId(formData.authorId ? formData.authorId : 'null');
      setGenreId(formData.genreId ? formData.genreId : 'null');

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAuthors();
    getGenres();
    getPublishing();
    try {
      if (params?.id) {
        getBookById(params?.id);
      }
    } catch (error) {
      console.log(error);
    }
  }, [params.id]);

  const handleSubmit = async () => {
    const form: IBookCreate = {
      title,
      description,
      fullName,
      image,
      year,
      numberPages,
      notes,
      read,
      buy,
      authorId,
      genreId,
      publishingId,
    };

    if (authorId !== 'null') {
      const fullName: any = authors.find((author: any) => author.value === Number(authorId));
      form.fullName = fullName?.content;
      form.authorId = Number(authorId);
    } else {
      form.fullName = '';
      form.authorId = null;
    }

    if (genreId !== 'null') {
      const title: any = genres.find((genre: any) => genre.value === Number(genreId));

      if (title?.content) {
        form.genre = title?.content;
      } else {
        form.genre = '';
      }
      form.genreId = Number(genreId);
    } else {
      form.genre = '';
      form.genreId = null;
    }

    if (publishingId !== 'null') {
      const title: any = publishing.find((genre: any) => genre.value === Number(publishingId));

      if (title?.content) {
        form.publishing = title?.content;
      } else {
        form.publishing = '';
      }

      form.publishingId = Number(publishingId);
    } else {
      form.publishing = '';
      form.publishingId = null;
    }

    if (!read) {
      form.year = null;
    }

    console.log(form);

    try {
      await BooksService.updateBook(params.id as string, form);
      navigate(getBooksPage());
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteById = async (id: string) => {
    try {
      await BooksService.deleteBookById(id);
      toast('Книга успешно удалена');
      navigate(getBooksPage());
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <>Загрузка...</>;
  }

  return (
    <VStack gap="16" className={classNames(cls.LoginForm, {}, [className])}>
      <h1>Редактировать книгу </h1>
      <Input
        autofocus
        type="text"
        className={cls.input}
        placeholder={'Введите Название книги'}
        onChange={(value) => setTitle(value)}
        value={title}
      />
      <Textarea
        className={cls.input}
        value={description}
        placeholder={'Введите Описание книги'}
        onChange={(value) => setDescription(value)}
      />

      <Select
        label={'Введите жанр книги'}
        value={genreId}
        options={genres}
        onChange={(value) => setGenreId(value)}
      />

      <Select
        label={'Введите ФИО Автора'}
        value={authorId}
        options={authors}
        onChange={(value) => setAuthorId(value)}
      />

      {/* {image ? (
        <AppImage
          fallback={<Skeleton width="100%" height={200} />}
          alt={image}
          src={`${API_URL}uploads/${image}`}
          className={cls.img}
        />
      ) : null} */}

      <FileUploadWithLoader
        image={image}
        label={'Загрузите картинку'}
        onChange={(value) => setImage(value)}
      />

      {/* <ImageLoader
        label={'Загрузите картинку'}
        value={image}
        onChange={(value) => setImage(value)}
      /> */}
      <InputNumber
        type="number"
        className={cls.input}
        label={'Количество страниц (i)'}
        placeholder={'Введите значение'}
        onChange={(value) => setNumberPages(value)}
        value={numberPages}
      />
      <Select
        label={'Введите Издательство'}
        value={publishingId}
        options={publishing}
        onChange={(value) => setPublishingId(value)}
      />
      <Textarea
        className={cls.input}
        value={notes}
        placeholder={'Мои заметки'}
        onChange={(value) => setNotes(value)}
      />
      <Switch label={'Прочитано'} checked={read} onChange={(value) => setRead(value)} />
      {read && (
        <InputNumber
          type="number"
          className={cls.input}
          label={'Год когда прочитал книгу'}
          placeholder={'Введите значение'}
          onChange={(value) => setYear(value)}
          value={year}
        />
      )}

      <Switch label={'Купил'} checked={buy} onChange={(value) => setBuy(value)} />
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
