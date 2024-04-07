import { GoalAddForm } from "@/features/goals/GoalAddForm";

interface AddGoalPageProps {
  className?: string;
}

const AddGoalPage = ({ className }: AddGoalPageProps) => {
  return (
    <div className={className}>
      <GoalAddForm />
    </div>
  );
};

export default AddGoalPage;
