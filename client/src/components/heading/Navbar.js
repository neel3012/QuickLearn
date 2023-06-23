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
import { sendtutordata } from '../../app/features/tutorReducer';
import { useSelector } from 'react-redux';


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
            <Link to='/' style={{ textDecoration: 'none',color:'black'}}>My Learning</Link>
            <Link to='/learning' style={{ textDecoration: 'none',color:'black'}}>Instructor</Link>
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
        <Avatar alt={getalldata?.findusername?.username? getalldata?.findusername?.username : "N"}  sx={{ bgcolor: deepOrange[500] }} src="/static/images/avatar/1.jpg" style={{textTransform:"capitalize"}} />
      </StyledBadge>
           </Link>
        </div>
     </div>
     <div className='navbar_underline'></div>
     </>
  );
};

export default Navbar;
