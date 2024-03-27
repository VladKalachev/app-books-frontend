import { memo } from "react";
import ThemeIcon from "@/shared/assets/icons/theme.svg?react";
import { Icon } from "@/shared/ui/Icon";
import { useTheme } from "@/shared/hooks/useTheme/useTheme";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { toggleTheme } = useTheme();

  return (
    <Icon
      Svg={ThemeIcon}
      className={className}
      clickable
      onClick={toggleTheme}
    />
  );
});
