import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./context/Auth";
import Routes from "./routes";
import GlobalStyle from "./styles/global";
import theme from "./styles/themes";

const App = () => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <GlobalStyle />
      <Toaster />
      <Routes />
    </AuthProvider>
  </ThemeProvider>
);

export default App;
