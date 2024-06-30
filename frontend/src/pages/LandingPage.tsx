import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <p>Landing Page</p>
      <button onClick={() => navigate("/SignUp")}>
        <p>login</p>
      </button>
    </div>
  );
}

export default LandingPage;
