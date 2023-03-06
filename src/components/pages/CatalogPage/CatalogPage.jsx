import { useContext } from "react";
import { PostContext } from "../../Context/postContext";
import { UserContext } from "../../Context/userContext";
import { PostList } from "../../PostList/PostList";
import { getIssuees } from "../../utils/utils";
import "./style.css";

export const CatalogPage = () => {
  const { posts, handlePostLike } = useContext(PostContext);
  const { searchQuery, setSort } = useContext(UserContext);
  const sortedItems = [
    { id: "Популярные" },
    //самые обсуждаемые будет сортировка после добавления ф-ции комментариев
    { id: "Самые обсуждаемые" },
    { id: "Старые" },
    { id: "Новые" },
  ];
  return (
    <>
      {searchQuery && (
        <p>
          По запросу {searchQuery} найдено {posts?.length}{" "}
          {getIssuees(posts?.length)}
        </p>
      )}
      <div className="sort-post">
        {sortedItems.map((e) => (
          <span key={e.id} className="sort-item" onClick={() => setSort(e.id)}>
            {e.id}
          </span>
        ))}
      </div>
      <PostList onPostLike={handlePostLike} />
    </>
  );
};
