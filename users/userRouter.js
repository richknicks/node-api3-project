const express = require('express');
const User = require('./userDb');
// const shortid = require('shortid');
const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
  User.insert(req.body)
  .then(post=>{
    if(post){
      res.status(201).json(post);
    }else{
      res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }
  })
  .catch(error=>{
    console.log(error);
    res.status(500).json({message: "There was an error while saving the post to the database"})
  })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
  User.getUserPosts()
});

router.get('/', (req, res) => {
  // do your magic!
  User.get()
  .then(post=>
    res.status(200).json(post)
    )
    .catch(error=>{
      console.log(error);
      res.status(500).json({error: "The post information could not be retrieved."});
    
});
})
router.get('/:id', (req, res) => {
  // do your magic!
  const{id}=req.params
  User.getById(id)
  .then(post=>{
    if(post){
      res.status(200).json(post);
    }else {
      res.status(404).json({message:"The post with the specified ID does not exist"})
    }
  })
  .catch(error=>{
    console.log(error);
    res.status(500).json({error: "The post information could not be retrieved"})
  })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  const {id}=req.params
  User.getUserPosts(id)
  .then(post=>{
    if(post){
      res.status(200).json(post);
    }else {
      res.status(404).json({error: "Post could not be found"})
    }
  })
  .catch(error=>{
    console.log(error)
    res.status(500).json({error: "The post information could not be retrieved"})
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  const {id}=req.params
  User.remove(id)
  .then(post=>{
    
   post ? res.status(200).json(post) : res.status(404).json({error: "The post with the specified ID does not exist"})
 
})
.catch(error=>{
  console.log(error)
  res.status(500).json({error: "The post information could not be retrieved"})
});
})
router.put('/:id', (req, res) => {
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
