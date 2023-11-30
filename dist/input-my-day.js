import { BaseComponent } from "./base-component.js";
export class InputMyDay extends BaseComponent {
    constructor() {
        super();
        this.inputContainer = document.createElement("div");
        this.inputContainer.id = "textarea-container";
        this.element = this.inputContainer;
        // this.setDayInput();
    }
    setDayInput() {
        const dayInput = document.createElement("textarea");
        dayInput.spellcheck = false;
        // dayInput.autofocus = true;
        this.text = dayInput;
        this.attachto(this.inputContainer, dayInput, "beforeend");
        dayInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                this.pressEnter();
            }
        });
    }
    pressEnter() {
        this.EnterPress && this.EnterPress();
    }
    setEnterPress(callback) {
        this.EnterPress = callback;
    }
}
//# sourceMappingURL=input-my-day.js.map