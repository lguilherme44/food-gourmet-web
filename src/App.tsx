import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/Auth";
import Routes from "./routes";
import GlobalStyle from "./styles/global";

const App = () => (
  <>
    <AuthProvider>
      <GlobalStyle />
      <Toaster />
      <Routes />
    </AuthProvider>
  </>
);

export default App;
