import { GoalEditForm } from "@/features/goals/GoalEditForm";

interface GoalEditPageProps {
  className?: string;
}

const GoalEditPage = ({ className }: GoalEditPageProps) => {
  return (
    <div className={className}>
      <GoalEditForm />
    </div>
  );
};

export default GoalEditPage;
