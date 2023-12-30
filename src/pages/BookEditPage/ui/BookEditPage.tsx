import { BookEditForm } from "@/features/BookEditForm";

interface BookEditPageProps {
  className?: string;
}

const BookEditPage = ({ className }: BookEditPageProps) => {
  return (
    <div className={className}>
      <BookEditForm />
    </div>
  );
};

export default BookEditPage;
