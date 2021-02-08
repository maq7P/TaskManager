import { Button, CircularProgress, Dialog, IconButton, TextareaAutosize } from '@material-ui/core'
import React from 'react'
import Typography from "@material-ui/core/Typography";
import StickySearchBlock from '../StickySearchBlock';

import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import DateAndTimePickers from './DateAndTimePickers';
import useStyles from './useStyles';
import { useHttp } from '../../hooks/http.hook';
import { TasksContext } from '../../context/tasks.context';
import { delete_task, task_loading, upadte_task_param, update_data } from '../../components/TaskBlock/action.tasks';
import { AuthContext } from '../../context/auth.context';
import { normalizeServerDate, today } from '../../utils/utils';
import toHTML from '../../hoc/toHTML'
import { Task } from '../../components/TaskBlock/reducer.tasks';
import ModalConfirm from '../ModalConfirm';
interface PropsModalAddTask {
    open: boolean,
    onClose: () => void,
    responsibilityUsers: any,
    priorityData: any,
    setOpenAlertSuccess: (flag: boolean) => void,
    setMessageAlert: (message: string) => void,
    deadLine?: string 
    title?: string
    description?: string
    responsible?: any
    priority?: any,
    edit?: boolean,
    taskId?:number,
    isCreator?:boolean,
    isMyEmployee?:boolean
}
interface TaskErrors {
    title: string,
    description: string,
    startLine?: string | Date,
    deadLine: string | Date,
    priority: string,
    responsible: string,
}

const TIME_CLOSE_ALERT = 1500 

const ModalAddTask:React.FC<PropsModalAddTask> = ({
    edit = false,
    open, onClose, 
    responsibilityUsers, priorityData, 
    setOpenAlertSuccess, setMessageAlert,
    isCreator=false,
    title='', description='', 
    deadLine='',
    priority='', responsible='', taskId=1,
    isMyEmployee=false
}): React.ReactElement => {
    const classes = useStyles()

    const {loading, request, error} = useHttp()

    const [errors, setErrors] = React.useState<TaskErrors>({
        title,
        description,
        deadLine,
        priority,
        responsible
    })
    
    const {person} = React.useContext(AuthContext)
    
    const [newStartLine, setStartLine] = React.useState<Date | string>(new Date(today()))
    const [newDeadLine, setDeadLine] = React.useState<Date | string>(deadLine || new Date(today()))

    const [newPriority, setPriority] = React.useState<any>(priority || priorityData[0])
    const [newResponsible, setResponsible] = React.useState<any>(responsible || person)

    const handlerChangeStartLine = (date: string): void => {   
        setStartLine(date)
        setErrors({...errors, startLine: ''})
    }
    const handlerChangeDeadLine = (date: string): void => {
        setDeadLine(date)
        setErrors({...errors, deadLine: ''})
    }

    const titleInput = React.createRef();

    const descriptionInput = React.createRef();

    const {dispatchTasks} = React.useContext(TasksContext)

    // only for create task
    const handlerCreateTask = async() => {
        let flagErr = false
        // @ts-ignore
        if(titleInput.current.innerHTML  === ''){
            flagErr = true
            setErrors({
                ...errors,
                title: 'Specify the title'
            })
        } else {
            setErrors({
                ...errors,
                title: ''
            })
        }
        if(newDeadLine === ''){
            flagErr = true
            setErrors({
                ...errors,
                deadLine: 'Specify the date of deadline'
            })
        }
        if(newStartLine  === ''){
            flagErr = true
            setErrors({
                ...errors,
                startLine: 'Specify the date of start'
            })
        }
        if(!newResponsible){
            flagErr = true
            setErrors({
                ...errors,
                responsible: 'Specify the responsible of task'
            })
        }
        if(!newPriority){
            flagErr = true
            setErrors({
                ...errors,
                priority: 'Specify the priority'
            })
        }
        
        if(flagErr) {
            return
        }

        let task: Task = {
            // @ts-ignore
            title: toHTML(titleInput.current.innerHTML),

            // Description is keeping on DB with HTML tags cause will be format for text
            // @ts-ignore  
            description: descriptionInput.current.innerHTML,
            start_time: normalizeServerDate(newStartLine),
            end_time: normalizeServerDate(newDeadLine),
            priority_id: newPriority.id,
            responsible_id: newResponsible ? newResponsible.id : person.id,
        }
    
        
        if(!edit){
                const data = await request('/tasks/add', 'POST', task)
                if(data.status === 1){
                    setOpenAlertSuccess(true)
                    setMessageAlert(data.message+' for '+newResponsible.title)
                    setTimeout(() => {
                        setOpenAlertSuccess(false)
                    }, TIME_CLOSE_ALERT);
                }
                if((person.id === newResponsible.id)){
                    dispatchTasks(update_data([data.data]))
                }
        } else {
            const taskWithId = {...task, id: taskId}

            const data = await request('/tasks/update', 'PUT', taskWithId)
            if(data.status === 1){
                setOpenAlertSuccess(true)
                setMessageAlert(data.message)
                setTimeout(() => {
                    setOpenAlertSuccess(false)
                }, TIME_CLOSE_ALERT);
            }
            
            dispatchTasks(upadte_task_param([data.data]))
        }
        
        onClose()
    }

    const [confirmCancelTask, setConfirmCancelTask] = React.useState<boolean>(false);
    const [confirmDeleteTask, setConfirmDeleteTask] = React.useState<boolean>(false)

    //Нужно вынести повторяется в таск
    const requestDelTask = async () => {
        const data = await request(`/tasks/del?id=${taskId}`, 'DELETE')
        if(data.status === 1){
            setOpenAlertSuccess(true)
            setMessageAlert(data.message)
            setTimeout(() => {
                setOpenAlertSuccess(false)
            }, TIME_CLOSE_ALERT);
        }
        dispatchTasks(delete_task(taskId))
        onClose()
    }

    const handlerCancelTask = () => {
        setConfirmCancelTask(true)
    }

    const handlerDelTask = () => {
        setConfirmDeleteTask(true)
    }

    //Нужно вынести повторяется в таск
    const requestChangeStatus = (status_id: number, status_title: string, resId: number, id: number): Function => {
        return async (): Promise<any> => {
            dispatchTasks(task_loading())
            await request(`/tasks/status?resId=${resId}&id=${taskId}&status_id=${status_id}&status_title=${status_title}`)
            dispatchTasks(task_loading())
            dispatchTasks(upadte_task_param([{
                status_id,
                status_title,
                id
            }]))
            onClose()
        }
    }

    return (
        <Dialog
            onClose={onClose}
            open={open}
        >
            {errors.priority.length > 0 ? 'Приори' : null}
            {errors.responsible.length > 0 ? 'Респ' : null}
            <div className={classes.wrapper}>
                <Typography 
                    className={classes.modalTitle}
                    variant='h4'
                >{title ? 'Update task': 'New task'}
                {edit && (isCreator || isMyEmployee) && (
                    <IconButton 
                        color="secondary" 
                        onClick={handlerDelTask}
                    >
                        <DeleteIcon color="secondary" />
                    </IconButton>
                )}
                </Typography>
                <div className={classes.dateControl}>

                    {!edit && (<div>
                        <DateAndTimePickers
                            label={'Date of start task'}
                            setLine={handlerChangeStartLine}
                        />
                        {errors.startLine && (
                            <span className={classes.error}>
                                {errors.startLine}
                            </span>
                        )}
                    </div>)}

                    {(isCreator || isMyEmployee) && (<div>
                        <DateAndTimePickers
                            label='Date of end task'
                            setLine={handlerChangeDeadLine}
                            defaultValue={newDeadLine}
                        />
                        {!edit && errors.deadLine && (
                            <span className={classes.error}>
                                {errors.deadLine}
                            </span>
                        )}
                    </div>)}

                </div>
                {(isCreator || isMyEmployee) && <div className={classes.taskTitle}>
                        {edit && <div>Title</div>}
                        <div 
                            className={`${classes.divTaskTextarea} ${classes.taskTextareaTitle}`}
                            contentEditable
                            placeholder="Write title..." 
                            // @ts-ignore
                            ref={titleInput}
                            suppressContentEditableWarning={true}
                        >
                            {toHTML(title)}
                        </div>
                    {!edit && errors.title && (
                        <span className={classes.error}>
                            {errors.title}
                        </span>
                    )}
                </div>}
                {!isMyEmployee && !isCreator && edit &&(
                    <div>
                        <div>Title</div>
                        {/* @ts-ignore */}
                        <h3 ref={titleInput}>{toHTML(title)}</h3>
                    </div>
                )}
                <div className={classes.taskDescription}>
                    {edit && <div>Description</div>}
                    <div 
                        className={`${classes.divTaskTextarea} 
                        ${classes.taskTextareaDescription}`}

                        contentEditable
                        placeholder="Write text of task..." 
                        // @ts-ignore
                        ref={descriptionInput}
                        suppressContentEditableWarning={true}
                    >
                        {toHTML(description)}
                    </div>
                    
                    {!edit && errors.description && (
                        <span className={classes.error}>
                            {errors.description}
                        </span>
                    )}
                </div>
                {(isCreator || isMyEmployee) && (
                    <div className={classes.responsibleBlock}>
                        {responsibilityUsers && 
                            <StickySearchBlock
                                title="Responsible"
                                chooseName="choose people"
                                data={responsibilityUsers}
                                value={newResponsible}
                                setValue={setResponsible}
                            />
                        }
                    </div>
                )}
                {(isMyEmployee || isCreator) && <div className={classes.responsibleBlock}>
                    <StickySearchBlock
                        title="Priority"
                        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        data={priorityData}
                        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! was [priority]
                        value={newPriority}
                        setValue={setPriority}
                    />
                </div>}
                
                <Button
                    variant="contained"
                    disabled={loading}
                    onClick={handlerCreateTask}
                    className={classes.acceptBtn}
                >
                    {loading && <CircularProgress size={24} color="primary"/>}
                    {!loading && (
                        !edit ? 'Create task' : 'Update task'
                    )}
                    
                </Button>
                {edit && (
                    <Button
                        variant="contained"
                        color="secondary"
                        disabled={loading}
                        className={classes.acceptBtn}
                        style={{marginLeft: 5}}
                        onClick={handlerCancelTask}
                    >
                        Cancel task
                    </Button>
                )}
            </div>
            <IconButton 
                onClick={onClose}
                className={classes.taskClose}
                color="secondary" 
                aria-label="close"
            >
                <CloseIcon style={{ fontSize: 26 }} color="secondary" />
            </IconButton>
            <ModalConfirm 
                isOpen={confirmCancelTask} 
                setConfirmOpen={setConfirmCancelTask} 
                // @ts-ignore
                callback={requestChangeStatus(4, 'cancel', newResponsible.id, taskId)}
                title={"Are you sure to want to cancel the task?"}
            />
            <ModalConfirm 
                isOpen={confirmDeleteTask} 
                setConfirmOpen={setConfirmDeleteTask} 
                // @ts-ignore
                callback={() => {requestDelTask()}}
                title={"Are you sure to want to delete the task?"}
            />
        </Dialog>
    )
}

export default ModalAddTask
