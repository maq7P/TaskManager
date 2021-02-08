import { UPDATE_TASKS, 
    INITIAL_DATA, 
    SET_TASKS, 
    UPDATE_TASK_PARAM, 
    FILTER_BY_STATUS,
    DELETE_TASK,
    TASK_LOADING,
    SORT_BY
} from "./constants";

export interface Task {
  id?: number
  title: string
  description?: string
  priority_title?: string
  priority_id?: string
  responsible_title?: string
  responsible_id?: number
  creator_title?: string
  creator_id?: number
  status_title?: string
  priority_color?: string
  end_time: string | Date
  start_time?: string | Date
  status_id?: number
  createAt?: string | Date
  updatedAt?: string | Date,
  setOpenAlertSuccess?: any
  setMessageAlert?: any
}

interface SystemStateTree {
    tasks: Task[],
    _tasks: Task[], 
    filter_ids: number[],
    loading: boolean,
    sortByDateUpdate: boolean
}
interface SystemState {
  dashboard: SystemStateTree
}
export interface SystemAction {
    type: string,
    payload?: any
}

export const tasksInitialState: SystemState  = {
    dashboard: {
        tasks: [],
        _tasks: [],  // copy state
        filter_ids: [1,2,3,4], //need in future get from server
        loading: false,
        sortByDateUpdate: true
    }
};

export const tasksReducer = (
    state: SystemState = tasksInitialState, 
    action: SystemAction
) => { 
    const checkFilters = (tasks: Task[], sort = state.dashboard.sortByDateUpdate): Task[] => {
        //sort by date update  

        //console.log(sort, 'sort');
        
        //if(sort){
            tasks = tasks.sort(function(a,b){
                //@ts-ignore
                return new Date(b.updatedAt) - new Date(a.updatedAt)
            });
        //}

        // filter by id
        return tasks.filter(task => {
            return state.dashboard.filter_ids.join('').includes(task.status_id+'')
        })
    }
    
    switch(action.type) {
        case INITIAL_DATA:{
            return {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    task: checkFilters(
                        action.payload.tasks
                    ),
                    _tasks: [...action.payload.tasks]
                }
            }
        }
        case UPDATE_TASKS:{
            return {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    tasks: checkFilters([
                        ...state.dashboard.tasks,
                        ...action.payload
                    ]),
                    _tasks: [...action.payload]
                }
            }
        }
        case SET_TASKS: {
            return {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    tasks: checkFilters(action.payload),
                    _tasks: [...action.payload]
                }
            }
        }
        case UPDATE_TASK_PARAM: {
            const tasks = state.dashboard.tasks.map(task => {
                if(task.id === +action.payload[0].id){
                    return {
                        ...task,
                        ...action.payload[0]
                    }
                }
                
                return task
            })
            console.log(tasks, 'finished');
            return {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    tasks: checkFilters(tasks),
                    _tasks: [...tasks]
                }
            }
        }
        case FILTER_BY_STATUS: {
                    
            return {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    tasks: state.dashboard._tasks.filter(task => {    
                        return action.payload.join('').includes(task.status_id)
                    }),
                    filter_ids: action.payload
                }
            }
        }
        case DELETE_TASK: {
            const newTasks = state.dashboard._tasks.filter(task => {    
                return task.id !== action.payload
            })
            return {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    tasks: checkFilters(newTasks),
                    _tasks: newTasks
                }
            }
        }
        case TASK_LOADING: {
            return {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    loading: !state.dashboard.loading
                }
            }
        }
        case SORT_BY: {
            // console.log(state.dashboard.tasks, 'до');
            // const tasks = checkFilters(state.dashboard.tasks, !state.dashboard.sortByDateUpdate)
            // console.log(tasks, 'после');
            // return {
            //     ...state,
            //     dashboard: {
            //         ...state.dashboard,
            //         tasks,
            //         sortByDateUpdate: !state.dashboard.sortByDateUpdate
            //     }
            // }
            return state
        }
        default:
            return state
    }
};
