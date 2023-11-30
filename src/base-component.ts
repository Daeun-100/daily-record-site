export class BaseComponent {
  element?: HTMLElement;
  constructor() {}
  attachScreen<T extends HTMLElement>(element: T, parent: HTMLElement) {
    parent.appendChild(element);
  }
  attachto(
    parent: HTMLElement,
    element: HTMLElement,
    position: InsertPosition = "beforeend"
  ) {
    parent.insertAdjacentElement(position, element);
  }

  tnToHtml(t: number | string, tag: string): HTMLElement {
    const template = document.createElement(`${tag}`);
    t = t.toString();
    template.textContent = t;
    return template;
  }
  removeTo() {
    this.element?.remove();
  }
}
