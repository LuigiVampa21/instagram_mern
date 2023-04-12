import React, { useState } from 'react'
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from './Form.jsx';


const AuthPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const [pageType, setPageType] = useState("Register");
  const onChangeType = () => {
    const newType = pageType === "login" ? "register" : "login"
    setPageType(newType);
  }
  return (
    <Box>
      <Box width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center">
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
        >
          Instagram
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          {pageType === "login" ? "Register" : "Login"}
        </Typography>
        <Form onChangeType={onChangeType}/>
      </Box>
    </Box>
  )
}

export default AuthPage