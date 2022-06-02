const express = require('express');
const router=express.Router()
const PostController = require('../controllers/PostController');

router.post('/create',PostController.create)
router.get('/getall', PostController.getAll)
router.delete('/delete/:_id', PostController.delete)
router.put('/update/:_id', PostController.update)
router.get('/getbytitle/:title', PostController.getPostByTitle)
router.get('/getbyid/:_id', PostController.getById)
router.put('/like/:_id', PostController.like)


module.exports=router;