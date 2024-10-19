import { Button, styled } from "@mui/material";
import { colors } from "../../theme/theme";

export const AddButton = styled(Button)(({ theme }) => ({
  color: colors.primary,
  margin: theme.spacing(2),
  '&:hover': {
    color: colors.white,
    backgroundColor: colors.primaryHover,
  },
}));