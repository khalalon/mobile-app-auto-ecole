import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Text, Alert, ActivityIndicator, TextInput, View, TouchableOpacity, ScrollView } from "react-native";
import { Client, createClient, getClients, updateClient, deleteClient } from "../../services/clientService";
import ClientList from "../../componenets/ClientList";
import ClientForm from "../../componenets/ClientForm";
import ClientDetails from "../../componenets/ClientDetails";
import { PlusCircleIcon } from 'lucide-react-native';

export default function ClientsScreen() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | undefined>(undefined);
  const [selectedClient, setSelectedClient] = useState<Client | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  // Memoize filtered clients based on the search query and the list of clients
  const filteredClients = useMemo(() => {
    return clients.filter(client => 
      client.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.cin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.telephone.includes(searchQuery)
    );
  }, [searchQuery, clients]);

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const fetchedClients = await getClients();
      setClients(fetchedClients);
    } catch {
      Alert.alert("Erreur", "Impossible de récupérer les clients.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (client: Client) => {
    setIsLoading(true);
    try {
      if (editingClient) {
        await updateClient(client.cin, client);
      } else {
        await createClient(client);
      }
      fetchClients();
      setEditingClient(undefined);
      setShowForm(false);
    } catch {
      Alert.alert("Erreur", "Action impossible.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (client: Client) => {
    setIsLoading(true);
    try {
      await deleteClient(client.cin);
      fetchClients();
      setSelectedClient(undefined);
    } catch {
      Alert.alert("Erreur", "Impossible de supprimer le client.");
    } finally {
      setIsLoading(false);
    }
  };

  // Prevent unnecessary re-renders when the search query changes
  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView keyboardShouldPersistTaps="handled">
        <Text className="text-2xl font-semibold text-center text-gray-800 mt-4 mb-4">
          Liste des clients
        </Text>

        {/* Search Bar */}
        {!selectedClient && (
          <View className="mx-4 mb-4">
            <TextInput
              className="border border-gray-200 rounded-xl bg-white px-4 py-3"
              placeholder="Rechercher un client..."
              value={searchQuery}
              onChangeText={handleSearchChange} // Use the memoized handler
            />
          </View>
        )}

        {/* Show ClientForm if button is clicked */}
        {showForm && (
          <ClientForm 
            initialData={editingClient} 
            onSubmit={handleSubmit} 
            isEditing={!!editingClient} 
          />
        )}

        {/* Toggle between Details and List */}
        {selectedClient ? (
          <ClientDetails 
            client={selectedClient} 
            onClose={() => setSelectedClient(undefined)} 
          />
        ) : isLoading ? (
          <ActivityIndicator size="large" className="mt-4" />
        ) : (
          <View className="mx-4">
            <ClientList 
              clients={filteredClients} 
              onEdit={(client) => {
                setEditingClient(client);
                setShowForm(true);
              }} 
              onDelete={handleDelete}
              onSelect={setSelectedClient}
            />
          </View>
        )}
      </ScrollView>

      {/* Floating Add Client Button */}
      {!selectedClient && (
        <TouchableOpacity 
          className="absolute bottom-6 right-6 bg-blue-600 rounded-full p-4 shadow-lg"
          onPress={() => setShowForm(!showForm)}
        >
          <PlusCircleIcon size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}
