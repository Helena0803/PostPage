import React, { useEffect, useState } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import "./App.css";
import { api } from "../utils/Api";
import { Breadcrumb, Pagination } from "antd";
import { useDebounce } from "../utils/utils";
import { Dashboard } from "../Dashboard/dashboard";
import { Route, Routes } from "react-router-dom";
import { CatalogPage } from "../pages/CatalogPage/CatalogPage";
import { PostPage } from "../pages/PostPage/PostPage";
import { UserContext } from "../Context/userContext";
import { PostContext } from "../Context/postContext";

function App() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(undefined);
  // const [parentCounter, setParentCounter] = useState(0);
  const [currentUser, setCurrentUser] = useState({});

  const items_filtred = (products, id) =>
    products.filter((e) => e.author._id === id);

  const handleSearch = (search) => {
    api
      .searchPosts(search)
      .then((data) => setPosts(items_filtred(data, currentUser._id)));
  };
  //задержка отправки данных на сервер при вводе в строку поиска
  const debounceValueInApp = useDebounce(searchQuery, 500);

  //добавление и удаление лайков
  function handlePostLike(product) {
    const isLiked = product?.likes?.some((el) => el === currentUser._id);
    isLiked
      ? api.deleteLike(product._id).then((newPost) => {
          const newPosts = posts.map((e) =>
            e._id === newPost._id ? newPost : e
          );
          setPosts([...newPosts]);
        })
      : api.addLike(product._id).then((newPost) => {
          const newPosts = posts.map((e) =>
            e._id === newPost._id ? newPost : e
          );
          setPosts([...newPosts]);
        });
  }

  function handleUpdateUserInfo(userUpdate) {
    api.setUserInfo(userUpdate).then((newUserData) => {
      setCurrentUser(newUserData);
      console.log({ newUserData });
    });
  }
  //use-эффекты
  useEffect(() => {
    if (searchQuery === undefined) return;
    handleSearch(debounceValueInApp);
  }, [debounceValueInApp]);

  // useEffect(() => {
  //   // if (!searchQuery) return setPosts(posts);
  //   handleSearch(searchQuery);
  // }, [searchQuery]);

  useEffect(() => {
    // Promise.all([api.getUserInfo(), api.getPostList()]).then(
    //   ([userData, postData]) => {
    //     setCurrentUser(userData);
    //     setPosts(postData.posts);
    //   }
    // );

    api.getUserInfo().then((data) => setCurrentUser(data));
    api.getPostList().then((data) => {
      setPosts(items_filtred(data, currentUser._id));
    });
  }, [currentUser._id]);
  const contextUserValue = {
    currentUser,
    searchQuery,
    setSearchQuery,
    onUpdateUser: handleUpdateUserInfo,
    // setParentCounter,
    // parentCounter,
  };
  const contextPostValue = { posts, handlePostLike };
  return (
    <>
      <UserContext.Provider value={contextUserValue}>
        <PostContext.Provider value={contextPostValue}>
          <Header />
          <main className="content">
            <Dashboard />
            <Breadcrumb />
            {/* <div className="content__posts">
        </div> */}
            <Routes>
              <Route path="/catalog" element={<CatalogPage />}></Route>
              <Route path="/post/:postId" element={<PostPage />}></Route>
            </Routes>
            <Pagination />
          </main>
          <Footer />
        </PostContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;

// useEffect(()=>{}) - update на каждое изменение компонента.
// useEffect(()=>{},[state]) - update на каждое изменение конкретного state.
// useEffect(()=>{},[]) - update в самом начале
