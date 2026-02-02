import { BrowserRouter, Route, Routes } from "react-router-dom";
import Playground from "./screens/Playground";
import Home from "./screens/Home";
import Error404 from "./screens/Error404";
import { GlobalStyle } from "./style/global";
import ModalProvider from "./context/ModalContext";
import PlaygroundProvider from "./context/PlaygroundContext";
import LandingPage from "./pages/Landing.jsx";

function App() {
  return (
    <PlaygroundProvider>
      <ModalProvider>
        <BrowserRouter>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/playground/:folderId/:playgroundId"
              element={<Playground />}
            />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </PlaygroundProvider>
  );
}

export default App;
