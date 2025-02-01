import { IBranch } from "@/interfaces/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createBranch = async (branchData: IBranch) => {
  try {
    const response = await fetch(`${API_URL}/branch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(branchData),
    });

    if (!response.ok) throw new Error("Error al crear la sucursal");

    return await response.json();
  } catch (error) {
    console.error("Error en createBranch:", error);
    throw error;
  }
};

export const getAllBranches = async () => {
  try {
    const response = await fetch(`${API_URL}/branch`);

    if (!response.ok) throw new Error("Error al obtener las sucursales");

    return await response.json();
  } catch (error) {
    console.error("Error en getAllBranches:", error);
    throw error;
  }
};
