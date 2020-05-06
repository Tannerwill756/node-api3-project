const express = require("express");
const userData = require("./userDb");

const router = express.Router();

router.post("/", (req, res) => {
  // userData.insert(req.body)
  //   .then(post => {
  //     if (req.body){
  //       res.status(200).json(post)
  //     }else{
  //       res.status(404).json({ errorMessage: 'Please include'})
  //     }
  //   }).catch({ errorMessage: 'There was a problem uploading your post'})
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  userData
    .get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved" });
    });
});

router.get("/:id", (req, res) => {
  userData
    .getById(req.params.id)
    .then((user) => {
      console.log(user);
      if (user != undefined) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: "couldnt find the post with that id",
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved" });
    });
});

router.get("/:id/posts", (req, res) => {
  userData
    .getById(req.params.id)
    .then((user) => {
      if (user != undefined) {
        userData
          .getUserPosts(req.params.id)
          .then((userPosts) => {
            res.status(200).json(userPosts);
          })
          .catch((err) => {
            res.status(500).json({
              error: "There was an error retrieving that users posts",
            });
          });
      } else {
        res.status(404).json({
          message: "couldnt find a user with that ID",
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved" });
    });
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
