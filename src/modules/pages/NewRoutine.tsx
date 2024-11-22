// Componentes React
import { useEffect, useState } from "react";

// Componentes Terceiros
import { Button, Modal, Card, Form, Input, Select, Spin } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  LeftOutlined,
  LineChartOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";

// Funções Terceiros
import { useNavigate } from "react-router-dom";

// Componentes
import Toast from "../components/ui/Toast";

// API
import {
  deleteExercise,
  getExercises,
  getMuscleGroups,
  postExercises,
  putExercises,
} from "../../services/endpoints";

// Tipos
import { CreateExercise, Exercise, MuscleGroup } from "../../types/types";

// Estilos
import "../../styles/pages/newroutine.scss";

const NewRoutine = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { Option } = Select;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Exercícios
  const [isLoadingExercises, setIsLoadingExercises] = useState<boolean>(false);
  const [dataExercises, setDataExercises] = useState<Exercise[]>([]);

  // Criação/Alteração - Exercícios
  const [isModalNewExerciseOpen, setIsModalNewExerciseOpen] =
    useState<boolean>(false);
  const [isLoadingCreateExercises, setIsLoadingCreateExercises] =
    useState<boolean>(false);
  const [createExercises, setCreateExercises] = useState<CreateExercise>({
    nome: "",
    grupo_muscular: "",
    tipo_exercicio: "",
  });

  const [updateExercises, setUpdateExercises] = useState<any>({
    id: "",
    nome: "",
    grupo_muscular: "",
    tipo_exercicio: "",
  });

  const [dataMuscleGroups, setDataMuscleGroups] = useState<MuscleGroup[]>([]);

  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [isEditingExercise, setIsEditingExercise] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModalAllExercises = () => {
    setIsModalOpen(false);
    setDataExercises([]);
  };

  const showModalNew = () => {
    setIsModalNewExerciseOpen(true);
  };

  const handleCloseModalExercises = () => {
    setIsModalNewExerciseOpen(false);
    setIsEditingExercise(false);
    setSelectedExercise(null);
    setCreateExercises({
      nome: "",
      grupo_muscular: "",
      tipo_exercicio: "",
    });
    setUpdateExercises({
      id: "",
      nome: "",
      grupo_muscular: "",
      tipo_exercicio: "",
    });
  };

  const handleCardClick = (item: any) => {
    setSelectedExercise(item);
    setIsModalNewExerciseOpen(true);
    setIsEditingExercise(true);
  };

  const handleCreateExercises = async () => {
    if (!isEditingExercise) {
      const { nome, grupo_muscular, tipo_exercicio } = createExercises;

      if (nome === "" || grupo_muscular === "" || tipo_exercicio === "") {
        Toast("error", "Preencha todos os campos antes de continuar!");
        return;
      }
      setIsLoadingCreateExercises(true);
      try {
        const response = await postExercises(createExercises);

        if (!response.detail) {
          Toast("success", "Exercício criado com sucesso!");
          setTimeout(() => {
            setIsLoadingCreateExercises(false);
            handleCloseModalExercises();
            fetchAllExercises();
          }, 1500);
        } else {
          Toast("error", "Erro ao criar exercício, tente novamente!");
          setTimeout(() => {
            setIsLoadingCreateExercises(false);
          }, 1500);
          return;
        }
      } catch (error) {
        Toast("error", "Erro inesperado ao criar exercício, tente novamente!");
        setTimeout(() => {
          setIsLoadingCreateExercises(false);
        }, 1500);
        console.error(error);
        return;
      }
    } else {
      const { nome, grupo_muscular, tipo_exercicio } = updateExercises;

      if (nome === "" || grupo_muscular === "" || tipo_exercicio === "") {
        Toast("error", "Preencha todos os campos antes de continuar!");
        return;
      }
      setIsLoadingCreateExercises(true);

      try {
        const response = await putExercises(updateExercises);

        if (!response.detail) {
          Toast("success", "Exercício alterado com sucesso!");
          setTimeout(() => {
            setIsLoadingCreateExercises(false);
            handleCloseModalExercises();
            fetchAllExercises();
          }, 1500);
        } else {
          Toast("error", "Erro ao alterar exercício, tente novamente!");
          setTimeout(() => {
            setIsLoadingCreateExercises(false);
          }, 1500);
          return;
        }
      } catch (error) {
        Toast("error", "Erro inesperado ao criar exercício, tente novamente!");
        setTimeout(() => {
          setIsLoadingCreateExercises(false);
        }, 1500);
        console.error(error);
        return;
      }
    }
  };

  const handleDeleteExercises = async (id: number) => {
    try {
      const response = await deleteExercise(id);

      if (!response.detail) {
        Toast("success", "Exercício excluído com sucesso!");
        setTimeout(() => {
          fetchAllExercises();
        }, 1500);
      } else {
        Toast("error", "Erro ao excluir exercício, tente novamente!");
        return;
      }
    } catch (error) {
      Toast("error", "Erro inesperado ao excluir exercício, tente novamente!");
      return;
    }
  };

  const fetchAllMuscleGroups = async () => {
    try {
      const response = await getMuscleGroups();

      if (response) {
        setDataMuscleGroups(response);
      } else {
        setDataMuscleGroups([]);
      }
    } catch (error) {
      Toast("error", "Erro inesperado para grupos musculares");
      setDataMuscleGroups([]);
      console.error(error);
    }
  };

  const fetchAllExercises = async () => {
    setIsLoadingExercises(true);
    try {
      const response = await getExercises();

      if (response) {
        setDataExercises(response);
        setTimeout(() => {
          setIsLoadingExercises(false);
        }, 1500);
      } else {
        setDataExercises([]);
        setIsLoadingExercises(false);
      }
    } catch (error) {
      Toast("error", "Erro inesperado para exercícios");
      setIsLoadingExercises(false);
      setDataExercises([]);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllMuscleGroups();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      fetchAllExercises();
    }
  }, [isModalOpen]);

  useEffect(() => {
    setUpdateExercises({
      id: selectedExercise?.id,
      nome: selectedExercise?.nome,
      grupo_muscular: selectedExercise?.grupo_muscular.id,
      tipo_exercicio: selectedExercise?.tipo_exercicio,
    });
  }, [selectedExercise]);

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
        onCancel={handleCloseModalAllExercises}
        centered={true}
        footer={[]}
        width={700}
      >
        <Button
          color="default"
          variant="filled"
          onClick={() => showModalNew()}
          disabled={isLoadingExercises}
        >
          <PlusOutlined />
          Novo exercício
        </Button>
        <div
          className={`container-cards ${isLoadingExercises ? "loading" : ""}`}
        >
          {isLoadingExercises ? (
            <Spin indicator={<LoadingOutlined spin />} size="large" />
          ) : (
            dataExercises.map((item, index) => {
              const actions: React.ReactNode[] = [
                <PlusOutlined
                  onClick={() => console.log(`Adicionado: ${item.id}`)}
                />,
                <LineChartOutlined
                  onClick={() =>
                    console.log(`Exibindo gráfico para: ${item.id}`)
                  }
                />,
                <EditOutlined onClick={() => handleCardClick(item)} />,
                <DeleteOutlined
                  onClick={() => handleDeleteExercises(item.id)}
                />,
              ];

              return (
                <Card key={index} actions={actions}>
                  <Card.Meta
                    title={item.nome}
                    description={
                      <>
                        <p>{item.grupo_muscular.nome}</p>
                        <p>{item.tipo_exercicio}</p>
                      </>
                    }
                  />
                </Card>
              );
            })
          )}
        </div>
      </Modal>

      <Modal
        title={`${isEditingExercise ? "Alterar" : "Novo"} Exercício`}
        open={isModalNewExerciseOpen}
        onCancel={handleCloseModalExercises}
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
            <Input
              placeholder="Digite"
              onChange={(e) => {
                if (!isEditingExercise) {
                  setCreateExercises({
                    ...createExercises,
                    nome: e.target.value,
                  });
                } else {
                  setUpdateExercises({
                    ...updateExercises,
                    nome: e.target.value,
                  });
                }
              }}
              value={
                isEditingExercise
                  ? updateExercises?.nome
                  : createExercises?.nome
              }
            />
          </Form.Item>

          <Form.Item label="Grupo muscular">
            <Select
              placeholder="Selecione"
              allowClear
              onChange={(value) => {
                if (!isEditingExercise) {
                  setCreateExercises({
                    ...createExercises,
                    grupo_muscular: value,
                  });
                } else {
                  setUpdateExercises({
                    ...updateExercises,
                    grupo_muscular: value,
                  });
                }
              }}
              value={
                isEditingExercise
                  ? updateExercises?.grupo_muscular
                  : createExercises?.grupo_muscular
              }
            >
              {dataMuscleGroups.length > 0 &&
                dataMuscleGroups.map((item, index) => (
                  <Option key={index} value={item.id}>
                    {item.nome}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item label="Tipo do exercício">
            <Input
              placeholder="Digite"
              onChange={(e) => {
                if (!isEditingExercise) {
                  setCreateExercises({
                    ...createExercises,
                    tipo_exercicio: e.target.value,
                  });
                } else {
                  setUpdateExercises({
                    ...updateExercises,
                    tipo_exercicio: e.target.value,
                  });
                }
              }}
              value={
                isEditingExercise
                  ? updateExercises?.tipo_exercicio
                  : createExercises?.tipo_exercicio
              }
            />
          </Form.Item>

          <Form.Item>
            <Button
              color="default"
              variant="filled"
              onClick={() => handleCreateExercises()}
            >
              {isLoadingCreateExercises ? (
                <Spin indicator={<LoadingOutlined spin />} size="small" />
              ) : isEditingExercise ? (
                "Alterar"
              ) : (
                "Cadastrar"
              )}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default NewRoutine;
