import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/Auth";

import Routes from "./routes";

import GlobalStyle from "./styles/global";

const App = () => (
  <>
    <AuthProvider>
      <GlobalStyle />
      <Router>
        <Toaster />
        <Routes />
      </Router>
    </AuthProvider>
  </>
);

export default App;
