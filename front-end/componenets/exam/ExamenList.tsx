// components/exam/ExamenList.tsx
import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Examen } from "../../types/types"; // Import the Examen type

interface ExamenListProps {
  examens: Examen[];
  onEdit: (examen: Examen) => void;
  onDelete: (examen: Examen) => void;
  onSelect: (examen: Examen) => void;
}

const ExamenList: React.FC<ExamenListProps> = ({ examens, onEdit, onDelete, onSelect }) => {
  const renderItem = ({ item }: { item: Examen }) => (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-md p-4 mb-4"
      onPress={() => onSelect(item)}
    >
      <Text className="text-lg font-semibold text-gray-800">Client: {item.clientNom}</Text>
      <Text className="text-gray-600">CIN: {item.clientCin}</Text>
      <Text className="text-gray-600">Date: {item.dateExamen}</Text>
      <Text className="text-gray-600">Type: {item.typeExamen}</Text>
      <Text className="text-gray-600">Statut Paiement: {item.statutPaiement}</Text>
      <Text className="text-gray-600">Coût: {item.coutExamen} €</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={examens}
      renderItem={renderItem}
      keyExtractor={(item) => item.id!}
      ListEmptyComponent={<Text className="text-center text-gray-500">Aucun examen trouvé.</Text>}
    />
  );
};

export default ExamenList;