import "./css/style.css";

import { fetchImages } from "./Js/api.js";
import { renderImages } from "./Js/render.js";
import { initLightbox, refreshLightbox } from "./Js/lightbox.js";
import { smoothScroll } from "./Js/scroll.js";

const form = document.getElementById("search-form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.getElementById("load-more");
const loadingText = document.getElementById("loading");
const message = document.getElementById("message");

let query = "";
let page = 1;
let totalHits = 0;

const PER_PAGE = 20;


hideLoadMore();
hideLoader();
hideMessage();

form.addEventListener("submit", handleSearch);
loadMoreBtn.addEventListener("click", handleLoadMore);

async function handleSearch(event) {
  event.preventDefault();

  const formEl = event.currentTarget;
  query = formEl.elements.searchQuery.value.trim();

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

    if (!data.hits.length) {
      showMessage(
        "Sorry, there are no images matching your search query. Please try again."
      );
      return;
    }

    gallery.innerHTML = renderImages(data.hits);
    refreshLightbox();

    if (totalHits > PER_PAGE) {
      showLoadMore();
    }
  } catch (error) {
    showMessage("Something went wrong. Please try again later.");
  } finally {
    hideLoader();
    formEl.reset();
  }
}
async function handleLoadMore() {
  page += 1;

  hideMessage();
  loadMoreBtn.hidden = true;
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
      showLoadMore();
    }
  } catch (error) {
    console.error(error);
    showMessage("Something went wrong. Please try again later.");
    showLoadMore();
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

function showLoader() {
  loadingText.textContent = "Loading images, please wait...";
  loadingText.hidden = false;
}

function hideLoader() {
  loadingText.hidden = true;
}

function showMessage(text) {
  message.textContent = text;
  message.hidden = false;
}

function hideMessage() {
  message.textContent = "";
  message.hidden = true;
}