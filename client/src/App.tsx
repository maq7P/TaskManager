import Container from '@material-ui/core/Container';
import React from 'react';
import {useRoutes} from "./routes/routes";
import {BrowserRouter as Router} from "react-router-dom";
import {useAuth} from "./hooks/auth.hook";
import { AuthContext } from './context/auth.context';

function App() {
    const {login, logout, token, person, setPerson} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
  return (
          <AuthContext.Provider value={{
              token,
              login,
              logout,
              isAuthenticated,
              person, 
              setPerson
          }}>
              <Router>
                  {routes}
              </Router>
          </AuthContext.Provider>
  );
}

export default App;
