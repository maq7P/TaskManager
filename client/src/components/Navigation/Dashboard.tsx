import Typography from '@material-ui/core/Typography'
import React from 'react'
import {createStyles, Theme} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button/Button';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {AuthContext} from "../../context/auth.context";
import ModalConfirm from '../ModalConfirm';
import { LEAD } from '../../roles';
import CheckEmployee from '../CheckEmployee';
import Profile from '../Profile';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 2,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 5,
        },
    }),
);
interface DashboardProps {
    employees: any,
    setOpenAlertSuccess?: any
    setMessageAlert?: any
}
const Dashboard: React.FC<DashboardProps> = ({
    employees, setOpenAlertSuccess,
    setMessageAlert
}): React.ReactElement => {
    const classes = useStyles();

    const {person} = React.useContext(AuthContext)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [confirmOpen, setConfirmOpen] = React.useState<boolean>(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const {logout} = React.useContext(AuthContext)

    const handlerLogout = () => {
        setConfirmOpen(true)
    }

    const [openCheckEmploye, setCheckEmployeOpen] = React.useState(false);
    const [openProfile, setOpenProfile] = React.useState(false);

    const handleClickCheckEmployee = () => {
        setCheckEmployeOpen(true);
    };
    const handleClickProfile = () => {
        setOpenProfile(true);
    };
    return (
        <>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Dashboard
                </Typography>
                <div>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} color='default'>
                        <MenuIcon/>
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClickProfile}>
                            Profile
                        </MenuItem>

                        {person.role === LEAD && (
                            <MenuItem onClick={handleClickCheckEmployee}>
                                Employees
                            </MenuItem>
                        )}
                        <MenuItem onClick={handlerLogout}>Logout</MenuItem>
                    </Menu>
                    <ModalConfirm 
                        isOpen={confirmOpen} 
                        setConfirmOpen={setConfirmOpen} 
                        callback={logout}
                        title={"Вы действительно хотите выйти?"}
                    />
                </div>
            </Toolbar>
        </AppBar>
        {employees.length > 0 && 
        <CheckEmployee 
            employees={employees}
            open={openCheckEmploye} 
            setOpen={setCheckEmployeOpen}
            setOpenAlertSuccess={setOpenAlertSuccess}
            setMessageAlert={setMessageAlert}
        />}
        <Profile open={openProfile} setOpen={setOpenProfile} person={person}/>
        </>
    )
}
export default Dashboard