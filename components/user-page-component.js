
import { renderHeaderComponent } from "./header-component.js";
import { posts, user } from "../index.js";
import { handleLike } from "./posts-page-component.js";

export function renderUserPageComponent({ appEl, getToken }) {
  // @TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  const postHtml = posts.map( (post) => {
console.log(post)
return `<li class="post">
                    
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
                <div class="post-header" data-user-id="${posts[0].user.id}">
                        <img src="${posts[0].user.imageUrl}" class="post-header__user-image">
                        <p class="post-header__user-name">${posts[0].user.name}</p>
                    </div>
                <ul class="posts">
                ${postHtml}
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"), user
  });
handleLike(getToken)
}
