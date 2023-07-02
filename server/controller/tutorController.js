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
    const dbusername=await Tutor.findOne({username:req.body.username});
    if(user.username!==dbusername){
      const tutor = new Tutor(user);

      await tutor.save();
      return res.status(201).json({"successmsg":"tutor added successfully"});
    }
  
    // Save the user to the database
    

    // Return the saved user object as a response
    
  } catch (error) {
    // Handle error
    res.status(400).json({ "msg": "error in tutor signup" });
  }
};

exports.loginteacher = async (req, res) => {
  try {
    let token;
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
res.setHeader("Access-Control-Allow-Credentials", "true");
    const findusername = await Tutor.findOne({ email: req.body.email });
    if (findusername) {
      const match = await bcrypt.compare(req.body.password, findusername.password);
      token=await findusername.generateAuthtoken();
      res.cookie("jwttokentutor",token,
      {expires:new Date(Date.now()+900000),
        httpOnly:true,
        
      }
      )
 
     if(!match){
        res.status(400).json({"msg":"password doesn't match"})
     }
     else{
      //  res.status(200).json({"successmsg":"login successfull..."})
       res.status(200).json({
             findusername,
            // email: findusername.email,
            // username: findusername.username,
            "successmsg": "Login Successfull...."
          });
     }
   
    }
    else{
      return res.status(400).json({ "msg": "Email ID doesn't exist" });
    }

  
  } catch (err) {
    console.log(err);
    res.status(500).json({ "msg": "Internal server error" });
  }
};
// exports.verifyAccessToken = (req, res, next) => {
//   // Get the access token from the request headers or query parameters
//   const token = req.headers.authorization?.split(' ')[1] || req.query.token;

//   if (!token) {
//     return res.status(401).json({ message: 'Access token is missing' });
//   }

//   try {
//     // Verify the access token
//     const decodedToken = jwt.verify(token, 'your-access-token-secret');

//     // Attach the decoded token to the request object
//     req.user = decodedToken;

//     // Proceed to the next middleware or route handler
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Invalid access token' });
//   }
// };

// exports.courseaddition = async (req, res, next) => {
//   res.status(200).json({ 'msg': 'hello from course addition' });
//   console.log('hello');
//   res.send(req.rootUser);
// };
