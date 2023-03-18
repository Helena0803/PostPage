import { Logo } from "../Logo/Logo";
import { ReactComponent as Like } from "./Path.svg";
import { Search } from "../Search/Search";
import "./style.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { PostContext } from "../Context/postContext";
import { ModalDelete } from "../ModalEdit/ModalEdit";

export const Header = () => {
  const { currentUser, searchQuery, setSearchQuery, onUpdateUser } =
    useContext(UserContext);
  const navigate = useNavigate();
  const { favorite } = useContext(PostContext);
  const [modal, setModal] = useState({ modal: false });
  // const [counter, setCounter] = useState(parentCounter);

  // useEffect(() => {
  //   setCounter((st) => st + 1);
  //   return () => setCounter(parentCounter);
  // }, [parentCounter]);

  const handleClickChangeUserInfo = (e) => {
    e.preventDefault();
    onUpdateUser({ name: "Лена", about: "Фронтенд-разработчик" });
  };
  return (
    <div className="header" id="head">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            Цветочные истории <Logo onClick={() => navigate("/catalog")} />
            <Search
              // count={counter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          <div className="header__right">
            <div className="currentUser">
              <span className="avatar">
                <img src={currentUser.avatar} alt="Фото"></img>
              </span>
              <div className="userInfo">
                <span>{currentUser.name} </span>
                <span>{currentUser.email} </span>
              </div>
              <ModalDelete title={"Профиль"} isOpened={false} />
              <button
                type="button"
                className="btn"
                // onClick={handleClickChangeUserInfo}
                onClick={() => setModal({ ...modal, modal: true })}
              >
                Изменить
                {/* <span>Изменить</span> */}
              </button>
              <div>
                <Link to={"/favorite"} className="header__babble-link">
                  <Like className="header__liked" />
                  {favorite.length !== 0 && (
                    <span className="header__babble">{favorite.length}</span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
