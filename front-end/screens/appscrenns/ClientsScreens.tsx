import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Text, Alert, ActivityIndicator, TextInput, View, TouchableOpacity, ScrollView } from "react-native";
import { createClient, getClients, updateClient, deleteClient } from "../../services/clientService";
import ClientList from "../../componenets/client/ClientList";
import ClientForm from "../../componenets/client/ClientForm";
import ClientDetails from "../../componenets/client/ClientDetails";
import { Client } from "../../types/types";

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
    } catch(error) {
      console.log(error)
      Alert.alert("Erreur", "Action impossible.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (client: Client) => {
    Alert.alert(
      "Confirmer la suppression",
      "Êtes-vous sûr de vouloir supprimer ce client ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Supprimer", onPress: async () => {
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
          }, style: "destructive" 
        }
      ]
    );
  };

  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const handleClientSelect = (client: Client) => {
    setShowForm(false);
    setEditingClient(undefined);
    setSelectedClient(client);
  };

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView keyboardShouldPersistTaps="handled">
        <Text className="text-2xl font-semibold text-center text-gray-800 mt-4 mb-4">
          Liste des clients
        </Text>

        {!selectedClient && !showForm && (
          <View className="mx-4 mb-4">
            <TextInput
              className="border border-gray-200 rounded-xl bg-white px-4 py-3"
              placeholder="Rechercher un client..."
              value={searchQuery}
              onChangeText={handleSearchChange}
            />
          </View>
        )}

        {showForm ? (
          <ClientForm 
            initialData={editingClient} 
            onSubmit={handleSubmit} 
            isEditing={!!editingClient} 
          />
        ) : selectedClient ? (
          <ClientDetails 
            client={selectedClient} 
            onClose={() => setSelectedClient(undefined)} 
            onEdit={(client) => {
              setEditingClient(client);
              setShowForm(true);
              setSelectedClient(undefined);
            }}
            onDelete={handleDelete}
          />
        ) : (
          !showForm && (
            <View className="mx-4">
              {isLoading ? (
                <ActivityIndicator size="large" className="mt-4" />
              ) : (
                <ClientList 
                  clients={filteredClients} 
                  onEdit={(client) => {
                    setEditingClient(client);
                    setShowForm(true);
                    setSelectedClient(undefined);
                  }} 
                  onDelete={handleDelete}
                  onSelect={handleClientSelect}
                />
              )}
            </View>
          )
        )}
      </ScrollView>

      {!selectedClient && (
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
