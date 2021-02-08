import {createContext} from "react";
import { SystemAction } from "../components/TaskBlock/reducer.tasks";

interface TasksContextInt {
    state: object,
    dispatch: (newObject: SystemAction) => object
}
const noop = () => {}

export const TasksContext = createContext<any>({
    state: {},
    dispatch: () => ({type: ''}),
})