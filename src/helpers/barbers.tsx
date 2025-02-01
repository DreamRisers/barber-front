import { IBarber } from "@/interfaces/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createBarber = async (barberData: IBarber) => {
  try {
    const response = await fetch(`${API_URL}/barber`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(barberData),
    });

    if (!response.ok) throw new Error("Error al crear el barbero");

    return await response.json();
  } catch (error) {
    console.error("Error en createBarber:", error);
    throw error;
  }
};

export const getBarberById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/barber/${id}`);

    if (!response.ok) throw new Error("Barbero no encontrado");

    return await response.json();
  } catch (error) {
    console.error("Error en getBarberById:", error);
    throw error;
  }
};

export const getAllBarbers = async () => {
  try {
    const response = await fetch(`${API_URL}/barber`);

    if (!response.ok) throw new Error("Error al obtener los barberos");

    return await response.json();
  } catch (error) {
    console.error("Error en getAllBarbers:", error);
    throw error;
  }
};
