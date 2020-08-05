const express = require("express");
const UserData = require("./userDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  UserData.insert(req.body)
    .then((user) => {
      res.status(201).json({ message: `created ${user}` });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "Unable to create user" });
    });
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  UserData.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  const userId = req.params.id;
  console.log(userId);

  UserData.getById(userId)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      res.status(400).json({ message: "invalid user id" });
    });
}

function validateUser(req, res, next) {
  const userInfo = req.body;
  console.log(req.body);

  if (!userInfo) {
    res.status(400).json({ message: "missing user data" });
  } else {
    if (!userInfo.name) {
      res.status(400).json({ message: "missing required name field" });
    } else {
      next();
    }
  }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
