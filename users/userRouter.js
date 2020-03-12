const express = require('express');
const User = require('./userDb');
// const shortid = require('shortid');
const router = express.Router();


router.post('/',validateUserId, (req, res) => {
  // do your magic!
  const {id}=req.params
  const body=req.body
  User.insert(id, body)
  .then(post=>{
    post?
      res.status(201).json(post):
      res.status(400).json({errorMessage: "Please provide title and contents for the post."})    
  })
  .catch(error=>{
    console.log(error);
    res.status(500).json({message: "There was an error while saving the user to the database"})
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
    
   post ? res.status(200).json(post) : res.status(404).json({error: "The user with the specified ID does not exist"})
 
})
.catch(error=>{
  console.log(error)
  res.status(500).json({error: "The users information could not be retrieved"})
});
})
router.put('/:id', (req, res) => {
  // do your magic!
  const {id}=req.params
  const changes=req.body
  User.update(id, changes)
  .then(post=>{
    if(changes.name || changes.id){
      res.status(200).json(post)
    }else if(!changes.name || !changes.id) {
      res.status(400).json({ errorMessage: "Please provide id and name for the user." })
    }else{
      res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
  })
  .catch(error=>{
    console.log(error)
    res.status(500).json({error: "This information cannot be accessed"})
  })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const {id}=req.params
  User.getById(id)
  .then(post=>{
    id?
    res.status(200).json(post) :
    res.status(400).json({error: 'Not validated'})
  })
  .catch(error=>{
    console.log(error);
    res.status(500).json({error: "This is a 500 error"})
  })
  next();

}

function validateUser(req, res, next) {
  // do your magic!
  
  User.get(req.body)
  .then(post =>{
    !body?res.status(400).json({message: "missing user data"}):
    !post.name? res.status(400).json({ message: "missing required name field" });
  })
  .catch(error=>{
    console.log(error);
    res.status(500).json({error: "This is a 500 validation error"})
  })
  next();
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
