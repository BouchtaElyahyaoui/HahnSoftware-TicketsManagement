import styled from "@emotion/styled";
import { TableCell } from "@mui/material";
import { colors } from "../../theme/theme";

export const StyledTableCell = styled(TableCell)(() => ({
  fontWeight: 'bold',
  color: colors.white,
}));

export const ActionLink = styled('a')({
  color: colors.primary,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
    cursor:'pointer',
  },
});