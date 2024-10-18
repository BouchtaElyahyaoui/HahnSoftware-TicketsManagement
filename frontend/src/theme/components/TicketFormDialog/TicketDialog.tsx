import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { ChangeEvent, FC } from 'react'
import { ITicket, TicketStatusEnum } from '../../../services/ticket/types';

interface ITicketDialogProps {
  open:boolean;
  ticket:ITicket;
  handleClose: () => void;
  handleDescriptionChange : (event: ChangeEvent<HTMLInputElement>) => void;
  handleStatusChange:(event: SelectChangeEvent<TicketStatusEnum>) => void;
  handleSubmit: () => void;
  handleSubmitEdit: (ticket:ITicket) => void;
  descriptionError:boolean;
}

const TicketDialog : FC<ITicketDialogProps> = ({open,ticket,handleClose,handleDescriptionChange,handleStatusChange,handleSubmit,handleSubmitEdit,descriptionError}) => {
  const isEditForm = ticket.id != 0;
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{isEditForm ? "Edit ticket" : "Add new ticket"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="description"
            label="Ticket Description"
            type="text"
            fullWidth
            variant="outlined"
            value={ticket.description}
            onChange={handleDescriptionChange}
            error={descriptionError}
            helperText={descriptionError ? 'This field is required!' : ' '}
          />
          <FormControl fullWidth variant="outlined" margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={ticket.status}
              onChange={handleStatusChange}
              label="Status"
            >
              <MenuItem value="OPEN">Open</MenuItem>
              <MenuItem value="CLOSED">Closed</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {
            if(isEditForm) {
              handleSubmit();
            } else {
              handleSubmitEdit(ticket);
            }
          }} color="primary">
            {isEditForm ? "Edit" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default TicketDialog