const showInputError = (form, inputElement, errorMessage, errorClass) => {
  inputElement.classList.add("form__input_type_error");
  const formError = form.querySelector(`#${inputElement.id}-input-error`);
  formError.textContent = errorMessage;

  // I've added/removed classes based on type of input message due to spacing (single line vs double-lines).
  // Is there an easier way to do this?
  // edit: sorry, I now see that I was supposed to just use the default messages of the browswer.
  if (formError.classList.contains("form__input-error_type_required")) {
    formError.classList.remove("form__input-error_type_required");
  }
  if (formError.classList.contains("form__input-error_type_minlength")) {
    formError.classList.remove("form__input-error_type_minlength");
  }
  /////////////////////////////////////////////////////////////////////////
  formError.classList.add(errorClass);
  formError.classList.add("form__input-error_active");
};

const hideInputError = (form, inputElement) => {
  inputElement.classList.remove("form__input_type_error");
  const formError = form.querySelector(`#${inputElement.id}-input-error`);
  formError.classList.remove("form__input-error_active");
};

const isValid = (form, inputElement) => {
  let errorClass = "";
  if (!inputElement.validity.valid) {
    if (inputElement.validity.typeMismatch) {
      errorMessage = "Please enter a web address.";
      errorClass = "form__input-error_type_required";
    } else {
      if (inputElement.value.length === 1) {
        errorMessage =
          "Please lengthen this text to 2 characters or more. You are currently using 1 character";
        errorClass = "form__input-error_type_minlength";
      } else {
        errorMessage = "Please fill out this field.";
        errorClass = "form__input-error_type_required";
      }
    }
    showInputError(form, inputElement, errorMessage, errorClass);
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
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove("form__submit-button_inactive");
    buttonElement.removeAttribute("disabled", "");
  }
};

const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll(".form__input"));
  const buttonElement = form.querySelector(".form__submit-button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(form, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form);
  });
};

enableValidation();

function resetFormValidation(evt) {
  evt.reset();
  evt.stopPropagation();
}

// export { resetFormValidation };
