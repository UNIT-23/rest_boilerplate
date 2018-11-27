const express = require("express");
const router = express.Router();
const db = require("../../models");
const constant = require("./constants");


router.put('/update/:id', (req, res, next) => {
  db.User.update({
        firstname :req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        password: req.body.password,
    },
    {where : {id: req.params.id } })
    .then(success => {
        res.send(201).json({
            message: constant.USER_UPDATED,
            user: success
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    })
   
});

module.exports = router;