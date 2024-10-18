import { Button, styled } from "@mui/material";
import { colors } from "../../theme";

export const AddButton = styled(Button)(({ theme }) => ({
  backgroundColor: colors.primary,
  color: colors.white,
  margin: theme.spacing(2),
  '&:hover': {
    backgroundColor: colors.primaryHover,
  },
}));