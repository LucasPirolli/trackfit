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
