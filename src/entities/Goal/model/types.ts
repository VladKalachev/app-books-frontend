export interface IGoal {
  id: number;
  title: string;
  completed: boolean;
  BookId: number;
}

export interface IGoalCreate {
  title: string;
}
