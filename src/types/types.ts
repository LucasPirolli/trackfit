export interface MuscleGroup {
  id: string;
  nome: string;
}

export interface CreateExercise {
  nome: string;
  grupo_muscular: string;
  tipo_exercicio: string;
}

export interface Exercise {
  id: number;
  nome: string;
  grupo_muscular: MuscleGroup;
  tipo_exercicio: string;
}

export interface ExerciseDetails {
  serie: number;
  peso: string;
  repeticoes: string;
}

export interface RoutineExercise {
  id: number;
  nome: string;
  grupo_muscular: MuscleGroup;
  tipo_exercicio: string;
  detalhes: ExerciseDetails[];
}
export interface RoutineData {
  titulo: string;
  exercicios: RoutineExercise[];
}

export interface MainContextProps {
  idUser: string;
  setIdUser: React.Dispatch<React.SetStateAction<string>>;
}

