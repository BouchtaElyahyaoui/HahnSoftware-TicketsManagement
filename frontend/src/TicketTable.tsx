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
  useTheme,
  Box
} from '@mui/material';

const tickets = [
  { id: 1002, description: 'Promotion code issued', status: 'Open', date: 'May-29-2022' },
  { id: 1003, description: 'Additional user account', status: 'Open', date: 'May-27-2022' },
  { id: 1004, description: 'Change payment method', status: 'Open', date: 'May-28-2022' },
  { id: 1005, description: 'Activate account', status: 'Closed', date: 'May-28-2022' },
  { id: 1007, description: 'Great job', status: 'Closed', date: 'May-29-2022' },
  { id: 1008, description: 'Another Great Job', status: 'Closed', date: 'May-29-2022' },
  { id: 1000, description: 'Help with Login', status: 'Closed', date: 'May-29-2022' },
  { id: 1024, description: 'Happy Customer', status: 'Open', date: 'May-29-2022' },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.common.white,
  borderRight: "1px solid #cccccc",
  '&:last-child': {
    borderRight: 'none',
  },
}));



const AddButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#09b267',
  color: theme.palette.common.white,
  margin: theme.spacing(2),
  '&:hover': {
    backgroundColor: '#00cd79',
  },
}));

const TicketTable = () => {
  const theme = useTheme();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#09b267' }}>
            <StyledTableCell>Ticket Id</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{background:"#f2f2f2"}}>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell sx={{
                borderRight: `1px solid ${theme.palette.divider}`,
              }}>{ticket.id}</TableCell>
              <TableCell sx={{
                borderRight: `1px solid ${theme.palette.divider}`
              }}>{ticket.description}</TableCell>
              <TableCell sx={{
                borderRight: `1px solid ${theme.palette.divider}`
              }}>{ticket.status}</TableCell>
              <TableCell sx={{
                borderRight: `1px solid ${theme.palette.divider}`
              }}>{ticket.date}</TableCell>
              <TableCell sx={{
                borderRight: `1px solid ${theme.palette.divider}`
              }}>
                <Box display="flex" gap={1}>
                <a href='#'>Update</a>
                <a href='#'>Delete</a>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={{background:"#f2f2f2"}}>
      <AddButton variant="contained">
        Add New
      </AddButton>
      </Box>
    </TableContainer>
  );
};

export default TicketTable;