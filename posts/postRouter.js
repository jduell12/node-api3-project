const express = require("express");
const PostData = require("./postDb");
const { post } = require("../users/userRouter");

const router = express.Router();

router.get("/", (req, res) => {
  PostData.get()
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((err) => {
      res.status(400).json({ message: "There is no posts available" });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  try {
    PostData.getById(req.post).then((thePost) => {
      res.status(200).json({ data: thePost });
    });
  } catch {
    res
      .status(500)
      .json({ errorMessage: "Could not retrieve post from database" });
  }
});

router.delete("/:id", validatePostId, (req, res) => {
  try {
    PostData.remove(req.post).then((deleted) => {
      res.status(200).json({ message: "deleted post" });
    });
  } catch {
    res
      .status(500)
      .json({ errorMessage: "Could not delete post from database" });
  }
});

router.put("/:id", (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  const postId = req.params.id;

  PostData.getById(postId)
    .then((post) => {
      req.post = post.id;
      next();
    })
    .catch((err) => {
      res.status(400).json({ message: "invalid post id" });
    });
}

module.exports = router;
