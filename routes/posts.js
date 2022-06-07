const express = require('express');
const router=express.Router()
const PostController = require('../controllers/PostController');
const { authentication } = require('../middlewares/authentication');


router.post('/create',authentication,PostController.create)
router.get('/getall', authentication, PostController.getAll)
router.delete('/delete/:_id', authentication, PostController.delete)
router.put('/update/:_id', authentication, PostController.update)
router.get('/getbytitle/:title', PostController.getPostByTitle)
router.get('/getbyid/:_id', PostController.getById)
router.put('/comments/:_id', authentication, PostController.insertComment)
router.put('/like/:_id', authentication, PostController.like)
router.put('/dislike/:_id', authentication, PostController.dislike)



module.exports=router;