// import { _handleEscClose } from "./Popup.js";

// // Open popup function
// function openPopup(popup) {
//   popup.classList.add("modal_opened");
//   popup.addEventListener("mousedown", closePopupOnRemoteClick);
//   document.addEventListener("keydown", closePopupOnEsc);
// }

// // Close popup function
// function closePopup(popup) {
//   popup.classList.remove("modal_opened");
//   popup.removeEventListener("mousedown", closePopupOnRemoteClick);
//   document.removeEventListener("keydown", closePopupOnEsc);
// }

// // Close modal window by clicking on overlay
// function closePopupOnRemoteClick(evt) {
//   if (evt.target === evt.currentTarget) {
//     closePopup(evt.target);
//   }
// }

// // Close modal window by pressing the "Escape" button
// function closePopupOnEsc(evt) {
//   if (evt.key === "Escape") {
//     const openedModal = document.querySelector(".modal_opened");
//     closePopup(openedModal);
//   }
// }

// export { openPopup, closePopup };
