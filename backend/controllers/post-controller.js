const mongoose = require('mongoose');

const Posts = mongoose.model("Post");

exports.findPostsByUserId = (req, res, next) => {
    Posts.find({}, (err, posts) => {
        if(!err) {
            res.send(posts);
        }
    })
}

exports.addPost = (req, res, next) => {
    const newPost = new Posts({
        userId: req.body.userId,
        username: req.body.username,
        content: req.body.content,
        timestamp: new Date()
    })


    console.log("New post: ");
    console.log(newPost);

    newPost.save((err) => {
        if(err){
            console.log(err)
            return res.send({success: false});
            
        }
        else{
            return res.send({success: true});
        }
    })
}

exports.deleteById = (req, res, next) => {
    console.log(req.body)

    Posts.findOneAndDelete({ _id: req.body.id }, (err, post) => {
      if (!err && post) {
        return res.send({success: true});
      }
      else {
        console.log(post)
        return res.send({success: false});
      }
    })
}

exports.updateById = (req, res, next) => {
    console.log(req.body)

    Posts.findOneAndUpdate({ _id: req.body.id }, {$set: {content: req.body.newContent}}, (err, post) => {
      if (!err && post) {
        return res.send({success: true});
      }
      else {
        console.log(post)
        return res.send({success: false});
      }
    })
}


