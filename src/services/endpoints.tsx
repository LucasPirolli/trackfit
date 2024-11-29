export const createUser = async (userData: object) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_PATH}/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const login = async (userData: object) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_PATH}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const postExercises = async (body: object) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_PATH}/exercicios`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const postRoutine = async (body: object) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_PATH}/rotinas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getMuscleGroups = async () => {
  const endpoint = `/grupos-musculares-todos`;

  const response = await fetch(`${import.meta.env.VITE_BASE_PATH}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch exercises by category");
  }

  const data = await response.json();
  return data;
};

export const getExercises = async (idUser: string) => {
  const endpoint = `/exercicios-todos/${idUser}`;

  const response = await fetch(`${import.meta.env.VITE_BASE_PATH}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch exercises by category");
  }

  const data = await response.json();
  return data;
};

export const getRoutine = async (idUser: string) => {
  const endpoint = `/rotinas/${idUser}`;

  const response = await fetch(`${import.meta.env.VITE_BASE_PATH}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch exercises by category");
  }

  const data = await response.json();
  return data;
};

export const putExercises = async (body: object) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_PATH}/exercicios/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update exercise");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteExercise = async (id: number) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_PATH}/exercicios/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete exercise");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteRoutine = async (id: number) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_PATH}/rotinas/deletar/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete exercise");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
