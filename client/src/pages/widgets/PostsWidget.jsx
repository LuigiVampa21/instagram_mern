import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostWidget from "./PostWidget";
import { getFeedPosts, _getUserPosts } from "state/post-actions";

const PostsWidget = ({ userID, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = () => {
    dispatch(getFeedPosts(token));
  };

  const getUserPosts = () => {
    dispatch(_getUserPosts(userID, token))
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.length > 0 && posts.map(
        // ({
        //   _id,
        //   userID,
        //   firstName,
        //   lastName,
        //   description,
        //   location,
        //   picturePath,
        //   userPicturePath,
        //   likes,
        //   comments,
        // })
         (post, index) => (
          <PostWidget
            key={index}
            post={post}
            // postId={post._id}
            // postUserId={post.user.id}
            // name={`${post.user.firstName} ${post.user.lastName}`}
            // description={post.description}
            // location={post.location}
            // picturePath={post.picturePath}
            // userPicturePath={post.user.picturePath}
            // likes={post.likes}
            // comments={post.comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;