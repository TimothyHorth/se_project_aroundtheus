// Function to show input error
const showInputError = (form, inputElement, validationConfig) => {
  const formError = form.querySelector(`#${inputElement.id}-input-error`);
  formError.textContent = inputElement.validationMessage;
  formError.classList.add(validationConfig.activeInputErrorClass);
  if (
    !inputElement.validity.valid &&
    inputElement.value.length == 1 &&
    !inputElement.validity.typeMismatch
  ) {
    formError.classList.add(validationConfig.errorClassDoubleLine);
    inputElement.classList.add(validationConfig.inputErrorClass);
  } else if (!inputElement.validity.valid) {
    formError.classList.add(validationConfig.errorClassSingleLine);
    inputElement.classList.add(validationConfig.inputErrorClass);
  }
};

// Function to hide input error
const hideInputError = (form, inputElement, validationConfig) => {
  if (inputElement.classList.contains(validationConfig.inputErrorClass)) {
    inputElement.classList.remove(validationConfig.inputErrorClass);
  }
  const formError = form.querySelector(`#${inputElement.id}-input-error`);
  formError.classList.remove(validationConfig.activeInputErrorClass);
};

// Function to remove error classes
function removeInputErrorClasses(form, inputElement, validationConfig) {
  const formError = form.querySelector(`#${inputElement.id}-input-error`);
  formError.classList.remove(validationConfig.activeInputErrorClass);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  formError.classList.remove(validationConfig.errorClassSingleLine);
  formError.classList.remove(validationConfig.errorClassDoubleLine);
}

// Function to reset form validation
function resetValidation(form, validationConfig) {
  const inputList = form.querySelectorAll(validationConfig.inputSelector);
  inputList.forEach(function (inputElement) {
    removeInputErrorClasses(form, inputElement, validationConfig);
  });
}

// Function to toggle the input errors based on validity
const toggleInputError = (form, inputElement) => {
  if (hasInvalidInput) {
    showInputError(form, inputElement, validationConfig);
  } else {
    hideInputError(form, inputElement, validationConfig);
  }
};

// Function to toggle Submit button state (disabled or not)
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "true");
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

// Function to check if all input values are valid
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Function to initially set all form and element states to the correct display, as well as
// set event listeners on each input to run validation upon new input.
const setEventListeners = (form, validationConfig) => {
  const inputList = Array.from(
    form.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = form.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      removeInputErrorClasses(form, inputElement, validationConfig);
      toggleInputError(form, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

// Function to begin the validation process
function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, validationConfig);
  });
}

// Initializing the configuration object for validation
const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_inactive",
  activeInputErrorClass: "form__input-error_active",
  inputErrorClass: "form__input_type_error",
  errorClassSingleLine: "form__input-error_type_single-line",
  errorClassDoubleLine: "form__input-error_type_double-line",
};

// Call the enableValidation function to initialize forms
enableValidation(validationConfig);
