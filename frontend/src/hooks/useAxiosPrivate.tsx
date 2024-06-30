import { axiosPrivate } from "../services/api/axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import useRefreshToken from "./useRefreshToken";
import { RootState } from "../services/redux/store";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken(); // generate new  accessToken

  const accessToken = useSelector(
    (state: RootState) => state.users.accessToken,
  );

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config; // getting prev token

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      },
    );
    //clean up function
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [refresh, accessToken]);
};

export default useAxiosPrivate;
