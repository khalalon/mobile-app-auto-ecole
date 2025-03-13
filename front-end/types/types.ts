export interface Examen {
    id?: string;
    clientCin: string;
    clientNom?: string;
    dateExamen: string;
    statutPaiement: "Payé" | "Non Payé";
    coutExamen: number  ;
    typeExamen: "Code" | "Conduit" | "Parc";
    createdAt?: string;
    updatedAt?: string; 
  }

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