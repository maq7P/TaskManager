import React from 'react'
import {Button, CircularProgress, TextField, Typography} from "@material-ui/core";
import {useHttp} from "../../hooks/http.hook";
import { AuthContext } from '../../context/auth.context';
import {makeStyles} from "@material-ui/core/styles";

// interface
interface Form {
    login: string,
    password: string
}

// styles
const useStyles = makeStyles(() => ({
    auth__wrapper: {
        height: '100vh',
        width: '100%',
        backgroundColor: '#3F51B5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    auth__form: {
        backgroundColor: '#fff',
        padding: '15px',
        minHeight: '300px',
        maxWidth: '400px',
        width: '100%',
        borderRadius: '5px'
    },
    authInputs: {
        marginBottom: '30px',
        '& input' : {},
        '& span': {
            color: 'red'
        }
    },
    auth__btn: {

    }
}))

const AuthPage:React.FC = ():React.ReactElement => {
    const classes = useStyles()
    const {login, setPerson} = React.useContext(AuthContext)
    const {loading, request, error} = useHttp()
    const [form, setForm] = React.useState<Form>({
        login: '', password: ''
    })
    

    const [emptyError, setEmptyError] = React.useState<string>('')

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const registerHandler = async () => {
        try {
            const data = await request('/registration', 'POST', {...form})
        } catch(e) {

        }
    }
    const loginHandler = async (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
        e.preventDefault()
        try {
            if(form.login.trim() === '') return setEmptyError('Введите логин')
            if(form.password.trim() === '') return setEmptyError('Введите пароль')

            const data = await request('/login', 'POST', {...form})
            setPerson(data.person)
            login(data.token)
        } catch(e) {

        }
    }

    return(
        <div className={classes.auth__wrapper}>
            <form 
                className={classes.auth__form}
                onSubmit={loginHandler}
            >
                <Typography variant='h3'>Войти</Typography>
                <div>
                    <div className={classes.authInputs}>
                        <TextField
                            fullWidth
                            id="standard-password-input"
                            label="Логин"
                            type="text"
                            name="login"
                            onChange={changeHandler}
                        />
                        <TextField
                            fullWidth
                            id="standard-password-input"
                            label="Пароль"
                            type="password"
                            autoComplete="current-password"
                            name="password"
                            onChange={changeHandler}
                        />
                        {loading ? <CircularProgress size={24} color="primary"/> : <span>{error || emptyError}</span>}
                    </div>
                    <Button
                        type='submit'
                        className={classes.auth__btn}
                        fullWidth
                        variant="outlined"
                        onClick={loginHandler}
                        disabled={!!loading}
                    >Войти</Button>
                </div>
            </form>
        </div>
    )
}
export default AuthPage