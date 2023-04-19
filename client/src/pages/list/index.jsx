import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import Friend from 'components/Friend'
import WidgetWrapper from 'components/WidgetWrapper'
import NavBar from 'pages/navBar'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserList } from 'state/search-actions'


const UserList = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.searchArray);
    const token = useSelector(state => state.token);
    const theme = useTheme();
    const { palette } = theme;
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const handleSearch = value => {
        dispatch(getUserList(value, token))
      }

    return (
        <Box>
            <NavBar onSearch={handleSearch}/>
            <Box
                width="100%"
                padding="2rem"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="center"
            >
                <WidgetWrapper width="100vh">
                    <Typography
                        color={palette.neutral.dark}
                        variant="h5"
                        fontWeight="500"
                        sx={{ mb: "1.5rem" }}
                    >
                        User List
                    </Typography>
                    {users?.length > 0 && <Box display="flex" flexDirection="column" gap="1.5rem">
                        {users?.map((user, i) => (
                            <Friend
                                key={i}
                                friendID={user._id}
                                name={`${user.firstName} ${user.lastName}`}
                                subtitle={user.occupation}
                                userPicturePath={user.picturePath}
                            />
                        ))}
                    </Box>}

                    {users?.length === 0 &&
                        <Box
                            width="100%"
                            padding="2rem"
                            display={isNonMobileScreens ? "flex" : "block"}
                            gap="0.5rem"
                            justifyContent="center"
                        >
                            <p>No users found</p>
                        </Box>
                    }
                </WidgetWrapper>
            </Box>
        </Box>
    )
}

export default UserList