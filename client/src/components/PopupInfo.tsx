import React from 'react';
import { Popper } from '@material-ui/core';

interface PopupInfoProps {
    anchorEl: null | HTMLElement
    setAnchorEl: (anchorEl:  null | HTMLElement) => void ,
    children: any
}
export default function PopupInfo({anchorEl, setAnchorEl, children}: PopupInfoProps) {


  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Popper 
        id={id}
        open={open}
        anchorEl={anchorEl}
      >
        {children}
      </Popper >
    </div>
  );
}