import "./style.css";
export const Dashboard = () => {
  const handleClick = (e) => {
    console.log(e);
  };
  return (
    <div className="content__container">
      <div className="dashboard">
        <div className="card__body">
          <div className="bread_crumbs">
            <span>
              <a className="ant-breadcrumb-link">Главная</a>
              <span className="ant-breadcrumb-separator"> / </span>
            </span>
            <span>
              <a className="ant-breadcrumb-link" href="">
                Все посты
              </a>
            </span>
          </div>
          <h1>Всё о самых красивых цветах в мире</h1>
          <div className="h2">
            Откройте для себя фантастический мир цветов!
            <button
              type="button"
              className="btn"
              onClick={(e) => handleClick(e)}
            >
              Создать пост
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
