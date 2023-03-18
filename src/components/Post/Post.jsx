import { ReactComponent as Like } from "./like.svg";
import "./index.css";
import cn from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/userContext";
import { api } from "../utils/Api";
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
  const { currentUser, parentCounter, deleteClickPost } =
    useContext(UserContext);
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
            <button
              className={`post__favorite ${
                isLiked ? "post__favorite_active" : "post__favorite_not_active"
              }`}
              onClick={handleLikeClick}
              count={counter}
            >
              <Like className="post__liked" />
              <div className="favor">
                <Link to={"/favorite"} className="post__bable-link">
                  {
                    <span className="post__bable">
                      {product?.likes?.length}
                    </span>
                  }
                </Link>
              </div>
            </button>
            <div className="deletePostBtn">
              <DeletePost
                active={isModalOpen}
                setActive={setIsModalOpen}
                className="post__delete"
                deleteClickPost={() => deleteClickPost(product._id)}
              />
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
