import '../becomeinstructor/Joinasteacher.css'
import React,{useState,useEffect, useRef} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import 'animate.css';
import {  useDispatch } from 'react-redux'
import './Joinasstudent.css'
import swal from 'sweetalert'
import { addtutordata, isTutorAuthenticated } from '../../../app/features/tutorReducer';
import { addstudentdata, isStudentAuthenticated } from '../../../app/features/studentReducer';
function Joinasstudent() {
    const [showSignIn, setShowSignIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username,setUsername]=useState('');
    const [openpop,setopenpop]=useState(true);
    const [successmsg,showsuccessmsg]=useState(null);
    const [tutorinndata,setTutorinndata]=useState({});
    const formRef = useRef(null);
    const dispatch=useDispatch();
    const navigate=useNavigate();
  
    const handleSubmit = async (event) => {  //handling register
        event.preventDefault();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          swal("Invalid Email", "Please provide a valid email address.", "error");
          return;
        }
      
        // Password strength validation using regular expression
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(password)) {
          swal(
            "Weak Password",
            "Password should contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character (@ $ ! % * ? &).",
            "error"
          );
          return;
        }
      
        const data={
          username,
          password,
          email
        }
        console.log(data)
        const res=await fetch('http://localhost:5000/joinasstudent',
        {
          method:'POST',
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(data)
        })
        const studentdata=await res.json();
        console.log(studentdata)
        if(studentdata.status===422 ||studentdata.status===400 || !studentdata ||studentdata.msg){
          
          swal("Invalid Registration","Please check provided all info and try later!","error")
           
        
        }
        else{
         
          swal("Register successfully","success")
         
          setEmail('');
        setPassword('');
        setUsername('');
          setopenpop(false)
        }
       
      }

     
      const handleLogin = async (e) => {
        e.preventDefault();
        const data = {
          email,
          password,
        };
        const res=await fetch('http://localhost:5000/studentlogin',{
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        
        const studentdata=await res.json();
        console.log(studentdata);
        if(studentdata.status===422 ||studentdata.status===400 || !studentdata ||studentdata.msg){
          // window.alert()
          swal(studentdata.msg,"please provide right credetials...","info");
        }
        else{
          swal("Logged in successfull","Purchase and take advantage of courses!","success")
          setEmail('');
        setPassword('');
        
        dispatch(isStudentAuthenticated(res.data)); // Pass the token data as the payload
            dispatch(addstudentdata(studentdata)); 
            // setTutorinndata(res.data);
        
        navigate('/showavailablecourses');
        }
    
        
      };
      
      //for pop up functionality within same elemnt
      const signinclickhandle=()=>{
        setopenpop(false)
      }
      const signupclickhandle=()=>{
        setopenpop(true);
      }
        
  return (
    <div className='joinstudent'>
       { openpop ? (
                <div className="animate_animated animate__shakeX sign-in-form inform ">
    
    
    <form onSubmit={handleSubmit} method='POST'>
      <h1 className='h1_loggedstudenr'>Create Account</h1>
<br/>
      <label>
        Email:
        <input
          name="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required />
      </label>
      
      <label>
        Password:
        <input
          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required />
      </label>

      <label>
        Name:
        <input
          name="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required />
      </label>

      

     
      <button>Submit</button>
      <br/>
      <p>Already have an account <button onClick={signinclickhandle}>Sign in</button></p>
    </form>
  

  </div>
            ):  (
                <div className="animate_animated animate__shakeX sign-in-form ">
    
    
    <form onSubmit={handleLogin} method='POST'>
      <h1 className='h1_loggedstudenr'>Login Account</h1>
<br/>
      <label>
        Email:
        <input
          name="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required />
      </label>
      
      <label>
        Password:
        <input
          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required />
      </label>

      

      

     
      <button>SignIn</button>
      <br/>
      <p>create one! <button onClick={signupclickhandle}>Register</button></p>
    </form>
       

  </div>
            )}

        </div>
  )
}

export default Joinasstudent