/* Hello Kseniya! Thank you for reviewing my project. I've tried my best to incorporate all your comments. 
However, I am struggling with figuring out how to incorporate the enableValidation function and use it as a
configuration object. */

const showInputError = (form, inputElement) => {
  const formError = form.querySelector(`#${inputElement.id}-input-error`);
  formError.textContent = inputElement.validationMessage;
  formError.classList.add("form__input-error_active");
  if (
    !inputElement.validity.valid &&
    inputElement.value.length == 1 &&
    !inputElement.validity.typeMismatch
  ) {
    formError.classList.add("form__input-error_type_double-line");
    inputElement.classList.add("form__input_type_error");
  } else if (!inputElement.validity.valid) {
    formError.classList.add("form__input-error_type_single-line");
    inputElement.classList.add("form__input_type_error");
  }
};

const hideInputError = (form, inputElement) => {
  if (inputElement.classList.contains("form__input_type_error")) {
    inputElement.classList.remove("form__input_type_error");
  }
  const formError = form.querySelector(`#${inputElement.id}-input-error`);
  formError.classList.remove("form__input-error_active");
};

function removeInputErrorClasses(form, inputElement) {
  const formError = form.querySelector(`#${inputElement.id}-input-error`);
  inputElement.classList.remove("form__input_type_error");
  formError.classList.remove("form__input-error_active");
  if (formError.classList.contains("form__input-error_type_single-line")) {
    formError.classList.remove("form__input-error_type_single-line");
  }
  if (formError.classList.contains("form__input-error_type_double-line")) {
    formError.classList.remove("form__input-error_type_double-line");
  }
}

const toggleInputError = (form, inputElement) => {
  if (hasInvalidInput) {
    showInputError(form, inputElement);
  } else {
    hideInputError(form, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("form__submit-button_inactive");
    buttonElement.setAttribute("disabled", "true");
  } else {
    buttonElement.classList.remove("form__submit-button_inactive");
    buttonElement.removeAttribute("disabled", "true");
  }
};

const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll(".form__input"));
  const buttonElement = form.querySelector(".form__submit-button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      removeInputErrorClasses(form, inputElement);
      toggleInputError(form, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  fillProfileForm();
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form);
  });
};

enableValidation();

/* I do not know what to do with the enableValidation function in regards to the project prompt
We were not taught what to do with that. I've looked into it and I'm not sure what is being asked exactly*/

/*
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_inactive",
  inputErrorClass: "form__input-error_active",
  errorClassSingleLine: "form__input-error_type_single-line",
  errorClassDoubleLine: "form__input-error_type_double-line",
});
*/
