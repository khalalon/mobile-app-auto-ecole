import axiosInstance from "../axiosInstance";

export interface Client {
  cin: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  sexe: "M" | "F";
  telephone: string;
  createdAt?: string;
  updatedAt?: string;
}

// Fetch all clients
export const getClients = async () => {
  try {
    const response = await axiosInstance.get<Client[]>("/clients");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des clients :", error);
    throw error; 
  }
};


// Create a new client
export const createClient = async (client: Client) => {
  const response = await axiosInstance.post<Client>("/clients", client);
  return response.data;
};

// Update client
export const updateClient = async (cin: string, client: Client) => {
  const response = await axiosInstance.put<Client>(`/clients/${cin}`, client);
  return response.data;
};

// Delete client
export const deleteClient = async (cin: string) => {
  await axiosInstance.delete(`/clients/${cin}`);
};
