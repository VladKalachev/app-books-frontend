import { Switch as Sw, SwitchProps } from "@headlessui/react";
import { classNames } from "@/shared/libs/classNames/classNames";

import cls from "./Switch.module.scss";
import { HStack } from "../Stack";
import { Text } from "../Text";

interface SwProps extends SwitchProps<any> {
  className?: string;
  label?: string;
}

export function Switch(props: SwProps) {
  const { checked, className, label } = props;

  const component = (
    <Sw
      className={classNames(cls.Switch, {}, [
        className,
        `relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent  duration-200 ease-in-out`,
      ])}
      {...props}
    >
      <span
        aria-hidden="true"
        className={`${checked ? "translate-x-8" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Sw>
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
}
