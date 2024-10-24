// Componentes React
import { useState } from "react";

// Componentes de terceiros
import { Form, Input, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { LeftOutlined, LoadingOutlined } from "@ant-design/icons";

// Componentes
import Toast from "../components/ui/Toast";

// API
import { createUser } from "../../services/endpois";

// Estilos
import "../../styles/pages/register.scss";

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [registerUser, setRegisterUser] = useState({
    nome: "",
    user: "",
    email: "",
    senha: "",
  });

  const handleCreateUser = async () => {
    const { user, nome, email, senha } = registerUser;

    if (user === "" || nome === "" || email === "" || senha === "") {
      Toast("error", "Preencha todos os campos para prosseguir.");
      return;
    }

    if(senha.length < 6) {
      Toast("info", "A senha deve conter pelo menos 6 digitos!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await createUser(registerUser);

      if (!response.detail) {
        Toast("success", "Usuário cadastrado com sucesso!");
        setTimeout(() => {
          setIsLoading(false);
          navigate("/login");
        }, 1500);
      } else {
        Toast("error", "Erro ao cadastrar usuário, tente novamente!");
        setIsLoading(false);
      }
    } catch (error) {
      Toast("error", "Erro ao inesperado!");
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="register">
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
                setRegisterUser({
                  ...registerUser,
                  user: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Nome Completo">
            <Input
              placeholder="Digite"
              onChange={(e) =>
                setRegisterUser({
                  ...registerUser,
                  nome: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="E-mail">
            <Input
              placeholder="Digite"
              type="email"
              onChange={(e) =>
                setRegisterUser({
                  ...registerUser,
                  email: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Senha">
            <Input.Password
              placeholder="Digite"
              onChange={(e) =>
                setRegisterUser({
                  ...registerUser,
                  senha: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item>
            <button
              className="btn-register"
              onClick={() => {
                handleCreateUser();
              }}
            >
              {isLoading ? (
                <Spin indicator={<LoadingOutlined spin />} size="small" />
              ) : (
                "Cadastrar"
              )}
            </button>
          </Form.Item>
        </Form>
      </section>
    </>
  );
};

export default Register;
