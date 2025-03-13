import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Client } from "../../types/types";

interface Props {
  initialData?: Client;
  onSubmit: (client: Client) => void;
  isEditing?: boolean;
}

export default function ClientForm({ initialData, onSubmit, isEditing = false }: Props) {
  const [client, setClient] = useState<Client>({
    cin: "",
    nom: "",
    prenom: "",
    dateNaissance: "",
    sexe: "M",
    telephone: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (initialData) setClient(initialData);
  }, [initialData]);

  const handleChange = (key: keyof Client, value: string) => {
    setClient((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <View className="flex-1 bg-gray-50 p-6">
      <View className="bg-white rounded-2xl shadow-md p-6">
        {/* Input Fields */}
        <View className="mb-4">
          <TextInput
            className="border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:bg-white px-4 py-3 mb-4"
            value={client.cin}
            onChangeText={(text) => handleChange("cin", text)}
            placeholder="CIN"
            keyboardType="numeric"
            maxLength={8}
          />
          <TextInput
            className="border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:bg-white px-4 py-3 mb-4"
            value={client.nom}
            onChangeText={(text) => handleChange("nom", text)}
            placeholder="Nom"
          />
          <TextInput
            className="border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:bg-white px-4 py-3 mb-4"
            value={client.prenom}
            onChangeText={(text) => handleChange("prenom", text)}
            placeholder="Prénom"
          />
        </View>

        {/* Date Picker */}
        <TouchableOpacity
          className="border border-gray-200 rounded-xl bg-gray-50 px-4 py-3 mb-5"
          onPress={() => setShowDatePicker(true)}
        >
          <Text className={`${client.dateNaissance ? 'text-gray-800' : 'text-gray-400'}`}>
            {client.dateNaissance || "Sélectionner une date"}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={client.dateNaissance ? new Date(client.dateNaissance) : new Date()}
            mode="date"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                handleChange("dateNaissance", selectedDate.toISOString().split("T")[0]);
              }
            }}
          />
        )}

        {/* Gender Selection */}
        <View className="flex-row justify-between mb-5 -mx-2 mt-2"> 
          <TouchableOpacity
            className={`flex-1 py-3 rounded-xl mx-2 ${
              client.sexe === "M" ? "bg-blue-500" : "bg-gray-200"
            }`}
            onPress={() => handleChange("sexe", "M")}
          >
            <Text className={`text-center font-medium ${
              client.sexe === "M" ? "text-white" : "text-gray-700"
            }`}>
              Homme
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-3 rounded-xl mx-2 ${
              client.sexe === "F" ? "bg-pink-500" : "bg-gray-200"
            }`}
            onPress={() => handleChange("sexe", "F")}
          >
            <Text className={`text-center font-medium ${
              client.sexe === "F" ? "text-white" : "text-gray-700"
            }`}>
              Femme
            </Text>
          </TouchableOpacity>
        </View>

        {/* Telephone */}
        <TextInput
          className="border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:bg-white px-4 py-3 mb-5"
          value={client.telephone}
          onChangeText={(text) => handleChange("telephone", text)}
          placeholder="Téléphone"
          keyboardType="phone-pad"
        />

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-blue-500 py-4 rounded-xl shadow-sm active:bg-blue-600"
          onPress={() => onSubmit(client)}
        >
          <Text className="text-white text-center font-semibold text-lg">
            {isEditing ? "Modifier" : "Ajouter"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}