import axios from "../services/api/axios";
import { useDispatch } from "react-redux";
import { updateAccessToken } from "../services/redux/userSlice";

function useRefreshToken() {
  const dispatch = useDispatch();

  const refresh = async () => {
    const response = await axios.get("/Users/Refresh", {
      withCredentials: true, // for passing tokens
    });

    dispatch(updateAccessToken(response.data.accessToken));
    console.log(response.data.accessToken);
  };

  return refresh;
}

export default useRefreshToken;
