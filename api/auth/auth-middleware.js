const { JWT_SECRET} = require('../secrets/index')
const User = require('../users/users-model')
const jwt = require('jsonwebtoken')

const restricted = (req, res, next) =>{
    const token = req.headers.authorization
    if(!token){
      return  next({status:401, message: "token required"})
    }
    jwt.verify(token, JWT_SECRET, (err, decodedToken)=>{
      if(err){
        next({status: 401, message: "token invalid"})
      } else{
          req.decodedToken = decodedToken
          next()
      }
    })
}
const checkUsernameExists = async (req, res, next) => {
    try{
       const [user] = await User.findBy({username: req.body.username})

       if(!user){
        next({status: 401, message: "Invalid credentials"})
       } else{
        req.user = user
        next()
       }

    }
    catch(err){
        next(err)
    }
    }



const userNamePasswordExists = (req, res, next) =>{
    let {username, password} = req.body
    if(!username || !password){
        next({status:401, message: "username and password required"})
    } else{

        next()
    }

}

const userNameTaken = async (req, res, next) =>{
    try{
       const users = await User.find()
        users.forEach(user =>{
           if(req.body.username === user.username){
          return  next({status:401, message: "username taken"})
           } else{
            req.user = user
           }
        })

         next()
    }
    catch(err){
        next(err)
    }

}



module.exports = {
    restricted,
    userNamePasswordExists,
    userNameTaken,
    checkUsernameExists
}
