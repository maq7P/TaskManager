import React from 'react'

// Contexts
import { AuthContext } from '../../context/auth.context';

// hooks
import { useHttp } from '../../hooks/http.hook';

// actions creators and constants
import { initial_tasks } from './action.tasks';

import Task from './Task';
import { HomeContext } from '../../context/home.context';
import { TasksContext } from '../../context/tasks.context';
import TaskLoader from './TaskLoader';

interface TaskBlockProps {
    classes: any,
    setOpenAlertSuccess: (flag: boolean) => void,
    setMessageAlert: (message: string) => void,
}


const TaskBlock:React.FC<TaskBlockProps> = ({
    classes,
    setOpenAlertSuccess,
    setMessageAlert
}): React.ReactElement => {

    const {request} = useHttp()
    const {person} = React.useContext(AuthContext)

    const {stateTasks, dispatchTasks} = React.useContext(TasksContext)
    const {stateHome} = React.useContext(HomeContext)

    React.useEffect(() => {
        (async function (){
            const tasks = await request('/tasks/me')
            dispatchTasks(initial_tasks({
                tasks
            }))
        })()
    }, [person])

    return (
        <div className={classes.taskBlock}>
            {!stateTasks.dashboard.loading ?
                (stateTasks.dashboard.tasks && (
                    stateTasks.dashboard.tasks.length === 0 
                    ? <div>Have not task</div>
                    :
                    stateTasks.dashboard.tasks.map((task: any, i: number) => {
                        
                        let priority_color : string = ''
                        stateHome.home.priority
                            .forEach((pr: any): void => {
                                if(pr.title === task.priority_title){
                                    priority_color = pr.color
                                }
                            })
                        return (
                        <Task
                            key={task.title + i}

                            id={task.id}
                            title={task.title}
                            description={task.description}
                            responsible_title={task.responsible_title}
                            responsible_id={task.responsible_id}
                            creator_title={task.creator_title}
                            priority_title={task.priority_title}
                            status_title={task.status_title}
                            priority_color={priority_color}
                            end_time={task.end_time}
                            status_id={task.status_id}
                            createAt={task.createdAt}
                            updatedAt={task.updatedAt}
                            creator_id={task.creator_id}
                            setOpenAlertSuccess={setOpenAlertSuccess}
                            setMessageAlert={setMessageAlert}
                        />)
                    }
                    )
                ))
                : new Array(4).fill('').map((_,i) => <TaskLoader key={i}/>)
            }
        </div>
    )
}

export default TaskBlock
