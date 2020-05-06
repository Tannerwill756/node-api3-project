const express = require("express");
const userData = require("./userDb");
const postData = require("../posts/postDb");

const router = express.Router();

router.post("/", (req, res) => {
  userData
    .insert(req.body)
    .then((user) => {
      if (req.body.name) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ errorMessage: "Please include a name" });
      }
    })
    .catch({ errorMessage: "There was a problem uploading your post" });
});

router.post("/:id/posts", (req, res) => {
  userData
    .getById(req.params.id)
    .then((user) => {
      if (user != undefined) {
        postData
          .insert(req.body)
          .then((post) => {
            if (req.body.text) {
              res.status(200).json(post);
            } else {
              res.status(404).json({ errorMessage: "Please include text" });
            }
          })
          .catch((err) => {
            res.status(500).json({ error: "There was an issue posting" });
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
  userData
    .getById(req.params.id)
    .then((user) => {
      userData
        .remove(req.params.id)
        .then((delUser) => {
          res.status(200).json(delUser);
        })
        .catch((err) => {
          res.status(500).json({
            error: "issue deleting that user",
          });
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved" });
    });
});

router.put("/:id", (req, res) => {
  userData
    .getById(req.params.id)
    .then((user) => {
      userData
        .update(req.params.id, req.body)
        .then((updUser) => {
          res.status(200).json(updUser);
        })
        .catch((err) => {
          res
            .status(500)
            .json({ error: "The user information could not be retrieved" });
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved" });
    });
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
