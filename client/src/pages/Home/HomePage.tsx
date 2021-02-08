import React from 'react'
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from '@material-ui/core';
import { useHttp } from '../../hooks/http.hook';
import Task from '../../components/TaskBlock/Task';
import { HomeContext } from '../../context/home.context';

import {homeReducer, homeInitialState} from './reducer.home'

import {initial_data} from './actions.home';
import { AuthContext } from '../../context/auth.context';
import Preloader from '../../components/Preloader';
import AlertSuccess from '../../components/Alert/Alert';
import { LEAD, TEAM_LEAD } from './constants';
import ModalAddTask from '../../components/ModalAddTask/ModalAddTask';
import { activePriority, activeResponsible } from '../../components/users.util';
import Header from '../../components/Navigation/Header';
import TaskBlock from '../../components/TaskBlock/TaskBlock';
import { TasksContext } from '../../context/tasks.context';
import { tasksReducer, tasksInitialState } from '../../components/TaskBlock/reducer.tasks';

const useStyles = makeStyles(() => ({
    homeBlock: {
        paddingBottom: '20px',  
    },
    taskBlock: {
        paddingTop: 20,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    taskAdd: {
        position: 'fixed',
        bottom: '10px',
        right: '10px'
    },
    navbar: {
        position: 'sticky',
        top: 0,
        zIndex: 1000,
    },
    alert: {
        position: 'fixed',
        top: 130,
        right: 10,
        zIndex: 1000,
        maxWidth: 300
    }
}))

const HomePage: React.FC = ():React.ReactElement => {
    const classes = useStyles()
    const {loading, request, error} = useHttp()

    const {person} = React.useContext(AuthContext)

    const [stateHome, dispatchHome] = React.useReducer(homeReducer, homeInitialState);
    const [stateTasks, dispatchTasks] = React.useReducer(tasksReducer, tasksInitialState);

    // async logic for home page
    React.useEffect(() => {
        (async function (){
            const status = await request('/status')
            const priority = await request('/priority')

            let responsible
            if(person.role === LEAD){
                responsible = await request('/users')
            }
            if(person.role === TEAM_LEAD){
                responsible = await request('/users/employees')
                responsible = [...responsible, person]
            }
            dispatchHome(initial_data({
                status: status.data,
                priority: priority.data,
                responsible: responsible ? responsible : [],
            }))
        })()
    }, [])

    const [showModalTask, setShowModalTask] = React.useState<boolean>(false)

    const handlerModalTask = () => {
        setShowModalTask(true)
    }

    const closeModalTask = () => {
        setShowModalTask(false)
    } 

    // Если они меняются не должен происходить рендер задач
    const [openAlert, setOpenAlert] = React.useState(false);
    const [messageAlert, setMessageAlert] = React.useState('');

    const employees = [...stateHome.home.responsible].filter(employee => {
        return employee.id !== person.id
    })

    if((loading || !person)) return <Preloader/>
    return (
        <HomeContext.Provider value={{dispatchHome, stateHome}}>
            {stateHome && <TasksContext.Provider value={{dispatchTasks, stateTasks}}>
                <div className={classes.homeBlock}>
                    <Header
                        employees={employees}
                        responsibilityUsers={stateHome.home.responsible}
                        classes={classes}
                        setOpenAlertSuccess={setOpenAlert}
                        setMessageAlert={setMessageAlert}
                    />
                    <TaskBlock
                        classes={classes}
                        setOpenAlertSuccess={setOpenAlert}
                        setMessageAlert={setMessageAlert}
                    />
                    <div>
                        {stateHome.home && stateHome.home.priority.length > 0 && (
                            <ModalAddTask
                                open={showModalTask}
                                onClose={closeModalTask}
                                responsibilityUsers={stateHome.home.responsible || []}
                                priorityData={stateHome.home.priority || []}
                                setOpenAlertSuccess={setOpenAlert}
                                setMessageAlert={setMessageAlert}
                                isCreator={true}
                                priority={stateHome.home.priority[0]}
                            />)
                        }
                        <Fab 
                            className={classes.taskAdd}
                            onClick={handlerModalTask}
                            color="secondary">
                                <AddIcon />
                        </Fab>
                    </div>
                    <AlertSuccess
                        styles={classes.alert}
                        message={messageAlert}
                        open={openAlert}
                        setOpen={setOpenAlert}
                    />
                </div>
            </TasksContext.Provider>}
        </HomeContext.Provider>
    )
}
export default React.memo(HomePage)