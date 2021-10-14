const expressJwt = require('express-jwt');


const authJwt = (secret , api = process.env.API_URL) => expressJwt({
secret,
algorithms:['HS256'],
isRevoked: isRevoked
 }).unless({
     path: [
        { url : /\/public\/upload(.*)/ , methods : ['GET' , 'OPTIONS']},
         { url : /\/api\/v1\/products(.*)/ , methods : ['GET' , 'OPTIONS']},
         { url : /\/api\/v1\/categories(.*)/ , methods : ['GET' , 'OPTIONS']},
         `${api}/users/login`,
         `${api}/users/register`,
        
     ]
 })


async function isRevoked(req , payload , done){
    if(!payload.isAdmin){
        done(null, true)
    }
    done();
}

module.exports = authJwt;