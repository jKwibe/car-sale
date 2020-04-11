
exports.indexController = (req, res, next)=>{
    res.status(200).json({
        success: true,
        message: 'You are in Yay!!!'
    })
}