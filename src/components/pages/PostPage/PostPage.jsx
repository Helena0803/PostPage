import { useParams } from "react-router-dom";
import { PostCard } from "../../PostCard/PostCard";

export const PostPage = () => {
  const id = useParams();

  return <PostCard id={id.postId} />;
};
