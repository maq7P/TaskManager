import React from 'react'
import Dashboard from './Dashboard'
import FilterBar from './FilterBar'
import Scroll from './Scroll'

interface HeaderProps {
    employees: any
    responsibilityUsers: any
    classes: any
    setOpenAlertSuccess?: any
    setMessageAlert?: any
}
const Header: React.FC<HeaderProps> = ({
    employees, 
    responsibilityUsers, 
    classes,
    setOpenAlertSuccess = () => console.log(),
    setMessageAlert = () => console.log(),
}): React.ReactElement => {
    return (
        <nav className={classes.navbar}>
            <Dashboard
                employees={employees}
                setOpenAlertSuccess ={setOpenAlertSuccess}
                setMessageAlert={setMessageAlert}
            />
            <Scroll/>
            {responsibilityUsers && <FilterBar
                responsibilityUsers={responsibilityUsers}
            />}
        </nav>
    )
}

export default Header
