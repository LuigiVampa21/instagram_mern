import { Box, useMediaQuery } from '@mui/material';
import NavBar from 'pages/navBar';
import MyPostWidget from 'pages/widgets/MyPostWidget';
import PostsWidget from 'pages/widgets/PostsWidget';
import UserWidget from 'pages/widgets/UserWidget';
import FriendListWidget from 'pages/widgets/FriendListWidget';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import AdvertWidget from 'pages/widgets/AdvertWidget';
import UserList from 'pages/list';
import { useNavigate } from 'react-router-dom';





const HomePage = () => {
  const navigate = useNavigate();

  const [isSearching, setIsSearching] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector(state => state.user);
  // const user = useSelector(state => state.user);

  const handleSearch = value => {
    console.log(value);
    setIsSearching(true);
    navigate('/users')
  }

  return (
    <Box>
      <NavBar onSearch={handleSearch} />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userID={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userID={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userID={_id} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default HomePage;