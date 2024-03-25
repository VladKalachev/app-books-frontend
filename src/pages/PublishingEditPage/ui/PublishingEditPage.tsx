import { AuthorAddForm } from "@/features/AuthorAddForm";

interface PublishingEditPageProps {
  className?: string;
}

const PublishingEditPage = ({ className }: PublishingEditPageProps) => {
  return (
    <div className={className}>
      <AuthorAddForm />
    </div>
  );
};

export default PublishingEditPage;
