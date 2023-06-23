const jwt=require('jsonwebtoken');
const Tutor = require('../model/tutorregistrationSchema');

const Authenticate=async (req,res,next)=>{
    try{
        const token=req.cookies.jwttokentutor;
        console.log(token)
        const verifyToken=jwt.verify(token,'generatedsecretkeybyneelpatel');
        const rootUser=await Tutor.findOne({_id:verifyToken._id,"tokens.token":token});
        console.log(rootUser)
        if(!rootUser){throw new Error('user not found')}
        req.token=token;
        req.rootUser=rootUser;
        req.userID=rootUser._id;
        // console.log('helllo auth')
        next();
    }
    catch(err){
        res.status(401).send('unauthorized');
        console.log('unauthorized');
    }
}
module.exports=Authenticate