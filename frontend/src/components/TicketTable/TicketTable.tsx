import {
  Paper,
  SelectChangeEvent,
  TableContainer
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import { createTicket, deleteTicket, editTicket, getPaginatedResult } from '../../services/ticket/service';
import { ITicket, TicketStatusEnum } from '../../services/ticket/types';
import TableData from '../TableData/TableData';
import TableFooter from '../TableFooter/TableFooter';
import TicketDialog from '../TicketFormDialog/TicketDialog';



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
    <>
      <TableContainer component={Paper}>
        <TableData tickets={tickets} handleDeleteTicket={handleDeleteTicket} handleEdit={handleEdit} handleClickOpen={handleClickOpen} />
        {tickets.length > 0 && (
          <TableFooter handleClickOpen={handleClickOpen} page={page} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} totalPages={totalPages} />
        )}
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
        </>
  );
};

export default TicketTable;