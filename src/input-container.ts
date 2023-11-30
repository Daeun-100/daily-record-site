import { BaseComponent } from "./base-component.js";
type OnCloseBtnListner = () => void;
export class Inputcontainer extends BaseComponent {
  private closeBtnListner?: OnCloseBtnListner;
  constructor() {
    super();
    const deletBtn = document.createElement("button");
    deletBtn.textContent = "x";
    deletBtn.id = "delete-btn";
    deletBtn.addEventListener("click", () => {
      this.closeBtnListner && this.closeBtnListner();
    });
    deletBtn.addEventListener("mouseover", () => {
      deletBtn.style.opacity = "100%";
    });
    deletBtn.addEventListener("mouseleave", () => {
      deletBtn.style.opacity = "30%";
    });
    const inputContainer = document.createElement("div")! as HTMLElement;
    inputContainer.id = "input-container";
    inputContainer.appendChild(deletBtn);
    this.element = inputContainer;
  }
  addchild(component: BaseComponent) {
    this.attachto(this.element!, component.element!, "beforeend");
  }
  setCloseBtnListner(callback: OnCloseBtnListner) {
    this.closeBtnListner = callback;
  }
}
