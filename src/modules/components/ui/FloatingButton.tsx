// Componente terceiros
import { SplitCellsOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// Componentes
import Toast from "./Toast";

// Estilos
import "../../../styles/components/ui/_floatingbutton.scss";

const FloatingButton = () => {
  const navigate = useNavigate();

  const handleExit = () => {
    // TODO limpar localStorege quando implementado

    Toast("info", "Saindo do sistema...");
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };
  return (
    <button className="floating-button" onClick={() => handleExit()}>
      <SplitCellsOutlined />
    </button>
  );
};

export default FloatingButton;
