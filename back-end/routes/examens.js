const express = require("express");
const router = express.Router();
const { Exam, Client } = require("../models"); 

// ✅ Get all examens (with client details)
router.get("/", async (req, res) => {
  try {
    const examens = await Exam.findAll({ include: Client });
    res.json(examens);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des examens" });
  }
});

// ✅ Get one examen by ID
router.get("/:id", async (req, res) => {
  try {
    const examen = await Exam.findByPk(req.params.id, { include: Client });
    if (!examen) return res.status(404).json({ error: "Examen non trouvé" });
    res.json(examen);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération de l'examen" });
  }
});

// ✅ Create a new examen
router.post("/", async (req, res) => {
  try {
    // Check if client exists
    const client = await Client.findOne({ where: { cin: req.body.clientCin } });
    if (!client) return res.status(400).json({ error: "Client introuvable" });

    const newExamen = await Exam.create(req.body);
    res.status(201).json(newExamen);
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de la création de l'examen" });
  }
});

// ✅ Update an examen by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedExamen = await Exam.update(req.body, { where: { id: req.params.id } });
    res.json({ message: "Examen mis à jour avec succès" });
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de la mise à jour de l'examen" });
  }
});

// ✅ Delete an examen by ID
router.delete("/:id", async (req, res) => {
  try {
    await Exam.destroy({ where: { id: req.params.id } });
    res.json({ message: "Examen supprimé avec succès" });
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de la suppression de l'examen" });
  }
});

module.exports = router;
