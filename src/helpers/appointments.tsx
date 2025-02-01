import { ICliente } from "@/interfaces/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createAppointment = async (appointmentData: ICliente) => {
  try {
    const response = await fetch(`${API_URL}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentData),
    });

    if (!response.ok) throw new Error("Error al crear el turno");

    return await response.json();
  } catch (error) {
    console.error("Error en createAppointment:", error);
    throw error;
  }
};

export const getAppointmentById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/appointments/${id}`);

    if (!response.ok) throw new Error("Turno no encontrado");

    return await response.json();
  } catch (error) {
    console.error("Error en getAppointmentById:", error);
    throw error;
  }
};

export const getAllAppointments = async () => {
  try {
    const response = await fetch(`${API_URL}/appointments`);

    if (!response.ok) throw new Error("Error al obtener los turnos");

    return await response.json();
  } catch (error) {
    console.error("Error en getAllAppointments:", error);
    throw error;
  }
};
