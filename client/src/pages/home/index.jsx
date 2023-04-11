import { Box } from '@mui/material';
import NavBar from 'pages/navBar';
import UserWidget from 'pages/widgets/UserWidget';
import React from 'react'


const HomePage = () => {
  return (
    <Box>
      <NavBar />
      <UserWidget />
    </Box>
  )
}

export default HomePage;