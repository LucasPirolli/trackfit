// Componentes Terceiros
import { Table } from "antd";
import { LeftOutlined } from "@ant-design/icons";

// Funções Terceiros
import { useNavigate } from "react-router-dom";

// Estilos
import "../../styles/pages/history.scss";

const History = () => {
  const navigate = useNavigate();
  const columns = [
    {
      title: "Série",
      dataIndex: "serie",
      key: "serie",
    },
    {
      title: "Peso (kg)",
      dataIndex: "peso",
      key: "peso",
    },
    {
      title: "Repetições",
      dataIndex: "repeticoes",
      key: "repeticoes",
    },
  ];

  const data = [
    {
      date: "25/11/2024 - 11:30",
      records: [
        { key: "1", serie: "1", peso: "60", repeticoes: "12" },
        { key: "2", serie: "2", peso: "60", repeticoes: "12" },
        { key: "3", serie: "3", peso: "60", repeticoes: "10" },
      ],
    },
    {
      date: "24/11/2024 - 10:00",
      records: [
        { key: "1", serie: "1", peso: "55", repeticoes: "12" },
        { key: "2", serie: "2", peso: "55", repeticoes: "12" },
        { key: "3", serie: "3", peso: "55", repeticoes: "10" },
      ],
    },
    {
      date: "23/11/2024 - 09:45",
      records: [
        { key: "1", serie: "1", peso: "50", repeticoes: "15" },
        { key: "2", serie: "2", peso: "50", repeticoes: "15" },
        { key: "3", serie: "3", peso: "50", repeticoes: "12" },
      ],
    },
  ];

  return (
    <section className="history">
      <div className="content">
        <div className="container">
          <LeftOutlined onClick={() => navigate("/routine")} />
          <h3 className="title">Histórico: Agachamento Livre</h3>
        </div>
        <div className="container-informations">
          {data.map((day) => (
            <div key={day.date} className="content-informations">
              <span className="date">Data: {day.date}</span>
              <Table
                columns={columns}
                dataSource={day.records}
                size="small"
                pagination={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default History;
