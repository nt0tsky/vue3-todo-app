import {State} from './state';
import {MutationTree} from "vuex";
import {TaskDTO} from "@/store/models/taskDTO";
import {UserDTO} from "@/store/models/userDTO";

export enum MutationTypes {
    SET_PAGE_DATA = 'SET_PAGE_DATA',

    SET_USER_DATA = "SET_USER_DATA"
}

export type Mutations<S = State> = {
    [MutationTypes.SET_PAGE_DATA](state: S, payload: { page: number, list: UserDTO[], total: number }): void

    [MutationTypes.SET_USER_DATA](state: State, payload: { userId: number, tasks: TaskDTO[] }): void
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.SET_PAGE_DATA](state, { page, list, total }) {
        const { users } = state;

        state.users = {...users, page, list, total };
    },

    [MutationTypes.SET_USER_DATA](state, { userId, tasks} ) {
        let tasksStorage = state.users.tasksStorage || {};

        tasksStorage[userId] = tasks;

        state.users.tasksStorage = tasksStorage;
    }
}