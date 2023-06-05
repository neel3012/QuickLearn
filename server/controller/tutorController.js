const Tutor = require('../model/tutorregistrationSchema.js');

const bcrypt=require('bcrypt')

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
    res.status(400).json({ "message": "error in tutor signup" });
  }
};
