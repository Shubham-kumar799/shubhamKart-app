function errorHandler(err , req , res , next){
    // jwt authentication error
    if(err.name == "UnauthorizedError"){
        return res.status(401).send({
            success: false,
            message: "The user is not authorized"
        })
    }

    // validation error
    if(err.name == 'ValidationError'){
       return res.status(401).send({
            success: false,
            message: err
        })
    }

    // INternal server error
    return res.status(500).send({
        success: false,
        message: err,
    })
}


module.exports = errorHandler;
