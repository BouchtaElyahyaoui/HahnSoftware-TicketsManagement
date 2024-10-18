import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { FC } from 'react'
import { ActionLink, StyledTableCell } from './TableData.style';
import { colors } from '../../theme';
import { ITicket } from '../../../services/ticket/types';
import { formatDate } from '../../../services/ticket/shared/helperFunctions';
import { AddButton } from '../TableFooter/TableFooter.style';

interface ITableDataProps {
  tickets:ITicket[];
  handleEdit: (ticket:ITicket) => void;
  handleDeleteTicket: (id:number) => void;
  handleClickOpen: () => void;
}

const TableData:FC<ITableDataProps> = ({tickets,handleEdit,handleDeleteTicket,handleClickOpen}) => {
  return tickets.length > 0 ? (
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
          ) : (<Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '200px', 
            backgroundColor: colors.background 
          }}
        >
          <Typography variant="h6" gutterBottom>
            No tickets found
          </Typography>
          <Typography variant="body1" gutterBottom>
            Get started by creating a new ticket
          </Typography>
          <AddButton variant="contained" onClick={handleClickOpen}  sx={{ mt: 2 }}>
            Add New Ticket
          </AddButton>
        </Box>
  )
}

export default TableData