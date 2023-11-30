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
        this.submitClick(() => {
            calendar.calendarForming();
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
}
const site = new Site();
//# sourceMappingURL=site.js.map