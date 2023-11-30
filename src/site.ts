// import { DoneSection } from "./done-section.js";
import { BaseComponent } from "./base-component.js";
import { InputMyDay, OnEnterPress } from "./input-my-day.js";
import { Inputcontainer } from "./input-container.js";
import { Calendar } from "./main-calendar.js";
import { ClickSubmit } from "./submit.js";

class Site extends BaseComponent {
  private pageMonth?: number;

  constructor() {
    super();
    const calendar = new Calendar();
    const inputcon = document.getElementById("record-input-container");
    const submitBtn = document.getElementById("submit-button");
    const head = document.getElementById("head")! as HTMLElement;
    head.addEventListener(
      "click",
      () => {
        inputcon?.remove();
        submitBtn?.remove();
        calendar.thisMonthCalendarForming();
      },
      { once: true }
    );
    calendar.setPassedBrnClick(() => {
      if (document.getElementById("month")?.textContent === "1") {
        return;
      }
      const date = new Date();
      const month = this.getLastMonth();
      const start = new Date(date.getFullYear(), month - 1, 1);
      const startday = start.getDay();
      const container = document.getElementById("calendar-container");
      container!.remove();
      calendar.resetCalenderHTMl();
      calendar.CalendarForming(month, startday);
    });
    calendar.setNextBrnClick(() => {
      if (document.getElementById("month")?.textContent === "12") {
        return;
      }
      const date = new Date();
      const month = this.getNextMonth();
      const start = new Date(date.getFullYear(), month - 1, 1);
      const startday = start.getDay();
      const container = document.getElementById("calendar-container");
      container!.remove();
      calendar.resetCalenderHTMl();
      calendar.CalendarForming(month, startday);
    });
    this.submitClick(() => {
      calendar.thisMonthCalendarForming();
    });

    this.addTextra();
    const addBtn = document.getElementById("plus-button")! as HTMLElement;
    addBtn.addEventListener("click", () => {
      this.addTextra();
    });
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
  getLastMonth() {
    const thisMonthHtml = document.getElementById("month")! as HTMLElement;

    this.pageMonth = parseInt(thisMonthHtml.textContent!);
    // console.log(this.pageMonth);
    return this.pageMonth - 1;
    //지난달 구하는 함수 만들어야함.....흐학 확장성을 고려해야한다는게 이런거구나
    // calendar.CalendarForming(thisMonth - 1);
  }
  getNextMonth() {
    const thisMonthHtml = document.getElementById("month")! as HTMLElement;

    this.pageMonth = parseInt(thisMonthHtml.textContent!);
    // console.log(this.pageMonth);
    return this.pageMonth + 1;
    //지난달 구하는 함수 만들어야함.....흐학 확장성을 고려해야한다는게 이런거구나
    // calendar.CalendarForming(thisMonth - 1);
  }
}
const site = new Site();
