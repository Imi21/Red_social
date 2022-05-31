const express = require('express');
const router=express.Router()
const PostController = require('../controllers/PostController');

router.post('/create',PostController.create)
router.get('/getall', PostController.getAll)

module.exports=router;