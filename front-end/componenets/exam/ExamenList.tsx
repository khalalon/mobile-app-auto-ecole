import React from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { Examen } from "../../types/types";
import { Trash2, Edit } from "lucide-react-native";

interface ExamenListProps {
  examens: Examen[];
  onEdit: (examen: Examen) => void;
  onDelete: (examen: Examen) => void;
  onSelect: (examen: Examen) => void;
}

const ExamenList: React.FC<ExamenListProps> = ({ examens, onEdit, onDelete, onSelect }) => {
  const handleDelete = (examen: Examen) => {
    Alert.alert(
      "Confirmer la suppression",
      `Êtes-vous sûr de vouloir supprimer l'examen de ${examen.clientNom} ?`,
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => onDelete(examen), // Call onDelete only if confirmed
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }: { item: Examen }) => (
    <TouchableOpacity
      className="bg-white rounded-xl p-5 mb-4 border border-gray-300"
      onPress={() => onSelect(item)}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-1">
          <Text className="text-xl font-semibold text-gray-900 mb-1">{item.clientNom}</Text>
          <Text className="text-gray-500 text-sm">CIN: {item.clientCin}</Text>
          <Text className="text-gray-500 text-sm">Date: {item.dateExamen}</Text>
          <Text className="text-gray-500 text-sm">Type: {item.typeExamen}</Text>
          <View className="mt-2 flex-row items-center">
            <Text className="text-gray-700 font-semibold text-lg">{item.coutExamen} TND</Text>
            <View
              className={`ml-3 px-3 py-1 rounded-full ${
                item.statutPaiement === "Payé" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  item.statutPaiement === "Payé" ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.statutPaiement}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-row gap-2">
          <TouchableOpacity onPress={() => onEdit(item)} className="p-2 bg-blue-500 rounded-full">
            <Edit color="white" size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item)} className="p-2 bg-red-500 rounded-full">
            <Trash2 color="white" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={examens}
      renderItem={renderItem}
      keyExtractor={(item) => item.id!}
      ListEmptyComponent={<Text className="text-center text-gray-500 mt-4">Aucun examen trouvé.</Text>}
    />
  );
};

export default ExamenList;