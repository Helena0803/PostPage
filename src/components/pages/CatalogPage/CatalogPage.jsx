import { useContext } from "react";
import { PostContext } from "../../Context/postContext";
import { UserContext } from "../../Context/userContext";
import { PostList } from "../../PostList/PostList";
import { getIssuees } from "../../utils/utils";
import "./style.css";

export const CatalogPage = () => {
  const { posts, handlePostLike } = useContext(PostContext);
  const { searchQuery } = useContext(UserContext);
  return (
    <>
      {searchQuery && (
        <p>
          По запросу {searchQuery} найдено {posts?.length}{" "}
          {getIssuees(posts?.length)}
        </p>
      )}
      <div className="sort-post"></div>
      <PostList onPostLike={handlePostLike} />
    </>
  );
};
