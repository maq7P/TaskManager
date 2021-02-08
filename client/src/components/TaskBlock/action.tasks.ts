import {
    INITIAL_DATA, UPDATE_TASKS, 
    SET_TASKS, UPDATE_TASK_PARAM, 
    FILTER_BY_STATUS, DELETE_TASK,
    TASK_LOADING, SORT_BY
} from './constants'

interface Action {
  type: 
    typeof UPDATE_TASKS |
    typeof INITIAL_DATA |
    typeof SET_TASKS |
    typeof UPDATE_TASK_PARAM |
    typeof FILTER_BY_STATUS |
    typeof DELETE_TASK |
    typeof TASK_LOADING |
    typeof SORT_BY 

  payload?: object[] | object | number[] | number
}

export const initial_tasks = (data: object): Action => {
    return {
        type: INITIAL_DATA,
        payload: data
    }
}
export const update_data = (data: object[]): Action => {
    return {
        type: UPDATE_TASKS,
        payload: data
    }
}
export const set_tasks = (data: object[]): Action => {
    return {
        type: SET_TASKS,
        payload: data
    }
}
export const upadte_task_param = (data: object): Action => {
    return {
        type: UPDATE_TASK_PARAM,
        payload: data
    }
}
export const filter_by_status = (status_ids: number[]): Action => {
    return {
        type: FILTER_BY_STATUS,
        payload: status_ids
    }
}
export const delete_task = (id: number): Action => {
    return {
        type: DELETE_TASK,
        payload: id
    }
}
export const task_loading = (): Action => {
    return {
        type: TASK_LOADING
    }
}
export const sort_by_update = (): Action => {
    return {
        type: SORT_BY
    }
}