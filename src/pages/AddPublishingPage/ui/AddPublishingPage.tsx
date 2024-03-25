import { AuthorAddForm } from "@/features/AuthorAddForm";

interface AddPublishingPageProps {
  className?: string;
}

const AddPublishingPage = ({ className }: AddPublishingPageProps) => {
  return (
    <div className={className}>
      <AuthorAddForm />
    </div>
  );
};

export default AddPublishingPage;
