const express = require("express");

const postData = require("./postDb.js");

const router = express.Router();

router.get("/", (req, res) => {
  // postData
  //   .get(req.query)
  //   .then((posts) => {
  //     res.status(200).json(posts);
  //   })
  //   .catch((err) => {
  //     res
  //       .status(500)
  //       .json({ error: "The posts information could not be retrieved" });
  //   });
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
