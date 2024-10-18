import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import { createTicket, deleteTicket, editTicket, getPaginatedResult } from '../../../services/ticket/service';
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
  console.log("New ticket",newTicket)
  const [descriptionError,setDescriptionError] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize,setPageSize] = useState<number>(2);
  const [totalPages, setTotalPages] = useState<number>(0);

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
      variant:'error',
    });
  }

  const loadPaginatedData = useCallback(async () => {
    const response = await getPaginatedResult(page, pageSize);
    const { data, totalPages } = response;
    if(data.length === 0) {
      setPage(1);
    }
    setTickets(data);
    setTotalPages(totalPages);
  }, [page, pageSize]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewTicket(initTicket);
    setDescriptionError(false);
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
    if(newTicket.description === '') {
      setDescriptionError(true);
      return;
    }
    createTicket(newTicket).then(() => {
      showSuccessMessage("Ticket has been created successfully");
      setNewTicket(initTicket);
      loadPaginatedData().catch(() => {
        console.log("Could not load new data");
      });
      handleClose();
    }).catch(() => {
      showErrorMessage();
      console.log("Error when submiting the ticket");
    })
  };

  const handleSubmitEdit = (ticket:ITicket) => {
    editTicket(ticket.id,ticket).then(() => {
      showSuccessMessage("Ticket has been edited successfully");
      loadPaginatedData().catch(() => {
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
      loadPaginatedData().catch(() => {
        console.log("Could not load new data");
      });
      handleClose();
    }).catch(() => {
      showErrorMessage();
      console.log("Error when deleting the ticket");
    })
  }



  useEffect(() => {
    loadPaginatedData();
  }, [loadPaginatedData]);

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
        <Box display="flex" width="100%" justifyContent="space-between" sx={{ background: colors.background }}>
          <AddButton variant="contained" onClick={handleClickOpen}>
            Add New
          </AddButton>
          <Box>
        <AddButton 
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))} 
          disabled={page === 1 || totalPages === 0}
        >
          Previous
        </AddButton>

        <span>Page {totalPages === 0 ? 0 : page} of {totalPages}</span>

        <AddButton  
          onClick={() => setPage((prevPage) => Math.min(prevPage + 1, totalPages))} 
          disabled={page === totalPages || totalPages === 0}
        >
          Next
        </AddButton>
        <FormControl size='medium' variant="outlined" margin="dense">
            <InputLabel>Page Size:</InputLabel>
            <Select
              name="status"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              label="Page Size:"
            >
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="10">10</MenuItem>
              <MenuItem value="15">15</MenuItem>
            </Select>
          </FormControl>
        <Box>

        
      </Box>
          </Box>
        </Box>
      </TableContainer>
      <TicketDialog 
        handleClose={handleClose}
        handleDescriptionChange={handleDescriptionChange}
        handleStatusChange={handleStatusChange}
        open={open}
        handleSubmit={handleSubmit}
        handleSubmitEdit={handleSubmitEdit}
        ticket={newTicket} 
        descriptionError={descriptionError}/>
    </ThemeProvider>
  );
};

export default TicketTable;