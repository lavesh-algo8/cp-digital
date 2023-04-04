import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import Navigation from "./components/common/Navigation/Navigation";
import Toaster from "./components/common/Toaster/Toaster";

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
      redcol: {
        main: "#c41d1d",
      },
    },
    typography: {
      fontFamily: ["Open Sans"].join(","),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Navigation />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
