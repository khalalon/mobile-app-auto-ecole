import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Client } from "../services/clientService";
import { Edit3, Trash2, X } from "lucide-react-native"; // Importing icons

interface Props {
  client: Client;
  onClose: () => void;
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
}

export default function ClientDetails({ client, onClose, onEdit, onDelete }: Props) {
  const handleDelete = () => {
    Alert.alert(
      "Confirmer la suppression",
      "Êtes-vous sûr de vouloir supprimer ce client ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Supprimer", onPress: () => onDelete(client), style: "destructive" }
      ]
    );
  };

  return (
    <View className="bg-white p-6 rounded-lg shadow-md m-4 relative">
      {/* Header with Edit, Delete, and Close Buttons */}
      <View className="absolute top-4 right-4 flex-row space-x-3 mx-6">
        <TouchableOpacity onPress={() => onEdit(client)}>
          <Edit3 size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <Trash2 size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose}>
          <X size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Client Details */}
      <Text className="text-xl font-bold mb-4 text-center">Détails du Client</Text>
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
    </View>
  );
}
