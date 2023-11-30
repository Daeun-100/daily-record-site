export class BaseComponent {
    constructor() { }
    attachScreen(element, parent) {
        parent.appendChild(element);
    }
    attachto(parent, element, position = "beforeend") {
        parent.insertAdjacentElement(position, element);
    }
    tnToHtml(t, tag) {
        const template = document.createElement(`${tag}`);
        t = t.toString();
        template.textContent = t;
        return template;
    }
    removeTo() {
        var _a;
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.remove();
    }
}
//# sourceMappingURL=base-component.js.map