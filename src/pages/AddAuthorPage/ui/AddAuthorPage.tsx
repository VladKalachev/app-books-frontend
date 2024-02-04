import { AuthorAddForm } from "@/features/AuthorAddForm";

interface AddBookPageProps {
  className?: string;
}

const AddAuthorPage = ({ className }: AddBookPageProps) => {
  return (
    <div className={className}>
      <AuthorAddForm />
    </div>
  );
};

export default AddAuthorPage;
