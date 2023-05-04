
let loginData_obj = {
  success: false, // успешность последнего запроса к серверу
  message: "Инициализация", // содержит поясняющий текущее состояние текст
  /*email: "",*/ // имя текущего залогиненого пользователя или пустая строка (""), если пользователь сейчас не залогинен
  /*isLogged: false*/ // вспомогательное поле, соответствующее false если email = "", true если email != ""
};

/**
 * { email: "..." }
 * { success: true, email: "test@mail.ru" } - залогинен
 * { success: true, email: "" } - не залогинен
 * { success: false, message: "..." } - ошибка получения информации
 */
function loginData_refresh() {
  fetch("/vs/getLoginInfo")
    .then(response => response.json())
    .then(obj => {
      loginData_obj = {
        success: true,
        email: obj.email,
        isLogged: obj.email != ""
      };
    })
    .catch(error => {
      console.log(`getLoginInfo ERROR: ${error.message}`);
      loginData_obj = {
        success: false,
        message: error.message
      };
    })
    .then(() => eventEmitter.dispatchEvent(new Event("loginData_refreshed")));
}

/**
 * { success: true, loginOk: true  }
 * { success: true, loginOk: false, message: "..."  }
 * { success: false, message: "..."  }
 * success - это удалось сходить на сервер и получить от него данные (неизвестно залогинены или нет)
 * loginOk - это логин с паролем совпадает, сессия началась, сервер на своей стороне записал в $_SESSION["email"]
 */
function loginData_doLogin(login, password) {

  const url = `/vs/login?login=${login}&pass=${password}`;

  fetch(url)
    .then(response => response.json())
    .then(obj => {
      if (obj.success == true) {
        loginData_obj = {
          success: true,
          message: "Успешно вошли в систему",
          email: login,
          isLogged: true
        };
      } else { // до сервера достучались, ответ получили, но сервер сказал, что неправильное имя пользователя или пароль
        loginData_obj = {
          success: true,
          message: obj.message,
          email: "",
          isLogged: false
        };
      }
    })
    .catch(error => {
      console.log(`login ERROR: ${error.message}`);
      loginData_obj = {
        success: false,
        message: error.message
      };
    })
    .then(() => eventEmitter.dispatchEvent(new Event("loginData_refreshed")));

}

/**
 * { success: true, logoutOk: true  }
 * { success: true, logoutOk: false, message: "..."  }
 * { success: false, message: "..."  }
 */
function loginData_logout() {

  fetch("/vs/logout")
    .then(response => response.json())
    .then(obj => {
      if (obj.success == true) {
        loginData_obj = {
          success: true,
          email: "",
          isLogged: false
        };
      } else {
        loginData_obj.message = obj.message;
      }
    })
    .catch(error => {
      console.log(`logout ERROR: ${error.message}`);
      loginData_obj = {
        success: false,
        message: error.message
      };
    })
    .then(() => eventEmitter.dispatchEvent(new Event("loginData_refreshed")));

}

/**
 * { success: true, userAdded: true  }
 * { success: true, userAdded: false, message: "..."  }
 * { success: false, message: "..."  }
 */
function loginData_addUser(login, password) {

  const url = `/vs/addUser?login=${login}&pass=${password}`;

  fetch(url)
    .then(response => response.json())
    .then(obj => {
      if (obj.success == true) {
        loginData_obj = {
          success: true,
          message: "Вы успешно зарегистрированы",
          email: "",
          isLogged: false
        };
      } else {
        loginData_obj = {
          success: true,
          message: obj.message,
          email: loginData_obj.email,
          isLogged: loginData_obj.isLogged
        };
      }
    })
    .catch(error => {
      console.log(`addUser ERROR: ${error.message}`);
      loginData_obj = {
        success: false,
        message: error.message
      };
    })
    .then(() => eventEmitter.dispatchEvent(new Event("loginData_refreshed")));

}