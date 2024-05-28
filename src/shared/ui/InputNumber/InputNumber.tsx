import {
  InputHTMLAttributes,
  ChangeEvent,
  memo,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { classNames, Mods } from '@/shared/libs/classNames/classNames';
import { HStack } from '../Stack';
import { Text } from '../Text';
import cls from './InputNumber.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly' | 'size'
>;

type InputSize = 's' | 'm' | 'l';

interface InputNumberProps extends HTMLInputProps {
  className?: string;
  value?: number;
  label?: string;
  onChange?: (value: number) => void;
  autofocus?: boolean;
  readonly?: boolean;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  size?: InputSize;
}

export const InputNumber = memo((props: InputNumberProps) => {
  const {
    className,
    value,
    onChange,
    type = 'number',
    placeholder,
    autofocus,
    readonly,
    addonLeft,
    addonRight,
    label,
    size = 'm',
    ...otherProps
  } = props;
  const ref = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (autofocus) {
      setIsFocused(true);
      ref.current?.focus();
    }
  }, [autofocus]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    // @ts-ignore
    onChange?.(Number(e.target.value));
  };

  const onBlur = () => {
    // console.log('onBlur');
    setIsFocused(false);
  };

  const onFocus = () => {
    // console.log('onFocus');
    setIsFocused(true);
  };

  const mods: Mods = {
    [cls.readonly]: readonly,
    [cls.focused]: isFocused,
    [cls.withAddonLeft]: Boolean(addonLeft),
    [cls.withAddonRight]: Boolean(addonRight),
  };

  const input = (
    <div className={classNames(cls.InputWrapper, mods, [className, cls[size]])}>
      <div className={cls.addonLeft}>{addonLeft}</div>
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChangeHandler}
        className={cls.input}
        onFocus={onFocus}
        onBlur={onBlur}
        readOnly={readonly}
        placeholder={placeholder}
        {...otherProps}
      />
      <div className={cls.addonRight}>{addonRight}</div>
    </div>
  );

  if (label) {
    return (
      <HStack max gap="8">
        <Text text={label} />
        {input}
      </HStack>
    );
  }

  return input;
});
