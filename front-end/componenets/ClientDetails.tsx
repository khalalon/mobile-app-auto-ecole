// components/ClientDetails.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Client } from "../services/clientService";

interface Props {
  client: Client;
  onClose: () => void;
}

export default function ClientDetails({ client, onClose }: Props) {
  return (
    <View className="bg-white p-6 rounded-lg shadow-md m-4">
      <Text className="text-xl font-bold mb-4">Détails du Client</Text>
      <View className="mb-4">
        <Text className="text-gray-600">CIN: <Text className="font-medium text-gray-800">{client.cin}</Text></Text>
        <Text className="text-gray-600">Nom: <Text className="font-medium text-gray-800">{client.nom}</Text></Text>
        <Text className="text-gray-600">Prénom: <Text className="font-medium text-gray-800">{client.prenom}</Text></Text>
        <Text className="text-gray-600">Date de naissance: <Text className="font-medium text-gray-800">{client.dateNaissance}</Text></Text>
        <Text className="text-gray-600">Sexe: <Text className="font-medium text-gray-800">{client.sexe === "M" ? "Homme" : "Femme"}</Text></Text>
        <Text className="text-gray-600">Téléphone: <Text className="font-medium text-gray-800">{client.telephone}</Text></Text>
        {client.createdAt && (
          <Text className="text-gray-600">Créé le: <Text className="font-medium text-gray-800">{new Date(client.createdAt).toLocaleDateString()}</Text></Text>
        )}
        {client.updatedAt && (
          <Text className="text-gray-600">Modifié le: <Text className="font-medium text-gray-800">{new Date(client.updatedAt).toLocaleDateString()}</Text></Text>
        )}
      </View>
      <TouchableOpacity
        className="bg-blue-500 py-3 rounded-lg"
        onPress={onClose}
      >
        <Text className="text-white text-center font-medium">Fermer</Text>
      </TouchableOpacity>
    </View>
  );
}