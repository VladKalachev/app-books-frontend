import { AxiosResponse } from 'axios';
import $api from '@/shared/plugins/http';
import { IGoal, IGoalCreate } from '..';

export class GoalService {
  static fetchGoals(q: string = ''): Promise<AxiosResponse<IGoal[]>> {
    return $api.get<IGoal[]>(`/goals${q}`);
  }

  static addGoal(formData: any): Promise<AxiosResponse<IGoal>> {
    return $api.post<IGoal>('/goals/create', formData);
  }

  static getGoalById(id: string): Promise<AxiosResponse<IGoal>> {
    return $api.get<IGoal>(`/goals/${id}`);
  }

  static updateGoal(id: string, genre: IGoalCreate): Promise<AxiosResponse<IGoal>> {
    return $api.put<IGoal>(`/goals/${id}`, genre);
  }

  static deleteGoalById(id: string): Promise<AxiosResponse<IGoal>> {
    return $api.delete<IGoal>(`/goals/${id}`);
  }

  static completedGoalById(id: number, completed: any): Promise<AxiosResponse<IGoal>> {
    return $api.put<IGoal>(`/goals/completed/${id}`, completed);
  }
}
