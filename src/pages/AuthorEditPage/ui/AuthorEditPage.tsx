import { AuthorEditForm } from "@/features/AuthorEditForm";

interface AuthorEditPageProps {
  className?: string;
}

const AuthorEditPage = ({ className }: AuthorEditPageProps) => {
  return (
    <div className={className}>
      <AuthorEditForm />
    </div>
  );
};

export default AuthorEditPage;
