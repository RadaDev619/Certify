const jwt = require('jsonwebtoken');
const User = require('../model/user');

// const userAuth = async(req, res, next) =>{
//     try{
//         const {cookies} = req; 
//         var token = ""

//         // checking token 
//         if('session_id' in cookies){
//              token = cookies.session_id
//         }else{
//              return res.status(401).send("Please Authenticate the user")
//         }     
        
//         const decoded = jwt.verify(token,process.env.TOKEN_SIGNATURE)
//         console.log("decoded:", decoded)
//         const user = await User.findOne({_id:decoded._id,"tokens.token":token})
//         console.log("User:", user)

//         if (!user) {
//              return res.status(401).send({error:"Please Authenticate."})
//         }else{
//              req.token = token
//              req.user = user
//              next()
//         }

//    }catch(e) {
//         res.status(401).send({error:"Please Authenticate."})
//    }
// }
const userAuth = async (req, res, next) => {
     try {
       const { cookies } = req;
       let token = "";
   
       // Checking for the session ID in cookies
       if ('session_id' in cookies) {
         token = cookies.session_id;
       } else {
         return res.status(401).send({ error: "Please Authenticate." });
       }
   
       // Verifying the token
       const decoded = jwt.verify(token, process.env.TOKEN_SIGNATURE);
   
       // Finding the user based on decoded ID and token
       const user = await User.findOne({ _id: decoded._id, "tokens.token": token });
   
       if (!user) {
         return res.status(401).send({ error: "Please Authenticate properly." });
       } else {
         req.token = token;
         req.user = user;
         next();
       }
     } catch (e) {
       res.status(401).send({ error: "Please Authenticate nicely." });
     }
   }
   
module.exports =  {userAuth};