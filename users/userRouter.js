const express = require("express");
const userData = require("./userDb");
const postData = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  userData
    .insert(req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch({ errorMessage: "There was a problem uploading your post" });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  postData
    .insert(req.body)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({ error: "There was an issue posting" });
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

router.get("/:id", validateUserId, (req, res) => {
  userData
    .getById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved" });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
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
});

router.delete("/:id", validateUserId, (req, res) => {
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
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
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
});

//custom middleware

function validateUserId(req, res, next) {
  userData
    .getById(req.params.id)
    .then((user) => {
      if (user != undefined) {
        req.user = req.params.id;
        next();
      } else {
        res.status(400).json({
          errorMessage: "The user with this ID does not exist.",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Issue retrieving that user" });
    });
}

function validateUser(req, res, next) {
  if (req.body) {
    if (req.body.name) {
      next();
    } else {
      res.status(400).json({ message: "missing required name field" });
    }
  } else {
    res.status(400).json({ message: "missing user data" });
  }
}

function validatePost(req, res, next) {
  if (req.body) {
    if (req.body.text) {
      next();
    } else {
      res.status(400).json({ message: "missing required text field" });
    }
  } else {
    res.status(400).json({
      message: "missing post data",
    });
  }
}

module.exports = router;
