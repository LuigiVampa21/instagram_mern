import { Box, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react'
import FlexBetween from './FlexBetween';
import Friend from './Friend';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import CommentInput from './CommentInput';



const CommentCard = ({ comment, currentUser, onDeleteComment, onEditComment }) => {

    const [isSelf, setIsSelf] = useState(currentUser === comment.user._id);
    const [isEditting, setIsEditting] = useState(false);
    const { palette } = useTheme();
    const main = palette.neutral.main;
    

    const handleEditComment = (content) => { 
        setIsEditting(false);
        onEditComment(comment._id, content);
    };

    const handleDeleteComment = () => {
        onDeleteComment(comment._id)
    };

    return (
        <>
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
                        {!isEditting && comment.content}
                    </Typography>
                </Box>
                {isSelf && !isEditting && <Box>
                    <EditIcon onClick={() => { setIsEditting(true) }} />
                    &nbsp;
                    <CancelIcon onClick={handleDeleteComment} />
                </Box>}
            </FlexBetween>
            {isEditting && <CommentInput value={comment.content} mt="0rem" onCancelComment={() => setIsEditting(false)} onSendComment={handleEditComment} />}
        </>
    )
}

export default CommentCard