// Componentes React
import { useEffect, useState } from "react";

// Componentes Terceiros
import {
  DeleteOutlined,
  LeftOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { Card, Table } from "antd";
import type { TableProps } from "antd";

// Funções Terceiros
import { useLocation, useNavigate } from "react-router-dom";

// Estilos
import "../../styles/pages/workout.scss";

interface DataType {
  key: string;
  serie: number;
  kg: string;
  reps: number;
}

const Workout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [selectedData, setSelectedData] = useState(state?.selectedData);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Série",
      dataIndex: "serie",
      key: "serie",
    },
    {
      title: "Peso",
      dataIndex: "peso",
      key: "peso",
    },
    {
      title: "REPS",
      dataIndex: "repeticoes",
      key: "reps",
    },
  ];

  return (
    <section className="workout">
      <div className="container-icon">
        <LeftOutlined onClick={() => navigate("/routine")} />
      </div>
      <div className="flex">
        <h1 className="title">{selectedData.titulo}</h1>
      </div>
      <h2 className="subtitle">Exercícios :</h2>
      <div className="container-cards">
        {selectedData.exercicios.map((exercicio: any, index: number) => {
          const actions: React.ReactNode[] = [
            <LineChartOutlined onClick={() => navigate("/history")} />,
          ];
          return (
            <Card key={index} actions={actions}>
              <Card.Meta
                title={exercicio.nome}
                description={
                  <>
                    <p>{exercicio.grupo_muscular}</p>
                    <p>{exercicio.tipo_exercicio}</p>

                    <Table<DataType>
                      columns={columns}
                      dataSource={exercicio.detalhes}
                      size="small"
                      pagination={false}
                    />
                  </>
                }
              />
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default Workout;
