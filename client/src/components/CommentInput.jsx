import React, { useState } from 'react'
import UserImage from './UserImage'
import FlexBetween from './FlexBetween'
import { Box, IconButton, InputBase, useTheme } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';




const CommentInput = ({ picturePath, onCancelComment, onSendComment, mt="0.5rem", value="" }) => {

    const [comment, setComment] = useState(value);
    const { palette } = useTheme();

    const handlePostComment = () => {
        onSendComment(comment);
        setComment("");
    }

    const handleCancelComment = () => {
        onCancelComment();
    }

    return (
        <FlexBetween gap="1.5rem" mt={mt} mb="0.7rem" >
            {picturePath && <UserImage image={picturePath} size={"20px"} />}
            <InputBase
                placeholder="What's on your mind..."
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                sx={{
                    width: "100%",
                    backgroundColor: palette.neutral.light,
                    borderRadius: "2rem",
                    padding: ".1rem .5rem",
                    fontSize: "10px"
                }}
            />
            <Box>
                <FlexBetween>
                    <IconButton disabled={!comment} onClick={handlePostComment} >
                        <SendIcon style={{ fontSize: 15 }} />
                    </IconButton>
                    &nbsp; &nbsp;
                    <IconButton onClick={handleCancelComment}>
                        <CancelIcon style={{ fontSize: 15 }} />
                    </IconButton>
                </FlexBetween>
            </Box>
        </FlexBetween>
    )
}

export default CommentInput