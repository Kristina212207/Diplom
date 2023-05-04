
eventEmitter.addEventListener("loginData_refreshed", () => login_refresh());

function login_refresh() {

  if (typeof loginContainer === 'undefined')
    return;

  if (loginData_obj.success == false) {

    loginContainer.innerHTML = `Не удалось получить информацию о сессии или запрос к серверу не удался`;

  } else { // loginData_obj.success == true

    if (loginData_obj.isLogged == true) { // залогинен
      loginContainer.innerHTML = `
      <form onsubmit="return false;">
        ${buttonPiece_render("submit", "Выйти из системы", "login_logout()")}
      </form>
      <div id="login_loginInfo" style="color: red"></div>
    `;
    } else { // не залогинен, т.е. loginData_obj.isLogged == false

      if (typeof login_loginInput !== 'undefined') {

        if (typeof loginData_obj.message !== 'undefined') {
          login_loginInfo.innerHTML = loginData_obj.message;
        }

        return;

      };

      loginContainer.innerHTML = `
        <form onsubmit="return false;">          
          ${inputPiece_render("login_loginInput", "text", "Введите email")}
          ${inputPiece_render("login_passInput", "password", "Введите password")}
          ${buttonPiece_render("submit", "Вход в систему", "login_doLogin()")}
          ${buttonPiece_render("button", "Зарегистрироваться", "login_addUser()")}
        </form>
        <div id="login_loginInfo" style="color: red"></div>
      `;

    }

  }

  eventEmitter.dispatchEvent(new Event("login_refreshed"));
}

function login_doLogin() {

  let login = login_loginInput.value;
  let pass = login_passInput.value;

  loginData_doLogin(login, pass);
}

function login_logout() {

  loginData_logout();

}

function login_addUser() {

  let login = login_loginInput.value;
  let pass = login_passInput.value;

  loginData_addUser(login, pass);
}