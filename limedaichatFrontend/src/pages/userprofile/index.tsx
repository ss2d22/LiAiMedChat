import { useSelector } from "react-redux";
import { RootState } from "@/types";

/**
 * User Profile component that displays the user information and allows user to configure their profile
 * @author Sriram Sundar
 *
 *
 */
const UserProfile: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  return (
    <>
      {userInfo ? (
        <>
          <div>{userInfo.email}</div>
          <div>{userInfo.username}</div>
          <div>{userInfo.avatar}</div>
          <div>{userInfo.configuredProfile}</div>
          <div>{userInfo.id}</div>
        </>
      ) : (
        <>
          <h1>no user info</h1>
        </>
      )}
      <div>UserProfile</div>
    </>
  );
};

export default UserProfile;
