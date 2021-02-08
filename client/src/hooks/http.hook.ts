import React from 'react'
import { AuthContext } from '../context/auth.context'
const storageName: string = 'userData'

//const BASE_URL = 'http://localhost:4000/api'
const BASE_URL = 'https://nameless-cliffs-71201.herokuapp.com/api'

export const useHttp = () => {
    const [loading, setLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string | null>(null)
    const {token} = React.useContext(AuthContext)
    const request = React.useCallback(async (url, method='GET', body=null, headers = {}) => {
        setLoading(true)
        headers['Authorization'] = `Bearer ${token}`
        if(body){
            body = JSON.stringify(body)
            headers['Content-type'] = 'application/json'
        } 
        try{
            const res = await fetch(`${BASE_URL}${url}`, {method, headers, body})
            const data = await res.json()

            if(!res.ok){
                throw new Error(data.message || 'Что-то пошло не так')
            }

            return data
        } catch(e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }, [])

    const clearError = () => {
        setError(null)
    }

    return {loading, request, error, clearError}
}