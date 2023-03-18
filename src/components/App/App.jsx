import React, { useEffect, useState } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import "./App.css";
import { api } from "../utils/Api";
import { Breadcrumb, Pagination } from "antd";
import { getLike, useDebounce } from "../utils/utils";
import { Dashboard } from "../Dashboard/dashboard";
import { Route, Routes } from "react-router-dom";
import { CatalogPage } from "../pages/CatalogPage/CatalogPage";
import { PostPage } from "../pages/PostPage/PostPage";
import { UserContext } from "../Context/userContext";
import { PostContext } from "../Context/postContext";
import { NotFound } from "../pages/NotFound/NotFound";
import { Favorite } from "../pages/Favorite/Favorite";
import { ModalDelete } from "../ModalEdit/ModalEdit";

function App() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(undefined);
  const [parentCounter, setParentCounter] = useState(0);
  const [counter, setCounter] = useState(parentCounter);
  const [currentUser, setCurrentUser] = useState({});
  const [favorite, setFavorite] = useState([]);

  const filteredPosts = (posts, id) => {
    return posts?.filter((e) => e?.author?._id === id);
  };

  const handleSearch = (search) => {
    api
      .searchPosts(search)
      .then((data) => setPosts(filteredPosts(data, currentUser._id)));
  };
  //задержка отправки данных на сервер при вводе в строку поиска
  const debounceValueInApp = useDebounce(searchQuery, 500);

  //добавление и удаление лайков
  function handlePostLike(product) {
    const isLiked = getLike(product, currentUser);
    // const isLiked = product?.likes?.some((el) => el === currentUser._id);
    isLiked
      ? api.deleteLike(product._id).then((newPost) => {
          const newPosts = posts.map((e) =>
            e._id === newPost._id ? newPost : e
          );
          // setPosts([...newPosts]);
          setPosts(filteredPosts(newPosts, currentUser._id));
          setFavorite((priority) =>
            priority.filter((priority) => priority._id !== newPost._id)
          );
        })
      : api.addLike(product._id).then((newPost) => {
          const newPosts = posts.map((e) =>
            e._id === newPost._id ? newPost : e
          );
          // setPosts([...newPosts]);
          setPosts(filteredPosts(newPosts, currentUser._id));
          setFavorite((priority) => [...priority, newPost]);
        });
  }

  function handleUpdateUserInfo(userUpdate) {
    api.setUserInfo(userUpdate).then((newUserData) => {
      setCurrentUser(newUserData);
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
    Promise.all([api.getUserInfo(), api.getPostList()]).then(
      ([userData, productData]) => {
        setCurrentUser(userData);
        const sorted = filteredPosts(productData, userData?._id);
        setPosts(sorted);
        const favor = sorted?.filter((e) => getLike(e, userData));
        setFavorite(favor);
      }
    );
  }, []);

  //   api.getUserInfo().then((data) => setCurrentUser(data));
  //   api.getPostList().then((data) => {
  //     setPosts(items_filtred(data, currentUser._id));
  //   });
  // }, [currentUser._id]);
  // products.filter((e) => e.author._id === id);

  const deleteClickPost = async (id) => {
    await api.deletePost(id).then((newPost) => {
      const newPosts = posts.filter((e) => e._id !== newPost._id);
      setPosts([...newPosts]);
    });
  };

  const setSortPosts = (sort) => {
    if (sort === "Самые обсуждаемые") {
      const newPosts = posts.sort(
        (a, b) => new Date(a.comments) - new Date(b.comments)
      );
      setPosts([...newPosts]);
    }
    if (sort === "Старые") {
      const newPosts = posts.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      setPosts([...newPosts]);
    }
    if (sort === "Популярные") {
      const newPosts = posts.sort((a, b) => b.likes.length - a.likes.length);
      setPosts([...newPosts]);
    }
    if (sort === "Новые") {
      const newPosts = posts.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setPosts([...newPosts]);
    }
  };
  // console.log({ posts });
  // console.log({ currentUser });

  const contextUserValue = {
    currentUser,
    searchQuery,
    setSearchQuery,
    onUpdateUser: handleUpdateUserInfo,
    setSort: setSortPosts,
    setParentCounter,
    parentCounter,
    counter,
    setCounter,
    deleteClickPost,
  };
  const contextPostValue = { posts, handlePostLike, favorite, setFavorite };
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
              <Route path="/" element={<CatalogPage />}></Route>
              <Route path="/catalog" element={<CatalogPage />}></Route>
              <Route path="/post/:postId" element={<PostPage />}></Route>
              <Route path="*" element={<NotFound />}></Route>
              <Route path="/favorite" element={<Favorite />}></Route>
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
