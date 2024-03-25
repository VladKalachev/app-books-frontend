import { GenreAddForm } from "@/features/GenreAddForm";

interface AddGenrePageProps {
  className?: string;
}

const AddGenrePage = ({ className }: AddGenrePageProps) => {
  return (
    <div className={className}>
      <GenreAddForm />
    </div>
  );
};

export default AddGenrePage;
