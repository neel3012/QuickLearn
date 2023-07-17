const {mongoose}=require('mongoose');
const paymentSchema = new mongoose.Schema({
   
    token: {
      type: String,
      required: true,
      
      
  },
  courseID: {
      type: String,
      required: true
  },
  studentName: {
      type: String,
      required: false
  },    
  });

  const Payment = mongoose.model('Payment', paymentSchema);
  module.exports=Payment;