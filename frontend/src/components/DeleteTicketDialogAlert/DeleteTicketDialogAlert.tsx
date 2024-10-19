import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { FC } from 'react';

interface IDeleteTicketDialogAlertProps {
  open:boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

const DeleteTicketDialogAlert : FC<IDeleteTicketDialogAlertProps> = ({open,handleClose,handleDelete}) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Delete ticket</DialogTitle>
        <DialogContent>
          <Typography variant='body2' color='textPrimary'>
              Are you sure you want to remove this ticket ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained' color="success">
            Cancel
          </Button>
          <Button color="error" variant='contained' onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default DeleteTicketDialogAlert