import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { _patchLike } from "state/post-actions";

// import { setPost } from "state";

const PostWidget =
    // (
    // {
    //     postId,
    //     postUserId,
    //     name,
    //     description,
    //     location,
    //     picturePath,
    //     userPicturePath,
    //     likes,
    //     comments,
    // }
    // )
    ({ post }) => {
        const [isComments, setIsComments] = useState(false);
        const dispatch = useDispatch();
        const token = useSelector((state) => state.token);
        const user = useSelector((state) => state.user);
        const [isLiked, setIsLiked] = useState(post.likes.some(like => like == user._id));
        const [likeCount, setLikeCount] = useState(post.likes.length);

        const { palette } = useTheme();
        const main = palette.neutral.main;
        const primary = palette.primary.main;

        const patchLike = async () => {
            if (!isLiked) {
                setIsLiked(true);
                const newCount = likeCount + 1;
                setLikeCount(newCount);
            }
            if (isLiked) {
                setIsLiked(false);
                const newCount = likeCount - 1;
                setLikeCount(newCount);
            }
            dispatch(_patchLike(post._id, user._id, token));
        };

        return (
            <WidgetWrapper m="2rem 0">
                <Friend
                    friendID={post.user._id}
                    name={`${post.user.firstName} ${post.user.lastName}`}
                    subtitle={post.location}
                    userPicturePath={post.user.picturePath}
                    size={"35px"}
                />
                <Typography color={main} sx={{ mt: "1rem" }}>
                    {post.description}
                </Typography>
                {post.picturePath && (
                    <img
                        width="100%"
                        height="auto"
                        alt="post"
                        style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                        src={`${process.env.REACT_APP_STATIC_URL}/${post.picturePath}`}
                    />
                )}
                <FlexBetween mt="0.25rem">
                    <FlexBetween gap="1rem">
                        <FlexBetween gap="0.3rem">
                            <IconButton onClick={patchLike}>
                                {isLiked ? (
                                    <FavoriteOutlined sx={{ color: primary }} />
                                ) : (
                                    <FavoriteBorderOutlined />
                                )}
                            </IconButton>
                            <Typography>{likeCount}</Typography>
                        </FlexBetween>

                        {/* <FlexBetween gap="0.3rem">
                            <IconButton onClick={() => setIsComments(!isComments)}>
                                <ChatBubbleOutlineOutlined />
                            </IconButton>
                            <Typography>{post.comments.length}</Typography>
                        </FlexBetween> */}
                    </FlexBetween>

                    <IconButton>
                        <ShareOutlined />
                    </IconButton>
                </FlexBetween>
                {isComments && (
                    <Box mt="0.5rem">
                        {post.comments.map((comment, i) => (
                            <Box key={i}>
                                <Divider />
                                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                                    {comment}
                                </Typography>
                            </Box>
                        ))}
                        <Divider />
                    </Box>
                )}
            </WidgetWrapper>
        );
    };

export default PostWidget;