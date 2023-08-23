import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export function Sure(props) {
  const { open, setOpen, onAccept } = props

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: { background: '#010101', borderRadius: 7 },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {"Você tem certeza que deseja mudar a conta?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ao mudar de conta, você perderá todos os dados não salvos.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Não</Button>
          <Button onClick={onAccept} autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
