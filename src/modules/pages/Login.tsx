import { Form, Input } from "antd";

import "../../styles/pages/login.scss";

const Login = () => {
  const [form] = Form.useForm();
  return (
    <>
      <section className="login">
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
            <button className="btn-access">Entrar</button>
          </Form.Item>
        </Form>
      </section>
    </>
  );
};

export default Login;
