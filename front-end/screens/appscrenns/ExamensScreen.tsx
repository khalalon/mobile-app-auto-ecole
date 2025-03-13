import React, { useEffect, useState, useCallback } from "react";
import { Text, Alert, ActivityIndicator, TextInput, View, TouchableOpacity, ScrollView } from "react-native";
import { getExamens, createExamen, updateExamen, deleteExamen } from "../../services/ExamenServices";
import ExamenList from "../../componenets/exam/ExamenList";
import ExamenForm from "../../componenets/exam/ExamenForm";
import ExamenDetails from "../../componenets/exam/ExamenDetails";
import { Examen } from "../../types/types"; // Import the Examen type

export default function ExamensScreen() {
  const [examens, setExamens] = useState<Examen[]>([]);
  const [filteredExamens, setFilteredExamens] = useState<Examen[]>([]); // New state for filtered list
  const [isLoading, setIsLoading] = useState(false);
  const [editingExamen, setEditingExamen] = useState<Examen | undefined>(undefined);
  const [selectedExamen, setSelectedExamen] = useState<Examen | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchExamens();
  }, []);

  const fetchExamens = async () => {
    setIsLoading(true);
    try {
      const fetchedExamens = await getExamens();
      setExamens(fetchedExamens);
      setFilteredExamens(fetchedExamens); // Initialize filtered list with all examens
    } catch {
      Alert.alert("Erreur", "Impossible de récupérer les examens.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (examen: Examen) => {
    setIsLoading(true);
    try {
      if (editingExamen) {
        await updateExamen(examen.id!, examen);
      } else {
        await createExamen(examen);
      }
      fetchExamens();
      setEditingExamen(undefined);
      setShowForm(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Erreur", "Action impossible.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (examen: Examen) => {
    setIsLoading(true);
    try {
      await deleteExamen(examen.id!);
      fetchExamens();
      setSelectedExamen(undefined);
    } catch {
      Alert.alert("Erreur", "Impossible de supprimer l'examen.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
    if (text.trim() === "") {
      setFilteredExamens(examens); // Reset to full list if query is empty
    } else {
      const filtered = examens.filter((examen) =>
        // Adjust the fields you want to search on (e.g., clientNom, typeExamen)
        `${examen.clientNom || ""} ${examen.clientCin} ${examen.typeExamen}`
          .toLowerCase()
          .includes(text.toLowerCase())
      );
      setFilteredExamens(filtered);
    }
  }, [examens]);

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView keyboardShouldPersistTaps="handled">
        <Text className="text-2xl font-semibold text-center text-gray-800 mt-4 mb-4">
          Liste des examens
        </Text>

        {!selectedExamen && !showForm && (
          <View className="mx-4 mb-4">
            <TextInput
              className="border border-gray-200 rounded-xl bg-white px-4 py-3"
              placeholder="Rechercher un examen..."
              value={searchQuery}
              onChangeText={handleSearchChange}
            />
          </View>
        )}

        {showForm ? (
          <ExamenForm initialData={editingExamen} onSubmit={handleSubmit} isEditing={!!editingExamen} />
        ) : selectedExamen ? (
          <ExamenDetails
            examen={selectedExamen}
            onClose={() => setSelectedExamen(undefined)}
            onEdit={(examen: Examen) => {
              setEditingExamen(examen);
              setShowForm(true);
              setSelectedExamen(undefined);
            }}
            onDelete={handleDelete}
          />
        ) : (
          !showForm && (
            <View className="mx-4">
              {isLoading ? (
                <ActivityIndicator size="large" className="mt-4" />
              ) : (
                <ExamenList
                  examens={filteredExamens} // Use filtered list instead of full list
                  onEdit={(examen: Examen) => {
                    setEditingExamen(examen);
                    setShowForm(true);
                    setSelectedExamen(undefined);
                  }}
                  onDelete={handleDelete}
                  onSelect={setSelectedExamen}
                />
              )}
            </View>
          )
        )}
      </ScrollView>

      {!selectedExamen && (
        <TouchableOpacity
          className="absolute bottom-6 right-6 bg-blue-500 rounded-full shadow-lg"
          onPress={() => setShowForm(!showForm)}
          style={{ width: 64, height: 64, justifyContent: "center", alignItems: "center" }}
        >
          <Text className="text-white text-4xl font-bold text-center">
            {showForm ? "×" : "+"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}