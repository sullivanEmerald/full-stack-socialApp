const cloudinary =  require('../middleware/cloudinary')
 const Posts = require('../model/Posts')
 

module.exports = {
    createPost : async (req, res) => {
        try {
            console.log(req.user)
            // upload imgae cloudinary
            const result = await cloudinary.uploader.upload(req.file.path)

            await Posts.create({
                title:req.body.title,
                image : result.secure_url,
                cloudinaryId : result.public_id,
                caption : req.body.caption,
                likes : 0,
                user : req.user.id
            })
            console.log('post added to the database')
            res.redirect('/profile')
        } catch (error) {
            console.log(error)
        }
    },

    getProfile : async (req, res) =>{
        try {
          const post = await Posts.find({ user : req.user.id}).lean()
          res.render('profile', { post : post, user : req.user})  
        } catch (error) {
            console.log(error)
        }
    },

    findOne : async (req, res) =>{
        try {
            const singlePost =  await Posts.findById(req.params.id)
            res.render('post', { singlePost : singlePost , user : req.user})
        } catch (error) {
            console.error(error)
        }
    },

    getFeed: async (req, res) => {
        try {
            const feed =  await Posts.find().lean()
            res.render('feed', {feed : feed, user : req.user})
        } catch (error) {
            console.error(error)
        }
    },

    updateOne: async(req, res) => {
        console.log(req.params.id)
        try {
            await Posts.findOneAndUpdate(
                { _id : req.params.id}, {
                $inc : {
                    likes : 1
                }
            }
            );
            console.log('like. updated')
            res.redirect(`/post/${req.params.id}`)
        } catch (error) {
            console.error(error)
        }
    },

    deleteOne : async (req, res) => {
        try {
            let post = await Posts.findById({ _id : req.params.id})

            // delete from cloudinary
            await cloudinary.uploader.destroy(post.cloudinaryId)

            await Posts.remove({ _id: req.params.id });
            console.log('deleted')
            res.redirect('/profile')
        } catch (error) {
            console.log(error)
        }
    }
        
}