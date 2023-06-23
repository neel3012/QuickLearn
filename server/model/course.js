const {mongoose}=require('mongoose');
const courseSchema = new mongoose.Schema({
    addedBy: {
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
    subname:{
      type:String,
      required:true
    }
    
  });
//   tutorregistrationSchema.methods.generateAuthtoken= async function(){
//     try{
//           let token=await jwt.sign({_id:this._id},'generatedsecretkeybyneelpatel');
//           this.tokens=this.tokens.concat({token:token});
//          await this.save();
//          return token;
//     }
//     catch(err){
//       console.log('error generate in token creation',err);
//     }
//   }
  const Course = mongoose.model('Course', courseSchema);
  module.exports=Course