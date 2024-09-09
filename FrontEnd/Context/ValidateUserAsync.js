import { useEffect, useContext } from "react";
import { NavContext } from "./Context";
import AsyncStorageUtil from "../Services/AsyncStorage";
import { validateUser } from "../API/api";
export default function ValidateUser() {
  const { setIsLoggedIn,setSenderEmail, setPrivateKey, setUsername } = useContext(NavContext);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const userData = await AsyncStorageUtil.getUserData();
        if (userData) {
          const response = await validateUser(userData.email, userData.password);//Think of a better way to do this
          if (response.data === true) {
            setSenderEmail(userData.email);
            setPrivateKey(userData.PrivateKey);
            setUsername(userData.userName);
            setIsLoggedIn(true);  // Set isLoggedIn to true on success
          } else {
            setIsLoggedIn(false); // Set isLoggedIn to false on failure
          }
        } else {
          setIsLoggedIn(false);   // No stored data, set isLoggedIn to false
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.error("Error validating user:", error);
      }
    };

    checkLogin();  // Call the function inside useEffect
  }, [setIsLoggedIn]); // Add setIsLoggedIn to the dependency array

  return null;  // No UI to render
}
