import React from 'react';
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
  // const {username}=getalldata?.findusername;
  const navigate=useNavigate();
  const dispatch=useDispatch();


  const logoutfun=()=>{
   console.log(getalldata)

   dispatch(addtutordata(''))
   swal({
    title: "Logged out!",
    text: "Please visit again!",
    icon: "success",
    button: "OK",
  });
  
  navigate('/')

  }
  return (
    <>
     <div className='navbar'>
        <div className='navbar_logo'>
                <img className='navbar_logoimg' src={LogoHeader} alt='logo'/>
        </div>



        <div className='navbar_search'>
            <div className='navbar_searchinner'>
                <div className='navbar_outersearchicon'>
                <SearchIcon style={{height:"40px", width:"36.6px"}} className='navbar_searchicon'/>

                </div>
                <input type='text' placeholder='Search anything' className='navbar_searchbody'/>

            </div>
        </div>
        
    



        <div className='navbar_ending'>
            <NavLink to='/mylearning' style={{ textDecoration: 'none',cursor:'pointer',color:'black'}}>My Learning</NavLink>
            <NavLink to='/learning' style={{ textDecoration: 'none',cursor:'pointer',color:'black'}}>Instructor</NavLink>
           <Link to='/cart'>
           <IconButton>
            <Badge badgeContent={4} color="primary">
               <ShoppingCartOutlinedIcon color="action" />
            </Badge>
            </IconButton>
           </Link>
           <Link to='/profile'>
           <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
       
      >
        <Avatar alt={getalldata?.findusername?.username? getalldata?.findusername?.username : "U"} onClick={logoutfun}   sx={{ bgcolor: deepOrange[500] }} src="http://graph.facebook.com/{user-id}/picture?type=large" style={{textTransform:"capitalize",cursor:"pointer"}} />
      </StyledBadge>
           </Link>
        </div>
     </div>
     <div className='navbar_underline'></div>



     </>
  );
};

export default Navbar;




// import React from 'react';
// import './Navbar.css';
// import { styled } from '@mui/material/styles';
// import Badge from '@mui/material/Badge';

// import Link from '@mui/material/Link';
// import LogoHeader from '../../assets/navbar_logo.png'
// import SearchIcon from '@mui/icons-material/Search';
// import { IconButton, capitalize } from '@mui/material';
// import Avatar from '@mui/material/Avatar';
// import Stack from '@mui/material/Stack';
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// import { deepOrange } from '@mui/material/colors';
// import { addtutordata, sendtutordata } from '../../app/features/tutorReducer';
// import { useDispatch, useSelector } from 'react-redux';
// import { NavLink, useNavigate } from 'react-router-dom';
// import swal from 'sweetalert';
// const StyledBadge = styled(Badge)(({ theme }) => ({
//     '& .MuiBadge-badge': {
//       backgroundColor: '#44b700',
//       color: '#44b700',
//       boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//       '&::after': {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         borderRadius: '50%',
//         animation: 'ripple 1.2s infinite ease-in-out',
//         border: '1px solid currentColor',
//         content: '""',
//       },
//     },
//     '@keyframes ripple': {
//       '0%': {
//         transform: 'scale(.8)',
//         opacity: 1,
//       },
//       '100%': {
//         transform: 'scale(2.4)',
//         opacity: 0,
//       },
//     },
//   }));
  
//   const SmallAvatar = styled(Avatar)(({ theme }) => ({
//     width: 22,
//     height: 22,
//     border: `2px solid ${theme.palette.background.paper}`,
//   }));
// const Navbar = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();

//   const handleSearch = async (event) => {
//     event.preventDefault(); // Prevent form submission

//     try {
//       const response = await fetch(
//         `https://www.googleapis.com/youtube/v3/search?key=YOUR_API_KEY&q=${searchTerm}&part=snippet&type=video&maxResults=10`
//       );
//       const data = await response.json();
//       const videos = data.items;

//       navigate('/video-list', { state: { videos } });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <>
//       <div className='navbar'>
//         {/* Existing JSX code */}
//         <div className='navbar_search'>
//           <form onSubmit={handleSearch}>
//             <div className='navbar_searchinner'>
//               <div className='navbar_outersearchicon'>
//                 <SearchIcon style={{ height: '40px', width: '36.6px' }} className='navbar_searchicon' />
//               </div>
//               <input
//                 type='text'
//                 placeholder='Search anything'
//                 className='navbar_searchbody'
//                 value={searchTerm}
//                 onChange={handleChange}
//               />
//             </div>
//           </form>
//         </div>
//         {/* Remaining JSX code */}
//       </div>
//       <div className='navbar_underline'></div>
//     </>
//   );
// };

// export default Navbar;

