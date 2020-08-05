const express = require("express");
const UserData = require("./userDb");
const PostData = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  try {
    UserData.insert(req.body).then((user) => {
      res.status(201).json({ created: user });
    });
  } catch {
    res.status(500).json({ errorMessage: "Unable to create user" });
  }
});

router.post("/:id/posts", validatePost, (req, res) => {
  try {
    const post = req.body;
    post.user_id = req.params.id;
    PostData.insert(post).then((post) => {
      res.status(201).json(post);
    });
  } catch {
    res.status(500).json({ errorMessage: "Error adding post to user" });
  }
});

router.get("/", (req, res) => {
  try {
    UserData.get().then((users) => {
      res.status(200).json(users);
    });
  } catch {
    res.status(500).json({ errorMessage: "Unable to get users" });
  }
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  try {
    UserData.getUserPosts(req.user.id).then((posts) => {
      if (posts[0] === undefined) {
        res.status(200).json({ message: "This user has no posts" });
      } else {
        res.status(200).json({ posts });
      }
    });
  } catch {
    res.status(500).json({ errorMessage: "Could not get user's posts" });
  }
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
  const newPost = req.body;

  if (!newPost) {
    res.status(400).json({ message: "missing post data" });
  } else {
    if (!newPost.text) {
      res.status(400).json({ message: "missing required text field" });
    } else {
      next();
    }
  }
}

module.exports = router;
