const express = require('express');
const router=express.Router()
const CommentController = require('../controllers/CommentController');


router.post('/create',CommentController.create)

module.exports=router;