// Componentes React
import { useEffect, useState } from "react";

// Componentes Terceiros
import { Button, Modal, Card, Form, Input, Select, Spin, Table } from "antd";
import {
  CloseOutlined,
  DeleteOutlined,
  DeleteTwoTone,
  EditOutlined,
  LeftOutlined,
  LineChartOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";

// Funções Terceiros
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Componentes
import Toast from "../components/ui/Toast";

// API
import {
  deleteExercise,
  getExercises,
  getMuscleGroups,
  postExercises,
  postRoutine,
  putExercises,
} from "../../services/endpoints";

// Tipos
import {
  CreateExercise,
  Exercise,
  MuscleGroup,
  RoutineData,
} from "../../types/types";

// Estilos
import "../../styles/pages/newroutine.scss";

// Contexto
import { useMain } from "../../context/MainContext";

const NewRoutine = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { Option } = Select;
  const { idUser, setIdUser } = useMain();

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
  //
  // Rotina
  const [isLoadingCreateRoutine, setIsLoadingCreateRoutine] =
    useState<boolean>(false);
  const [addedExercises, setAddedExercises] = useState<any>({});
  const [routineData, setRoutineData] = useState<RoutineData>({
    titulo: "",
    exercicios: [],
  });

  const columns = [
    {
      title: "Série",
      dataIndex: "serie",
      key: "serie",
      render: (_: any, __: any, index: number) => <span>{index + 1}</span>,
    },
    {
      title: "Peso",
      dataIndex: "peso",
      key: "peso",
      render: (_: any, record: any, index: number) => (
        <Input
          placeholder="Peso"
          value={record.peso || ""}
          onChange={(e) =>
            handleDetailChange(record.exerciseId, index, "peso", e.target.value)
          }
        />
      ),
    },
    {
      title: "Repetições",
      dataIndex: "repeticoes",
      key: "repeticoes",
      render: (_: any, record: any, index: number) => (
        <Input
          placeholder="Repetições"
          value={record.repeticoes || ""}
          onChange={(e) =>
            handleDetailChange(
              record.exerciseId,
              index,
              "repeticoes",
              e.target.value
            )
          }
        />
      ),
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: any, index: number) => (
        <DeleteTwoTone
          twoToneColor="#fc0000"
          type="text"
          onClick={() => handleRemoveSerie(record.exerciseId, index)}
        />
      ),
    },
  ];

  useEffect(() => {
    console.log("exercicios adicionados", addedExercises);
  }, [addedExercises]);

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
        const response = await postExercises({
          ...createExercises,
          user_id: idUser,
        });

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
        const response = await putExercises({
          ...updateExercises,
          user_id: idUser,
        });

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
    if (addedExercises[id]) {
      Toast(
        "error",
        "Não é possível excluir um exercício que está na lista adicionada!"
      );
      return;
    }

    try {
      const response = await deleteExercise(id);

      if (!response.detail) {
        Toast("success", "Exercício excluído com sucesso!");
        fetchAllExercises();
      } else {
        Toast("error", "Erro ao excluir exercício, tente novamente!");
        return;
      }
    } catch (error) {
      Toast("error", "Erro inesperado ao excluir exercício, tente novamente!");
      return;
    }
  };

  const handleAddExercise = (exercise: any) => {
    setAddedExercises((prevState: any) => {
      if (prevState[exercise.id]) {
        Toast("error", "O exercício já foi incluído!");
        return prevState;
      }

      const updatedState = {
        ...prevState,
        [exercise.id]: {
          ...exercise,
          detalhes: [
            {
              serie: 1,
              peso: "",
              repeticoes: "",
            },
          ],
        },
      };

      handleCloseModalAllExercises();
      return updatedState;
    });
  };

  const handleRemoveExercise = (exerciseId: number) => {
    setAddedExercises((prevState: any) => {
      const updatedState = { ...prevState };
      delete updatedState[exerciseId];
      return updatedState;
    });
  };

  const handleDetailChange = (
    exerciseId: number,
    serieIndex: number,
    field: string,
    value: string
  ) => {
    setAddedExercises((prevState: any) => {
      const exercise = prevState[exerciseId];

      const updatedDetails = exercise.detalhes.map(
        (detail: any, index: number) =>
          index === serieIndex ? { ...detail, [field]: value } : detail
      );

      return {
        ...prevState,
        [exerciseId]: {
          ...exercise,
          detalhes: updatedDetails,
        },
      };
    });
  };

  const handleAddSerie = (exerciseId: number) => {
    setAddedExercises((prevState: any) => {
      const currentExercise = prevState[exerciseId];

      return {
        ...prevState,
        [exerciseId]: {
          ...currentExercise,
          detalhes: [
            ...currentExercise.detalhes,
            {
              serie: currentExercise.detalhes.length + 1,
              peso: "",
              repeticoes: "",
            },
          ],
        },
      };
    });
  };

  const handleRemoveSerie = (exerciseId: number, serieIndex: number) => {
    setAddedExercises((prevState: any) => {
      const exercise = prevState[exerciseId];

      if (exercise.detalhes.length <= 1) {
        Toast("error", "O exercício deve conter pelo menos uma série.");
        return prevState;
      }

      const updatedDetails = exercise.detalhes.filter(
        (_: any, index: number) => index !== serieIndex
      );

      return {
        ...prevState,
        [exerciseId]: {
          ...exercise,
          detalhes: updatedDetails,
        },
      };
    });
  };

  const handleCreateRoutine = async () => {
    const { titulo, exercicios } = routineData;

    if (titulo === "") {
      Toast("error", "Adicione um título para este treinamento!");
      return;
    }

    if (exercicios.length == 0) {
      Toast("error", "Incluia ao menos um exercício para continuar");
      return;
    }

    for (const exercise of exercicios) {
      for (const detail of exercise.detalhes) {
        if (!detail.peso.trim() || !detail.repeticoes.trim()) {
          Toast(
            "error",
            `Preencha todos os campos de peso e repetições no exercício: ${exercise.nome}`
          );
          return;
        }
      }
    }

    setIsLoadingCreateRoutine(true);

    try {
      const transformedRoutine = {
        titulo: routineData.titulo,
        exercicios: routineData.exercicios.map((exercise) => ({
          id: exercise.id,
          nome: exercise.nome,
          tipo_exercicio: exercise.tipo_exercicio,
          detalhes: exercise.detalhes.map((detail) => ({
            serie: String(detail.serie),
            peso: detail.peso,
            repeticoes: detail.repeticoes,
          })),
        })),
      };

      const response = await postRoutine({
        ...transformedRoutine,
        user_id: idUser,
      });

      if (response.mensagem === "Rotina adicionada com sucesso!") {
        Toast("success", "Rotina cadastrada com sucesso!");
        setTimeout(() => {
          setIsLoadingCreateRoutine(false);
          navigate("/routine");
        }, 1500);
      } else {
        Toast("error", "Erro ao cadastrar rotina, tente novamente!");
        setIsLoadingCreateRoutine(false);
        return;
      }
    } catch (error) {
      console.log(error);
      Toast("error", "Erro inesperado ao cadastrar rotina, tente novamente!");
      setIsLoadingCreateRoutine(false);
      return;
    }
  };

  const getDataSource = (exerciseId: number) => {
    const detalhes = addedExercises[exerciseId]?.detalhes || [];
    return detalhes.map((detail: any, index: number) => ({
      key: index,
      exerciseId,
      ...detail,
    }));
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
      const response = await getExercises(idUser);

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
  }, [isModalOpen, idUser !== ""]);

  useEffect(() => {
    setUpdateExercises({
      id: selectedExercise?.id,
      nome: selectedExercise?.nome,
      grupo_muscular: selectedExercise?.grupo_muscular.id,
      tipo_exercicio: selectedExercise?.tipo_exercicio,
    });
  }, [selectedExercise]);

  useEffect(() => {
    const updatedExercises = Object.values(addedExercises).map(
      (exercise: any) => ({
        id: exercise.id,
        nome: exercise.nome,
        grupo_muscular: exercise.grupo_muscular.nome,
        tipo_exercicio: exercise.tipo_exercicio,
        detalhes: exercise.detalhes,
      })
    );

    setRoutineData((prevState) => ({
      ...prevState,
      exercicios: updatedExercises,
    }));
  }, [addedExercises]);

  useEffect(() => {
    const valueId = Cookies.get("user_id");
    setIdUser(valueId);
  }, [idUser !== ""]);

  useEffect(() => {
    console.log("data das rotinas", routineData);
  }, [routineData]);

  return (
    <>
      <section className="new-routine">
        <div className="container-icon">
          <LeftOutlined onClick={() => navigate("/routine")} />
        </div>

        <section className="container-added-exercises">
          {Object.keys(addedExercises).length <= 0 ? (
            <h2 className="subtitle">
              Comece por adicionar um exercício à sua rotina
            </h2>
          ) : (
            <>
              <Form.Item style={{ width: "100%", paddingTop: "10px" }}>
                <Input
                  variant="borderless"
                  placeholder="Título da rotina"
                  onChange={(e) =>
                    setRoutineData((prevState) => ({
                      ...prevState,
                      titulo: e.target.value,
                    }))
                  }
                />
              </Form.Item>

              <div className="content">
                {Object.values(addedExercises).map((exercise: any) => (
                  <Card
                    key={exercise.id}
                    extra={
                      <CloseOutlined
                        onClick={() => handleRemoveExercise(exercise.id)}
                      />
                    }
                  >
                    <Card.Meta
                      title={exercise.nome}
                      description={
                        <>
                          <p>{exercise.grupo_muscular.nome}</p>
                          <p>{exercise.tipo_exercicio}</p>
                        </>
                      }
                    />
                    <Table
                      columns={columns}
                      dataSource={getDataSource(exercise.id)}
                      size="small"
                      pagination={false}
                    />
                    <Button
                      onClick={() => handleAddSerie(exercise.id)}
                      className="btn-add-serie"
                    >
                      Adicionar Série
                    </Button>
                  </Card>
                ))}
              </div>
            </>
          )}
          <div className="container-btns">
            <Button
              color="default"
              variant="filled"
              onClick={() => showModal()}
            >
              <PlusOutlined />
              Adicionar exercício
            </Button>

            {Object.keys(addedExercises).length > 0 && (
              <Button
                color="primary"
                variant="filled"
                onClick={() => handleCreateRoutine()}
              >
                {isLoadingCreateRoutine ? (
                  <Spin indicator={<LoadingOutlined spin />} size="small" />
                ) : (
                  "Criar"
                )}
              </Button>
            )}
          </div>
        </section>
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
          ) : dataExercises.length === 0 ? (
            <div>Nenhum exercício encontrado</div>
          ) : (
            dataExercises.map((item, index) => {
              const actions: React.ReactNode[] = [
                <PlusOutlined onClick={() => handleAddExercise(item)} />,
                <LineChartOutlined onClick={() => navigate("/history")} />,
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
