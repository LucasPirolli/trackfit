// Componentes React
import { useState } from "react";

// Componentes
import Toast from "../components/ui/Toast";

// Componentes Terceiros
import { Form, Input, Spin } from "antd";
import { LeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// API
import { login } from "../../services/endpoints";

// Estilos
import "../../styles/pages/login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [userLogin, setUserLogin] = useState({
    identificador: "",
    senha: "",
  });

  const handleLogin = async () => {
    const { identificador, senha } = userLogin;

    if (identificador === "" || senha === "") {
      Toast("error", "Preencha todos os campos para prosseguir.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await login(userLogin);

      if (response.mensagem === "Login realizado com sucesso!") {
        Toast("success", "Login realizado com sucesso!");
        setTimeout(() => {
          setIsLoading(false);
          navigate("/routine");
        }, 1500);
      } else if (
        response.detail === "Senha incorreta." ||
        response.detail === "Usuário ou email não encontrado."
      ) {
        Toast("error", "Usuário ou senha incorretos. Tente novamente!");
        setIsLoading(false);
      }
    } catch (error) {
      Toast("error", "Usuário ou senha incorretos. Tente novamente!");
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="login">
        <div className="container-icon">
          <LeftOutlined onClick={() => navigate("/")} />
        </div>
        <h1 className="logo">TrackFit</h1>
        <Form
          layout={"vertical"}
          form={form}
          initialValues={{ layout: "vertical" }}
        >
          <Form.Item label="Usuário">
            <Input
              placeholder="Digite"
              onChange={(e) =>
                setUserLogin({
                  ...userLogin,
                  identificador: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Senha">
            <Input.Password
              placeholder="Digite"
              onChange={(e) =>
                setUserLogin({
                  ...userLogin,
                  senha: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item>
            <button className="btn-access" onClick={() => handleLogin()}>
              {isLoading ? (
                <Spin indicator={<LoadingOutlined spin />} size="small" />
              ) : (
                "Entrar"
              )}
            </button>
          </Form.Item>
        </Form>
      </section>
    </>
  );
};

export default Login;
