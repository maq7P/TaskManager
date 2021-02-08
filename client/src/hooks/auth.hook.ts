import React from 'react'
import { Person } from '../context/auth.context'
const storageName: string = 'userData'
const storageUser: string = 'person'

export const useAuth = () => {
    const [token, setToken] = React.useState<string | null>(null)
    const [person, _setPerson] = React.useState<Person>({
        id: NaN,
        role: '',
        login: ''
    })

    const setPerson = React.useCallback((person: any):void => {
        _setPerson(person)
        localStorage.setItem(storageUser, JSON.stringify(person))
    }, [])

    const login = React.useCallback((jwtToken: string):void => {
        setToken(jwtToken)
        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken
        }))
    }, [])

    const logout  = React.useCallback(():void => {
        setToken(null)
        localStorage.removeItem(storageName)
        localStorage.removeItem(storageUser)
        // _setPerson({
        //     id: NaN,
        //     role: '',
        //     login: ''
        // })
    }, [])

    React.useEffect(() => {
        // @ts-ignore
        const data = JSON.parse(localStorage.getItem(storageName))
        if(data && data.token){
            login(data.token)
        }
        // @ts-ignore
        const person = JSON.parse(localStorage.getItem(storageUser))
        if(person){
            _setPerson(person)
        }
    }, [login])

    return {login, logout, token, setPerson, person}
}