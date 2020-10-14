import {TaskDTO} from "@/store/models/taskDTO";
import {UserDTO} from "@/store/models/userDTO";

export interface TaskStorage {
  [userId: string]: TaskDTO[]
}

export interface UsersState {
  page: number,
  total: number,
  list: UserDTO[],
  tasksStorage: TaskStorage
}

export const state = {
  users: {} as UsersState
}

export type State = typeof state