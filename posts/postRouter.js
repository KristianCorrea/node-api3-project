const express = require('express');

const router = express.Router();

const posts = require('./postDb.js')

router.get('/', (req, res) => {
  posts.get()
    .then((posts)=>{
      res.status(200).json(posts)
    })
    .catch((error)=>{
      res.status(500).json(error)
    })
});

router.get('/:id', validatePostId, (req, res) => {
  posts.getById(req.params.id)
    .then((post)=>{
      res.status(200).json(post)
    })
    .catch((error)=>{
      res.status(500).json(error)
    })
});

router.delete('/:id', validatePostId, (req, res) => {
  posts.remove(req.params.id)
    .then((deletedPost)=>{
      res.status(200).json(deletedPost)
    })
    .catch((error)=>{
      res.status(500).json(error)
    })
});

router.put('/:id', validatePostId, (req, res) => {
  posts.update(req.params.id, req.body)
    .then((updatedPost)=>{
      res.status(200).json(updatedPost)
    })
    .catch((error)=>{
      res.status(500).json(error)
    })
});

// custom middleware

function validatePostId(req, res, next) {
  posts.getById(req.params.id)
    .then(post => {
        console.log(post, "<--- Post")
      if(post) {
        next();
      } else {
        res.status(400).json({ message: "Invalid post ID" });
      }
    })
    .catch(err => {
      console.log(err);
    })
}

module.exports = router;
