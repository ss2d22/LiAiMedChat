import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "@/pages/authentication";
import Chat from "@/pages/chat";
import UserProfile from "./pages/userprofile";

/**
 * App component that wraps the entire application and defines routes for the application
 * @author Sriram Sundar
 */

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/authentication" element={<Auth />} />
        {/* TODO: wrap chat and any future routes that needs to be protected in suspense after the Auth is setup */}
        <Route path="/chat" element={<Chat />} />
        <Route path="/userprofile" element={<UserProfile />} />
        {/* TODO: add a page not found component with butten to redirect back to auth or chat home page based on if user is authenticated or not */}
        <Route path="*" element={<Navigate to={"/authentication"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
