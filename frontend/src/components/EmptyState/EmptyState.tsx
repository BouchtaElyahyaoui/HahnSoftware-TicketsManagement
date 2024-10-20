import { Box, Typography } from '@mui/material'
import React, { FC } from 'react'
import { colors } from '../../theme/theme'
import { AddButton } from '../TableFooter/TableFooter.style'

interface IEmptyStateProps  {
  onAddNew : () => void;
}

const EmptyState :FC<IEmptyStateProps> = ({onAddNew}) => {
  return (
    <Box 
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
    <AddButton variant="contained" onClick={onAddNew} sx={{ mt: 2,color:colors.white }}>
      Add New Ticket
    </AddButton>
  </Box>
  )
}

export default EmptyState