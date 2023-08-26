const firebase = require("../db");
const db = firebase.firestore();

async function addQuiz(req, res, next) {
  try {
    const LessonId = req.params.LessonId;
    const chapterRef = db.collection("chapters").doc(LessonId);
    const documentSnapshot = await chapterRef.get();

    const rightAnswer = Array.isArray(req.body.rightAnswer)
      ? req.body.rightAnswer
      : [req.body.rightAnswer];

    const quiz = {
      question: req.body.question,
      option1: req.body.option1,
      option2: req.body.option2,
      option3: req.body.option3,
      option4: req.body.option4,
      rightAnswer: rightAnswer,
      lessonId: LessonId,
    };

    console.log("🚀 ~ file: quizController.js:10 ~ addQuiz ~ quiz:", quiz);

    if (
      !quiz.question ||
      !quiz.option1 ||
      !quiz.option2 ||
      !quiz.option3 ||
      !quiz.option4 ||
      !quiz.rightAnswer ||
      quiz.rightAnswer.length === 0
    ) {
      res.status(400).json({ message: "Invalid quiz data" });
      return;
    }

    await db.collection("quizzes").doc().set(quiz);

    res.status(201).json({ message: "Quiz added successfully" });
  } catch (error) {
    console.error("Error fetching chapter:", error);
    return res.status(500).json({ error: "Failed to fetch chapter" });
  }
}

async function addQuizT_F(req, res, next) {
  try {
    const lessonId = req.params.idChapter;
    const coursesRef = db.collection("courses");

    // Get all courses
    const coursesSnapshot = await coursesRef.get();

    if (coursesSnapshot.empty) {
      console.log("No courses found.");
      return; // Or you can return an error response
    }

    let lessonDocument;

    // Loop through each course
    coursesSnapshot.forEach((courseDoc) => {
      const courseId = courseDoc.id;

      // Get the subcollection reference for the chapters
      const chaptersRef = coursesRef.doc(courseId).collection("chapters");

      chaptersRef.get().then((chaptersSnapshot) => {
        chaptersSnapshot.forEach((chapterDoc) => {
          const chapterId = chapterDoc.id;

          // Get the subcollection reference for lessons within this chapter
          const lessonsRef = chaptersRef.doc(chapterId).collection("lessons");

          lessonsRef.get().then((lessonsSnapshot) => {
            lessonsSnapshot.forEach(async (lessonDoc) => {
              const lessonData = lessonDoc.data();

              // Check if the lesson ID matches
              if (lessonDoc.id === lessonId) {
                lessonDocument = lessonData;

                const quiz = {
                  question: req.body.question,
                  option1: req.body.option1,
                  option2: req.body.option2,
                  rightAnswer: req.body.rightAnswer,
                  lessonId: lessonId,
                };

                if (
                  !quiz.question ||
                  !quiz.option1 ||
                  !quiz.option2 ||
                  !quiz.rightAnswer
                ) {
                  res.status(400).json({ message: "Invalid quiz data" });
                  return;
                }

                await db.collection("quizzes").doc().set(quiz);

                res.status(201).json({ message: "Quiz added successfully" });
              }
            });
          });
        });
      });
    });
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

async function findByLessonId(req, res, next) {
  try {
    const lessonId = req.params.lessonId;

    const quizzesRef = db.collection("quizzes");
    const querySnapshot = await quizzesRef
      .where("lessonId", "==", lessonId)
      .get();

    if (querySnapshot.empty) {
      res
        .status(404)
        .json({ message: "No quizzes found for the given lessonId" });
    } else {
      const quizzes = [];
      querySnapshot.forEach((doc) => {
        if (!doc.data().option3) {
          const type = 0;
          quizzes.push({ id: doc.id, ...doc.data(), type });
        } else {
          const type = doc.data().rightAnswer.length;
          quizzes.push({ id: doc.id, ...doc.data(), type });
        }
      });

      res.status(200).json(quizzes);
    }
  } catch (error) {
    next(error);
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
      const question = quizData.question;
      const rightAnswerSet = new Set(quizData.rightAnswer);
      const selectedAnswerSet = new Set(selectedAnswer);

      const isCorrectAnswer = arrayEquals(rightAnswerSet, selectedAnswerSet);

      if (isCorrectAnswer) {
        return { quizId, question, message: "Correct answer!" };
      } else {
        return { quizId, question, message: "Incorrect answer!" };
      }
    }
  } catch (error) {
    throw error;
  }
}

function arrayEquals(a, b) {
  if (a.size !== b.size) return false;
  for (const item of a) {
    if (!b.has(item)) return false;
  }
  return true;
}

async function checkAnswer(req, res, next) {
  const quizArray = req.body.quizzes;
  console.log(
    "🚀 ~ file: quizController.js:226 ~ checkAnswer ~ quizArray:",
    quizArray
  );

  try {
    const results = await Promise.all(
      quizArray.map((quiz) => validateAnswer(quiz.quizId, quiz.selectedAnswer))
    );
    console.log(results);

    const length = results.length;
    const correctAnswers = results.filter(
      (result) => result.message === "Correct answer!"
    ).length;
    const score = (correctAnswers / length) * 100;
    const quizID = quizArray[0].quizId;
    const quizRef = db.collection("quizzes").doc(quizID);
    const docSnapshot = await quizRef.get();
    const lesson = docSnapshot.data().lessonId;
    const coursesRef = db.collection("courses");
    const querySnapshot = await coursesRef.get();

    let foundCourseId = null;

    for (const doc of querySnapshot.docs) {
      const courseId = doc.id;
      const chaptersRef = coursesRef.doc(courseId).collection("chapters");
      const chaptersSnapshot = await chaptersRef.get();

      // Loop through chapters
      for (const chapterDoc of chaptersSnapshot.docs) {
        const chapterId = chapterDoc.id;
        const lessonRef = chaptersRef.doc(chapterId).collection("lessons");
        const lessonSnapshot = await lessonRef.get();
        for (const lessonDoc of lessonSnapshot.docs) {
          const lessonId = lessonDoc.id;
          if (lessonId === lesson) {
            console.log("This is the course that has it all:", courseId);
            foundCourseId = courseId;
            break; // Exit the loop once the desired courseId is found
          }
        }
      }

      if (foundCourseId) {
        break; // Exit the outer loop once the courseId is found
      }
    }

    if (score >= 90) {
      const subscriptionsRef = db.collection("subscriptions");
      const querySnapshot = await subscriptionsRef
        .where("courseId", "==", foundCourseId)
        .where("userId", "==", "6Mf70xX01X6kfypHDVCC")
        .get();

      const matchingSubscriptions = [];

      querySnapshot.forEach((doc) => {
        const subscriptionData = doc.data();
        matchingSubscriptions.push({ id: doc.id, ...subscriptionData });
      });

      const subscriptionToUpdate = matchingSubscriptions[0];

      if (subscriptionToUpdate) {
        const updatedProgress = subscriptionToUpdate.progress + 1;

        db.collection("subscriptions")
          .doc(subscriptionToUpdate.id)
          .update({ progress: updatedProgress })
          .then(() => {
            console.log("Progress updated successfully for the subscription.");
          })
          .catch((error) => {
            console.error(
              "Error updating progress for the subscription:",
              error
            );
          });
      }
    }

    res.status(200).json({ results, score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to check answers" });
  }
}

async function addFinalTest(req, res, next){
  try {
    const courseId = req.params.CourseId;

    const courseRef = db.collection("courses").doc(courseId);
    const courseSnapshot = await courseRef.get();

    if (!courseSnapshot.exists) {
      res.status(404).send("Course not found");
      return;
    }


    const rightAnswer = Array.isArray(req.body.rightAnswer)
    ? req.body.rightAnswer
    : [req.body.rightAnswer];

  const exam = {
    question: req.body.question,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4,
    rightAnswer: rightAnswer,
    courseId: courseId,
  };


  if (
    !exam.question ||
    !exam.option1 ||
    !exam.option2 ||
    !exam.option3 ||
    !exam.option4 ||
    !exam.rightAnswer ||
    exam.rightAnswer.length === 0
  ) {
    res.status(400).json({ message: "Invalid  data" });
    return;
  }

  await db.collection("finalExam").doc().set(exam);

  res.status(201).json({ message: "A quiz in the exam is added successfully" });


  } catch (error) {
    res.status(400).send(error.message);
  }
}


async function deleteFinalTest(req, res, next) {
  try {
    const examId = req.params.ExamId; 

    const examRef = db.collection("finalExam").doc(examId);
    const examSnapshot = await examRef.get();

    if (!examSnapshot.exists) {
      res.status(404).send("Exam not found");
      return;
    }

    await examRef.delete();

    res.status(200).json({ message: "Exam deleted successfully" });
  } catch (error) {
    res.status(400).send(error.message);
  }
}


async function getAllFinalExamsByCourseId(req, res, next) {
  try {
    const courseId = req.params.CourseId;

    const examsSnapshot = await db.collection("finalExam")
      .where("courseId", "==", courseId)
      .get();

    const exams = [];

    examsSnapshot.forEach((doc) => {
      const examData = doc.data();
      exams.push({
        examId: doc.id,
        question: examData.question,
        option1: examData.option1,
        option2: examData.option2,
        option3: examData.option3,
        option4: examData.option4,
        rightAnswer: examData.rightAnswer,
      });
    });

    res.status(200).json(exams);
  } catch (error) {
    res.status(400).send(error.message);
  }
}



module.exports = {
  addQuiz,
  updateQuiz,
  deleteQuiz,
  getAllQuizzes,
  getQuizById,
  findByLessonId,
  checkAnswer,
  addQuizT_F,
  addFinalTest,
  deleteFinalTest,
  getAllFinalExamsByCourseId
};
