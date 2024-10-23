import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  LeftOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { Card, Table } from "antd";
import { useNavigate } from "react-router-dom";
import type { TableProps } from "antd";

import "../../styles/pages/workout.scss";
import { useEffect, useState } from "react";

interface DataType {
  key: string;
  serie: number;
  kg: string;
  reps: number;
}

const Workout = () => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const actions: React.ReactNode[] = isEditing
    ? [<DeleteOutlined key="delete" />, <EditOutlined key="edit" />]
    : [<LineChartOutlined key="chart" />];

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Série",
      dataIndex: "serie",
      key: "serie",
    },
    {
      title: "KG",
      dataIndex: "kg",
      key: "kg",
    },
    {
      title: "REPS",
      dataIndex: "reps",
      key: "reps",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      serie: 1,
      kg: "32kg",
      reps: 6,
    },
    {
      key: "2",
      serie: 2,
      kg: "68kg",
      reps: 6,
    },
    {
      key: "3",
      serie: 3,
      kg: "90kg",
      reps: 10,
    },
  ];

  const handleEditingWorkout = () => {
    setIsEditing(!isEditing);
  };

  return (
    <section className="workout">
      <div className="container-icon">
        <LeftOutlined onClick={() => navigate("/routine")} />
      </div>
      <div className="flex">
        <h1 className="title">Card title 1</h1>
        <div className="container-icons">
          {isEditing ? (
            <CloseOutlined onClick={() => handleEditingWorkout()} />
          ) : (
            <EditOutlined key="edit" onClick={() => handleEditingWorkout()} />
          )}
          <DeleteOutlined key="delete" />
        </div>
      </div>
      <h2 className="subtitle">Exercícios :</h2>
      <div className="container-cards">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <Card key={index} actions={actions}>
              <Card.Meta
                title={`Exercício ${index + 1}`}
                description={
                  <>
                    <p>Cadeira Extensora</p>
                    <Table<DataType>
                      columns={columns}
                      dataSource={data}
                      size="small"
                      pagination={false}
                    />

                    <p>Agachamento</p>
                    <Table<DataType>
                      columns={columns}
                      dataSource={data}
                      size="small"
                      pagination={false}
                    />
                  </>
                }
              />
            </Card>
          ))}
      </div>
    </section>
  );
};

export default Workout;
