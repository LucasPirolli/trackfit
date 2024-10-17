import { Form, Input } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import "../../styles/pages/register.scss";

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

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
            <Input placeholder="Digite" />
          </Form.Item>
          <Form.Item label="E-mail">
            <Input placeholder="Digite" type="email" />
          </Form.Item>
          <Form.Item label="Senha">
            <Input.Password placeholder="Digite" type="" />
          </Form.Item>
          <Form.Item>
            <button className="btn-register">Cadastrar</button>
          </Form.Item>
        </Form>
      </section>
    </>
  );
};

export default Register;
