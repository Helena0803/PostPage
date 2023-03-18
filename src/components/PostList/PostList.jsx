import { useContext } from "react";
import { PostContext } from "../Context/postContext";
import { UserContext } from "../Context/userContext";
import { Post } from "../Post/Post";
import "./index.css";

export const PostList = () => {
  const { posts, handlePostLike } = useContext(PostContext);
  const { setParentCounter } = useContext(UserContext);

  return (
    <div className="post">
      {posts?.map((item) => {
        return (
          <Post
            key={item._id}
            product={item}
            onPostLike={handlePostLike}
            setParentCounter={setParentCounter}
            {...item}
          />
        );
      })}
    </div>
  );
};
