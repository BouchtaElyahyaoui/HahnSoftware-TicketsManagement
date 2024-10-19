import { Box, ThemeProvider } from "@mui/material"
import TicketTable from "./components/TicketTable/TicketTable"
import Header from "./components/Header/Header"
import theme from "./theme/theme"

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Box display="flex" padding={12} justifyContent="center" alignItems="center">
       <Header />
       <TicketTable />
    </Box>
    </ThemeProvider>
  )
}

export default App
