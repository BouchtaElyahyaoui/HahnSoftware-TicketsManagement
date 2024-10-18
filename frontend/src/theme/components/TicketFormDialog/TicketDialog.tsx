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
}

const TicketDialog : FC<ITicketDialogProps> = ({open,ticket,handleClose,handleDescriptionChange,handleStatusChange,handleSubmit}) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add New Ticket</DialogTitle>
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
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default TicketDialog