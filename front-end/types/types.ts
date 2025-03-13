// src/types/types.ts
export interface Examen {
    id?: string;
    clientCin: string;
    clientNom?: string;
    dateExamen: string;
    statutPaiement: "Payé" | "Non Payé";
    coutExamen: number;
    typeExamen: "CODE" | "MANOEUVRE" | "PARC";
    createdAt?: string;
    updatedAt?: string; 
  }