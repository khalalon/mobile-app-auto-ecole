// components/ClientList.tsx
import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Client } from "../../services/clientService";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
  onSelect: (client: Client) => void; 
}

export default function ClientList({ clients, onEdit, onDelete, onSelect }: Props) {
  return (
    <FlatList
      data={clients}
      keyExtractor={(item) => item.cin}
      contentContainerStyle={{ padding: 10 }}
      renderItem={({ item }) => (
        <TouchableOpacity 
          onPress={() => onSelect(item)}
          className="bg-white p-4 rounded-lg shadow-md mb-3 border border-gray-200"
        >
          <View className="flex-row justify-between items-center">
            {/* Client Info */}
            <View>
              <Text className="text-lg font-semibold text-gray-800">{item.nom} {item.prenom}</Text>
              <Text className="text-gray-600">CIN: {item.cin}</Text>
              <Text className="text-gray-600">Téléphone: {item.telephone}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
