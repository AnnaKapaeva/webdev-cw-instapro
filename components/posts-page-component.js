import { POSTS_PAGE, USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, user, setPosts, renderApp, page, userPageId } from "../index.js";
import { dislike, getPosts, getUserPosts, like } from "../api.js";

export function renderPostsPageComponent({ appEl,getToken }) {
  // @TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  const postHtml = posts.map( (post) => {
console.log(post)
return `<li class="post">
                    <div class="post-header" data-user-id="${post.user.id}">
                        <img src="${post.user.imageUrl}" class="post-header__user-image">
                        <p class="post-header__user-name">${post.user.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">
                    </div>
                    <div class="post-likes">
                    ${
                      user ? `<button data-like="${post.isLiked}" data-post-id="${post.id}" class="like-button">
                        <img src="./assets/images/like-${post.isLiked?"":"not-"}active.svg">
                      </button>` : ""
                    }
                      <p class="post-likes-text">
                        Нравится: <strong>${post.likes.length}</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${post.user.name}</span>
                      ${post.description}
                    </p>
                    <p class="post-date">
                      ${new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </li>
`
  })
  /**
   * @TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                ${postHtml}
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"), user
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
  handleLike(getToken);
}


export function handleLike(getToken) {
  const likeButtons = document.querySelectorAll(".like-button")
  for (let likeButton of likeButtons) {
    likeButton.addEventListener("click", () => {
      const id = likeButton.dataset.postId
      const isLiked = likeButton.dataset.like === "true" ?? false 
      if (isLiked) {
        dislike({token:getToken(), id}).then(() =>{
          const fetchPosts = page === POSTS_PAGE ? getPosts : getUserPosts
          fetchPosts({token:getToken(), id:userPageId}).then((posts) => {
            setPosts(posts)
            renderApp()
          })
        })
      } else {like({token:getToken(), id}).then(() =>{
        const fetchPosts = page === POSTS_PAGE ? getPosts : getUserPosts
          fetchPosts({token:getToken(), id:userPageId}).then((posts) => {
            setPosts(posts)
            renderApp()
          })
      })}
    })
  }
}
