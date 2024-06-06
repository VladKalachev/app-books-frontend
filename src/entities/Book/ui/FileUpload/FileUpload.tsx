import { useState } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import cls from './FileUpload.module.scss';
import { Button } from '@/shared/ui/Button';
import { API_URL } from '@/shared/plugins/http';
import $api from '@/shared/plugins/http';
import { AppImage } from '@/shared/ui/AppImage';
import { Skeleton } from '@/shared/ui/Skeleton';

interface FileUploadWithLoaderProps {
  className?: string;
  onChange(value: any): void;
  label?: string;
  image?: string;
}

export const FileUploadWithLoader = (props: FileUploadWithLoaderProps) => {
  const { label, image, className, onChange } = props;
  const [imagePreviewUrl, setImagePreviewUrl] = useState<any>('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [preview, setPreview] = useState(true);

  const handleFileChange = (event: any) => {
    event.preventDefault();

    const reader = new FileReader();
    setPreview(false);
    const content = event.target.files[0];
    setFile(content);
    setMessage('');

    reader.onloadend = () => {
      setImagePreviewUrl(reader?.result);
    };

    if (content) reader.readAsDataURL(content);

    if (!content) onChange('');
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!file) {
      setMessage('Пожалуйста выберите файл для загрузки.');
      return;
    }

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await $api.post(`/file`, formData);
      onChange(response.data.filePath.split('/')[1]);

      setMessage('Файл успешно загружен');
    } catch (error: any) {
      setMessage('Ошибка загрузки файла: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const component = (
    <div className={classNames(cls.ImageLoader, {}, [className])}>
      <form onSubmit={handleSubmit}>
        {image && preview ? (
          <AppImage
            fallback={<Skeleton width="100%" height={200} />}
            alt={image}
            src={`${API_URL}/uploads/${image}`}
            className={cls.img}
          />
        ) : null}
        <input type="file" onChange={handleFileChange} />

        <div className="imgPreview">{file ? <img src={imagePreviewUrl} alt="img" /> : null}</div>

        {loading && <p>Загрузка...</p>}
        {message && <p>{message}</p>}

        <Button type="submit" disabled={loading}>
          Загрузить
        </Button>
      </form>
    </div>
  );

  if (label) {
    return (
      <HStack max gap="8">
        <Text text={label} />
        {component}
      </HStack>
    );
  }

  return component;
};
