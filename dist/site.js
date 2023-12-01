// import { DoneSection } from "./done-section.js";
import { BaseComponent } from "./base-component.js";
import { InputMyDay } from "./input-my-day.js";
import { Inputcontainer } from "./input-container.js";
import { Calendar } from "./main-calendar.js";
import { ClickSubmit } from "./submit.js";
class Site extends BaseComponent {
    constructor() {
        super();
        const calendar = new Calendar();
        const inputcon = document.getElementById("record-input-container");
        const submitBtn = document.getElementById("submit-button");
        const head = document.getElementById("head");
        head.addEventListener("click", () => {
            inputcon === null || inputcon === void 0 ? void 0 : inputcon.remove();
            submitBtn === null || submitBtn === void 0 ? void 0 : submitBtn.remove();
            calendar.thisMonthCalendarForming();
        }, { once: true });
        calendar.setPassedBrnClick(() => {
            var _a;
            if (((_a = document.getElementById("month")) === null || _a === void 0 ? void 0 : _a.textContent) === "1") {
                return;
            }
            const date = new Date();
            const month = this.getLastMonth();
            const start = new Date(date.getFullYear(), month - 1, 1);
            const startday = start.getDay();
            const container = document.getElementById("calendar-container");
            container.remove();
            calendar.resetCalenderHTMl();
            calendar.CalendarForming(month, startday);
        });
        calendar.setNextBrnClick(() => {
            var _a;
            if (((_a = document.getElementById("month")) === null || _a === void 0 ? void 0 : _a.textContent) === "12") {
                return;
            }
            const date = new Date();
            const month = this.getNextMonth();
            const start = new Date(date.getFullYear(), month - 1, 1);
            const startday = start.getDay();
            const container = document.getElementById("calendar-container");
            container.remove();
            calendar.resetCalenderHTMl();
            calendar.CalendarForming(month, startday);
        });
        this.submitClick(() => {
            calendar.thisMonthCalendarForming();
        });
        this.addTextra();
        const addBtn = document.getElementById("plus-button");
        addBtn.addEventListener("click", () => {
            this.addTextra();
        });
    }
    addTextra() {
        var _a, _b;
        const inputContainer = new Inputcontainer();
        inputContainer.setCloseBtnListner(() => {
            inputContainer.element.remove();
        });
        const dayinput = new InputMyDay();
        (_a = dayinput.text) === null || _a === void 0 ? void 0 : _a.focus();
        inputContainer.addchild(dayinput);
        dayinput.setDayInput();
        this.attachto(document.getElementById("record-input-container"), inputContainer.element, "beforeend");
        (_b = dayinput.text) === null || _b === void 0 ? void 0 : _b.focus();
        dayinput.setEnterPress(() => {
            this.addTextra();
        });
    }
    submitClick(callback) {
        const clickSubmit = new ClickSubmit();
        const inputcon = document.getElementById("record-input-container");
        const submitBtn = document.getElementById("submit-button");
        clickSubmit.openIndexedDB();
        clickSubmit.setClickSubmit(() => {
            clickSubmit.getDone();
            clickSubmit.saveToDB();
            inputcon === null || inputcon === void 0 ? void 0 : inputcon.remove();
            submitBtn === null || submitBtn === void 0 ? void 0 : submitBtn.remove();
            callback();
        });
    }
    getLastMonth() {
        const thisMonthHtml = document.getElementById("month");
        this.pageMonth = parseInt(thisMonthHtml.textContent);
        // console.log(this.pageMonth);
        return this.pageMonth - 1;
        //지난달 구하는 함수 만들어야함.....흐학 확장성을 고려해야한다는게 이런거구나
        // calendar.CalendarForming(thisMonth - 1);
    }
    getNextMonth() {
        const thisMonthHtml = document.getElementById("month");
        this.pageMonth = parseInt(thisMonthHtml.textContent);
        // console.log(this.pageMonth);
        return this.pageMonth + 1;
        //지난달 구하는 함수 만들어야함.....흐학 확장성을 고려해야한다는게 이런거구나
        // calendar.CalendarForming(thisMonth - 1);
    }
}
const site = new Site();
//# sourceMappingURL=site.js.map