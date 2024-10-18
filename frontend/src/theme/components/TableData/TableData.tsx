import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { FC } from 'react'
import { ActionLink, StyledTableCell } from './TableData.style';
import { colors } from '../../theme';
import { ITicket } from '../../../services/ticket/types';
import { formatDate } from '../../../services/ticket/shared/helperFunctions';

interface ITableDataProps {
  tickets:ITicket[];
  handleEdit: (ticket:ITicket) => void;
  handleDeleteTicket: (id:number) => void
}

const TableData:FC<ITableDataProps> = ({tickets,handleEdit,handleDeleteTicket}) => {
  return (
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
  )
}

export default TableData