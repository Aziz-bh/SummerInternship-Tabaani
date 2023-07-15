const firebase = require("../db");
const db = firebase.firestore();

// Create a new evaluation
const createEvaluation = async (req, res, next) => {
  const { score } = req.body;

  try {
    // Create a new evaluation document in the "evaluations" collection with an auto-generated ID
    const evaluationRef = await db.collection("evaluations").doc();
    const evaluationId = evaluationRef.id;
    
    await evaluationRef.set({ score });
    
    res.status(201).json({ message: 'Evaluation created successfully', id: evaluationId, score });
  } catch (error) {
    console.error("Error creating evaluation:", error);
    res.status(500).json({ message: 'Error creating evaluation' });
  }
};

// Get all evaluations
const getAllEvaluations = async (req, res, next) => {
  try {
    // Retrieve all evaluations from the "evaluations" collection
    const querySnapshot = await db.collection("evaluations").get();
    
    const evaluations = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, score: data.score };
    });
    
    res.status(200).json({ evaluations });
  } catch (error) {
    console.error("Error getting evaluations:", error);
    res.status(500).json({ message: 'Error getting evaluations' });
  }
};

// Get an evaluation by ID
const getEvaluationById = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Retrieve the evaluation document with the given ID from the "evaluations" collection
    const evaluationDoc = await db.collection("evaluations").doc(id).get();
    
    if (!evaluationDoc.exists) {
      res.status(404).json({ message: 'Evaluation not found' });
    } else {
      const data = evaluationDoc.data();
      const evaluation = { id: evaluationDoc.id, score: data.score };
      res.status(200).json({ evaluation });
    }
  } catch (error) {
    console.error("Error getting evaluation:", error);
    res.status(500).json({ message: 'Error getting evaluation' });
  }
};

// Update an evaluation
const updateEvaluation = async (req, res, next) => {
  const { id } = req.params;
  const { score } = req.body;

  try {
    // Update the evaluation document with the given ID in the "evaluations" collection
    await db.collection("evaluations").doc(id).update({ score });
    
    res.status(200).json({ message: 'Evaluation updated successfully', id, score });
  } catch (error) {
    console.error("Error updating evaluation:", error);
    res.status(500).json({ message: 'Error updating evaluation' });
  }
};

// Delete an evaluation
const deleteEvaluation = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Delete the evaluation document with the given ID from the "evaluations" collection
    await db.collection("evaluations").doc(id).delete();
    
    res.status(200).json({ message: 'Evaluation deleted successfully' });
  } catch (error) {
    console.error("Error deleting evaluation:", error);
    res.status(500).json({ message: 'Error deleting evaluation' });
  }
};

module.exports = {
  createEvaluation,
  getAllEvaluations,
  getEvaluationById,
  updateEvaluation,
  deleteEvaluation
};
