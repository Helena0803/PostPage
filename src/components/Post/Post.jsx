import { ReactComponent as Like } from "./like.svg";
import { ReactComponent as Cart } from "./cart.svg";
import "./index.css";
import cn from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/userContext";
import { api } from "../utils/Api";
import confirm from "antd/es/modal/confirm";
import { PostContext } from "../Context/postContext";
import { getLike } from "../utils/utils";
import { DeletePost } from "../Modal/Modal";

export const Post = ({
  // title,
  // image,
  // tags,
  // text,
  product,
  onPostLike,
}) => {
  const { currentUser, parentCounter } = useContext(UserContext);
  const isLiked = getLike(product, currentUser);
  const { title, image, tags, text, author } = product;
  const [posts, setPosts] = useState([]);
  const { favorite } = useContext(PostContext);
  const [counter, setCounter] = useState(parentCounter);
  const [state, setState] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const navigate = useNavigate();

  const handleLikeClick = () => {
    onPostLike(product);
  };

  const deleteClickPost = (e) => {
    e.preventDefault();
    // if (confirm("Вы уверенны, что хотите удалить данный пост?")) {
    api.deletePost(product._id).then((newPost) => {
      const newPosts = posts.map((e) => (e._id === newPost._id ? newPost : e));
      setPosts([...newPosts]);
    });
    // }
  };
  useEffect(() => {
    setCounter((st) => st + 1);
    return () => setCounter(parentCounter);
  }, [parentCounter]);

  return (
    <div className="post">
      <div className="post__header">
        <div className="postAuthorInfo">
          <img width="10%" src={author.avatar} alt="Фото" />
          {author.name} {author.about}
        </div>
      </div>
      <div className="post__content">
        <Link to={`/post/${product._id}`} className="post__link">
          <img className="image" src={image} alt="post__image" />
        </Link>
        <div className="text_desc">
          <h4 className="title">{title}</h4>
          <p className="text">{text}</p>
          <div className="tags">
            <span className="/">{tags}</span>
          </div>
        </div>
        <div className="post__footer">
          <div className="post__footer_left">
            {/* <button
              className={cn("post__favorite", {
                post__favorite_active: isLiked,
              })}
              onClick={() => handleLikeClick(product)}
            > */}
            <button
              className={`post__favorite ${
                isLiked ? "post__favorite_active" : "post__favorite_not_active"
              }`}
              onClick={handleLikeClick}
              count={counter}
            >
              <Like className="post__liked" onClick={handleLikeClick} />
              <div className="favor">
                <Link to={"/favorite"} className="post__bable-link">
                  {<span className="post__bable">{counter}</span>}
                </Link>
              </div>
            </button>

            <div className="deletePostBtn">
              <DeletePost
                active={isModalOpen}
                setActive={setIsModalOpen}
                className="post__delete"
                onClick={deleteClickPost}
              />
              {/* <Cart className="post__delete" onClick={deleteClickPost} /> */}
            </div>
          </div>
        </div>
        <div className="post__footer_right">
          {" "}
          {new Date(product.created_at).toLocaleDateString("ru", {
            year: "numeric",
            month: "2-digit",
            day: "numeric",
          })}
        </div>
      </div>
    </div>
  );
};
