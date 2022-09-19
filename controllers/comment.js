const Comment =  require('../model/comment')


module.exports = {
    createComment : async (req, res) => {
        try {
            await Comment.create({
                comment : req.body.comment,
                likes : 0,
                post : req.params.id
            });
            console.log('comment added to the comment collection')
            res.redirect("/post/"+req.params.id)
        } catch (error) {
            console.log(error)
        }
    }
}