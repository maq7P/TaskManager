import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
    wrapper: {
        padding: '20px',
        position: 'relative',
        minWidth: 320
    },
    modalTitle: {
        marginBottom: '15px',
    },
    responsibleBlock: {
        marginTop: '30px',
        display: 'flex',
        marginBottom: '15px'
    },
    taskTextarea: {
        width: '100%',
        fontSize: 20,
        outline: 'none',
        fontFamily: 'inherit',
        resize: 'none',
        border: 0,
    },
    divTaskTextarea: {
        width: '100%',
        fontSize: 20,
        outline: 'none',
        fontFamily: 'inherit',
        resize: 'none',
        border: 0,
        cursor: 'text',
        overflow: 'auto',
        padding: 5,
        maxWidth: 500,
        '&[placeholder]:empty:before': {
            content: 'attr(placeholder)',
            color: '#828181',
        },
    },
    taskTextareaDescription: {
        marginTop: 10,
        border: '1px solid #828181',
        minHeight: 100,
        maxHeight: 200,
    },
    taskTextareaTitle: {
        marginTop: 10,
        border: 'none',
        minHeight: 30,
        maxHeight: 100,
    },
    taskTitle: {
    },
    taskDescription: {
    },
    taskClose: {
        position: 'absolute',
        top: '10px',
        right: '10px'
    },
    taskTools: {
        display: 'flex'
    },
    statusBlock: {

    },
    dateControl: {
        display: 'flex',
        marginBottom: '20px',
        '& .MuiFormControl-marginNormal': {
            marginRight: 10
        }
    },
    error: {
        color: 'red'
    },
    acceptBtn: {
        marginTop: 10
    }
}))