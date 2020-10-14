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

const defaultState: UsersState = {
  page: 1,
  total: 0,
  list: [] as UserDTO[],
  tasksStorage: {} as TaskStorage
}

export const state = {
  users: defaultState
}

export type State = typeof state