import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import axiosInstance from '../../axiosInstance'; 

export default function ExamensScreen() {
  const [examen, setExamen] = useState('');
  const [dateExamen, setDateExamen] = useState('');
  const [fraisPaye, setFraisPaye] = useState('');

  const handleCreateExamen = async () => {
    // Validation
    if (!examen || !dateExamen || !fraisPaye) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const newExamen = {
      examen,
      dateExamen,
      fraisPaye
    };

    try {
      // Send POST request using the axiosInstance
      const response = await axiosInstance.post('/api/examens', newExamen);
      
      if (response.status === 200) {
        Alert.alert("Success", "Examen added successfully.");
        
        // Clear form after submission
        setExamen('');
        setDateExamen('');
        setFraisPaye('');
      } else {
        Alert.alert("Error", "Failed to add examen.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while adding the examen.");
    }
  };

  return (
    <ScrollView className="flex-1 p-4 bg-gray-100">
      <Text className="text-2xl font-semibold text-center mb-4">Add New Examen</Text>

      <TextInput
        value={examen}
        onChangeText={setExamen}
        placeholder="Examen"
        className="mb-4 p-3 border rounded-lg border-gray-300"
      />
      <TextInput
        value={dateExamen}
        onChangeText={setDateExamen}
        placeholder="Date d'examen (YYYY-MM-DD)"
        className="mb-4 p-3 border rounded-lg border-gray-300"
      />
      <TextInput
        value={fraisPaye}
        onChangeText={setFraisPaye}
        placeholder="Frais payés (Oui/Non)"
        className="mb-4 p-3 border rounded-lg border-gray-300"
      />

      <Button title="Add Examen" onPress={handleCreateExamen} />
    </ScrollView>
  );
}
