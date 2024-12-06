// Componentes Terceiros
import { Spin, Table } from "antd";
import { LeftOutlined, LoadingOutlined } from "@ant-design/icons";

// Funções Terceiros
import { useLocation, useNavigate } from "react-router-dom";

// Estilos
import "../../styles/pages/history.scss";
import { useEffect, useState } from "react";
import { getLogsExercises } from "../../services/endpoints";

interface ExerciseRecord {
  id: number;
  serie: string;
  repeticao: string;
  peso: string;
  data: string;
}

interface RoutineDetails {
  [routineId: string]: ExerciseRecord[];
}

interface Exercise {
  id: number;
  nome: string;
  tipo_exercicio: string;
  detalhes_por_rotina: RoutineDetails;
}

interface ApiResponse {
  exercicio: Exercise;
}

// Tipos para os dados no estado local
interface TableRecord {
  routineId: string;
  serie: string;
  peso: string;
  repeticoes: string;
}

interface DayData {
  date: string;
  records: TableRecord[];
}

const History: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [selectedData, setSelectedData] = useState(state?.selectedData);
  const [dataHistory, setDataHistory] = useState<DayData[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(true);

  // Colunas da tabela
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

  const fetchLogsExercises = async (id: number) => {
    try {
      setIsLoadingHistory(true);

      const response: ApiResponse = await getLogsExercises(id);

      const detalhesPorRotina = response.exercicio.detalhes_por_rotina || {};

      const transformedData = Object.entries(detalhesPorRotina).flatMap(
        ([routineId, records]) =>
          records.map((record) => ({
            date: new Date(record.data).toLocaleString(),
            routineId,
            serie: record.serie,
            peso: record.peso,
            repeticoes: record.repeticao,
          }))
      );

      const groupedData: Record<string, TableRecord[]> = transformedData.reduce(
        (acc, record) => {
          const { date, ...details } = record;
          if (!acc[date]) acc[date] = [];
          acc[date].push(details);
          return acc;
        },
        {} as Record<string, TableRecord[]>
      );

      setDataHistory(
        Object.entries(groupedData).map(([date, records]) => ({
          date,
          records,
        }))
      );

      setTimeout(() => {
        setIsLoadingHistory(false);
      }, 1500);
    } catch (error) {
      console.error("Erro ao buscar logs de exercícios:", error);
      setTimeout(() => {
        setIsLoadingHistory(false);
      }, 1500);
      setDataHistory([]);
    }
  };

  useEffect(() => {
    if (selectedData?.id) {
      fetchLogsExercises(selectedData.id);
    }
  }, [selectedData]);

  return (
    <section className="history">
      <div className="content">
        <div className="container">
          <LeftOutlined onClick={() => navigate("/routine")} />
          <h3 className="title">
            Histórico: {selectedData?.nome || "Exercício"}
          </h3>
        </div>
        <div
          className={`container-informations ${
            isLoadingHistory ? "loading" : ""
          }`}
        >
          {isLoadingHistory ? (
            <Spin indicator={<LoadingOutlined spin />} size="large" />
          ) : dataHistory.length > 0 ? (
            dataHistory.map((day) => (
              <div key={day.date} className="content-informations">
                <span className="date">Data: {day.date}</span>
                <Table
                  columns={columns}
                  dataSource={day.records}
                  size="small"
                  pagination={false}
                />
              </div>
            ))
          ) : (
            <p>Não há logs registrados para este exercício.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default History;
