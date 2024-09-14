import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "@/pages/authentication";
import Chat from "@/pages/chat";
import UserProfile from "./pages/userprofile";
import { useSelector } from "react-redux";
import { RootState } from "@/types";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/state/slices/authSlice";
import { AppDispatch, AuthApiResponse } from "@/types";
import { useEffectAsync } from "@/utils/useEffectAsync";
import { useState } from "react";
//TODO: fix typescript errors
const PrivateRoute = ({ children }) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const isAuth = !!userInfo;

  return isAuth ? children : <Navigate to="/authentication" />;
};

//fix typescript errors
const AuthRoute = ({ children }): JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const isAuth = !!userInfo;

  return isAuth ? <Navigate to="/userprofile" /> : children;
};

/**
 * App component that wraps the entire application and defines routes for the application
 * @author Sriram Sundar
 */

const App: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  useEffectAsync(async () => {
    const getUserData = async () => {
      try {
        const response = "tbd";
        console.log({ response });
      } catch (error) {
        console.error(error);
      }
    };

    if (!userInfo) {
      await getUserData();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/authentication"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        {/* TODO: wrap chat and any future routes that needs to be protected in suspense after the Auth is setup */}
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/userprofile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
        {/* TODO: add a page not found component with butten to redirect back to auth or chat home page based on if user is authenticated or not */}
        <Route path="*" element={<Navigate to={"/authentication"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
