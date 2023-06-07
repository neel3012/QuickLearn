const Tutor = require('../model/tutorregistrationSchema.js');
const Token=require('../model/token.js');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

exports.registerTutor = async (req, res) => {
  try {
    // const {username,email,password}=req.body;
    // Create a new user based on request data
    const hashedpassword =await bcrypt.hash(req.body.password,10);
    const user={ username: req.body.username, email: req.body.email, password: hashedpassword}
    const tutor = new Tutor(user);
    const dbusername=await Tutor.findOne({username:req.body.username});
    if(user.username!==dbusername){
      await tutor.save();
    }
   
    // Save the user to the database
    

    // Return the saved user object as a response
    res.status(201).json({"msg":"tutor added successfully"});
  } catch (error) {
    // Handle error
    res.status(400).json({ "msg": "error in tutor signup" });
  }
};

exports.loginteacher=async (req,res)=>{
 
    // res.status(200).json({"message":"login success"})
  console.log(req.body.email)
    const findusername=await Tutor.findOne({email:req.body.email});
    console.log(findusername)
    if(!findusername){
      return res.status(400).json({"msg":"email id doesn't exist"});
    }
    try{
      let match = await bcrypt.compare(req.body.password, findusername.password);
      if(match){
      const accessToken = jwt.sign(findusername.toJSON(),'mynameisneelpatel', { expiresIn: '15m'});
      const refreshToken = jwt.sign(findusername.toJSON(), 'hereistherefreshrate');
      
      const newToken = new Token({ token: refreshToken });
      await newToken.save();
  
      res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken,email: findusername.email, username: findusername.username,"msg":"you are logged in"});
  
  } else {
      res.status(400).json({ "msg": 'Password does not match' })
  }
  }
  catch(err){
    console.log(err);
  }
}
