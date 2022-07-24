// Open popup function
function openPopup(popup) {
  popup.classList.add("modal_opened");
  popup.addEventListener("mousedown", closePopupOnRemoteClick);
  document.addEventListener("keydown", closePopupOnEsc);
}

// Close popup function
function closePopup(popup) {
  popup.classList.remove("modal_opened");
  popup.removeEventListener("mousedown", closePopupOnRemoteClick);
  document.removeEventListener("keydown", closePopupOnEsc);
}

export { openPopup, closePopup };
