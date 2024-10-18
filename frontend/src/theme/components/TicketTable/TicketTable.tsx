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
import { createTicket, deleteTicket, editTicket, getTickets } from '../../../services/ticket/service';
import { formatDate } from '../../../services/ticket/shared/helperFunctions';
import { ITicket, TicketStatusEnum } from '../../../services/ticket/types';
import theme, { colors } from '../../theme';
import TicketDialog from '../TicketFormDialog/TicketDialog';
import { useSnackbar } from 'notistack';

const StyledTableCell = styled(TableCell)(() => ({
  fontWeight: 'bold',
  color: colors.white,
}));

const ActionLink = styled('a')({
  color: colors.primary,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
    cursor:'pointer',
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

  const { enqueueSnackbar } = useSnackbar()

  const showSuccessMessage = (message:string) => {
    enqueueSnackbar(message,{
      autoHideDuration: 1500,
      anchorOrigin: {
        horizontal:"center",
        vertical: "bottom",
      },
      variant:'success',
    });
  }

  const showErrorMessage = () => {
    enqueueSnackbar('An error has occured, please try again later',{
      autoHideDuration: 1500,
      anchorOrigin: {
        horizontal:"center",
        vertical: "bottom",
      },
      variant:'success',
    });
  }


  const loadTickets = async () => {
    const tickets = await getTickets();
    setTickets(tickets);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewTicket(initTicket);
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
    createTicket(newTicket).then((tickets) => {
      showSuccessMessage("Ticket has been created successfully");
      setTickets(tickets);
      setNewTicket(initTicket);
      handleClose();
    }).catch(() => {
      showErrorMessage();
      console.log("Error when submiting the ticket");
    })
  };

  const handleSubmitEdit = (ticket:ITicket) => {
    editTicket(ticket.id,ticket).then(() => {
      showSuccessMessage("Ticket has been edited successfully");
      loadTickets().catch(() => {
        console.log("Could not load new data");
      });
      handleClose();
    }).catch(() => {
      showErrorMessage();
      console.log("Error when editing the ticket");
    })
  }

  const handleEdit = (ticket:ITicket) => {
    setNewTicket(ticket);
    handleClickOpen();
  }

  const handleDeleteTicket = (id:number) => {
    deleteTicket(id).then(() => {
      showSuccessMessage("Ticket deleted successsfully")
      loadTickets().catch(() => {
        console.log("Could not load new data");
      });
      handleClose();
    }).catch(() => {
      showErrorMessage();
      console.log("Error when deleting the ticket");
    })
  }



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
                    <ActionLink onClick={() => {
                      handleEdit(ticket);
                    }}>Update</ActionLink>
                    <ActionLink  onClick={() => {
                      handleDeleteTicket(ticket.id);
                    }}>Delete</ActionLink>
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
        handleSubmitEdit={handleSubmitEdit}
        ticket={newTicket} />
    </ThemeProvider>
  );
};

export default TicketTable;