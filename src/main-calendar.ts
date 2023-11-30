import { BaseComponent } from "./base-component.js";
type OnPassedBtnClick = () => void;
export class Calendar extends BaseComponent {
  //달력 만드는 class
  donelist?: string[];
  private year?: number;
  private thisMonth?: number;
  private todate?: number;
  private startDate?: number = 1;
  private endDate?: number;
  private startday?: number;
  private endday?: number;
  private passedBtnClick?: OnPassedBtnClick;
  private nextBtnClick?: OnPassedBtnClick;

  private calendarcontainer = document.createElement("div") as HTMLElement;
  private dateContainer = document.createElement("div") as HTMLElement;
  constructor() {
    super();
    this.getDate();
  }

  resetCalenderHTMl() {
    this.calendarcontainer = document.createElement("div") as HTMLElement;
    this.dateContainer = document.createElement("div") as HTMLElement;
  }
  getDate() {
    const date = new Date(); //Date Api로 월,일 구하는 함수 만들면 되겠다
    this.thisMonth = date.getMonth() + 1;
    this.todate = date.getDate(); //오늘 날짜로
    const end = new Date(date.getFullYear(), this.thisMonth, 0);
    this.endDate = end.getDate();
    this.endday = end.getDay();
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    this.startday = start.getDay();
    this.year = date.getFullYear();
  }
  weekSet() {
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const weekId = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const weekContainer = document.createElement("div");
    weekContainer.id = "week-container";
    this.attachScreen(weekContainer, this.calendarcontainer);
    week.forEach((day, i) => {
      const dd = this.tnToHtml(day, "div");
      dd.className = "week";
      dd.id = weekId[i];
      this.attachScreen(dd, weekContainer);
    });
  }
  datedummy(start: number) {
    start!;
    while (start >= 1) {
      const dummy = document.createElement("div");
      dummy.id = "datedummy";
      this.attachScreen(dummy, this.dateContainer);
      console.log("더미");
      start -= 1;
    }
  }
  CalendarForming(m: number = this.thisMonth!, start: number = this.startday!) {
    const date = new Date();
    //지난년도 달력은 보여주지 말자....타협
    const end = new Date(date.getFullYear(), m, 0);
    this.endDate = end.getDate();
    this.dateContainer.id = "date-container";
    this.calendarcontainer.id = "calendar-container";
    const month = this.tnToHtml(m, "div");
    month.id = "month";
    const passedBtn = this.tnToHtml("<", "span");
    const nextBtn = this.tnToHtml(">", "span");
    passedBtn.addEventListener("click", () => {
      this.passedBtnClick && this.passedBtnClick();
    });
    nextBtn.addEventListener("click", () => {
      this.nextBtnClick && this.nextBtnClick();
    });
    passedBtn.id = "passed-btn";
    nextBtn.id = "next-btn";
    this.attachScreen(
      this.calendarcontainer,
      document.getElementById("page-container")! as HTMLElement
    );
    this.attachScreen(month, this.calendarcontainer); //month붙이기
    this.attachScreen(passedBtn, this.calendarcontainer); //passed붙이기
    this.attachScreen(nextBtn, this.calendarcontainer); //passed붙이기
    this.weekSet();

    this.datedummy(start);
    this.attachScreen(this.dateContainer, this.calendarcontainer);
    for (let i = 1; i <= this.endDate!; i++) {
      //enddate고쳐야함
      //date 붙이기
      const a = this.tnToHtml(i, "div");
      a.className = "date";
      a.id = `${i}`;
      let key = this.getDateID(a.id);
      this.returnDonelist(
        key,
        () => {
          a.style.backgroundColor = "pink";
          if (i === this.todate) {
            a.style.backgroundColor = "red"; //여기ㅓ 하지말고 캘린더 클래스에서 함수 따로 만드는게 더 좋을듯?
          }
        },
        () => {}
      );

      a.addEventListener("click", () => {
        const clickDate = a.id;
        const dateID = this.getDateID(clickDate);
        console.log(dateID);
        this.returnDonelist(
          dateID,
          () => {
            this.setDoneSection(this.donelist);
          },
          () => {
            this.removeDoneSection();
          }
        );
      });

      this.attachScreen(a, this.dateContainer);
    }
  }
  thisMonthCalendarForming() {
    this.CalendarForming();
  }

  getDateID(clickdate: string) {
    let year = this.year;
    let month = document.getElementById("month")?.textContent ?? this.thisMonth;
    // console.log(month);

    let keyNumber = `${year}` + `${month}` + `${clickdate}`;

    return keyNumber;
  }

  returnDonelist(
    key: string,
    calltry: () => void,
    callcatch: () => void
  ): string[] | void {
    this.donelist = [];
    const request = window.indexedDB.open("DayRecord");
    request.onsuccess = () => {
      let db = request.result;
      const transaction = db.transaction("record");
      const obstore = transaction.objectStore("record");
      const getData = obstore.get(key);

      getData.onsuccess = () => {
        try {
          this.donelist = getData.result["done"];
          calltry();
          // this.setDoneSection(this.donelist);
        } catch (e) {
          callcatch();
          // this.removeDoneSection();
        }
      };
    };
  }
  setDoneSection(list: string[] | void): void {
    if (document.getElementById("done-container")) {
      this.removeDoneSection();
    }
    const sectioncon = document.createElement("div");
    sectioncon.id = "done-container";
    if (list) {
      list.forEach((i) => {
        const section = this.tnToHtml(i, "div");
        section.className = "done";
        this.attachScreen(section, sectioncon);
        this.attachScreen(sectioncon, document.body);
      });
    }
  }
  setPassedBrnClick(listner: OnPassedBtnClick) {
    this.passedBtnClick = listner;
  }
  setNextBrnClick(listner: OnPassedBtnClick) {
    this.nextBtnClick = listner;
  }
  removeDoneSection() {
    const sectioncon = document.getElementById("done-container");
    sectioncon?.remove();
  }
}
