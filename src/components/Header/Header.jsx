import { Logo } from "../Logo/Logo";
import { Search } from "../Search/Search";
import "./style.css";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";

export const Header = () => {
  const { currentUser, searchQuery, setSearchQuery, onUpdateUser } =
    useContext(UserContext);
  // const [counter, setCounter] = useState(parentCounter);

  // useEffect(() => {
  //   setCounter((st) => st + 1);
  //   return () => setCounter(parentCounter);
  // }, [parentCounter]);

  const handleClickChangeUserInfo = (e) => {
    e.preventDefault();
    onUpdateUser({ name: "Елена", about: "Фронтенд-разработчик" });
  };
  return (
    <div className="header" id="head">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            {" "}
            Цветочные истории <Logo />
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
              <button
                type="button"
                className="btn"
                onClick={handleClickChangeUserInfo}
              >
                <span>Изменить</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
