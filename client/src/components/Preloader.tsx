import React from 'react'

import { CircularProgress, makeStyles } from '@material-ui/core'


const useStyles = makeStyles(() => ({
    wrapper: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))

const Preloader = () => {
    const classes = useStyles() 
    return (
        <div className={classes.wrapper}>
            <CircularProgress disableShrink />
        </div>
    )
}

export default Preloader