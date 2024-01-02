import { classNames } from "@/shared/libs/classNames/classNames";
import { useState } from "react";
import cls from "./ImageLoader.module.scss";
import { HStack } from "../Stack";
import { Text } from "../Text";

interface ImageLoaderProps {
  className?: string;
  value: any;
  onChange(value: any): void;
  label?: string;
}

export const ImageLoader = (props: ImageLoaderProps) => {
  const { className, value, onChange, label } = props;

  const [imagePreviewUrl, setImagePreviewUrl] = useState<any>("");

  const handleImageChange = (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    const reader = new FileReader();

    const content = e.target.files[0];

    reader.onloadend = () => {
      onChange(content);
      setImagePreviewUrl(reader?.result);
    };

    if (content) reader.readAsDataURL(content);

    if (!content) onChange("");
  };

  const component = (
    <div className={classNames(cls.ImageLoader, {}, [className])}>
      <input type="file" onChange={(e) => handleImageChange(e)} />
      <div className="imgPreview">
        {typeof value !== "string" ? (
          <img src={imagePreviewUrl} alt="img" />
        ) : null}
      </div>
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
