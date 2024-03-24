import { GenreEditForm } from "@/features/GenreEditForm";

interface GenreEditPageProps {
  className?: string;
}

const GenreEditPage = ({ className }: GenreEditPageProps) => {
  return (
    <div className={className}>
      <GenreEditForm />
    </div>
  );
};

export default GenreEditPage;
