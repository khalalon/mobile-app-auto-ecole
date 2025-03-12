// components/ClientList.tsx
import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Client } from "../services/clientService";

interface Props {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
  onSelect: (client: Client) => void; // New prop for selecting a client
}

export default function ClientList({ clients, onEdit, onDelete, onSelect }: Props) {
  return (
    <FlatList
      data={clients}
      keyExtractor={(item) => item.cin}
      renderItem={({ item }) => (
        <TouchableOpacity 
          onPress={() => onSelect(item)}
          className="bg-white p-4 rounded-lg shadow-md mb-2"
        >
          <View>
            <Text className="font-bold">{item.nom} {item.prenom}</Text>
            <Text>CIN: {item.cin}</Text>
            <Text>Téléphone: {item.telephone}</Text>
            <View className="flex-row mt-2">
              <TouchableOpacity 
                onPress={(e) => {
                  e.stopPropagation(); // Prevent triggering the parent onPress
                  onEdit(item);
                }} 
                className="bg-yellow-500 p-2 rounded-lg"
              >
                <Text className="text-white">Modifier</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={(e) => {
                  e.stopPropagation(); // Prevent triggering the parent onPress
                  onDelete(item);
                }} 
                className="bg-red-500 p-2 rounded-lg ml-2"
              >
                <Text className="text-white">Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}