import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import HomePage from '../pages/Home/HomePage'
import AuthPage from "../pages/Auth/Auth.page";

export const useRoutes = (isAuthenticated: boolean):React.ReactElement => {
    if(isAuthenticated){
        return (
            <Switch>
                <Route path="/home" exact>
                    <HomePage />
                </Route>
                <Redirect to="/home"/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}