eventEmitter.addEventListener("body_refreshed", () => records_refresh());
eventEmitter.addEventListener("menu_refreshed", () => records_refresh());
eventEmitter.addEventListener("loginData_refreshed", () => records_refresh());
eventEmitter.addEventListener("recordsData_refreshed", () => records_refresh());

function records_refresh() {

  if (typeof recordsContainer === 'undefined' || typeof recordsData_obj == 'undefined')
    return;

  if (menu_obj.current != "records") {
    recordsContainer.innerHTML = "";
  } else {
    records_innerRefresh();
  }

  eventEmitter.dispatchEvent(new Event("records_refreshed"));
}

function records_innerRefresh() {

  const obj = loginData_obj;

  if (obj.success == false) {

    recordsContainer.innerHTML = `Не удалось получить информацию о сессии`;

  } else { // obj.success == true

    if (obj.isLogged == false) { // не залогинен
      recordsContainer.innerText =
        "Войдите в систему, чтобы записаться на прием.";

    } else { // obj.isLogged == true => залогинен

      let recordButtonsStr = "";

      if (recordsData_obj.records) {

        const currentDateStr = new Date().toISOString().split("T")[0];
        const currentDate = new Date(currentDateStr);

        for (let dayNum = 0; dayNum < 14; dayNum++) {
          const nextDate = new Date(currentDate);
          nextDate.setDate(currentDate.getDate() + dayNum);
          const nextDateStr = nextDate.toISOString().split("T")[0];

          for (let recNum = 0; recNum < 5; recNum++) {
            const startHour = 10 + recNum;
            let isFree = true;
            let isOurs = false;

            for (let i = 0; i < recordsData_obj.records.length; i++) {

              if (recordsData_obj.records[i].recordDate == nextDateStr && recordsData_obj.records[i].startHour == startHour) {

                isFree = false;

                if (recordsData_obj.records[i].email.toLowerCase() == loginData_obj.email.toLowerCase()) {
                  isOurs = true;
                }

              }

            }

            const str = `${nextDateStr}<br/>
                  Запись №${recNum + 1}<br/>
                  Час начала: ${startHour}<br/>`;
            let onclick = `recordsData_createRecord('${nextDateStr}', ${startHour})`;

            if (isOurs) {
              onclick = `recordsData_deleteRecord('${nextDateStr}', ${startHour})`;
            }

            recordButtonsStr += `
                ${recordButtonPiece_render(str, onclick, isFree, isOurs)}
              `;
          }
        }
      }

      recordsContainer.innerHTML = `
        <div class="m-3">
          <div class="flex flex-wrap">
            ${buttonPiece_render("submit", "Обновить записи", "recordsData_refresh()")}
            <div id="records_recordsInfo" style="color: red"></div>
          </div>
          <div class="flex flex-wrap">
            ${recordButtonsStr}
          </div>
        </div>
      `;

      if (recordsData_obj && recordsData_obj.message) {
        records_recordsInfo.innerHTML = recordsData_obj.message;
      }

    } // obj.isLogged == true => залогинен

  }

}