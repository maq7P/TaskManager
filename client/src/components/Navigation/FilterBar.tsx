import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Button, Checkbox, FormControlLabel, makeStyles } from '@material-ui/core';
import StickySearchBlock from '../StickySearchBlock';
import { useHttp } from '../../hooks/http.hook';
import { 
  filter_by_status, set_tasks, 
  task_loading, sort_by_update 
} from '../../components/TaskBlock/action.tasks';
import SettingsIcon from '@material-ui/icons/Settings';
import PopupInfo from '../PopupInfo';
import { AuthContext } from '../../context/auth.context';
import { TasksContext } from '../../context/tasks.context';

const useStyles = makeStyles(() => ({
  wrapper: {
    borderRadius: 0,
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  sortBlock: {
    width: 200,
    marginTop: 5,
    height: 50,
    '& .MuiOutlinedInput-notchedOutline': {
      border: 0,
    }
  },
  tolbar: {
    display: 'flex'
  },
  sortBlockPopup: {
    padding: 10
  },
  checkInput: {
    display: 'block'
  }
}))
interface PropsFilterBar {
  responsibilityUsers: any
}

const FilterBar: React.FC<PropsFilterBar> = ({responsibilityUsers}) => {
  const classes = useStyles()
  const [value, setValue] = React.useState<number>(0);

  const {loading, request, error} = useHttp()
  const {dispatchTasks, state} = React.useContext(TasksContext)

  const {person} = React.useContext(AuthContext)

  const [responsible, setResponsible] = React.useState<any>(
    person
  )

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleClickAll = (): void => {
    (async () => {
      dispatchTasks(task_loading())
      if(responsible && responsible.id === person.id){
        const data = await request('/tasks/me')
        dispatchTasks(task_loading())
        dispatchTasks(set_tasks(data))
      } else{
        const data = await request(`/tasks?id=${responsible.id}`)
        dispatchTasks(set_tasks(data))
        dispatchTasks(task_loading())
      }
    })()
  }
  const handleClickToday = ():void => {
    (async () => {
      dispatchTasks(task_loading())
      if(responsible && responsible.id === person.id){
        const data = await request('/tasks/today')
        dispatchTasks(set_tasks(data))
        dispatchTasks(task_loading())
      } else{
        const data = await request(`/tasks/today?id=${responsible.id}`)
        dispatchTasks(set_tasks(data))
        dispatchTasks(task_loading())
      }
    })()
  }
  const handleClickWeek = ():void => {
    (async () => {
      dispatchTasks(task_loading())
      if(responsible && responsible.id === person.id){
        const data = await request('/tasks/week')
        dispatchTasks(set_tasks(data))
        dispatchTasks(task_loading())
      } else {
        const data = await request(`/tasks/week?id=${responsible.id}`)
        dispatchTasks(set_tasks(data))
        dispatchTasks(task_loading())
      }
    })()
  }
  const handleClickFuture = ():void => {
    (async () => {
      dispatchTasks(task_loading())
      if(responsible && responsible.id === person.id){
        const data = await request('/tasks/future')
        dispatchTasks(set_tasks(data))
        dispatchTasks(task_loading())
      } else {
        const data = await request(`/tasks/future?id=${responsible.id}`)
        dispatchTasks(set_tasks(data))
        dispatchTasks(task_loading())
      }
    })()
  }
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClickSettingSort = (event: React.MouseEvent<HTMLButtonElement>) => {
    if(!anchorEl){
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null)
    }
  };
  const handleCloseSettingSort = () => {
      setAnchorEl(null);
  };
  const [checked, setChecked] = React.useState({
    complited: true,
    cancel: true,
    update: true
  });

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked })
  };

  React.useEffect(() => {
    let status_ids: number[] = [1,2]
    
    if(checked.complited){
      status_ids.push(3)
    }

    if(checked.cancel){
      status_ids.push(4)
    }

    dispatchTasks(filter_by_status(status_ids))
    //dispatchTasks(sort_by_update())
    
  }, [checked])

  return (
    <Paper className={classes.wrapper}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
      >
          <Tab 
            label="All" 
            onClick={handleClickAll}
          />
          <Tab 
            label="Today" 
            onClick={handleClickToday}
          />
          <Tab 
            label="Week" 
            onClick={handleClickWeek}
          />
          <Tab 
            label="For the future" 
            onClick={handleClickFuture}
          />
      </Tabs>
      <div className={classes.tolbar}>
        {person.role !== 'EMPLOYEE' && (
          <StickySearchBlock
            data={responsibilityUsers}
            chooseName="choose people"
            value={responsible}
            setValue={setResponsible}
            styles={classes.sortBlock}
            flagFilter={true}
            setSlide={setValue}
          />
        )}
        <Button 
          onClick={handleClickSettingSort}
          color='default'
        >
            <SettingsIcon/>
        </Button>
        <PopupInfo
          anchorEl={anchorEl}
          setAnchorEl={handleCloseSettingSort}
        >
          <Paper className={classes.sortBlockPopup}>
            <FormControlLabel
              className={classes.checkInput}
              control={
                <Checkbox
                  checked={checked.complited}
                  onChange={handleChangeCheckbox}
                  color="primary"
                  name={"complited"}
                />
              }
              label="Show competed tasks"
            />
            <FormControlLabel
              className={classes.checkInput}
              control={
                <Checkbox
                  checked={checked.cancel}
                  onChange={handleChangeCheckbox}
                  color="primary"
                  name={"cancel"}
                />
              }
              label="Show cancel tasks"
            />
            {/* <FormControlLabel
              className={classes.checkInput}
              control={
                <Checkbox
                  checked={checked.update}
                  onChange={handleChangeCheckbox}
                  color="primary"
                  name={"update"}
                />
              }
              label="Sort by last update"
            /> */}
          </Paper>
        </PopupInfo>
      </div>
    </Paper>
  );
}
export default FilterBar
