import { BaseComponent } from "./base-component.js";
type OnclickSubmitBtnListener = () => void;
export class ClickSubmit extends BaseComponent {
  private clickSubmitBtnListener?: OnclickSubmitBtnListener;
  private doneList: string[] = [];
  private dummyData = [
    { done: "밥먹기" },
    { done: "양치하기" },
    { done: "세수하기" },
    { done: "잠들기" },
  ];
  private dummyData2 = [
    { done: "밥먹기2" },
    { done: "양치하기2" },
    { done: "세수하기2" },
    { done: "잠들기2" },
  ];
  constructor() {
    super();
    const submitBtn = document.getElementById("submit-button")! as HTMLElement;
    submitBtn.addEventListener("click", () => {
      this.clickSubmitBtnListener && this.clickSubmitBtnListener();
    });
  }
  setClickSubmit(callback: OnclickSubmitBtnListener) {
    this.clickSubmitBtnListener = callback;
  }

  openIndexedDB() {
    const request = window.indexedDB.open("DayRecord");
    request.onupgradeneeded = () => {
      console.log("업그레이드!");
      let db = request.result;
      let store = db.createObjectStore("record", {
        keyPath: "dateID",
      });
      store.createIndex("done", "done", { unique: false });
    };
  }
  checkandDeleteExistDB() {
    const request = window.indexedDB.open("DayRecord");
    request.onsuccess = () => {
      let db = request.result;
      let transaction = db.transaction(["record"], "readwrite");
      let objStore = transaction.objectStore("record");
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let todateE = date.getDate();
      let todate = todateE < 10 ? "0" + todateE : todateE;
      objStore.delete(`${year}` + `${month}` + `${todate}`);
    };
  }
  saveToDB() {
    this.checkandDeleteExistDB();
    const request = window.indexedDB.open("DayRecord");
    request.onsuccess = () => {
      let db = request.result;
      let transaction = db.transaction(["record"], "readwrite");

      let objStore = transaction.objectStore("record");
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let todateE = date.getDate();
      let todate = todateE < 10 ? "0" + todateE : todateE;
      objStore.add({
        done: this.doneList,

        dateID: `${year}` + `${month}` + `${todate}`,
      });

      this.doneList = [];
    };
  }
  getDone() {
    let htmlDoneList = Array.from(document.getElementsByTagName("textarea"));
    htmlDoneList.forEach((e) => {
      this.doneList.push(e.value);
    });
  }
}
