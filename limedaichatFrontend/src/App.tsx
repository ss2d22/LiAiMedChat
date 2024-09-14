import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "@/pages/authentication";
import Chat from "@/pages/chat";
import UserProfile from "./pages/userprofile";
import { useSelector } from "react-redux";
import { RootState, RouterProps, UserInformation } from "@/types";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/state/slices/authSlice";
import { AppDispatch, AuthApiResponse } from "@/types";
import { useEffectAsync } from "@/utils/useEffectAsync";
import { useState } from "react";
import { useGetFetchUserInfoQuery } from "./state/api/authenticationApi";

const PrivateRoute: React.FC<RouterProps> = ({ children }: RouterProps) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const isAuth = !!userInfo;

  return isAuth ? children : <Navigate to="/authentication" />;
};

const AuthRoute: React.FC<RouterProps> = ({ children }: RouterProps) => {
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
  const { data, error, isLoading, refetch } = useGetFetchUserInfoQuery({});

  useEffectAsync(async () => {
    const getUserData = async () => {
      try {
        const result = await refetch();
        console.log({ result });
        if (result.data && result.isSuccess) {
          dispatch(setUserInfo(result.data.user as UserInformation));
        } else {
          dispatch(setUserInfo(undefined));
        }
      } catch (error) {
        console.error(error);
        dispatch(setUserInfo(undefined));
      } finally {
        setLoading(false);
      }
    };
    if (!userInfo) {
      await getUserData();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);

  if (loading || isLoading) {
    return (
      <>
        <h1>加载中...</h1>
      </>
    );
  }
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
