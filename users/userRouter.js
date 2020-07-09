const express = require('express');

const router = express.Router();

const users = require('./userDb.js')
const posts = require('../posts/postDb.js');
const e = require('express');

router.post('/', validateUser, (req, res) => {
  users.insert(req.body)
    .then((newUser)=>{
      res.status(200).json(newUser)
    })
    .catch((error)=>{
      res.status(500).json(error)
    })
});

router.post('/:id/posts', validatePost, (req, res) => { //needs verify user middleware
  const user_id = req.params.id;
  let newPost = {
    ...req.body,
    user_id: user_id
  }
  posts.insert(newPost)
    .then((newPost)=>{
      res.status(200).json(newPost)
    })
    .catch((error)=>{
      res.status(500).json(error)
    })
  
});

router.get('/', (req, res) => {
  users.get()
    .then((usersList) => {
      res.status(200).json(usersList)
    })
    .catch(error=>{
      res.status(500)
    })
});

router.get('/:id', validateUserId, (req, res) => {
  users.getById(req.params.id)
    .then((user)=>{
      res.status(200).json(user)
    })
    .catch((error)=>{
      res.status(500).json(error)
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  users.getUserPosts(req.params.id)
    .then((UsersPosts)=>{
      res.status(200).json(UsersPosts)
    })
    .catch((error)=>{
      res.status(500).json(error)
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  users.remove(req.params.id)
    .then((removedUser)=>{
      res.status(200).json(removedUser)
    })
    .catch((error)=>{
      res.status(500).json(error)
    })
});

router.put('/:id', validateUserId, (req, res) => {
  users.update(req.params.id, req.body)
    .then((updatedUser)=>{
      res.status(200).json(updatedUser)
    })
    .catch((error)=>{
      res.status(500).json(error)
    })
});

//custom middleware

function validateUserId(req, res, next) {
  users.getById(req.params.id)
    .then((user)=>{
      if(user){
        next();
      } else {
        res.status(400).json({ message: "invalid user id"})
      }
    })
    .catch((err)=>{
      console.log(err)
    })
}

function validateUser(req, res, next) {
  console.log(req.body)
  if(Object.keys(req.body).length!==0) {
    if(req.body.name){
      next();
    } else {
      res.status(400).json({ message: "missing required name field" });
    }
  } else {
    res.status(400).json({ message: "missing user data"})
  }
}

function validatePost(req, res, next) {
  if(Object.keys(req.body).length!==0){
    if(req.body.text){
      next()
    }else{
      res.status(400).json({ message: "missing required text field" })
    }
  }else{
    res.status(400).json({ message: "missing post data" })
  }
}

module.exports = router;
