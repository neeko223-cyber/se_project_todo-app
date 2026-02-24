class Popup {
    constructor({ popupSelector }) {
        this._popup = document.querySelector(popupSelector);
        this._closeBtn = this._popup.querySelector(".popup__close");

        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    _handleOverlayClose(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    open() {
        this._popup.classList.add("popup_visible");
        document.addEventListener("keydown", this._handleEscClose);
        this._popup.addEventListener("click", this._handleOverlayClose);
    }

    close() {
        this._popup.classList.remove("popup_visible");
        document.removeEventListener("keydown", this._handleEscClose);
        this._popup.removeEventListener("click", this._handleOverlayClose);
    }

    setEventListeners() {
        this._closeBtn.addEventListener("click", () => {
            this.close();
        });
    }
}

export default Popup;
