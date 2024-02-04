import { AuthorEditForm } from "@/features/AuthorEditForm";

interface AuthorEditPageProps {
  className?: string;
}

const BookEditPage = ({ className }: AuthorEditPageProps) => {
  return (
    <div className={className}>
      <AuthorEditForm />
    </div>
  );
};

export default BookEditPage;
