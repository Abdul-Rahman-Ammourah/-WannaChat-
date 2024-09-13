import { useEffect, useContext } from "react";
import { NavContext } from "../Context/Context";
import AsyncStorageUtil from "./AsyncStorage";
import { jwtDecode } from "jwt-decode";
export default function ValidateUser() {
  const { setIsLoggedIn, setSenderEmail, setPrivateKey, setUsername,setUserProfilePic,setToken } = useContext(NavContext);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const userData = await AsyncStorageUtil.getUserData();
        const token = await AsyncStorageUtil.getToken();
        if (token) {
          // Decode token and check its expiration
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp && decodedToken.exp > currentTime) {
            // Token is valid, use stored user data to set app state
            setSenderEmail(userData.email);
            setPrivateKey(userData.PrivateKey);
            setUsername(userData.userName);
            setUserProfilePic(userData.profilePic);
            setToken(token)
            setIsLoggedIn(true);

          } else {
            // Token has expired, reset login state
            setIsLoggedIn(false);
            console.log("Token has expired");
          }
        } else {
          // No token stored, user is not logged in
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.error("Error during token validation:", error);
      }
    };

    checkLogin();
  }, [setIsLoggedIn, setSenderEmail, setPrivateKey, setUsername]);

  return null;
}
