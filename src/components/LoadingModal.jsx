import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import GridLoader from 'react-spinners/GridLoader'
import Typography from '@mui/material/Typography'

export function LoadingModal(props) {
  const { open, setOpen } = props

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
        xs={12}
        md={6}
        lg={6}
        xl={4}
        PaperProps={{
          style: {
            background: '#010101',
            borderRadius: 7,
            width: '25vw',
            height: '25vh',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          },
        }}
      >
        <DialogContent
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}>
          <GridLoader color="#36d7b7" />
          <Typography variant="h6" style={{ marginTop: 14, color: 'white' }}>
            Carregando definições...
          </Typography>
        </DialogContent>
      </Dialog>
    </div >
  );
}
