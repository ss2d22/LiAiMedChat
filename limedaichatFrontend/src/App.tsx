import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "@/pages/authentication";
import Chat from "@/pages/chat";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/authentication" element={<Auth />} />
        {/* TODO: wrap chat and any future routes that needs to be protected in suspense after the Auth is setup */}
        <Route path="/chat" element={<Chat />} />
        {/* TODO: add a page not found component with butten to redirect back to auth or chat home page based on if user is authenticated or not */}
        <Route path="*" element={<Navigate to={"/authentication"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
