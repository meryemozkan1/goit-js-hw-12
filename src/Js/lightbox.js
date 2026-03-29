import SimpleLightboxPkg from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const SimpleLightbox = SimpleLightboxPkg.default || SimpleLightboxPkg;

let lightbox;

export function initLightbox() {
  lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
    scrollZoom: false,
    showCounter: false,
  });
}

export function refreshLightbox() {
  if (lightbox) {
    lightbox.refresh();
  }
}