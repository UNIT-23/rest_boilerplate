const express = require("express");
const router = express.Router();
const db = require("../../models");

router.delete("/:id", (req, res) => {
  db.User.destroy({ where: {id:req.params.id} })
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
