const firebase = require("../db");
const db = firebase.firestore();

async function addQuiz(req, res, next) {
  try {
    const ChapterId = req.params.idChapter;
    const chapterRef = db.collection("chapters").doc(ChapterId);
    const documentSnapshot = await chapterRef.get();

    if (!documentSnapshot.exists) {
      console.log("Document does not exist");
      return res.status(404).json({ error: "Chapter doesn't exist" });
    } else {
      const quiz = {
        question: req.body.question,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        rightAnswer: req.body.rightAnswer,
        ChapterId: ChapterId,
      };

      console.log("🚀 ~ file: quizController.js:10 ~ addQuiz ~ quiz:", quiz);

      if (
        !quiz.question ||
        !quiz.option1 ||
        !quiz.option2 ||
        !quiz.option3 ||
        !quiz.option4 ||
        !quiz.rightAnswer
      ) {
        res.status(400).json({ message: "Invalid quiz data" });
        return;
      }

      await db.collection("quizzes").doc().set(quiz);

      res.status(201).json({ message: "Quiz added successfully" });
    }
  } catch (error) {
    console.error("Error fetching chapter:", error);
    return res.status(500).json({ error: "Failed to fetch chapter" });
  }
}

async function updateQuiz(req, res, next) {
  try {
    const quizId = req.params.id;
    const updatedQuiz = req.body;

    const quizRef = db.collection("quizzes").doc(quizId);

    const updatedData = {
      id: updatedQuiz.id,
      question: updatedQuiz.question,
      option1: updatedQuiz.option1,
      option2: updatedQuiz.option2,
      option3: updatedQuiz.option3,
      option4: updatedQuiz.option4,
      rightAnswer: updatedQuiz.rightAnswer,
    };

    await quizRef.update(updatedData);
    console.log("Quiz updated successfully");

    res.status(200).json({ message: "Quiz updated successfully" });
  } catch (error) {
    next(error);
  }
}

async function deleteQuiz(req, res, next) {
  try {
    const quizId = req.params.id;

    const quizRef = db.collection("quizzes").doc(quizId);

    await quizRef.delete();
    console.log("Quiz deleted successfully");

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    next(error);
  }
}

async function getAllQuizzes(req, res, next) {
  try {
    const querySnapshot = await db.collection("quizzes").get();
    const quizzes = [];

    querySnapshot.forEach((doc) => {
      quizzes.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(quizzes);
  } catch (error) {
    next(error);
  }
}

async function getQuizById(req, res, next) {
  try {
    const quizId = req.params.id;

    const quizRef = db.collection("quizzes").doc(quizId);
    const docSnapshot = await quizRef.get();

    if (!docSnapshot.exists) {
      res.status(404).json({ message: "Quiz not found" });
    } else {
      res.status(200).json({ id: docSnapshot.id, ...docSnapshot.data() });
    }
  } catch (error) {
    next(error);
  }
}

async function findByChapterId(req, res, next) {
  try {
    const ChapterId = req.params.chapterId;

    const quizzesRef = db.collection("quizzes");
    const querySnapshot = await quizzesRef
      .where("ChapterId", "==", ChapterId)
      .get();

    if (querySnapshot.empty) {
      res
        .status(404)
        .json({ message: "No quizzes found for the given ChapterId" });
    } else {
      const quizzes = [];
      querySnapshot.forEach((doc) => {
        quizzes.push({ id: doc.id, ...doc.data() });
      });

      res.status(200).json(quizzes);
    }
  } catch (error) {
    next(error);
  }
}

async function checkAnswer(req, res, next) {
  const quizArray = req.body.quizzes;
  try {
    const results = await Promise.all(quizArray.map((quiz) => validateAnswer(quiz.quizId, quiz.selectedAnswer)));
    console.log(results);
    
    const totalQuizzes = results.length;
    const correctAnswers = results.filter((result) => result.message === "Correct answer!").length;
    const score = (correctAnswers / totalQuizzes) * 100;

    res.status(200).json({ results, score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to check answers' });
  }
}

async function validateAnswer(quizId, selectedAnswer) {
  try {
    const quizRef = db.collection("quizzes").doc(quizId);
    const docSnapshot = await quizRef.get();

    if (!docSnapshot.exists) {
      return { quizId, message: "Quiz not found" };
    } else {
      const quizData = docSnapshot.data();

      if (selectedAnswer === quizData.rightAnswer) {
        return { quizId, message: "Correct answer!" };
      } else {
        return { quizId, message: "Incorrect answer!" };
      }
    }
  } catch (error) {
    throw error;
  }
}





module.exports = {
  addQuiz,
  updateQuiz,
  deleteQuiz,
  getAllQuizzes,
  getQuizById,
  findByChapterId,
  checkAnswer,
};
