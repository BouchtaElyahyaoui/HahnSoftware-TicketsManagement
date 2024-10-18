import React, { useEffect, useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button,
  styled,
  Box
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme, { colors } from './theme/theme';
import { ITicket } from './services/ticket/types';
import { getTickets } from './services/ticket/service';

// const tickets = [
//   { id: 1002, description: 'Promotion code issued', status: 'Open', date: 'May-29-2022' },
//   { id: 1003, description: 'Additional user account', status: 'Open', date: 'May-27-2022' },
//   { id: 1004, description: 'Change payment method', status: 'Open', date: 'May-28-2022' },
//   { id: 1005, description: 'Activate account', status: 'Closed', date: 'May-28-2022' },
//   { id: 1007, description: 'Great job', status: 'Closed', date: 'May-29-2022' },
//   { id: 1008, description: 'Another Great Job', status: 'Closed', date: 'May-29-2022' },
//   { id: 1000, description: 'Help with Login', status: 'Closed', date: 'May-29-2022' },
//   { id: 1024, description: 'Happy Customer', status: 'Open', date: 'May-29-2022' },
// ];

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

const TicketTable = () => {
  const [tickets,setTickets] = useState<ITicket[]>([]);

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
                <TableCell>{ticket.createdAt}</TableCell>
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
          <AddButton variant="contained">
            Add New
          </AddButton>
        </Box>
      </TableContainer>
    </ThemeProvider>
  );
};

export default TicketTable;