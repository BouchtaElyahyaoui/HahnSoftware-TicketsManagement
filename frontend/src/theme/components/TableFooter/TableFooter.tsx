import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { Dispatch, FC, SetStateAction } from 'react'
import { AddButton } from './TableFooter.style'
import { colors } from '../../theme'

interface ITableFooterProps {
  handleClickOpen: () => void;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages:number;
  pageSize:number;
  setPageSize:Dispatch<SetStateAction<number>>
}

const TableFooter :FC<ITableFooterProps> = ({handleClickOpen,page,setPage,totalPages,pageSize,setPageSize}) => {
  return (
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
  )
}

export default TableFooter