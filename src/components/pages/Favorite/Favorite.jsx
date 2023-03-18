import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../../Context/postContext";
import { PostList } from "../../PostList/PostList";
import "./index.css";

export const Favorite = () => {
  const { favorite } = useContext(PostContext);
  const navigate = useNavigate();

  return (
    <div className="favorite">
      <span className="favorite__back" onClick={() => navigate(-1)}>
        {"< "}Назад
      </span>
      <h1>Избранное</h1>
      {!!favorite.length ? (
        <PostList posts={favorite} />
      ) : (
        <div className="not-found">Вы еще ничего не добавили в избранное</div>
      )}
    </div>
  );
};
