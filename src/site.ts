// import { DoneSection } from "./done-section.js";
import { BaseComponent } from "./base-component.js";
import { InputMyDay, OnEnterPress } from "./input-my-day.js";
import { Inputcontainer } from "./input-container.js";
import { Calendar } from "./main-calendar.js";
import { ClickSubmit } from "./submit.js";

class Site extends BaseComponent {
  constructor() {
    super();
    const calendar = new Calendar();
    this.submitClick(() => {
      this.goToCalendar();
    });
    this.goToCalendar();
    this.addTextra();
    const addBtn = document.getElementById("plus-button")! as HTMLElement;
    addBtn.addEventListener("click", () => {
      this.addTextra();
    });
  }
  goToCalendar() {
    const calendar = new Calendar();
    const inputcon = document.getElementById("record-input-container");
    const submitBtn = document.getElementById("submit-button");
    const head = document.getElementById("head")! as HTMLElement;
    head.addEventListener(
      "click",
      () => {
        inputcon?.remove();
        submitBtn?.remove();
        calendar.calendarForming();
      },
      { once: true }
    );
  }
  addTextra() {
    const inputContainer = new Inputcontainer();
    inputContainer.setCloseBtnListner(() => {
      inputContainer.element!.remove();
    });
    const dayinput = new InputMyDay();
    dayinput.text?.focus();
    inputContainer.addchild(dayinput);
    dayinput.setDayInput();
    this.attachto(
      document.getElementById("record-input-container")! as HTMLElement,
      inputContainer.element!,
      "beforeend"
    );
    dayinput.text?.focus();
    dayinput.setEnterPress(() => {
      this.addTextra();
    });
  }
  submitClick(callback: () => void) {
    const clickSubmit = new ClickSubmit();
    const inputcon = document.getElementById("record-input-container");
    const submitBtn = document.getElementById("submit-button");
    clickSubmit.openIndexedDB();
    clickSubmit.setClickSubmit(() => {
      clickSubmit.getDone();
      clickSubmit.saveToDB();
      inputcon?.remove();
      submitBtn?.remove();
      callback();
    });
  }
}
const site = new Site();
