// Componente terceiros
import { SplitCellsOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Componentes
import Toast from "./Toast";

// Estilos
import "../../../styles/components/ui/_floatingbutton.scss";

// Contexto
import { useMain } from "../../../context/MainContext";

const FloatingButton = () => {
  const navigate = useNavigate();
  const { setIdUser } = useMain();

  const handleExit = () => {
    Toast("info", "Saindo do sistema...");
    setTimeout(() => {
      navigate("/");
      Cookies.remove("user_id");
      setIdUser("");
    }, 1500);
  };
  return (
    <button className="floating-button" onClick={() => handleExit()}>
      <SplitCellsOutlined />
    </button>
  );
};

export default FloatingButton;
