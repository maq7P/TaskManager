import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { CircularProgress, Input, MenuItem, Select } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { cutSimbols } from '../utils/utils';
import { useHttp } from '../hooks/http.hook';
import { HomeContext } from '../context/home.context';
import { update_responsible } from '../pages/Home/actions.home';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    addEmployee: {
      padding: '0px 30px'
    },
    param: {
      display: 'block',
      maxWidth: 320,
      marginBottom: 10
    },
    titleEmployees: {
      padding: '0px 30px'
    }
  }),
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface PropsCheckEmployee {
    open: boolean,
    setOpen: (open: boolean) => void,
    employees: any,
    setOpenAlertSuccess?: any
    setMessageAlert?: any
}   
const TIME_CLOSE_ALERT = 1500

const CheckEmployee: React.FC<PropsCheckEmployee> = ({
  setOpen, open, employees,setOpenAlertSuccess,setMessageAlert
}) => {
  const classes = useStyles();

  const [localEmployees, setLocalEmployees] = React.useState(employees)

  const handleClose = () => {
    dispatchHome(update_responsible(localEmployees))
    setOpen(false);
  };

  const {dispatchHome} = React.useContext(HomeContext)

  const [role, setRole] = React.useState('EMPLOYEE');
  const [name, setName] = React.useState<string >('')
  const [surname, setSurname] = React.useState<string >('')
  const [patronymic, setPatronymic] = React.useState<string >('')
  const [login, setLogin] = React.useState<string >('')
  const [password, setPassword] = React.useState<string >('')

  const handleChangeSelection = (event: any): void => {
    setRole(event.target.value);
  };
  const [errors, setErrors] = React.useState({
    name: false,
    surname: false,
    login: false,
    password: false
  })

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setErrors({
        ...errors,
      name: false
    })
    setName(event.target.value);
  };
  const handleChangeSurname = (event: React.ChangeEvent<HTMLInputElement>): void => {
     setErrors({
          ...errors,
        surname: false
      })
    setSurname(event.target.value);
  };
  const handleChangePatronymic = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPatronymic(event.target.value);
  };
  const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLogin(event.target.value);
    setErrors({
        ...errors,
      login: false
    })
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
    setErrors({
        ...errors,
      password: false
    })
  };

  const [success, setSuccess] = React.useState(false)

  const {loading, request, error} = useHttp()

  const handleAddUser = async () => {
    if(!name.trim()){
      setErrors({
        ...errors,
      name: true
      })
    }
    if(!surname.trim()){
      setErrors({
        ...errors,
        surname: true
      })
    }
    if(!login.trim()){
      setErrors({
        ...errors,
        login: true
      })
    }
    if(!password.trim()){
      setErrors({
        ...errors,
        password: true
      })
    }

    if(!(errors.login && errors.password && errors.name && errors.surname && error)){
      const newUser = {
        name, surname, patronymic, login, password, role, title: `${name} ${surname}`
      }

      try{
        const data = await request('/registration', 'POST', newUser)
        console.log(data);
        if(data.status === 1){
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
            }, TIME_CLOSE_ALERT);
        }
        setLocalEmployees([
          ...localEmployees,
          newUser
        ])
      }catch(e){
        new Error(e.message)
      }
    }

  }
  return (
    employees && <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Employees
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              <CloseIcon/>
            </Button>
          </Toolbar>
        </AppBar>
        <div>
          <div className={classes.addEmployee}>
            <form noValidate autoComplete="off">
              <h3>Enter the employee information</h3>
              <div style={{color: 'green'}}>
                {success ? 'Success registration user' : ''}
              </div>
              <Input 
                className={classes.param} 
                placeholder="Name"
                onChange={handleChangeName}
                error={errors.surname}
              />
              <Input 
                className={classes.param} 
                placeholder="Second Name"
                onChange={handleChangeSurname} 
                error={errors.name}
              />
              <Input 
                className={classes.param} 
                placeholder="Patronymic"
                onChange={handleChangePatronymic} 
              />
              <Input 
                className={classes.param} 
                placeholder="Login"
                onChange={handleChangeLogin} 
                error={errors.login}
              />
              <Input 
                className={classes.param} 
                type="password"
                placeholder="Password"
                onChange={handleChangePassword} 
                error={errors.password}
              />
              <Select
                className={classes.param}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                onChange={handleChangeSelection}
              >
                <MenuItem value={'EMPLOYEE'}>employee</MenuItem>
                <MenuItem value={'TEAM_LEAD'}>team lead</MenuItem>
              </Select>
              <IconButton
                onClick={handleAddUser}
              >
                {loading && <CircularProgress size={24} color="primary"/>}
                {!loading && <AddIcon/>}
              </IconButton>
              <div style={{color: 'red'}}>{error}</div>
            </form>
          </div>
          <List>
            <h3 className={classes.titleEmployees}>Employees</h3>
            <Divider />
            {localEmployees.map((employee: any, i:number) => {
              return (
                <div key={employee+i}>
                  <ListItem button>
                    <ListItemText primary={`${employee.title} ${employee.patronymic}`} secondary={cutSimbols(employee.role)} />
                  </ListItem>
                  <Divider />
                </div>
              )
            })}
          </List>
        </div>
      </Dialog>
    </div>
  );
}
export default CheckEmployee