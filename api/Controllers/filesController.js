const firebase = require("../db");
const firestore = firebase.firestore();

const uploadFile = async (req, res, next) => {
    try {


console.log(req.files)

    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    uploadFile,
};
