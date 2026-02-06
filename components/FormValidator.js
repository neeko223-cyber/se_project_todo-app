class FormValidator {
    constructor(settings, formEl) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._errorClass = settings.errorClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._formEl = formEl;
    }

    _showInputError(inputElement, errorMessage) {
        const errorElementId = `#${inputElement.id}-error`;
        const errorElement = this._formEl.querySelector(errorElementId);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElementId = `#${inputElement.id}-error`;
        const errorElement = this._formEl.querySelector(errorElementId);
        errorElement.classList.remove(this._errorClass);
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
         showInputError(
            this._formEl,
            inputElement,
            inputElement.validationMessage,
            this,
        );
        } else {
            hideInputError(this._formEl, inputElement, this);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }

    _setEventListeners() {
        this._inputList = Array.from(
        this._formEl.querySelectorAll(this._inputSelector),
    );
    const buttonElement = this._formEl.querySelector(
    this._submitButtonSelector,
  );

    this._toggleButtonState(this._inputList, buttonElement);
    this._inputList.forEach((inputElement) => {
     inputElement.addEventListener("input", () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState(this._inputList, buttonElement);
         });
    });
}
    

    enableValidation() {
        this._formEl.addEventListener("submit", (evt) => {
            evt.preventDefault();
         });
        this._setEventListeners();
    }
}

export default FormValidator;