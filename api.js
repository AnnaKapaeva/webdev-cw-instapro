// Замени на свой, чтобы получить независимый от других набор данных.
// "боевая" версия инстапро лежит в ключе prod
const personalKey = "prod";
const baseHost = "https://webdev-hw-api.vercel.app";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

export function getPosts({ token }) {
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}


export function getUserPosts({ token,id }) {
  return fetch(postsHost + "/user-posts/" + id, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}


export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => {
    return response.json();
  });
}


export function addPost({ imageUrl, description, token }) {
  return fetch(postsHost, {
    method: "POST",
    body: JSON.stringify({
      imageUrl,
      description
    }),
    headers: {
      Authorization: token,
    }
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неправильно переданы данные");
    }
    return response.json();
  });
}


export function like({token, id }) {
  return fetch(postsHost + `/${id}/like`, {
    method: "POST",

    headers: {
      Authorization: token,
    }
  }).then((response) => {
    if (response.status === 401) {
      throw new Error("нет авторизации");
    }
    return response.json();
  });
}


export function dislike({token, id }) {
  return fetch(postsHost + `/${id}/dislike`, {
    method: "POST",

    headers: {
      Authorization: token,
    }
  }).then((response) => {
    if (response.status === 401) {
      throw new Error("нет авторизации");
    }
    return response.json();
  });
}

//написать f добавления лайков 
//снятия лайков по API