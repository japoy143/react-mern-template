import { useState } from "react";
import axios from "../services/api/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  //navigation
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   axios
  //     .post("/Users/SignUp", {
  //       email: email,
  //       password: password,
  //     })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         console.log("Sign Up Successfully");
  //         toast.success("Sign Up Successfully ");
  //         navigate("/SignIn");
  //       }
  //       if (response.status === 201) {
  //         console.log("Email is Already Taken");
  //         toast.error("Email is Already Taken");
  //       }
  //     })
  //     .catch((err) => console.error(err));
  // };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("/Users/SignUp", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        console.log("Sign Up Successfully");
        toast.success("Sign Up Successfully ");
        navigate("/SignIn");
      }
    } catch (error) {
      console.error(error);
    }
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
          <p>Sing Up</p>
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;
