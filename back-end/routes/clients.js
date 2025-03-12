const express = require("express");
const { Client } = require("../models/index");
const router = express.Router();

// Get all clients
router.get("/", async (req, res) => {
  const clients = await Client.findAll();
  res.json(clients);
});

// Create client
router.post("/", async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update client
router.put("/:cin", async (req, res) => {
  const { cin } = req.params;
  try {
    const updatedClient = await Client.update(req.body, { where: { cin } });
    res.json(updatedClient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete client
router.delete("/:cin", async (req, res) => {
  const { cin } = req.params;
  try {
    await Client.destroy({ where: { cin } });
    res.json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
