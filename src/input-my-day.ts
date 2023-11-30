import { BaseComponent } from "./base-component.js";
export type OnEnterPress = () => void;
export class InputMyDay extends BaseComponent {
  private EnterPress?: OnEnterPress;
  private inputContainer = document.createElement("div");
  text?: HTMLTextAreaElement;
  constructor() {
    super();
    this.inputContainer.id = "textarea-container";
    this.element = this.inputContainer;

    // this.setDayInput();
  }

  setDayInput() {
    const dayInput = document.createElement("textarea")! as HTMLTextAreaElement;
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
  setEnterPress(callback: OnEnterPress) {
    this.EnterPress = callback;
  }
}
