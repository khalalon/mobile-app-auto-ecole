// componenets/exam/ExamenForm.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Correct import for Picker
import { Examen } from "../../types/types"; // Import the Examen type

interface ExamenFormProps {
  initialData?: Examen;
  onSubmit: (examen: Examen) => void;
  isEditing: boolean;
}

const ExamenForm: React.FC<ExamenFormProps> = ({ initialData, onSubmit, isEditing }) => {
  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    clientCin: initialData?.clientCin || "",
    clientNom: initialData?.clientNom || "",
    dateExamen: initialData?.dateExamen || "",
    statutPaiement: initialData?.statutPaiement || "Non Payé",
    coutExamen: initialData?.coutExamen?.toString() || "",
    typeExamen: initialData?.typeExamen || "CODE",
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      coutExamen: parseFloat(formData.coutExamen),
    });
  };

  return (
    <View className="bg-white rounded-lg shadow-md p-4 mx-4 mb-4">
      <Text className="text-2xl font-semibold text-gray-800 mb-4">
        {isEditing ? "Modifier l'examen" : "Ajouter un examen"}
      </Text>

      <Text className="text-gray-600 mb-2">CIN du client</Text>
      <TextInput
        className="border border-gray-200 rounded-lg px-4 py-2 mb-4"
        placeholder="Entrez le CIN du client"
        value={formData.clientCin}
        onChangeText={(text) => handleChange("clientCin", text)}
      />

      <Text className="text-gray-600 mb-2">Nom du client</Text>
      <TextInput
        className="border border-gray-200 rounded-lg px-4 py-2 mb-4"
        placeholder="Entrez le nom du client"
        value={formData.clientNom}
        onChangeText={(text) => handleChange("clientNom", text)}
      />

      <Text className="text-gray-600 mb-2">Date de l'examen</Text>
      <TextInput
        className="border border-gray-200 rounded-lg px-4 py-2 mb-4"
        placeholder="Entrez la date (YYYY-MM-DD)"
        value={formData.dateExamen}
        onChangeText={(text) => handleChange("dateExamen", text)}
      />

      <Text className="text-gray-600 mb-2">Type d'examen</Text>
      <Picker
        selectedValue={formData.typeExamen}
        onValueChange={(value) => handleChange("typeExamen", value as string)}
        style={{ borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 8, padding: 8, marginBottom: 16 }}
      >
        <Picker.Item label="CODE" value="CODE" />
        <Picker.Item label="MANOEUVRE" value="MANOEUVRE" />
        <Picker.Item label="PARC" value="PARC" />
      </Picker>

      <Text className="text-gray-600 mb-2">Statut de paiement</Text>
      <Picker
        selectedValue={formData.statutPaiement}
        onValueChange={(value) => handleChange("statutPaiement", value as string)}
        style={{ borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 8, padding: 8, marginBottom: 16 }}
      >
        <Picker.Item label="Payé" value="Payé" />
        <Picker.Item label="Non Payé" value="Non Payé" />
      </Picker>

      <Text className="text-gray-600 mb-2">Coût de l'examen (€)</Text>
      <TextInput
        className="border border-gray-200 rounded-lg px-4 py-2 mb-4"
        placeholder="Entrez le coût"
        value={formData.coutExamen}
        onChangeText={(text) => handleChange("coutExamen", text)}
        keyboardType="numeric"
      />

      <TouchableOpacity
        className="bg-blue-500 px-4 py-2 rounded-lg"
        onPress={handleSubmit}
      >
        <Text className="text-white font-semibold text-center">
          {isEditing ? "Modifier" : "Ajouter"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExamenForm;