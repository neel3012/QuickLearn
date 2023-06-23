import React,{useState} from 'react'
import {useSelector} from 'react-redux';
import {sendtutordata} from '../../app/features/tutorReducer'
import { useNavigate } from 'react-router-dom';
export default function Addcoursehere() {
  const gettutordata=useSelector(sendtutordata);
  const navigate=useNavigate()

  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [subname,setSubname]=useState('');
    // const [username,setUsername]=useState(gettutordata.findusername.username);
    
    //console.log('insider',gettutordata.findusername.username)
  const data={
    addedBy:gettutordata.findusername.username,
    password,
    email,
    subname

  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    
    const res=await fetch('http://localhost:5000/addnewcourse',{
      method:'POST',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(data)
    })
    const coursedata=await res.json();
    navigate('/addcourses');
    console.log(coursedata)
  }
  return (
    <>
     <form onSubmit={handleSubmit} method='POST'>
      <h1>add course</h1>
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
          type="text"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required />
      </label>

      <label>
        Name:
        <input
          name="subname"
          type="text"
          value={subname}
          onChange={e => setSubname(e.target.value)}
          required />
      </label>

      

     
      <button>Submit</button>
      </form>
      </>
  )
}
