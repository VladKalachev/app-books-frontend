import { AuthorAddForm } from "@/features/AuthorAddForm";

interface AddGenrePageProps {
  className?: string;
}

const AddGenrePage = ({ className }: AddGenrePageProps) => {
  return (
    <div className={className}>
      <AuthorAddForm />
    </div>
  );
};

export default AddGenrePage;
