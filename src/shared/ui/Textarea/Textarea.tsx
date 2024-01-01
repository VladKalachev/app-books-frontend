import React, { memo, useRef } from "react";
import { classNames } from "@/shared/libs/classNames/classNames";
import { HStack } from "../Stack";
import { Text } from "../Text";
import cls from "./Textarea.module.scss";

type HTMLTextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onChange"
>;

export interface TextareaProps extends HTMLTextareaProps {
  className?: string;
  onChange?: (value: string) => void;
  label?: string;
}

export const Textarea = memo((props: TextareaProps) => {
  const {
    className,
    value,
    children,
    onChange,
    placeholder,
    label,
    ...otherProps
  } = props;
  const ref = useRef<HTMLTextAreaElement>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  const textarea = (
    <div className={classNames(cls.TextAreaWrapper, {}, [className])}>
      <textarea
        ref={ref}
        value={value}
        onChange={onChangeHandler}
        className={cls.input}
        rows={4}
        placeholder={placeholder}
        {...otherProps}
      >
        {children}
      </textarea>
    </div>
  );

  if (label) {
    return (
      <HStack max gap="8">
        <Text text={label} />
        {textarea}
      </HStack>
    );
  }

  return textarea;
});
