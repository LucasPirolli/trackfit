import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Card } from "antd";

import { useNavigate } from "react-router-dom";

import "../../styles/pages/routine.scss";

const Routine = () => {
  const navigate = useNavigate();

  const actions: React.ReactNode[] = [
    <EditOutlined key="edit" />,
    <DeleteOutlined key="delete" />,
  ];

  return (
    <>
      <section className="routine">
        <div className="flex">
          <h1 className="title">Rotinas</h1>
          <button className="btn-challange">Desafio</button>
        </div>
        <div className="container-btn-new-routine">
          <button className="btn-new-routine">
            <PlusOutlined />
            Nova rotina
          </button>
        </div>
        <div className="container-cards">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <Card
                key={index}
                actions={actions}
                onClick={() => navigate("/workout")}
              >
                <Card.Meta
                  title={`Card title ${index + 1}`}
                  description={
                    <>
                      <p>This is the description {index + 1}</p>
                      <p>This is the description {index + 1}</p>
                    </>
                  }
                />
              </Card>
            ))}
        </div>
      </section>
    </>
  );
};

export default Routine;
