import { createStyles, makeStyles, Theme } from "@material-ui/core"

interface ColorsTaskCard {
  bgColor: string
  indicatorColor: string
  statusColor?: string
  priorityColor: string,
  isWating: boolean, 
  isResponsible: boolean
  isRunning: boolean
}

export const useStyles = ({
    bgColor, priorityColor, 
    indicatorColor, statusColor, 
    isWating, isResponsible,
    isRunning
}: ColorsTaskCard) => {
  return (
    makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 350,
      height: 350,
      [theme.breakpoints.between('md', 'xl')]:{
        marginRight: 20,
      },
      marginBottom: 20,
      backgroundColor: bgColor,
      overflowY: 'auto',
      position: 'relative',
      '& .MuiCardHeader-title': {
          fontSize: '25px',
      },
      '& .MuiCardHeader-avatar': {
            transition: 'all 0.5s'
      }
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      //backgroundColor: 'green',//✓
      //backgroundColor: 'red',!
      backgroundColor: indicatorColor,
      cursor: (isRunning || isWating) && isResponsible ? 'pointer' : 'text',
    },
    timeUpadateCreate: {
        padding: 10
    },
    lastUpdate: {
        display: 'block',
        fontSize: '10px',
        fontWeight: 400,
        lineHeight: '1.43',
        letterSpacing: '0.01071em',
        color: 'grey'
    },
    cardContent: {
        paddingTop: 0
    },
    cardDescription: {
        overflow: 'auto',
        maxHeight: 160,
        marginBottom: '20px'
    },
    footerCartInfo: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    footerCartCreator: {
        position: 'absolute',
        bottom: 20,
        left: 10,
        fontWeight: 400,
        lineHeight: '1.43',
        letterSpacing: '0.01071em',
        color: 'grey'
    },
    stiker: {
        display: 'inline-block',
        padding: '5px 8px',
        //backgroundColor: 'red',
        //backgroundColor: 'green',
        borderRadius: '15px',
        textAlign: 'center',
        maxWidth: '120px',
        marginRight: '5px',
        color: '#fff',
        marginBottom: '10px'
    },
    priority: {
        backgroundColor: priorityColor,
    }, 
    status: {
        cursor: isWating && isResponsible ? 'pointer' : 'text',
        backgroundColor: statusColor
    },
    deadline: {
        textDecoration: 'underline',
        display: 'inline-block',
        marginRight: 10
    }
  }),
))}