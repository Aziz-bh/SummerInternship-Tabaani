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

    // Get course description
    const description = courseDoc.data().description;
    console.log(description);

    // Check if course document exists
    if (!courseDoc.exists) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Update user document with subscribed course
    const user = userDoc.data();
    const subscribedCourses = user.subscribedCourses || [];

    if (!subscribedCourses.includes(courseId)) {
      subscribedCourses.push(courseId);

      await userRef.update({
        subscribedCourses: subscribedCourses,
      });

      return res.status(200).json({
        message: `User ${firstname} subscribed to the course successfully`,
      });
    } else {
      return res.status(200).json({
        message: `User ${firstname} is already subscribed to the course`,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  SubscribeToCourse,
};
