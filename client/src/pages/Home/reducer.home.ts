import { 
    INITIAL_DATA, UPDATE_RESPONSIBLE
} from "./constants";
interface Status {
    id: number,
    title: string,
    createAt: string | Date
    updatedAt: string | Date
}
interface Priority {
    id: number
    title: string
    createAt: string | Date
    updatedAt: string | Date
    color: string
}
interface SystemStateTree {
    status: Status[],
    priority: Priority[],
    responsible: any,
}
interface SystemState {
  home: SystemStateTree
}
export interface SystemAction {
    type: string,
    payload?: any
}

export const homeInitialState: SystemState  = {
    home: {
        status: [],
        priority: [],
        responsible: []
    }
};

export const homeReducer = (
    state: SystemState = homeInitialState, 
    action: SystemAction
) => {

    switch(action.type) {
        case INITIAL_DATA:
            return {
                ...state,
                home: {
                    ...action.payload
                }
            }
        case UPDATE_RESPONSIBLE:
            return {
                ...state,
                home: {
                    ...state.home,
                    responsible: [
                        ...state.home.responsible,
                        ...action.payload
                    ]
                }
            }
        default:
            return state
    }
};
