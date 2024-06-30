import { useDispatch } from "react-redux";
import { logout } from "../services/redux/userSlice";

function HomePage() {
  const dispatch = useDispatch();

  return (
    <div>
      <p>HomePage</p>
      <button onClick={() => dispatch(logout())}>
        <p>logout</p>
      </button>
    </div>
  );
}

export default HomePage;
