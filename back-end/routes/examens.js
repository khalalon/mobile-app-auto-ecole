const { setupDatabase } = require("../models/index");

async function handleExamens(event) {
  console.log("Starting handleExamens");
  const { pathParameters, body } = event;
  const httpMethod = event?.requestContext?.http?.method; // Use nested method for HTTP API v2
  const { Exam, Client } = await setupDatabase();

  if (!httpMethod) {
    console.log("No HTTP method provided in event:", JSON.stringify(event));
    return { statusCode: 400, body: JSON.stringify({ error: "Méthode HTTP requise" }) };
  }

  try {
    const requestBody = body ? JSON.parse(body) : {};

    switch (httpMethod.toUpperCase()) {
      case "GET":
        if (pathParameters && pathParameters.id) {
          console.log(`Fetching exam with ID: ${pathParameters.id}`);
          const exam = await Exam.findByPk(pathParameters.id, {
            include: { model: Client, as: "client" },
          });
          if (!exam) {
            console.log("Exam not found");
            return { statusCode: 404, body: JSON.stringify({ error: "Examen non trouvé" }) };
          }
          console.log("Exam retrieved successfully");
          return { statusCode: 200, body: JSON.stringify(exam) };
        } else {
          console.log("Fetching all exams");
          const exams = await Exam.findAll({
            include: { model: Client, as: "client" },
          });
          console.log(`Retrieved ${exams.length} exams`);
          return { statusCode: 200, body: JSON.stringify(exams) };
        }

      case "POST":
        console.log("Creating new exam");
        const { clientCin } = requestBody;
        if (!clientCin) {
          console.log("clientCin is required");
          return { statusCode: 400, body: JSON.stringify({ error: "Le champ clientCin est requis" }) };
        }
        const client = await Client.findOne({ where: { cin: clientCin } });
        if (!client) {
          console.log("Client not found for exam");
          return { statusCode: 400, body: JSON.stringify({ error: "Client introuvable" }) };
        }
        const newExam = await Exam.create(requestBody);
        console.log("Exam created successfully");
        return { statusCode: 201, body: JSON.stringify(newExam) };

      case "PUT":
        if (!pathParameters || !pathParameters.id) {
          console.log("ID required in URL");
          return { statusCode: 400, body: JSON.stringify({ error: "ID requis dans l'URL" }) };
        }
        console.log(`Updating exam with ID: ${pathParameters.id}`);
        const [updated] = await Exam.update(requestBody, {
          where: { id: pathParameters.id },
          returning: true,
        });
        if (!updated) {
          console.log("Exam not found for update");
          return { statusCode: 404, body: JSON.stringify({ error: "Examen non trouvé" }) };
        }
        const updatedExam = await Exam.findByPk(pathParameters.id);
        console.log("Exam updated successfully");
        return { statusCode: 200, body: JSON.stringify({ message: "Examen mis à jour avec succès", exam: updatedExam }) };

      case "DELETE":
        if (!pathParameters || !pathParameters.id) {
          console.log("ID required in URL");
          return { statusCode: 400, body: JSON.stringify({ error: "ID requis dans l'URL" }) };
        }
        console.log(`Deleting exam with ID: ${pathParameters.id}`);
        const deleted = await Exam.destroy({ where: { id: pathParameters.id } });
        if (!deleted) {
          console.log("Exam not found for deletion");
          return { statusCode: 404, body: JSON.stringify({ error: "Examen non trouvé" }) };
        }
        console.log("Exam deleted successfully");
        return { statusCode: 200, body: JSON.stringify({ message: "Examen supprimé avec succès" }) };

      default:
        console.log("Method not allowed:", httpMethod);
        return { statusCode: 405, body: JSON.stringify({ error: "Méthode non autorisée" }) };
    }
  } catch (error) {
    console.error("Error in examens handler:", error.message);
    return { statusCode: 500, body: JSON.stringify({ error: "Erreur lors du traitement de la requête examens", details: error.message }) };
  }
}

module.exports = { handleExamens };