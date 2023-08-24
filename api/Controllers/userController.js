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
    const completedLessons = subscriptionData.progress || [];
    console.log("completedLessons", completedLessons);

    const courseRef = firestore.collection("courses").doc(courseId);
    const courseDoc = await courseRef.get();

    if (!courseDoc.exists) {
      return res.status(404).json({ error: "Course not found" });
    }

    const lessonsArray = [];
    const chaptersSnapshot = await courseRef.collection("chapters").get();

    for (const chapterDoc of chaptersSnapshot.docs) {
      const lessonsSnapshot = await chapterDoc.ref.collection("lessons").get();
      lessonsSnapshot.forEach((lessonDoc) => {
        lessonsArray.push(lessonDoc.data());
      });
    }

    const totalLessons = lessonsArray.length;
    const progress = completedLessons;

    console.log("totalLessons", totalLessons);
    console.log("progress", progress);

    if (progress == totalLessons) {
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

const GetCertificatesForUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const certificatesRef = firestore
      .collection("certificates")
      .where("userId", "==", userId);

    const certificatesSnapshot = await certificatesRef.get();

    if (certificatesSnapshot.empty) {
      return res
        .status(404)
        .json({ error: "No certificates found for this user" });
    }

    const certificates = [];

    // Fetch user and course data for each certificate
    for (const certificateDoc of certificatesSnapshot.docs) {
      const certificateData = certificateDoc.data();

      const userRef = firestore.collection("users").doc(certificateData.userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        console.log(`User with ID ${certificateData.userId} not found.`);
        continue;
      }

      const userData = userDoc.data();

      const courseRef = firestore
        .collection("courses")
        .doc(certificateData.courseId);
      const courseDoc = await courseRef.get();
      const courseData = courseDoc.data();

      certificates.push({
        certificateId: certificateDoc.id,
        userId: certificateData.userId,
        displayName: userData.displayName,
        courseId: certificateData.courseId,
        courseTitle: courseData.title,
        completionDate: certificateData.completionDate,
      });
    }

    return res.status(200).json(certificates);
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

        // Fetch associated chapters for the course
        const chaptersSnapshot = await courseRef.collection("chapters").get();
        const chapters = [];

        for (const chapterDoc of chaptersSnapshot.docs) {
          const chapterData = chapterDoc.data();
          chapterData.id = chapterDoc.id;

          // Fetch associated lessons for the chapter
          const lessonsSnapshot = await chapterDoc.ref
            .collection("lessons")
            .get();
          const lessons = lessonsSnapshot.docs.map((lessonDoc) =>
            lessonDoc.data()
          );

          chapterData.lessons = lessons;
          chapters.push(chapterData);
        }

        courseData.chapters = chapters;

        const totalLessons = chapters.reduce(
          (sum, chapter) => sum + chapter.lessons.length,
          0
        );

        // Calculate progress percentage
        const progressPercentage = (progress / totalLessons) * 100;
        courseData.progress = `${progressPercentage.toFixed(2)}%`;

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

const GetAllUsers = async (req, res) => {
  try {
    const usersSnapshot = await firestore
      .collection("users")
      .where("role", "!=", "admin")
      .get();

    const users = usersSnapshot.docs.map((userDoc) => ({
      id: userDoc.id,
      ...userDoc.data(),
    }));

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  GetCertificatesForUser,
  GetAllUsers,
  SubscribeToCourse,
  GenerateCertificate,
  GetUserSubscribedCourses,
  GetUsers,
  getUserRole,
};
