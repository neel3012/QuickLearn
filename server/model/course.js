const {mongoose}=require('mongoose');
const courseSchema = new mongoose.Schema({
    addedBy: {
      type: String,
      required: true,
      
    },
    title: {
      type: String,
      required: true,
      
      
  },
  description: {
      type: String,
      required: true
  },
  picture: {
      type: String,
      required: false
  },
  drive:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  approximateHours:{
    type:String,
    required:false
  },
  userfile:
    {
      type: String,
      required: false,
    }
  ,
  videoUrl:
  { type: String,
    required: false, },
  createdDate: {
      type: Date,
      default: Date.now,
  }
    
  });

  const Course = mongoose.model('Course', courseSchema);
  module.exports=Course