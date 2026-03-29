export function renderImages(images) {
  return images
    .map(
      image => `
        <div class="photo-card">
          <a class="gallery-link" href="${image.largeImageURL}">
            <img
              class="gallery-image"
              src="${image.webformatURL}"
              alt="${image.tags}"
              loading="lazy"
            />
          </a>

          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              <span>${image.likes}</span>
            </p>
            <p class="info-item">
              <b>Views</b>
              <span>${image.views}</span>
            </p>
            <p class="info-item">
              <b>Comments</b>
              <span>${image.comments}</span>
            </p>
            <p class="info-item">
              <b>Downloads</b>
              <span>${image.downloads}</span>
            </p>
          </div>
        </div>
      `
    )
    .join("");
}