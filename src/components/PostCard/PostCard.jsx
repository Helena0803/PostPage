import { ReactComponent as Like } from "./like.svg";
import s from "./index.module.css";
import { api } from "../utils/Api";
import { ReactComponent as Save } from "./save.svg";
import cn from "classnames";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/userContext";
import { useNavigate } from "react-router-dom";

export const PostCard = ({ id, author }) => {
  const [post, setPost] = useState({});

  useEffect(() => {
    // if (alert("Подтвердите действие"));
    api.getPostById(id).then((data) => setPost(data));
  }, [id]);

  const { currentUser } = useContext(UserContext);
  const isLiked = post?.likes?.some((el) => el === currentUser._id);
  const navigate = useNavigate();

  return (
    <>
      <div className={s.post__pageContainer}>
        <div className={s.post__pageCard}>
          <span className={s.back} onClick={() => navigate(-1)}>
            {"< "}Назад
          </span>
          <div className={s.image}>
            <img width="50%" alt="Изображение" src={post.image}></img>
            <div className={s.postAuthorInfo}>
              <span className={s.icon_avatar}>
                {/* <img src={author.avatar}></img> */}
              </span>

              <div>
                {/* {author.name} */}
                <div className={s.postAuthtor_subTitle}>
                  {" "}
                  {new Date(post.created_at).toLocaleDateString("ru", {
                    year: "numeric",
                    month: "2-digit",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
            <div className={s.favorite}>
              <button
                className={cn(s.post__favorite, {
                  [s.favoriteActive]: isLiked,
                })}
              >
                {/* <Like className={s.post__favorite} /> */}
                <Save />
              </button>
              <span>{isLiked ? "В избранном" : "В избранное"}</span>
              <div className={s.tags}>{post.tags}</div>
            </div>
            <h3>
              <b>
                {s.title}
                {post.title}
              </b>
            </h3>
            <p className={s.text}>{post.text}</p>
          </div>
        </div>
      </div>
    </>
  );
};
