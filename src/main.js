import "./css/style.css";

import { fetchImages } from "./Js/api.js";
import { renderImages } from "./Js/render.js";
import { initLightbox, refreshLightbox } from "./Js/lightbox.js";
import { smoothScroll } from "./Js/scroll.js";

const form = document.getElementById("search-form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.getElementById("load-more");
const message = document.getElementById("message");
const loadingText = document.getElementById("loading");

let query = "";
let page = 1;
let totalHits = 0;

const PER_PAGE = 20;

initLightbox();
hideLoadMore();
hideMessage();
hideLoader();

form.addEventListener("submit", handleSearch);
loadMoreBtn.addEventListener("click", handleLoadMore);

async function handleSearch(event) {
  event.preventDefault();

  query = event.currentTarget.elements.searchQuery.value.trim();

  if (!query) return;

  page = 1;
  totalHits = 0;
  gallery.innerHTML = "";
  hideLoadMore();
  hideMessage();
  showLoader();

  try {
    const data = await fetchImages(query, page);
    totalHits = data.totalHits;

    if (!data.hits || data.hits.length === 0) {
      showMessage(
        "Sorry, there are no images matching your search query. Please try again."
      );
      return;
    }

    gallery.innerHTML = renderImages(data.hits);
    refreshLightbox();

    if (totalHits > PER_PAGE) {
      showLoadMore();
    } else {
      hideLoadMore();
    }
  } catch (error) {
    console.error(error);
    showMessage("Something went wrong. Please try again later.");
  } finally {
    hideLoader();
  }
}

async function handleLoadMore() {
  page += 1;
  loadMoreBtn.disabled = true;
  hideMessage();
  showLoader();

  try {
    const data = await fetchImages(query, page);

    gallery.insertAdjacentHTML("beforeend", renderImages(data.hits));
    refreshLightbox();
    smoothScroll();

    const totalPages = Math.ceil(totalHits / PER_PAGE);

    if (page >= totalPages) {
      hideLoadMore();
      showMessage("We're sorry, but you've reached the end of search results.");
    } else {
      loadMoreBtn.disabled = false;
    }
  } catch (error) {
    console.error(error);
    loadMoreBtn.disabled = false;
    showMessage("Something went wrong. Please try again later.");
  } finally {
    hideLoader();
  }
}

function showLoadMore() {
  loadMoreBtn.hidden = false;
}

function hideLoadMore() {
  loadMoreBtn.hidden = true;
  loadMoreBtn.disabled = false;
}

function showMessage(text) {
  message.textContent = text;
  message.hidden = false;
}

function hideMessage() {
  message.textContent = "";
  message.hidden = true;
}

function showLoader() {
  loadingText.hidden = false;
}

function hideLoader() {
  loadingText.hidden = true;
}