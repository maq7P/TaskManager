import {
    INITIAL_DATA, UPDATE_RESPONSIBLE
} from './constants'

interface Action {
  type: typeof INITIAL_DATA | typeof UPDATE_RESPONSIBLE
  payload: object | []
}

export const initial_data = (data: object): Action => {
    return {
        type: INITIAL_DATA,
        payload: data
    }
}
export const update_responsible = (data: []): Action => {
    return {
        type: UPDATE_RESPONSIBLE,
        payload: data
    }
}