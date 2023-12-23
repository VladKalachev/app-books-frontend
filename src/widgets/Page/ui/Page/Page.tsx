import { ReactNode } from "react";

interface PageProps  {
  className?: string;
  children: ReactNode;
}

export const Page = (props: PageProps) => {
  const { children } = props;
  
  return (
    <main>
      {children}
    </main>
  )
}