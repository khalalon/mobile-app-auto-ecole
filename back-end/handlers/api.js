const { handleClients } = require("../routes/clients");
const { handleExamens } = require("../routes/examens");

exports.handler = async (event) => {
  console.log("Received event:", JSON.stringify(event));

  const path = event?.rawPath || "";
  const stage = "/prod"; // Adjust this based on your API Gateway stage
  const relativePath = path.replace(stage, "");

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