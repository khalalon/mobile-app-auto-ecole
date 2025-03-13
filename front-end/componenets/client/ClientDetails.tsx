import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Client } from "../../types/types";
import { Edit3, Trash2, X } from "lucide-react-native";

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
        { 
          text: "Supprimer", 
          onPress: () => onDelete(client), 
          style: "destructive" 
        }
      ],
      { cancelable: true }
    );
  };

  const InfoItem = ({ label, value }: { label: string; value: string }) => (
    <View className="flex-row items-center py-2">
      <Text className="text-gray-600 text-base w-32">{label}</Text>
      <Text className="text-gray-800 text-base font-medium flex-1">{value}</Text>
    </View>
  );

  return (
    <View className="bg-white p-4 rounded-xl shadow-lg mx-4 my-6">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-5">
        <Text className="text-xl font-semibold text-gray-900">Détails du Client</Text>
        <View className="flex-row space-x-4">
          <TouchableOpacity onPress={() => onEdit(client)} className="p-1">
            <Edit3 size={20} color="#3B82F6" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} className="p-1">
            <Trash2 size={20} color="#EF4444" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} className="p-1">
            <X size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Client Info */}
      <View className="space-y-3">
        <InfoItem label="CIN:" value={client.cin} />
        <InfoItem label="Nom:" value={client.nom} />
        <InfoItem label="Prénom:" value={client.prenom} />
        <InfoItem label="Date de naissance:" value={client.dateNaissance} />
        <InfoItem 
          label="Sexe:" 
          value={client.sexe === "M" ? "Homme" : "Femme"} 
        />
        <InfoItem label="Téléphone:" value={client.telephone} />
        {client.createdAt && (
          <InfoItem 
            label="Créé le:" 
            value={new Date(client.createdAt).toLocaleDateString()} 
          />
        )}
        {client.updatedAt && (
          <InfoItem 
            label="Modifié le:" 
            value={new Date(client.updatedAt).toLocaleDateString()} 
          />
        )}
      </View>
    </View>
  );
}