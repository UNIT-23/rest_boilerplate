const express = require("express");
const router = express.Router();
const db = require("../../models");
const checkAuth = require('../middlware/check-auth')

router.get("/",(req, res) => {
  db.User.findAll({}).then(user => {
    res.status(200).json(user);
  })
    .catch(err =>{
      res.send(err)
    })
});

module.exports = router;