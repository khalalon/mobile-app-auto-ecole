// components/ClientList.tsx
import React from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { Client } from "../../types/types";
import { Trash2, Edit } from "lucide-react-native";

interface Props {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
  onSelect: (client: Client) => void;
}

export default function ClientList({ clients, onEdit, onDelete, onSelect }: Props) {
  const handleDelete = (client: Client) => {
    Alert.alert(
      "Confirmer la suppression",
      `Êtes-vous sûr de vouloir supprimer le client ${client.nom} ${client.prenom} ?`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => onDelete(client),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <FlatList
      data={clients}
      keyExtractor={(item) => item.cin}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onSelect(item)}
          className="bg-white p-4 rounded-xl shadow-lg mb-4 border border-gray-100 active:bg-gray-50"
          style={{
            elevation: 3, // Slight shadow for Android
            backgroundColor: "#fff", // Ensure gradient compatibility
          }}
        >
          <View className="flex-row justify-between items-center">
            {/* Client Info */}
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-900">
                {item.nom} {item.prenom}
              </Text>
              <Text className="text-sm text-gray-500 mt-1">CIN: {item.cin}</Text>
              <Text className="text-sm text-gray-500">Téléphone: {item.telephone}</Text>
            </View>
            {/* Action Buttons */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => onEdit(item)}
                className="p-3 bg-blue-500 rounded-full active:bg-blue-700"
                style={{ elevation: 2 }}
              >
                <Edit color="white" size={18} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(item)}
                className="p-3 bg-red-500 rounded-full active:bg-red-700"
                style={{ elevation: 2 }}
              >
                <Trash2 color="white" size={18} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        <View className="flex-1 justify-center items-center mt-10">
          <Text className="text-lg font-medium text-gray-400">
            Aucun client trouvé
          </Text>
          <Text className="text-sm text-gray-300 mt-2">
            Ajoutez un client pour commencer !
          </Text>
        </View>
      }
    />
  );
}