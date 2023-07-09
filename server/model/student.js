const {mongoose}=require('mongoose');
const jwt=require('jsonwebtoken');
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
    },
    tokens:[{
        token:{ type: String,
          required: true,}
      }]
  });
  tutorregistrationSchema.methods.generateAuthtoken= async function(){
    try{
          let token=await jwt.sign({_id:this._id},'generatedsecretkeybyneelpatel');
          this.tokens=this.tokens.concat({token:token});
         await this.save();
         return token;
    }
    catch(err){
      console.log('error generate in token creation',err);
    }
  }
  const Student = mongoose.model('Student', tutorregistrationSchema);
  module.exports=Student