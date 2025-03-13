import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Examen } from "../../types/types";

interface ExamenFormProps {
  initialData?: Examen;
  onSubmit: (examen: Examen) => void;
  isEditing?: boolean;
}

export default function ExamenForm({ initialData, onSubmit, isEditing = false }: ExamenFormProps) {
  const [examen, setExamen] = useState<Examen>({
    id: initialData?.id || "",
    clientCin: initialData?.clientCin || "",
    clientNom: initialData?.clientNom || "",
    dateExamen: initialData?.dateExamen || new Date().toISOString().split("T")[0],
    typeExamen: initialData?.typeExamen || "Code",
    statutPaiement: initialData?.statutPaiement || "Non Payé",
    coutExamen: initialData?.coutExamen || 0,
    createdAt: initialData?.createdAt || undefined,
    updatedAt: initialData?.updatedAt || undefined,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (initialData) setExamen(initialData);
  }, [initialData]);

  const handleChange = (key: keyof Examen, value: string | number) => {
    setExamen((prev) => ({ ...prev, [key]: value }));
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      handleChange("dateExamen", formattedDate);
    }
  };

  const handleSubmit = () => {
    const examenToSubmit: Examen = {
      clientCin: examen.clientCin,
      clientNom: examen.clientNom,
      dateExamen: `${examen.dateExamen}T00:00:00Z`, // Ensure ISO format for backend
      statutPaiement: examen.statutPaiement,
      coutExamen: parseFloat(examen.coutExamen.toString()) || 0,
      typeExamen: examen.typeExamen,
    };
    if (isEditing && examen.id) {
      examenToSubmit.id = examen.id; // Include id only for updates
    }
    console.log("Submitting:", examenToSubmit);
    onSubmit(examenToSubmit);
  };

  return (
    <View className="flex-1 bg-gray-50 p-6">
      <View className="bg-white rounded-2xl shadow-md p-6">
        <Text className="text-2xl font-semibold text-gray-800 mb-4">
          {isEditing ? "Modifier l'examen" : "Ajouter un examen"}
        </Text>

        <TextInput
          className="border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:bg-white px-4 py-3 mb-4"
          value={examen.clientCin}
          onChangeText={(text) => handleChange("clientCin", text)}
          placeholder="CIN du client"
          keyboardType="numeric"
        />

        <TextInput
          className="border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:bg-white px-4 py-3 mb-4"
          value={examen.clientNom || ""}
          onChangeText={(text) => handleChange("clientNom", text)}
          placeholder="Nom du client"
        />

        <TouchableOpacity
          className="border border-gray-200 rounded-xl bg-gray-50 px-4 py-3 mb-4"
          onPress={() => setShowDatePicker(true)}
        >
          <Text className={`${examen.dateExamen ? "text-gray-800" : "text-gray-400"}`}>
            {examen.dateExamen || "Sélectionner la date de l'examen"}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={examen.dateExamen ? new Date(examen.dateExamen) : new Date()}
            mode="date"
            onChange={handleDateChange}
          />
        )}

        <Text className="text-gray-600 mb-2">Type d'examen</Text>
        <View className="flex-row justify-between mb-5 -mx-2">
          {["Code", "Conduit", "Parc"].map((type) => (
            <TouchableOpacity
              key={type}
              className={`flex-1 py-3 rounded-xl mx-2 ${
                examen.typeExamen === type ? "bg-blue-500" : "bg-gray-200"
              }`}
              onPress={() => handleChange("typeExamen", type)}
            >
              <Text
                className={`text-center font-medium ${
                  examen.typeExamen === type ? "text-white" : "text-gray-700"
                }`}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-gray-600 mb-2">Statut de paiement</Text>
        <View className="flex-row justify-between mb-5 -mx-2">
          <TouchableOpacity
            className={`flex-1 py-3 rounded-xl mx-2 ${
              examen.statutPaiement === "Payé" ? "bg-green-500" : "bg-gray-200"
            }`}
            onPress={() => handleChange("statutPaiement", "Payé")}
          >
            <Text
              className={`text-center font-medium ${
                examen.statutPaiement === "Payé" ? "text-white" : "text-gray-700"
              }`}
            >
              Payé
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-3 rounded-xl mx-2 ${
              examen.statutPaiement === "Non Payé" ? "bg-red-500" : "bg-gray-200"
            }`}
            onPress={() => handleChange("statutPaiement", "Non Payé")} // FIXED HERE
          >
            <Text
              className={`text-center font-medium ${
                examen.statutPaiement === "Non Payé" ? "text-white" : "text-gray-700"
              }`}
            >
              Non Payé
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          className="border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:bg-white px-4 py-3 mb-5"
          value={examen.coutExamen.toString()}
          onChangeText={(text) => handleChange("coutExamen", Number(text) || 0)} // FIXED HERE
          placeholder="Coût de l'examen (TND)"
          keyboardType="numeric"
        />

        <TouchableOpacity
          className="bg-blue-500 py-4 rounded-xl shadow-sm active:bg-blue-600"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center font-semibold text-lg">
            {isEditing ? "Modifier" : "Ajouter"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
