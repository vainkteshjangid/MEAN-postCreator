const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router.post('', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save()   //save the post to database
        .then(result => {
            res.status(201).json({
                message: "Post added successfully",
                postId:result._id
            });
        });    
})

router.put('/:id', (req, res, next) => {
    const post = new Post({
        _id:req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({ _id: req.params.id }, post).then(result => {
        console.log(result);
        res.status(200).json({ message: 'Update successful!' });
    })
})

router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found!' });
        }
    })
})

router.get('', (req, res, next) => {
    Post.find()
        .then((documents) => {
            res.status(200).json({
                message: "Posts fetched successfullly!",
                posts: documents
            });
        });
});

router.delete('/:id', (req, res, next) => {
    Post.deleteOne({ _id: req.params.id })
        .then((result) => {
            console.log(result);
            res.status(200).json({ message: 'Post deleted successfully!' });
        });
    
})


module.exports = router;