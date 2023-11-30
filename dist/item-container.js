import { BaseComponent } from "./base-component.js";
export class Inputcontainer extends BaseComponent {
    constructor() {
        super();
        const deletBtn = document.createElement("button");
        deletBtn.textContent = "x";
        deletBtn.id = "delete-btn";
        deletBtn.addEventListener("click", () => {
            this.closeBtnListner && this.closeBtnListner();
        });
        const inputContainer = document.createElement("div");
        inputContainer.id = "input-container";
        inputContainer.appendChild(deletBtn);
        this.element = inputContainer;
    }
    addchild(component) {
        this.attachto(this.element, component.element, "afterbegin");
    }
    setCloseBtnListner(callback) {
        this.closeBtnListner = callback;
    }
}
//# sourceMappingURL=item-container.js.map