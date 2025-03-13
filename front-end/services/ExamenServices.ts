import axiosInstance from "../axiosInstance";
import { Examen } from "../types/types"; // Import Examen from types

// Fetch all examens
export const getExamens = async () => {
  try {
    const response = await axiosInstance.get<Examen[]>("/examens");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des examens :", error);
    throw error;
  }
};

// Create a new examen
export const createExamen = async (examen: Examen) => {
  const response = await axiosInstance.post<Examen>("/examens", examen);
  return response.data;
};

// Update examen
export const updateExamen = async (id: string, examen: Examen) => {
  const response = await axiosInstance.put<Examen>(`/examens/${id}`, examen);
  return response.data;
};

// Delete examen
export const deleteExamen = async (id: string) => {
  await axiosInstance.delete(`/examens/${id}`);
};
