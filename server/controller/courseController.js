const Course = require("../model/course");

exports.addnewcoursehere=async(req,res)=>{
    try{
       
        
        const coursedetail={ addedBy: req.body.addedBy, email: req.body.email, password: req.body.password,subname:req.body.subname}

          const course = new Course(coursedetail);
    
          await course.save();
          return res.status(201).json({"successmsg":"course added successfully"});
        
    }
    catch(err){
        return res.status(404).json({"msg":"error occure in course addition"});
    }
}
exports.showcourses=async(req,res)=>{
    try{
        const {addedBy}=req.query;
        const courses=await Course.find({addedBy});
        res.status(200).json(courses);
        
    }
    catch(err){
        return res.status(404).json({"msg":"error occure in showing courses page"})
        console.log('eror in showing course data');
    }
}