import { PublishingAddForm } from "@/features/PublishingAddForm";

interface AddPublishingPageProps {
  className?: string;
}

const AddPublishingPage = ({ className }: AddPublishingPageProps) => {
  return (
    <div className={className}>
      <PublishingAddForm />
    </div>
  );
};

export default AddPublishingPage;
