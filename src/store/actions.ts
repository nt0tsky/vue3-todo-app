import {Mutations, MutationTypes} from "./mutations";
import {State} from "./state";
import {ActionContext, ActionTree, DispatchOptions} from "vuex";
import {UserDTO} from "@/store/models/userDTO";
import {TaskDTO} from "@/store/models/taskDTO";

export enum ActionTypes {
    GET_USERS = 'GET_USERS',
    GET_USER_TASKS = "GET_USER_TASKS"
}

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>,
    state: State,
    dispatch<K extends keyof Actions>(
        key: K,
        payload: Parameters<Actions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<Actions[K]>
} & Omit<ActionContext<State, State>, 'commit' | 'getters' | 'dispatch'>

export interface Actions {
    [ActionTypes.GET_USERS](
        {commit}: AugmentedActionContext,
        payload: { page: number, limit: number }
    ): Promise<UserDTO[]>

    [ActionTypes.GET_USER_TASKS](
        {commit}: AugmentedActionContext,
        payload: { userId: number }
    ): Promise<TaskDTO[]>
}

export const actions: ActionTree<State, State> & Actions = {
    [ActionTypes.GET_USERS]({commit}, {page, limit}) {
        return fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`).then(async res => {
            const total = Number(res.headers.get('x-total-count'));
            const list = await res.json();

            return [total, list];
        }).then(([total, list ]) => {
            commit(MutationTypes.SET_PAGE_DATA, { page, total, list });

            return list;
        });
    },

    [ActionTypes.GET_USER_TASKS]({commit}, {userId}) {
        return fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`).then(res => res.json()).then((tasks: TaskDTO[]) => {
            commit(MutationTypes.SET_USER_DATA, { userId, tasks });

            return tasks;
        });
    }
}