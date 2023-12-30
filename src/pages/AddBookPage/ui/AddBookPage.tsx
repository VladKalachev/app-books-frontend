import { AddBookForm } from "@/features/BookAddForm";

interface AddBookPageProps {
  className?: string;
}

const AddBookPage = ({ className }: AddBookPageProps) => {
  return (
    <div className={className}>
      <AddBookForm />
    </div>
  );
};

export default AddBookPage;
