const { setupDatabase } = require("../models/index");

async function handleClients(event) {
  console.log("Starting handleClients");
  const { pathParameters, body } = event;
  const httpMethod = event?.requestContext?.http?.method; // Use nested method for HTTP API v2
  const { Client } = await setupDatabase();

  if (!httpMethod) {
    console.log("No HTTP method provided in event:", JSON.stringify(event));
    return { statusCode: 400, body: JSON.stringify({ error: "Méthode HTTP requise" }) };
  }

  try {
    const requestBody = body ? JSON.parse(body) : {};

    switch (httpMethod.toUpperCase()) {
      case "GET":
        if (pathParameters && pathParameters.cin) {
          console.log(`Fetching client with CIN: ${pathParameters.cin}`);
          const client = await Client.findOne({ where: { cin: pathParameters.cin } });
          if (!client) {
            console.log("Client not found");
            return { statusCode: 404, body: JSON.stringify({ error: "Client non trouvé" }) };
          }
          console.log("Client retrieved successfully");
          return { statusCode: 200, body: JSON.stringify(client) };
        } else {
          console.log("Fetching all clients");
          const clients = await Client.findAll();
          console.log(`Retrieved ${clients.length} clients`);
          return { statusCode: 200, body: JSON.stringify(clients) };
        }

      case "POST":
        console.log("Creating new client");
        const { cin } = requestBody;
        if (!cin) {
          console.log("CIN is required");
          return { statusCode: 400, body: JSON.stringify({ error: "Le champ CIN est requis" }) };
        }
        const existingClient = await Client.findOne({ where: { cin } });
        if (existingClient) {
          console.log("Client with this CIN already exists");
          return { statusCode: 400, body: JSON.stringify({ error: "Un client avec ce CIN existe déjà" }) };
        }
        const client = await Client.create(requestBody);
        console.log("Client created successfully");
        return { statusCode: 201, body: JSON.stringify(client) };

      case "PUT":
        if (!pathParameters || !pathParameters.cin) {
          console.log("CIN required in URL");
          return { statusCode: 400, body: JSON.stringify({ error: "CIN requis dans l'URL" }) };
        }
        console.log(`Updating client with CIN: ${pathParameters.cin}`);
        const [updated] = await Client.update(requestBody, {
          where: { cin: pathParameters.cin },
          returning: true,
        });
        if (!updated) {
          console.log("Client not found for update");
          return { statusCode: 404, body: JSON.stringify({ error: "Client non trouvé" }) };
        }
        const updatedClient = await Client.findOne({ where: { cin: pathParameters.cin } });
        console.log("Client updated successfully");
        return { statusCode: 200, body: JSON.stringify({ message: "Client mis à jour avec succès", client: updatedClient }) };

      case "DELETE":
        if (!pathParameters || !pathParameters.cin) {
          console.log("CIN required in URL");
          return { statusCode: 400, body: JSON.stringify({ error: "CIN requis dans l'URL" }) };
        }
        console.log(`Deleting client with CIN: ${pathParameters.cin}`);
        const deleted = await Client.destroy({ where: { cin: pathParameters.cin } });
        if (!deleted) {
          console.log("Client not found for deletion");
          return { statusCode: 404, body: JSON.stringify({ error: "Client non trouvé" }) };
        }
        console.log("Client deleted successfully");
        return { statusCode: 200, body: JSON.stringify({ message: "Client supprimé avec succès" }) };

      default:
        console.log("Method not allowed:", httpMethod);
        return { statusCode: 405, body: JSON.stringify({ error: "Méthode non autorisée" }) };
    }
  } catch (error) {
    console.error("Error in clients handler:", error.message);
    return { statusCode: 500, body: JSON.stringify({ error: "Erreur lors du traitement de la requête clients", details: error.message }) };
  }
}

module.exports = { handleClients };