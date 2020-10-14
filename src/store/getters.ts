import {GetterTree} from 'vuex'
import {State} from './state'
import {UserDTO} from "@/store/models/userDTO";
import {TaskDTO} from "@/store/models/taskDTO";

export type Getters = {
    users(state: State): UserDTO[] | null,
    total(state: State): Number,
    page(state: State): Number,
    tasks(state: State): (userId: number) => TaskDTO[] | null
}

export const getters: GetterTree<State, State> & Getters = {
    users: (state) => state.users.list,

    total: (state) => state.users.total,

    page: (state) => state.users.page,

    tasks: (state) => (userId: number) => {
        const {tasksStorage} = state.users;
        if (!userId || !tasksStorage || !(userId in tasksStorage)) {
            return null;
        }

        return tasksStorage[userId];
    }
}