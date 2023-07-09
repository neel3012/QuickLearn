const Student = require("../model/student");
const bcrypt=require('bcrypt')

exports.registerstudent=async (req,res)=>{
    try{
        const hashedpassword =await bcrypt.hash(req.body.password,10);

        const user={ username: req.body.username, email: req.body.email, password: hashedpassword}
        const dbusername=await Student.findOne({username:req.body.username});
        if(user.username!==dbusername){
          const student = new Student(user);
    
          await student.save();
          return res.status(201).json({"successmsg":"student added successfully"});
        }
      
    }
    catch(err){
        console.log(err);
        return res.status(404).json({"msg":"error occur in storing student data"});
    }
}
exports.loggedstudentinn=async (req,res)=>{
    try{
        let token;
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
res.setHeader("Access-Control-Allow-Credentials", "true");
    const findusername = await Student.findOne({ email: req.body.email });
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
    }
    catch(err){
        console.log(err);
        return res.status(404).json({"msg":"invalid credentials..."});

    }
}