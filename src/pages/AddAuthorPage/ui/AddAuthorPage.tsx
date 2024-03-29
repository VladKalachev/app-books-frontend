import { AuthorAddForm } from "@/features/AuthorAddForm";

interface AddAuthorPageProps {
  className?: string;
}

const AddAuthorPage = ({ className }: AddAuthorPageProps) => {
  return (
    <div className={className}>
      <AuthorAddForm />
    </div>
  );
};

export default AddAuthorPage;
