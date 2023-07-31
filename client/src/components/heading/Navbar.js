


import React,{useState} from 'react';
import './Navbar.css';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

import Link from '@mui/material/Link';
import LogoHeader from '../../assets/navbar_logo.png'
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, capitalize } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { deepOrange } from '@mui/material/colors';
import { addtutordata, sendtutordata } from '../../app/features/tutorReducer';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { addstudentdata, sendStudentdata } from '../../app/features/studentReducer';


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  }, 
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const Navbar = () => {
  const getalldata = useSelector(sendtutordata);  //this data come from redux store about tutor...
  const getstudentdata=useSelector(sendStudentdata);
  // const {username}=getalldata?.findusername;
  const navigate=useNavigate();
  const dispatch=useDispatch();


  const logoutfun=async ()=>{
   console.log(getalldata)
   if(getalldata?.findusername){
    dispatch(addtutordata(''))
   }
   else if(getstudentdata?.findusername){
    dispatch(addstudentdata(''))
   }
   
  
  navigate('/')
 
  
    // window.location.reload()
  await swal({
    title: "Logged out!",
    text: "Please visit again!",
    icon: "success",
    button: "OK",
  });
  }
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchQuery)
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };
  const loggedInUser = getalldata.findusername || getstudentdata.findusername;
  return (
    <>
     <div className='navbar'>
        <div className='navbar_logo'>
                <img className='navbar_logoimg' src={LogoHeader} alt='logo'/>
        </div>



      
          <form onSubmit={handleSearch} className="navbar_search">
            <div className="navbar_searchinner">
              <div className="navbar_outersearchicon">
              <SearchIcon style={{height:"40px", width:"36.6px"}} className='navbar_searchicon'/>
              </div>
              <input
                type="text"
                placeholder="Search any course"
                className="navbar_searchbody"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" style={{ display: 'none' }}></button>
            </div>
          </form>
        
    



        <div className='navbar_ending'>
            <NavLink to='/purchasedCourses' style={{ textDecoration: 'none',cursor:'pointer',color:'black'}}>My Learning</NavLink>
            <NavLink to='/showavailablecourses' style={{ textDecoration: 'none',cursor:'pointer',color:'black'}}>Student</NavLink>
           
           <NavLink to='/about' style={{ textDecoration: 'none',cursor:'pointer',color:'black'}}>About us</NavLink>

        
           <Link to='/profile'>
           <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
       
      >
        <Avatar alt={(loggedInUser?.username )? loggedInUser?.username : 'U'} onClick={logoutfun}   sx={{ bgcolor: deepOrange[500] }} src="http://graph.facebook.com/{user-id}/picture?type=large" style={{textTransform:"capitalize",cursor:"pointer"}} />
      </StyledBadge>
           </Link>
        </div>
     </div>
     <div className='navbar_underline'></div>



     </>
  );
};

export default Navbar;




