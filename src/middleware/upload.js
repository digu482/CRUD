const express = require('express');
const mongoose = require('mongoose');
const app = express();
const multer = require("multer")
const path = require('path');
const fs = require("fs");
const User = require("../model/user")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const frontEndUrl =  'http://localhost:1010'


const maxSize = 5 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "profile") {
      cb(null, "public/profile");
    } 
    else if (file.fieldname === "document") {
      cb(null, "public/document");
    } 
    else {
      cb(new Error("Invalid fieldname"));
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let Upload = multer({ storage: storage }).fields([
  { name: "profile", maxCount: 1 },
   { name: "document" },
]);

async function uploadFile(req, res, next) {
  Upload(req, res, async (error) => {
    if (error) {
      res.status(400).send('Something went wrong!');
    } else {
      

      if (req.files && req.files.profile) {
        const profilepath = `${frontEndUrl}/profile/${req.files.profile[0].filename}`;
        req.profileUrl = profilepath;
      }

      if (req.files && req.files.document) {
          req.documentUrls = req.files.document.map((file) => {
          const documentpath = `${frontEndUrl}/document/${file.filename}`;
          return documentpath;
        });
      }

      next();
    }
  });
}

module.exports = uploadFile;



