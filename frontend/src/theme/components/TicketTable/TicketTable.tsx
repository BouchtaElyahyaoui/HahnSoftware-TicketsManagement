import {
  Box,
  Button,
  Paper,
  SelectChangeEvent,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { getTickets } from '../../../services/ticket/service';
import { formatDate } from '../../../services/ticket/shared/helperFunctions';
import { ITicket, TicketStatusEnum } from '../../../services/ticket/types';
import theme, { colors } from '../../theme';
import TicketDialog from '../TicketFormDialog/TicketDialog';

const StyledTableCell = styled(TableCell)(() => ({
  fontWeight: 'bold',
  color: colors.white,
}));

const ActionLink = styled('a')({
  color: colors.primary,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const AddButton = styled(Button)(({ theme }) => ({
  backgroundColor: colors.primary,
  color: colors.white,
  margin: theme.spacing(2),
  '&:hover': {
    backgroundColor: colors.primaryHover,
  },
}));

const initTicket : ITicket = { 
  id:0,
  description: '', 
  status: TicketStatusEnum.OPEN,
  createdAt:'',
}

const TicketTable = () => {
  const [tickets,setTickets] = useState<ITicket[]>([]);
  const [open, setOpen] = useState(false);
  const [newTicket, setNewTicket] = useState<ITicket>(initTicket);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTicket(prevTicket => ({
      ...prevTicket,
      description: event.target.value
    }));
  };

  const handleStatusChange = (event: SelectChangeEvent<TicketStatusEnum>) => {
    setNewTicket(prevTicket => ({
      ...prevTicket,
      status: event.target.value as TicketStatusEnum
    }));
  };

  const handleSubmit = () => {
    console.log('New Ticket:', newTicket);
    handleClose();
    setNewTicket(initTicket);
  };

  const loadTickets = async () => {
    const tickets = await getTickets();
    setTickets(tickets);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: colors.primary }}>
              <StyledTableCell>Ticket Id</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ background: colors.background }}>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.id}</TableCell>
                <TableCell>{ticket.description}</TableCell>
                <TableCell>{ticket.status}</TableCell>
                <TableCell>{formatDate(ticket.createdAt)}</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <ActionLink href='#'>Update</ActionLink>
                    <ActionLink href='#'>Delete</ActionLink>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ background: colors.background }}>
          <AddButton variant="contained" onClick={handleClickOpen}>
            Add New
          </AddButton>
        </Box>
      </TableContainer>
      <TicketDialog 
        handleClose={handleClose}
        handleDescriptionChange={handleDescriptionChange}
        handleStatusChange={handleStatusChange}
        open={open}
        handleSubmit={handleSubmit}
        ticket={newTicket} />
    </ThemeProvider>
  );
};

export default TicketTable;