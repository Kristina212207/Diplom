eventEmitter.addEventListener("loginData_refreshed", () => recordsData_refresh());

let recordsData_obj = {
  success: false, // успешность последнего запроса к серверу
  message: "Инициализация", // содержит поясняющий текущее состояние текст
  records: [], // массив объектов записей
};

function recordsData_refresh() {
  const url = "/vs/getRecords";

  fetch(url)
    .then(response => response.json())
    .then(arr => { // arr - массив объектов записей

      recordsData_obj = {
        success: true,
        records: arr,
        message: "Записи успешно получены."
      };

    })
    .catch(error => {
      console.log(`getRecords ERROR: ${error.message}`);
      recordsData_obj = {
        success: false,
        message: error.message
      };
    })
    .then(() => eventEmitter.dispatchEvent(new Event("recordsData_refreshed")));
}

function recordsData_createRecord(recordDate, startHour) {
  const url = `/vs/createRecord?recordDate=${recordDate}&startHour=${startHour}`;

  fetch(url)
    .then(response => response.json())
    .then(obj => {
      if (obj.success) {
        recordsData_obj = {
          success: true,
          message: "Запись успешно создана."
        }
      } else {
        recordsData_obj = {
          success: false,
          message: `Ошибка создания записи: ${error.message}`
        }
      }
    })
    .catch(error => {
      console.log(`createRecord ERROR: ${error.message}`);
      recordsData_obj = {
        success: false,
        message: `Ошибка создания записи: ${error.message}`
      }
    })
    .then(() => eventEmitter.dispatchEvent(new Event("recordsData_refreshed")));
}

function recordsData_deleteRecord(recordDate, startHour) {
  const url = `/vs/deleteRecord?recordDate=${recordDate}&startHour=${startHour}`;

  fetch(url)
    .then(response => response.json())
    .then(obj => {
      if (obj.success) {
        recordsData_obj = {
          success: true,
          message: "Запись успешно удалена."
        }
      } else {
        recordsData_obj = {
          success: false,
          message: `Ошибка удаления записи: ${error.message}`
        }
      }
    })
    .catch(error => {
      console.log(`deleteRecord ERROR: ${error.message}`);
      recordsData_obj = {
        success: false,
        message: `Ошибка удаления записи: ${error.message}`
      }
    })
    .then(() => eventEmitter.dispatchEvent(new Event("recordsData_refreshed")));
}