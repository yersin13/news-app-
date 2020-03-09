const userSchema = require ('../models/user-model')

const Post = require('../models/news-model').schema



createUser = (req, res) => {
    const body = req.body
    
    if(!body) {
        return res.status(400).json ({
            success:false,
            error:'You must provide a valid User',
        })
    }
    
    const user = new userSchema(body)
    
    if(!user){
        return res.status(400).json({ success:false, error: err})
    }
    
    user
        .save()
        .then(() => {
        return res.status(201).json({
            success: true,
            id:user._id,
            message:'User created',
        })
    })
    
        .catch (error => {
        return res.status(400).json ({
            error,
            message:'User Not created',
        })
    })
}






getUserById = async (req, res) => {

    await userSchema.findOne({ _id: req.params.id }, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!post) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: post })
    }).populate('quotes').catch(err => console.log(err))
}


module.exports = {
    createUser,
    getUserById,
 
}

