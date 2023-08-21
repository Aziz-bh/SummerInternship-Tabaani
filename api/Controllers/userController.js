const firebase = require("../db");
const firestore = firebase.firestore();

const SubscribeToCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    const userRef = firestore.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const firstname = userDoc.data().firstname;
    console.log(firstname);

    const courseRef = firestore.collection("courses").doc(courseId);
    const courseDoc = await courseRef.get();

    if (!courseDoc.exists) {
      return res.status(404).json({ error: "Course not found" });
    }

    const subscriptionRef = firestore
      .collection("subscriptions")
      .where("userId", "==", userId)
      .where("courseId", "==", courseId);

    const subscriptionSnapshot = await subscriptionRef.get();

    if (subscriptionSnapshot.empty) {
      const newSubscription = {
        userId: userId,
        courseId: courseId,
        progress: 0,
      };

      await firestore.collection("subscriptions").add(newSubscription);

      return res.status(200).json({
        message: `User subscribed to the course successfully`,
      });
    } else {
      return res.status(400).json({
        message: `User is already subscribed to the course`,
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

const GenerateCertificate = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    const subscriptionRef = firestore
      .collection("subscriptions")
      .where("userId", "==", userId)
      .where("courseId", "==", courseId);

    const subscriptionSnapshot = await subscriptionRef.get();

    if (subscriptionSnapshot.empty) {
      return res
        .status(404)
        .json({ error: "User not subscribed to the course" });
    }

    const subscriptionData = subscriptionSnapshot.docs[0].data();
    const progress = subscriptionData.progress || 0;

    const courseRef = firestore.collection("courses").doc(courseId);
    const courseDoc = await courseRef.get();

    if (!courseDoc.exists) {
      return res.status(404).json({ error: "Course not found" });
    }

    const chaptersArray = courseDoc.data().chapters;
    const totalChapters = chaptersArray.length;

    console.log("totalChapters", totalChapters);

    if (progress === totalChapters) {
      const certificateData = {
        userId: userId,
        courseId: courseId,
        completionDate: new Date().toISOString(),
      };

      const certificateRef = await firestore
        .collection("certificates")
        .add(certificateData);

      return res.status(200).json({
        message: `Certificate generated for user ${userId} in course ${courseId}`,
        certificateId: certificateRef.id,
      });
    } else {
      return res.status(400).json({ error: "Course not completed yet" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const GetUserSubscribedCourses = async (req, res) => {
  try {
    const { userId } = req.params;

    const userRef = firestore.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const subscriptionRef = firestore
      .collection("subscriptions")
      .where("userId", "==", userId);

    const subscriptionSnapshot = await subscriptionRef.get();

    if (subscriptionSnapshot.empty) {
      return res.status(200).json({
        message: `User has not subscribed to any courses`,
        courses: [],
      });
    }

    const courses = [];

    for (const doc of subscriptionSnapshot.docs) {
      const courseId = doc.data().courseId;
      const progress = doc.data().progress;
      const courseRef = firestore.collection("courses").doc(courseId);
      const courseDoc = await courseRef.get();

      if (courseDoc.exists) {
        const courseData = courseDoc.data();
        courseData.id = courseId;
        courseData.progress = progress;
        courses.push(courseData);
      }
    }

    return res.status(200).json({
      message: `User's subscribed courses retrieved successfully`,
      courses: courses,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const GetUsers = async (req, res) => {
  try {
    const usersRef = firestore.collection("users");
    const usersSnapshot = await usersRef.get();

    if (usersSnapshot.empty) {
      return res.status(200).json({
        message: "No users found",
        usersWithCourses: [],
      });
    }

    const usersWithCourses = [];

    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      const userId = userDoc.id;

      const subscriptionRef = firestore
        .collection("subscriptions")
        .where("userId", "==", userId);

      const subscriptionSnapshot = await subscriptionRef.get();

      if (!subscriptionSnapshot.empty) {
        const courses = [];
        const subscriptions = [];

        for (const doc of subscriptionSnapshot.docs) {
          const courseId = doc.data().courseId;
          const courseRef = firestore.collection("courses").doc(courseId);
          const courseDoc = await courseRef.get();

          if (courseDoc.exists) {
            const courseData = courseDoc.data();
            courseData.id = courseId;
            courses.push(courseData);
            subscriptions.push(doc.data());
          }
        }

        const userWithCourses = {
          userId: userId,
          userData: userData,
          subscribedCourses: courses,
          subscriptions: subscriptions,
        };

        usersWithCourses.push(userWithCourses);
      }
    }

    return res.status(200).json({
      message: "Users with subscribed courses retrieved successfully",
      usersWithCourses: usersWithCourses,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserRole = async (req, res) => {
  const uid = req.params.uid;

  try {
    // Fetch the user's role from Firestore or any other database
    const userDoc = await firestore.collection("users").doc(uid).get();
    const userData = userDoc.data();

    if (userData && userData.role) {
      res.status(200).json({ role: userData.role });
    } else {
      res.status(404).json({ message: "User role not found" });
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  verifyUserCompletion,
  MoveToNextChapter,
  SubscribeToCourse,
  GenerateCertificate,
  GetUserSubscribedCourses,
  GetUsers,
  getUserRole,
};
