const Post = require('../models/news-model')
const userSchema = require('../models/user-model')


createPost = (req, res) => {   
    const body = req.body
    const content = req.body.content;

   const userId = body._id;

   userSchema.findById(userId, function (err, foundUser) {
       if (err) {
           console.log(err);
       } else {
           if (foundUser) {
               
               const post = new Post({content:body.content});
               post.save(function () {
                   userSchema.findOne({
                       _id: userId
                   }, function (err, foundUser) {
                       foundUser.quotes.push(post);
                       foundUser.save();
                       console.log(post, foundUser)
//                       res.redirect("/secrets");
                   });

               })
           }
       }
   });

        
}

                deletePost = async (req, res) => {
                    await Post.findOneAndDelete({
                        _id: req.params.id
                    }, (err, post) => {
                        if (err) {
                            return res.status(400).json({
                                success: false,
                                error: err
                            })
                        }

                        if (!post) {
                            return res
                                .status(404)
                                .json({
                                    success: false,
                                    error: `Post erased successfully`
                                })
                        }

                        return res.status(200).json({
                            success: true,
                            data: post
                        })
                    }).catch(err => console.log(err))
                }



                getPostById = async (req, res) => {
                    await Post.findOne({
                        _id: req.params.id
                    }, (err, post) => {
                        if (err) {
                            return res.status(400).json({
                                success: false,
                                error: err
                            })
                        }

                        if (!post) {
                            return res
                                .status(404)
                                .json({
                                    success: false,
                                    error: `Post not found`
                                })
                        }
                        return res.status(200).json({
                            success: true,
                            data: post
                        })
                    }).catch(err => console.log(err))
                }

                getPosts = async (req, res) => {
                    await Post.find({}, (err, posts) => {
                        if (err) {
                            return res.status(400).json({
                                success: false,
                                error: err
                            })
                        }
                        if (!posts.length) {
                            return res
                                .status(404)
                                .json({
                                    success: false,
                                    error: `Post not found`
                                })
                        }
                        return res.status(200).json({
                            success: true,
                            data: posts
                        })
                    }).catch(err => console.log(err))
                }


                module.exports = {
                    createPost,
                    deletePost,
                    getPosts,
                    getPostById,
                }