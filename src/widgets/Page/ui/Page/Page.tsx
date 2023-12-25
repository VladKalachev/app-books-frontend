import { ReactNode } from "react";

interface PageProps {
  className?: string;
  children: ReactNode;
}

export const Page = (props: PageProps) => {
  const { children, className } = props;

  return <main className={className}>{children}</main>;
};
