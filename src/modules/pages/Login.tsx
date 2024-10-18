import { Form, Input } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import "../../styles/pages/login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
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
            <Input placeholder="Digite" />
          </Form.Item>
          <Form.Item label="Senha">
            <Input.Password placeholder="Digite" type="" />
          </Form.Item>
          <Form.Item>
            <button className="btn-access" onClick={() => navigate("/routine")}>
              Entrar
            </button>
          </Form.Item>
        </Form>
      </section>
    </>
  );
};

export default Login;
