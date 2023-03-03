const config = {
  baseUrl: 'https://api.react-learning.ru/v2/group-10',
  headers: {
    'content-type': 'application/json',
    Authorization:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U4ZWMzNDU5Yjk4YjAzOGY3N2I1MzMiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc2MjA5Mjg0LCJleHAiOjE3MDc3NDUyODR9.ajfNfKbFj5QlW92hnw9YuyopigJsUnYshqya9m1ENcA",
  },
};

const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject('Error');
};

class Api {
  // {baseUrl, headers}
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }
  getPostList() {
    return fetch(`${this._baseUrl}/posts`, {
      headers: this._headers,
    }).then((res) => onResponse(res));
  }

  searchPosts(query) {
    return fetch(`${this._baseUrl}/posts/search?query=${query}`,{
      headers: this._headers,
    }).then(onResponse);
  }

  getPostById(id) {
    return fetch(`${this._baseUrl}/posts/${id}`,{
      headers: this._headers,
    }).then((res) => onResponse(res));
  }

  addPost(data) {
    return fetch(`${this._baseUrl}/posts`,{
      headers: this._headers,
      method: 'POST',
      body: 	JSON.stringify(data)
    }).then(onResponse); 
  }
  // editPostById() {
  //   return fetch(`${this._baseUrl}/posts/:postId`,{
  //     headers: this._headers,
  //     method: 'PATCH',
  //     body: 	JSON.stringify(data)
  //   }).then(onResponse); 
  // }

  deletePost(postId) {
    return fetch(`${this._baseUrl}/posts/${postId}`,{
      headers: this._headers,
      method: 'DELETE'
    }).then(onResponse); 
  }

  changeLikePostStatus(postId, like) {
    return fetch(`${this._baseUrl}/posts/likes/${postId}`,{
      headers: this._headers,
      method: like ? 'PUT': 'DELETE',
    }).then(onResponse); 
  }
  addLike(postId) {
    return fetch(`${this._baseUrl}/posts/likes/${postId}`,{
      headers: this._headers,
      method: 'PUT'
    }).then(onResponse); 
  }

  deleteLike(postId) {
    return fetch(`${this._baseUrl}/posts/likes/${postId}`,{
      headers: this._headers,
      method: 'DELETE'
    }).then(onResponse); 
  }
  // addComment(data) {
  //   return fetch(`${this._baseUrl}/posts/comments/${postId}`,{
  //     headers: this._headers,
  //     method: 'POST',
  //     body: 	JSON.stringify(data)
  //   }).then(onResponse); 
  // }
 
  // deleteCommentById(commentId) {
  //   return fetch(`${this._baseUrl}/posts/comments/${postId}/${commentId}`,{
  //     headers: this._headers,
  //     method: 'DELETE'
  //   }).then(onResponse); 
  // }

  getAllComments() {
    return fetch(`${this._baseUrl}/posts/comments`, {
      headers: this._headers,
    }).then((res) => onResponse(res));
  }

  getCommentById(postId) {
    return fetch(`${this._baseUrl}/posts/comments/${postId}`, {
      headers: this._headers,
    }).then((res) => onResponse(res));
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => onResponse(res));
  }
  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name, about}),
    }).then((res) => onResponse(res));
  }
  editUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`,{
      headers: this._headers,
      method: 'PATCH',
      body: 	JSON.stringify(data)
    }).then(onResponse); 
  }
}

export const api = new Api(config);
