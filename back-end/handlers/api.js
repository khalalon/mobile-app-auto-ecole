const { handleClients } = require("../routes/clients");
const { handleExamens } = require("../routes/examens");

exports.handler = async (event) => {
  console.log("Received event:", JSON.stringify(event));

  const path = event?.rawPath || "";
  const httpMethod = event?.requestContext?.http?.method; // Fix: Get method from nested structure
  const stage = "/prod";
  const relativePath = path.replace(stage, "");

  if (!httpMethod) {
    console.error("HTTP method is undefined in event:", JSON.stringify(event));
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Méthode HTTP requise" }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  }

  try {
    let response;

    if (relativePath.startsWith("/clients")) {
      console.log("Handling /clients path");
      response = await handleClients(event);
    } else if (relativePath.startsWith("/examens")) {
      console.log("Handling /examens path");
      response = await handleExamens(event);
    } else {
      console.log("Resource not found, returning 404");
      response = { statusCode: 404, body: JSON.stringify({ error: "Ressource non trouvée" }) };
    }

    return {
      ...response,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (error) {
    console.error("Error in Lambda handler:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur serveur interne", details: error.message }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
};

module.exports = { handler: exports.handler };