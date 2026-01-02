import { Route, Routes } from "react-router-dom";
import Nav from "./components/navbar.jsx";
import Pasteeditor from "./components/pasteeditor.jsx";
import Pastelist from "./components/pastelist.jsx";
import Pasteview from "./components/pasteview.jsx";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <div className="flex flex-col items-center font-stretch-115% no-scroll page">
      <Nav />
      <Toaster
        duration
        position="top-center"
        toastOptions={{
          style: {
            background: "#000",
            color: "#fff",
            borderRadius: "12px",
            border: "1px solid #333",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#000",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Pasteeditor />} />
        <Route path="/pastes" element={<Pastelist />} />
        <Route path="/pastes/:id" element={<Pasteview />} />
        <Route path="/:id" element={<Pasteeditor />} />
      </Routes>
    </div>
  );
};

export default App;
