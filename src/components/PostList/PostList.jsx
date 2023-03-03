import { useContext } from "react";
import { PostContext } from "../Context/postContext";
import { Post } from "../Post/Post";
import "./index.css";

export const PostList = () => {
  const { posts, handlePostLike } = useContext(PostContext);
  return (
    <div className="post">
      {posts.map((item) => {
        return (
          <Post
            key={item._id}
            product={item}
            onPostLike={handlePostLike}
            {...item}
          />
        );
      })}
    </div>
  );
};
