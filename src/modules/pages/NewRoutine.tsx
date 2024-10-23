import { Button, Modal, Card, Form, Input } from "antd";
import { LeftOutlined, LineChartOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import "../../styles/pages/newroutine.scss";
import { useState } from "react";

const NewRoutine = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalNewExerciseOpen, setIsModalNewExerciseOpen] =
    useState<boolean>(false);
  const [form] = Form.useForm();

  const actions: React.ReactNode[] = [
    <PlusOutlined onClick={(e) => console.log(e)} />,
    <LineChartOutlined />,
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalNew = () => {
    setIsModalNewExerciseOpen(true);
  };

  const handleCancelNew = () => {
    setIsModalNewExerciseOpen(false);
  };

  return (
    <>
      <section className="new-routine">
        <div className="container-icon">
          <LeftOutlined onClick={() => navigate("/routine")} />
        </div>
        <h2 className="subtitle">
          Comece por adicionar um exercício à sua rotina
        </h2>
        <button className="btn-add-exercise" onClick={() => showModal()}>
          <PlusOutlined />
          Adicionar exercício
        </button>
      </section>
      <Modal
        title="Adicionar Exercício"
        open={isModalOpen}
        onCancel={handleCancel}
        centered={true}
        footer={[]}
        width={700}
      >
        <Button color="default" variant="filled" onClick={() => showModalNew()}>
          <PlusOutlined />
          Novo exercício
        </Button>
        <div className="container-cards">
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <Card
                key={index}
                actions={actions}
                onClick={() => navigate("/workout")}
              >
                <Card.Meta
                  title={`Exercício ${index + 1}`}
                  description={
                    <>
                      <p>Grupo Muscular</p>
                      <p>Máquina</p>
                    </>
                  }
                />
              </Card>
            ))}
        </div>
      </Modal>

      <Modal
        title="Novo Exercício"
        open={isModalNewExerciseOpen}
        onCancel={handleCancelNew}
        centered={true}
        footer={[]}
        width={700}
      >
        <Form
          layout={"vertical"}
          form={form}
          initialValues={{ layout: "vertical" }}
        >
          <Form.Item label="Nome do exercício">
            <Input placeholder="Digite" />
          </Form.Item>
          <Form.Item label="Grupo muscular">
            <Input placeholder="Digite" type="" />
          </Form.Item>
          <Form.Item label="Tipo do exercício">
            <Input placeholder="Digite" type="" />
          </Form.Item>
          <Form.Item>
            <Button color="default" variant="filled">
              Cadastrar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default NewRoutine;
