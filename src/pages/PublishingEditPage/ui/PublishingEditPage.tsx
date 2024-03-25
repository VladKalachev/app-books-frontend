import { PublishingEditForm } from "@/features/PublishingEditForm";

interface PublishingEditPageProps {
  className?: string;
}

const PublishingEditPage = ({ className }: PublishingEditPageProps) => {
  return (
    <div className={className}>
      <PublishingEditForm />
    </div>
  );
};

export default PublishingEditPage;
