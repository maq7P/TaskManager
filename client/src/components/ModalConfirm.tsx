import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";

interface ModalConfirm {
    isOpen: boolean,
    callback: () => void | Promise<any>,
    setConfirmOpen: (confirmOpen: boolean) => void,
    title: string
}
const ModalConfirm: React.FC<ModalConfirm> = ({isOpen, callback, setConfirmOpen, title}): React.ReactElement => {
    return (
        <Dialog
            open={isOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogActions>
                <Button onClick={() => {
                    setConfirmOpen(false)
                    callback()
                }} color="primary">
                    Да
                </Button>
                <Button onClick={() => {
                    setConfirmOpen(false)
                }} color="primary">
                    Нет
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default ModalConfirm