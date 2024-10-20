import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Dispatch, FC, SetStateAction } from 'react';
import { ITicketFilter, SortByEnum, TicketStatusEnum } from '../../services/ticket/types';

interface FilterBarProps {
  ticketFilter: ITicketFilter;
  setTicketFiler: Dispatch<SetStateAction<ITicketFilter>>;
}

const FilterComponent: FC<FilterBarProps> = ({
  ticketFilter,
  setTicketFiler,
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'flex-end' }}>
      <TextField
        label="Description"
        value={ticketFilter.description}
        onChange={(e) => setTicketFiler( {...ticketFilter,description:e.target.value})}
        size="small"
      />
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={ticketFilter.status}
          onChange={(e) => setTicketFiler( {...ticketFilter,status:(e.target.value as TicketStatusEnum | null)})}
          label="Status"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value={TicketStatusEnum.OPEN}>Open</MenuItem>
          <MenuItem value={TicketStatusEnum.CLOSED}>Closed</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={ticketFilter.sortBy}
          onChange={(e) => setTicketFiler( {...ticketFilter,sortBy:e.target.value as SortByEnum})}
          label="Sort By"
        >
          <MenuItem value={SortByEnum.ID}>ID</MenuItem>
          <MenuItem value={SortByEnum.DESCRIPTION}>Description</MenuItem>
          <MenuItem value={SortByEnum.STATUSS}>Status</MenuItem>
          <MenuItem value={SortByEnum.CREATED_AT}>Date</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Order</InputLabel>
        <Select
          value={ticketFilter.isDescending ? 'desc' : 'asc'}
          onChange={(e) => setTicketFiler( {...ticketFilter,isDescending:e.target.value === "desc"})}
          label="Order"
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterComponent;