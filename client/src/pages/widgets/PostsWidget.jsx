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
         (post, index) => (
          <PostWidget
            key={index}
            post={post}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;