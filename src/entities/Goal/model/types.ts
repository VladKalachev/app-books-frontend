export interface IGoal {
  id: number;
  title: string;
  completed: boolean;
  currentPages: number;
  numberPages: number;
  BookId: number;
}

export interface IGoalCreate {
  title: string;
  currentPages: number;
}
