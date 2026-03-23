export function renderImages(images) {
  return images
    .map(
      img => `
        <div class="photo-card">
          <a href="${img.largeImageURL}">
            <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item"><b>Likes</b><span>${img.likes}</span></p>
            <p class="info-item"><b>Views</b><span>${img.views}</span></p>
            <p class="info-item"><b>Comments</b><span>${img.comments}</span></p>
            <p class="info-item"><b>Downloads</b><span>${img.downloads}</span></p>
          </div>
        </div>
      `
    )
    .join("");
}