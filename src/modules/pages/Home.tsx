import { useNavigate } from "react-router-dom";
import "../../styles/pages/home.scss";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="home">
        <h1 className="logo">TrackFit</h1>
        <button className="btn-access" onClick={() => navigate("/login")}>
          Iniciar sessão
        </button>

        <span className="new-user">
          é um novo utilizador do TrackFit?{" "}
          <a
            className="link"
            onClick={() => {
              navigate("/register");
            }}
          >
            Registrar
          </a>
        </span>
      </section>
    </>
  );
};

export default Home;
