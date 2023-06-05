const {mongoose}=require('mongoose');
const tutorregistrationSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    }
  });
  const Tutor = mongoose.model('Tutor', tutorregistrationSchema);
  module.exports=Tutor