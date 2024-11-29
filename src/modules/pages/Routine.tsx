// Componentes React
import { useEffect, useState } from "react";

// Componentes Terceiros
import {
  DeleteOutlined,
  EyeOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Card, Spin } from "antd";

// Componentes
import Toast from "../components/ui/Toast";
import FloatingButton from "../components/ui/FloatingButton";

// Funções Terceiros
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Estilos
import "../../styles/pages/routine.scss";

// API's
import { deleteRoutine, getRoutine } from "../../services/endpoints";

// Contexto
import { useMain } from "../../context/MainContext";

const Routine = () => {
  const navigate = useNavigate();
  const { idUser, setIdUser } = useMain();
  const [dataRoutine, setDataRoutine] = useState<any>([]);
  const [isLoadingRoutine, setIsLoadingRoutine] = useState<boolean>(false);

  const handleTogglePage = (data: any) => {
    navigate("/workout", {
      state: {
        selectedData: data,
      },
    });
  };

  const handleDeleteExercises = async (id: number) => {
    try {
      const response = await deleteRoutine(id);

      if (!response.detail) {
        Toast("success", "Exercício excluído com sucesso!");
        fetchAllRoutine(idUser);
      } else {
        Toast("error", "Erro ao excluir exercício, tente novamente!");
        return;
      }
    } catch (error) {
      Toast("error", "Erro inesperado ao excluir exercício, tente novamente!");
      return;
    }
  };

  const fetchAllRoutine = async (id_user: any) => {
    setIsLoadingRoutine(true);
    try {
      const response = await getRoutine(id_user);

      if (response) {
        setDataRoutine(response);
        setTimeout(() => {
          setIsLoadingRoutine(false);
        }, 1500);
      } else {
        setDataRoutine([]);
        setIsLoadingRoutine(false);
      }
    } catch (error) {
      setIsLoadingRoutine(false);
      setDataRoutine([]);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllRoutine(idUser);
  }, [idUser !== ""]);

  useEffect(() => {
    const valueId = Cookies.get("user_id");
    setIdUser(valueId);
  }, [idUser !== ""]);

  return (
    <>
      <FloatingButton />

      <section className="routine">
        <div className="flex">
          <h1 className="title">Rotinas</h1>
        </div>
        <div className="container-btn-new-routine">
          <button
            className="btn-new-routine"
            onClick={() => navigate("/new-routine")}
          >
            <PlusOutlined />
            Nova rotina
          </button>
        </div>
        <div className={`container-cards ${isLoadingRoutine ? "loading" : ""}`}>
          {isLoadingRoutine ? (
            <Spin indicator={<LoadingOutlined spin />} size="large" />
          ) : (
            <>
              {dataRoutine.length === 0 ? (
                <p>Nenhuma rotina cadastrada</p>
              ) : (
                [...dataRoutine].reverse().map((item: any, index: any) => {
                  const actions: React.ReactNode[] = [
                    <EyeOutlined onClick={() => handleTogglePage(item)} />,
                    <DeleteOutlined
                      key="delete"
                      onClick={() => handleDeleteExercises(item.id)}
                    />,
                  ];
                  return (
                    <Card key={index} actions={actions}>
                      <Card.Meta
                        title={item.titulo}
                        description={`${item.exercicios.length} exercícios vinculados`}
                      />
                    </Card>
                  );
                })
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Routine;
