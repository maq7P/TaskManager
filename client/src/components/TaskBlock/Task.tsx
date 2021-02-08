import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useStyles } from './useStyles';
import { decorateDate, isDeadlinePositive, maxSimbols } from '../../utils/utils';
import { defineBgColor, defineIndicatorColor, defineAvatartSimbol, defineStatusColor } from './util.colors';
import toHTML from '../../hoc/toHTML';
import ModalConfirm from '../ModalConfirm';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/auth.context';
import { upadte_task_param, task_loading, delete_task } from './action.tasks';
import { HomeContext } from '../../context/home.context';
import { Task as TaskProp } from './reducer.tasks'
import PopupInfo from '../PopupInfo'
import { CircularProgress, Paper } from '@material-ui/core';
import ModalAddTask from '../ModalAddTask/ModalAddTask';
import { activePriority, activeResponsible } from '../users.util';
import { TasksContext } from '../../context/tasks.context';

const TIME_CLOSE_ALERT = 1500 

const Task:React.FC<TaskProp> = ({
  id=-1,
  title, 
  description='', 
  responsible_title, 
  responsible_id=Number,
  creator_title, 
  creator_id=Number,
  priority_title,
  priority_color='', 
  status_title,
  end_time,
  status_id=Number,
  updatedAt='',
  createAt='',
  setOpenAlertSuccess = () => console.log(),
  setMessageAlert = () => console.log(),
}):React.ReactElement => {
  const {person} = React.useContext(AuthContext)
  const {dispatchTasks} = React.useContext(TasksContext)
  const {stateHome} = React.useContext(HomeContext)

  const isCancel = +status_id === 4
  const isCompited = +status_id === 3
  const isWating =  +status_id === 1
  const isResponsible = +responsible_id === person.id
  const isRunning = +status_id === 2
  const isOverdue = isDeadlinePositive(end_time)
  const isCreator = +creator_id === person.id
  const isMyEmployee = [...stateHome.home.responsible]
  .filter(user => user.id === responsible_id).length > 1

  const classes = useStyles({
    bgColor: defineBgColor(isCompited, isOverdue, isCancel),
    indicatorColor: defineIndicatorColor(isCompited, isOverdue, isCancel),
    priorityColor: priority_color,
    statusColor: defineStatusColor(isCompited, isCancel),
    isWating: isWating,
    isResponsible: isResponsible,
    isRunning: isRunning
  })();
  
  
  const [confirmStartedTask, setConfirmStartedTask] = React.useState<boolean>(false);
  const [confirmFinishedTask, setConfirmFinishedTask] = React.useState<boolean>(false);
  const [confirmDeleteTask, setConfirmDeleteTask] = React.useState<boolean>(false);

  const handlerStatusChange = () => {
    if(isWating && isResponsible){
      setConfirmStartedTask(true)
    }
    if(isRunning && isResponsible){
      setConfirmFinishedTask(true)
    }
  }

  const {loading, request} = useHttp()

  //Нужно вынести повторяется в модал 
  const requestChangeStatus = (status_id: number, status_title: string): Function => {
    return async (): Promise<any> => {
      await request(`/tasks/status?resId=${responsible_id}&id=${id}&status_id=${status_id}&status_title=${status_title}`)
      dispatchTasks(upadte_task_param([{
        status_id,
        status_title,
        id
      }]))
    }
  }

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClickAnchorEl = (event: React.MouseEvent<HTMLButtonElement>) => {
    if(!anchorEl){
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null)
    }
  }

  const [showEditModal, setShowEditModal] = React.useState<boolean>(false)
  const handlerClickUpdateTask = () => {
    setShowEditModal(true)
  }
  const closeModalUpdateTask = () => {
    setShowEditModal(false)
  } 
  const requestDelTask = async () => {
      const data = await request(`/tasks/del?id=${id}`, 'DELETE')
      if(data.status === 1){
          setOpenAlertSuccess(true)
          setMessageAlert(data.message)
          setTimeout(() => {
              setOpenAlertSuccess(false)
          }, TIME_CLOSE_ALERT);
      }
      dispatchTasks(delete_task(id))
  }
  const handlerDelTask = () => {
      setConfirmDeleteTask(true)
  }
  return (
    <Card className={classes.root}>
      {showEditModal && 
        <ModalAddTask
          edit
          open={showEditModal}
          onClose={closeModalUpdateTask}
          title={title}
          description={description}
          // @ts-ignore
          deadLine={end_time}
          // @ts-ignore
          responsible={activeResponsible(stateHome.home.responsible, +responsible_id)}
          responsibilityUsers={stateHome.home.responsible || []}
          priorityData={stateHome.home.priority}
          priority={activePriority(stateHome.home.priority, priority_title)}
          taskId={id}
          isCreator={isCreator}
          isMyEmployee={isMyEmployee}
          setOpenAlertSuccess={setOpenAlertSuccess}
          setMessageAlert={setMessageAlert}
        />
      }
      <CardHeader
        avatar={
          <Avatar 
            className={classes.avatar}
            onClick={handlerStatusChange}
          > 
            {loading 
            ? <CircularProgress size={24} color="inherit"/>
            : defineAvatartSimbol(isCompited, isOverdue, isCancel, isWating)}
          </Avatar>
        }
        action={
          isCancel 
          ? (
            <IconButton 
              aria-label="settings"
              onClick={handlerDelTask}
            >
              <DeleteIcon/>
            </IconButton>
          )
          : (
            <IconButton 
              aria-label="settings"
              onClick={handlerClickUpdateTask}
            >
              <EditIcon />
            </IconButton>
          )
        }
        title={
          <Typography 
            variant='h5'
            title={title}
          >
            <strong>{maxSimbols(title, 15)}</strong>
          </Typography>
        }
        subheader={
          <div
          >
            <div className={classes.deadline}>deadline:</div>
             {decorateDate(end_time)}
          </div>
        }
      />
      <CardContent className={classes.cardContent}>
        {+status_id !== 2 && (
          <span 
              className={`${classes.stiker} ${classes.status}`}
              onClick={handlerStatusChange}
            >
              {status_title}
          </span>
        )}
        <span className={`${classes.stiker} ${classes.priority}`}>
            {priority_title} priority
        </span>
        <div className={classes.cardDescription}>
                <Typography 
                variant="body2" 
                color="textSecondary" 
                component="div"
            >
                {toHTML(description)}
            </Typography>
        </div>
        <div className={classes.footerCartCreator}>
          <div>
            <div className={classes.deadline}>Creator:</div> {creator_title}
          </div>
          <div>
            <div className={classes.deadline}>Responsible:</div> {responsible_title}
          </div>
        </div>
        <div className={classes.footerCartInfo}>
          <IconButton 
            aria-label="settings"
            onClick={handleClickAnchorEl}
          >
            <InfoIcon />
          </IconButton>
          <PopupInfo
            anchorEl={anchorEl} 
            setAnchorEl={setAnchorEl}
          >
            <Paper className={classes.timeUpadateCreate}>
              <span className={classes.lastUpdate}>
                last upadate: {decorateDate(updatedAt)}
              </span>
              <span className={classes.lastUpdate}>
                create: {decorateDate(createAt)}
              </span>
            </Paper>
          </PopupInfo>
        </div>
      </CardContent>
      <ModalConfirm 
          isOpen={confirmStartedTask} 
          setConfirmOpen={setConfirmStartedTask} 
          // @ts-ignore
          callback={requestChangeStatus(2, 'in progress')}
          title={"To start the task?"}
      />
      <ModalConfirm 
          isOpen={confirmFinishedTask} 
          setConfirmOpen={setConfirmFinishedTask} 
          // @ts-ignore
          callback={requestChangeStatus(3, 'completed')}
          title={"The task is completed?"}
      />
      <ModalConfirm 
          isOpen={confirmDeleteTask} 
          setConfirmOpen={setConfirmDeleteTask} 
          // @ts-ignore
          callback={() => {requestDelTask()}}
          title={"Are you sure to want to delete the task?"}
      />
    </Card>
  );
}
export default Task  