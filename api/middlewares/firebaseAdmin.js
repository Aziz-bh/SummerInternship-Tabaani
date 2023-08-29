const admin = require("firebase-admin");
const config = require("../config");

const serviceAccount = require("../config/ServiceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  apiKey: config.firebaseConfig.apiKey,
  authDomain: config.firebaseConfig.authDomain,
  projectId: config.firebaseConfig.projectId,
  storageBucket: config.firebaseConfig.storageBucket,
  messagingSenderId: config.firebaseConfig.messagingSenderId,
  appId: config.firebaseConfig.appId,
});

module.exports = admin;
