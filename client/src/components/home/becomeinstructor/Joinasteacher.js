import React,{useState,useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import './Joinasteacher.css'
import inst from '././../../../assets/innn.jpeg'
import 'animate.css';
function Joinasteacher() {
    const [showSignIn, setShowSignIn] = useState(false);
    const formRef = useRef(null);
  
    useEffect(() => {
      window.addEventListener('click', handleClickOutsideForm);
  
      return () => {
        window.removeEventListener('click', handleClickOutsideForm);
      };
    }, []);
  
    const handleClickOutsideForm = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowSignIn(false);
      }
    };



    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username,setUsername]=useState('');
  const [openpop,setopenpop]=useState(true);

  //to handle signup
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`
      Email: ${email}
      Password: ${password}
      username:${username}
      
    `);
  }

  //to handle login
  const handleLogin=(e)=>{
    e.preventDefault();
    console.log(`Email: ${email}
    Password: ${password}`)
  }

  //for pop up functionality within same elemnt
  const signinclickhandle=()=>{
    setopenpop(false)
  }
  const signupclickhandle=()=>{
    setopenpop(true);
  }
    // const [showSignIn, setShowSignIn] = useState(false)
  return (
    <div className='jointutor'>
        <div className='jointutor_herobanner'>


            <div className='jointutor_maintext '>
                <div className='jointutor_insidetext'>
                    <h1>Join teach</h1>
                    <h1>with us!</h1>
                </div>
                <div className='jointutor_insidetext2'>
                    <p>Proudly change your and</p>
                    <p>others lives- QuickLearn</p>
                </div>
                <div className='jointutor_insidetext3'>
                   <button onClick={() => setShowSignIn(true)} className='teacher_button'>Get started</button> 
                </div>
                

            </div>
            <div className='jointutor_sidepic'>
                <img src={inst} alt='tutorpic' className='jointutor_img'/>
            </div>
        </div>

        {showSignIn && (
            (openpop ? (
                <div className="animate_animated animate__shakeX sign-in-form ">
    
    
    <form onSubmit={handleSubmit}>
      <h1>Create Account</h1>
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
      <p>Aready have an account <button onClick={signinclickhandle}>Sign in</button></p>
    </form>
  

  </div>
            ):  (
                <div className="animate_animated animate__shakeX sign-in-form ">
    
    
    <form onSubmit={handleLogin}>
      <h1>Login Account</h1>
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
            ))
  
)}
        
    </div>
  )
}

export default Joinasteacher