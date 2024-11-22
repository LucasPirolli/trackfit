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