import "./css/style.css";

import { fetchImages } from "./Js/api";
import { renderImages } from "./Js/render";
import { initLightbox, refreshLightbox } from "./Js/lightbox";
import { smoothScroll } from "./Js/scroll";

const form = document.getElementById("search-form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.getElementById("load-more");
const endMessage = document.getElementById("end-message");
const loadingText = document.getElementById("loading");

let query = "";
let page = 1;
let totalHits = 0;

const PER_PAGE = 20;

initLightbox();

form.addEventListener("submit", async e => {
  e.preventDefault();

  query = e.target.searchQuery.value.trim();

  if (!query) {
    return;
  }

  page = 1;
  totalHits = 0;

  gallery.innerHTML = "";
  endMessage.hidden = true;
  loadMoreBtn.hidden = true;
  loadMoreBtn.disabled = false;
  loadingText.hidden = false;

  try {
    const data = await fetchImages(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      endMessage.textContent =
        "Sorry, there are no images matching your search query. Please try again.";
      endMessage.hidden = false;
      return;
    }

    gallery.innerHTML = renderImages(data.hits);
    refreshLightbox();

    const totalPages = Math.ceil(totalHits / PER_PAGE);

    if (page < totalPages) {
      loadMoreBtn.hidden = false;
    } else {
      loadMoreBtn.hidden = true;
      endMessage.textContent =
        "We're sorry, but you've reached the end of search results.";
      endMessage.hidden = false;
    }
  } catch (error) {
    endMessage.textContent = "Something went wrong. Please try again later.";
    endMessage.hidden = false;
  } finally {
    loadingText.hidden = true;
  }
});

loadMoreBtn.addEventListener("click", async () => {
  page += 1;
  loadMoreBtn.disabled = true;
  loadingText.hidden = false;
  endMessage.hidden = true;

  try {
    const data = await fetchImages(query, page);

    gallery.insertAdjacentHTML("beforeend", renderImages(data.hits));
    refreshLightbox();
    smoothScroll();

    const totalPages = Math.ceil(totalHits / PER_PAGE);

    if (page >= totalPages) {
      loadMoreBtn.hidden = true;
      endMessage.textContent =
        "We're sorry, but you've reached the end of search results.";
      endMessage.hidden = false;
    } else {
      loadMoreBtn.disabled = false;
    }
  } catch (error) {
    endMessage.textContent = "Something went wrong. Please try again later.";
    endMessage.hidden = false;
    loadMoreBtn.disabled = false;
  } finally {
    loadingText.hidden = true;
  }
});