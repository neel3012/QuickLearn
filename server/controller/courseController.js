const Course = require("../model/course.js");
const Payment = require("../model/payment.js");
const Redis = require('ioredis');
const redisClient = new Redis();
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
// exports.showcourses=async(req,res)=>{
//     try{
//         const {addedBy}=req.query;
//         const courses = await Course.find({ addedBy }).sort({ createdDate: -1 });
//         // const courses=await Course.find({addedBy});
//         res.status(200).json(courses);
        
//     }
//     catch(err){
//         return res.status(404).json({"msg":"error occure in showing courses page"})
//         console.log('eror in showing course data');
//     }
// }
exports.showcourses = async (req, res) => {
  try {
    const { addedBy } = req.query;

    // Check if the course data exists in the Redis cache
    const cachedCourses = await redisClient.get(`courses:addedBy:${addedBy}`);
    // console.log('cached data is',cachedCourses);
    if (cachedCourses) {
      const courses = JSON.parse(cachedCourses);
      console.log('cached data',courses);
      return res.status(200).json(courses);
    }

    // If the data is not in the cache, fetch it from the database
    const courses = await Course.find({ addedBy }).sort({ createdDate: -1 });

    // Cache the fetched data in Redis with an expiration time (e.g., 1 hour)
    await redisClient.set(`courses:addedBy:${addedBy}`, JSON.stringify(courses), 'EX', 3600);

    res.status(200).json(courses);
  } catch (err) {
    console.error('Error in showing course data:', err);
    return res.status(404).json({ msg: 'Error occurred in showing courses page' });
  }
};

// exports.getCourseData = async (req, res) => {
//   try {
//     const courseID = req.params.courseID;
//     const course = await Course.findById(courseID);
    
//     if (!course) {
//       return res.status(404).json({ error: 'Course not found' });
//     }
    
//     res.json(course);
//   } catch (error) {
//     console.error('Error getting course data:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
exports.getCourseData = async (req, res) => {
  try {
    const courseID = req.params.courseID;

    // Check if the course data exists in the Redis cache
    const cachedCourse = await redisClient.get(`course:${courseID}`);
    if (cachedCourse) {
      const course = JSON.parse(cachedCourse);
      return res.status(200).json(course);
    }

    // If the data is not in the cache, fetch it from the database
    const course = await Course.findById(courseID);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Cache the fetched data in Redis with an expiration time (e.g., 1 hour)
    await redisClient.set(`course:${courseID}`, JSON.stringify(course), 'EX', 3600);

    res.status(200).json(course);
  } catch (error) {
    console.error('Error getting course data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// exports.getallcourses=async (req, res) => {
//   try {
    
//     const course = await Course.find({});
    
//     if (!course) {
//       return res.status(404).json({ error: 'Course not found' });
//     }
    
//     res.json(course);
//   } catch (error) {
//     console.error('Error getting course data:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
exports.getallcourses = async (req, res) => {
  try {
    // Check if all course data exists in the Redis cache
    const cachedCourses = await redisClient.get(`all_courses`);
    if (cachedCourses) {
      const courses = JSON.parse(cachedCourses);
      return res.status(200).json(courses);
    }

    // If the data is not in the cache, fetch it from the database
    const courses = await Course.find({});

    if (!courses) {
      return res.status(404).json({ error: 'Courses not found' });
    }

    // Cache the fetched data in Redis with an expiration time (e.g., 1 hour)
    await redisClient.set(`all_courses`, JSON.stringify(courses), 'EX', 3600);

    res.status(200).json(courses);
  } catch (error) {
    console.error('Error getting course data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.showcoursesfordetail=async(req,res)=>{
  try {
    const {_id} = req.query;
   
    const course = await Course.findById(_id);
    
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    res.status(200).json(course);
  } catch (error) {
    console.error('Error getting course data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.findpurchasedcoursebyid=async (req, res) => {
  try {
    const courseIDs = await Payment.distinct('courseID');

    if (!courseIDs || courseIDs.length === 0) {
      return res.status(404).json({ error: 'No courses for you...' });
    }

    res.json(courseIDs);
  } catch (error) {
    console.error('Error getting courseIDs:', error);
    res.status(500).json({ error: 'Internal server error in getting purchase courses' });
  }
}
