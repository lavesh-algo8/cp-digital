import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/superadmin/Login";
import Admins from "./pages/superadmin/Admins";
import Dashboard from "./pages/superadmin/Dashboard";
import Laws from "./pages/superadmin/Laws";
import Calculator from "./pages/superadmin/Calculator";

function App() {
  const theme = createTheme({
    palette: {
      maincolor: {
        main: "#192A3A",
      },
      primary: {
        main: "#192A3A",
      },
      whitecol: {
        main: "#FFFFFF",
      },
      greencol: {
        main: "#01B066",
      },
      notificationcol: {
        main: "#FBAF18",
      },
      greycol: {
        main: "#F1F1F1",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/superadmin/admins" element={<Admins />} />
          <Route path="/superadmin/dashboard" element={<Dashboard />} />
          <Route path="/superadmin/laws" element={<Laws />}>
            <Route path=":id" element={<Laws />} />
          </Route>
          <Route path="/superadmin/calculator" element={<Calculator />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
