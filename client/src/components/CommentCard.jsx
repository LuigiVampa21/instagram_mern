import { Box, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react'
import FlexBetween from './FlexBetween';
import Friend from './Friend';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';


const CommentCard = ({ comment, currentUser }) => {

    const [isSelf, setIsSelf] = useState(currentUser === comment.user._id);
    const { palette } = useTheme();
    const main = palette.neutral.main;

    console.log(isSelf);
    console.log(comment.user._id);

    const handleEditComment = () => { };
    const handleDeleteComment = () => { };

    return (
        <FlexBetween mt=".5rem">
            <Box>
                <Friend
                    friendID={comment.user._id}
                    name={comment.user.firstName}
                    subtitle={""}
                    userPicturePath={comment.user.picturePath}
                    size={"15px"}
                />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                    {comment.content}
                </Typography>
            </Box>
            {isSelf && <Box>
                <EditIcon onClick={handleEditComment}  />
                &nbsp;
                <CancelIcon onClick={handleDeleteComment} />
            </Box>}
        </FlexBetween>
    )
}

export default CommentCard