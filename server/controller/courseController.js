const Course = require("../model/course.js");

exports.addnewcoursehere = async (req, res) => {
    try {
      const coursedetail = req.body;
      const course = new Course(coursedetail);
      await course.save();
      res.status(201).json({ successmsg: 'Course added successfully' });
    } catch (err) {
      console.error('Error occurred while adding course:', err);
      res.status(500).json({ error: 'An error occurred while adding the course' });
    }
  };
exports.showcourses=async(req,res)=>{
    try{
        const {addedBy}=req.query;
        const courses = await Course.find({ addedBy }).sort({ createdDate: -1 });
        // const courses=await Course.find({addedBy});
        res.status(200).json(courses);
        
    }
    catch(err){
        return res.status(404).json({"msg":"error occure in showing courses page"})
        console.log('eror in showing course data');
    }
}