import { ReactComponent as Like } from "./like.svg";
import { ReactComponent as Cart } from "./cart.svg";
import "./index.css";
import cn from "classnames";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";

export const Post = ({
  // title,
  // image,
  // tags,
  // text,
  product,
  onPostLike,
}) => {
  const { currentUser } = useContext(UserContext);
  const isLiked = product.likes.some((el) => el === currentUser._id);
  const handleLikeClick = () => {
    onPostLike(product);
  };
  const { title, image, tags, text, author } = product;
  return (
    <div className="post">
      <div className="post__header">
        <div className="postAuthorInfo">
          <img width="10%" src={author.avatar} />
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
                isLiked ? "post__favorite_active" : ""
              }`}
              onClick={handleLikeClick}
            >
              <Like className="post__liked" />
            </button>
            <div className="deletePostBtn">
              <button className="post__delete">
                <Cart />
              </button>
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
