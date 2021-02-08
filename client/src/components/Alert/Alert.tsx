import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { Button, Collapse, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

interface AlertProps {
    message: string,
    styles?: any ,
    open: boolean,
    setOpen: (flag: boolean) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

export default function AlertSuccess({message, styles={}, setOpen, open}: AlertProps): React.ReactElement {
  const classes = useStyles();

  return (
    <div className={`${classes.root} ${styles}`}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </Collapse>
    </div>
  );
}

