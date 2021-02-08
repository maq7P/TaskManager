import {createContext} from "react";
import { SystemAction } from "../pages/Home/reducer.home";

interface HomeContextInt {
    state: object,
    dispatch: (newObject: SystemAction) => object
}
const noop = () => {}

export const HomeContext = createContext<any>({
    state: {},
    dispatch: () => ({type: ''}),
})
