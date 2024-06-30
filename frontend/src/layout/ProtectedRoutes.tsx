import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../services/redux/store";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoutes({ children }: ProtectedRouteProps) {
  const user = useSelector((state: RootState) => state.users.isLogin);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }

    if (user) {
      navigate("/HomePage");
    }
  }, [navigate, user]);

  return children;
}
