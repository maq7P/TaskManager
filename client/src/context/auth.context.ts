import {createContext} from "react";
export interface Person {
    id: number,
    role: string,
    login: string
}
interface AuthContextInt {
    token: string | null,
    login: (jwt: string) => void,
    logout: () => void,
    isAuthenticated: boolean,
    person: Person,
    setPerson: (person: Person) => void
}
const noop = () => {}

export const AuthContext = createContext<AuthContextInt>({
    token: null,
    login: noop,
    logout: noop,
    isAuthenticated: false,
    person: {
        id: NaN,
        role: '',
        login: ''
    },
    setPerson: noop
})