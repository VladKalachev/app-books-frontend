import { GoalList, GoalListItem } from "@/entities/Goal";
import { useState } from "react";

export const GoalsList = () => {
  const [goals] = useState([]);

  return (
    <>
      <GoalList
        goals={goals}
        renderList={(goal) => <GoalListItem key={goal.id} goal={goal} />}
      />
    </>
  );
};
