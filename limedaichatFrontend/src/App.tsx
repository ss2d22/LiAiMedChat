import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@/App.css";
import Auth from "@/pages/authentication";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/authentication" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
