export class FormValidator {
  constructor(validationConfig, form) {
    this._validationConfig = validationConfig;
    this._form = form;
    this._buttonElement = this._form.querySelector(
      this._validationConfig.submitButtonSelector
    );
    this._inputList = Array.from(
      this._form.querySelectorAll(this._validationConfig.inputSelector)
    );
  }

  // Function to show input error
  _showInputError = (inputElement, formError) => {
    formError.textContent = inputElement.validationMessage;
    formError.classList.add(this._validationConfig.activeInputErrorClass);
    if (
      !inputElement.validity.valid &&
      inputElement.value.length == 1 &&
      !inputElement.validity.typeMismatch
    ) {
      formError.classList.add(this._validationConfig.errorClassDoubleLine);
      inputElement.classList.add(this._validationConfig.inputErrorClass);
    } else if (!inputElement.validity.valid) {
      formError.classList.add(this._validationConfig.errorClassSingleLine);
      inputElement.classList.add(this._validationConfig.inputErrorClass);
    }
  };

  // Function to hide input error
  _hideInputError = (inputElement, formError) => {
    if (
      inputElement.classList.contains(this._validationConfig.inputErrorClass)
    ) {
      inputElement.classList.remove(this._validationConfig.inputErrorClass);
    }
    formError.classList.remove(this._validationConfig.activeInputErrorClass);
  };

  // Function to remove error classes
  _removeInputErrorClasses(inputElement, formError) {
    formError.classList.remove(this._validationConfig.activeInputErrorClass);
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
    formError.classList.remove(this._validationConfig.errorClassSingleLine);
    formError.classList.remove(this._validationConfig.errorClassDoubleLine);
  }

  // Function to reset form validation
  _resetValidation() {
    this._inputList.forEach((inputElement) => {
      const formError = this._form.querySelector(
        `#${inputElement.id}-input-error`
      );
      this._removeInputErrorClasses(inputElement, formError);
    });
  }

  // Function to toggle the input errors based on validity
  _toggleInputError = (inputElement, formError) => {
    if (this._hasInvalidInput) {
      this._showInputError(inputElement, formError);
    } else {
      this._hideInputError(inputElement, formError);
    }
  };

  // Function to toggle Submit button state (disabled or not)
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(
        this._validationConfig.inactiveButtonClass
      );
      this._buttonElement.setAttribute("disabled", "true");
    } else {
      this._buttonElement.classList.remove(
        this._validationConfig.inactiveButtonClass
      );
      this._buttonElement.removeAttribute("disabled");
    }
  };

  // Function to initially set all form and element states to the correct display, as well as
  // set event listeners on each input to run validation upon new input.
  _setEventListeners = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        const formError = this._form.querySelector(
          `#${inputElement.id}-input-error`
        );
        this._removeInputErrorClasses(inputElement, formError);
        this._toggleInputError(inputElement, formError);
        this._toggleButtonState();
      });
    });
  };

  // Function to check if all input values are valid
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  enableValidation() {
    this._setEventListeners();
  }
}
