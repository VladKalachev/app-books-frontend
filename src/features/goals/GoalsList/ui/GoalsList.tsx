import { GoalList, GoalListItem, GoalService, IGoal } from "@/entities/Goal";
import { useEffect, useState } from "react";

export const GoalsList = () => {
  const [goals, setGoals] = useState<IGoal[]>([]);

  const getGoals = async (q: string) => {
    try {
      const goalsList = await GoalService.fetchGoals(q ? `?search=${q}` : "");
      setGoals(goalsList.data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = async (goal: IGoal) => {
    try {
      await GoalService.completedGoalById(goal.id, {
        completed: !goal.completed,
      });
      getGoals("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGoals("");
    () => {
      setGoals([]);
    };
  }, []);

  return (
    <>
      <GoalList
        goals={goals}
        renderList={(goal) => (
          <GoalListItem
            key={goal.id}
            onClose={() => handleClose(goal)}
            goal={goal}
          />
        )}
      />
    </>
  );
};
