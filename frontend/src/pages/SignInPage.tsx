import { useState } from "react";
import axios from "../services/api/axios";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { login } from "../services/redux/userSlice";
import { useNavigate } from "react-router-dom";

function SignInPage() {
  //state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post("/Users/Login", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.Message === "Success") {
          toast.success("Sign In Successfully");
          dispatch(login());
          navigate("/");
        } else {
          toast.error("Sign In Failed");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Sign In Failed");
      });
  };

  return (
    <div>
      <form className="flex flex-col items-center" onSubmit={onSubmit}>
        <label>Email</label>
        <input
          className="w-40 border-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="w-40 border-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          <p>Sign In</p>
        </button>
      </form>
    </div>
  );
}

export default SignInPage;
