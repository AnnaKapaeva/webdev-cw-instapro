import { escapeHtml } from "../index.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = ""
  const render = () => {
    // @TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="upload-image-container"></div>
      Cтраница добавления поста

      <textarea class="textPost"></textarea>
      <button class="button" id="add-button">Добавить</button>
    </div>
  `;

    appEl.innerHTML = appHtml;

    const uploadImageContainer = appEl.querySelector(".upload-image-container");
    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: uploadImageContainer,
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }

    document.getElementById("add-button").addEventListener("click", () => {
      if (!imageUrl || !document.querySelector(".textPost").value ) {
        alert("заполните все данные")
        return
      }
      onAddPostClick({
        description: escapeHtml(document.querySelector(".textPost").value),
        imageUrl,
      });
    });
  };

  render();
}
