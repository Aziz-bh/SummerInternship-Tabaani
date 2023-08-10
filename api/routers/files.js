const express = require("express");
const files = express.Router();
const filesController = require("../Controllers/filesController");

files.post('/upload-file', filesController.uploadFile);
// files.post('/upload-files', filesController.uploadFiles);
// files.get('/get-uploaded-file/:id', filesController.getImage);
// files.delete('/files/:id', filesController.deleteImage);


  module.exports = files;