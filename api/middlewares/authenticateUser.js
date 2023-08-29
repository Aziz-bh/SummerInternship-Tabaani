const admin = require("./firebaseAdmin");

const authenticateUser = async (req, res, next) => {
  try {
    const idToken = req.header("Authorization");
    console.log("Received Token:", idToken);
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log("Decoded User:", decodedToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(401).send("Unauthorized");
  }
};

module.exports = authenticateUser;
