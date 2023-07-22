const firebase = require("../db");
const firestore = firebase.firestore();

const SubscribeToCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    // Get user document reference
    const userRef = firestore.collection("users").doc(userId);

    const userDoc = await userRef.get();

    // Check if user document exists
    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get user first name
    const firstname = userDoc.data().firstname;
    console.log(firstname);

    // Get course document reference
    const courseRef = firestore.collection("courses").doc(courseId);
    const courseDoc = await courseRef.get();

    // Check if course document exists
    if (!courseDoc.exists) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Check if the user is already subscribed to the course
    const subscriptionRef = firestore
      .collection("subscriptions")
      .where("userId", "==", userId)
      .where("courseId", "==", courseId);

    const subscriptionSnapshot = await subscriptionRef.get();

    if (subscriptionSnapshot.empty) {
      // User is not subscribed, create a new subscription
      const newSubscription = {
        userId: userId,
        courseId: courseId,
      };

      await firestore.collection("subscriptions").add(newSubscription);

      return res.status(200).json({
        message: `User ${firstname} subscribed to the course successfully`,
      });
    } else {
      // User is already subscribed to the course
      return res.status(200).json({
        message: `User ${firstname} is already subscribed to the course`,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const verifyUserCompletion = async (req, res) => {
  const { userId, courseId } = req.params;

  try {
    const userDoc = await firestore.collection("users").doc(userId).get();
    const courseDoc = await firestore.collection("courses").doc(courseId).get();
    if (!userDoc.exists || !courseDoc.exists) {
      return res.status(404).json({ error: "User or course not found" });
    }

    const user = userDoc.data();
    const course = courseDoc.data();

    const chapterQuerySnapshot = await firestore
      .collection("chapters")
      .where("courseId", "==", courseId)
      .get();

    const totalChapters = course.chapters.length;
    const completedChapters = chapterQuerySnapshot.size;

    const score =
      user.scores && user.scores[courseId] ? user.scores[courseId] : 0;

    let verified = false;

    if (completedChapters === totalChapters && score >= 70) {
      verified = true;
    }

    // Update the user document with the verified attribute
    await firestore.collection("users").doc(userId).update({
      verified: verified,
    });

    if (verified) {
      return res.status(200).json({
        message: `Course completed successfully. User verified.`,
      });
    } else {
      return res.status(200).json({
        message: `Course not completed yet or did not achieve the required score`,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const MoveToNextChapter = async (req, res) => {
  const { userId, courseId, chapterId, score } = req.body;

  try {
    const userRef = firestore.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = userDoc.data();

    const courseRef = firestore.collection("courses").doc(courseId);
    const courseDoc = await courseRef.get();

    if (!courseDoc.exists) {
      return res.status(404).json({ error: "Course not found" });
    }

    const course = courseDoc.data();

    if (!user.subscribedCourses.includes(courseId)) {
      return res
        .status(400)
        .json({ error: "User is not subscribed to the course" });
    }

    const chapterRef = firestore.collection("chapters").doc(chapterId);
    const chapterDoc = await chapterRef.get();

    if (!chapterDoc.exists) {
      return res.status(404).json({ error: "Chapter not found" });
    }

    const chapterData = chapterDoc.data();
    const chapterTitle = chapterData.title;

    console.log("chapterTitle", chapterTitle);

    const quizRef = firestore
      .collection("quizzes")
      .doc(chapterDoc.data().quizId);

    const quizDoc = await quizRef.get();

    if (!quizDoc.exists) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    const quizData = quizDoc.data();
    const rightAnswer = quizData.rightAnswer;

    console.log("rightAnswer", rightAnswer);

    // Check if user's score is above 70%
    if (score >= 70) {
      const nextChapterIndex = course.chapters.indexOf(chapterId) + 1;
      if (nextChapterIndex < course.chapters.length) {
        const nextChapterId = course.chapters[nextChapterIndex];
        await userRef.update({ currentChapter: nextChapterId });
        return res
          .status(200)
          .json({ message: "User moved to the next chapter" });
      }

      return res.status(200).json({ message: "User completed all chapters" });
    } else {
      return res.status(400).json({ error: "User score is below 70%" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  verifyUserCompletion,
  SubscribeToCourse,
  MoveToNextChapter,
};
