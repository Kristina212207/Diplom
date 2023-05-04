<?php

session_set_cookie_params(0, "/vs/");
session_start();

if (rtrim($_SERVER['REDIRECT_URL'], "/") == "/vs") { // если запрос хочет корень сайта

  echo file_get_contents("site/index.html");

} else if (stripos($_SERVER['REDIRECT_URL'], "/vs/site") === 0) { // если запрос хочет какой-то файл из "папки" site тогда это статический файл из папки site на диске

  $filePath = substr($_SERVER['REDIRECT_URL'], 4, strlen($_SERVER['REDIRECT_URL']) - 4);

  echo file_get_contents($filePath);

}

/* ------------- */
/*  /vs/addUser  */
/* ------------- */
else if (rtrim($_SERVER['REDIRECT_URL'], "/") == "/vs/addUser") {

  if ($_SESSION["email"] != null) {

    echo <<<JSON
    {
      "success": false,
      "message": "Уже залогинен"
    }
    JSON;

    return;

  }

  $login = $_REQUEST["login"];
  $pass = $_REQUEST["pass"];

  if ($login == null || $pass == null) {

    echo <<<JSON
    {
      "success": false,
      "message": "Отсутствует один из обязательных параметров"
    }
    JSON;

    return;

  }

  // здесь должна быть валидация $login и $pass

  $mysqli = mysqli_connect("localhost", "phgwpask_0360", "!@rocs6ipako!@", "phgwpask_0360");
  $sql = "SELECT email FROM vs_user WHERE email = \"$login\"";
  $result = $mysqli->query($sql);
  if ($result->num_rows != 0) {
    echo <<<JSON
    {
      "success": false,
      "message": "Пользователь с таким email уже существует"
    }
    JSON;
    return;
  }

  $passHash = password_hash($pass, PASSWORD_DEFAULT);

  $sql = "INSERT INTO `vs_user` (`email`, `pass`) VALUES ('$login', '$passHash')";

  if ($mysqli->query($sql)) {

    echo <<<JSON
    {
      "success": true
    }
    JSON;

  } else {

    echo <<<JSON
    {
      "success": false,
      "message": "Ошибка SQL/БД"
    }
    JSON;

  }

}

/* ------------------ */
/*  /vs/getLoginInfo  */
/* ------------------ */
else if (rtrim($_SERVER['REDIRECT_URL'], "/") == "/vs/getLoginInfo") {

  echo <<<JSON
  {
    "email": "{$_SESSION["email"]}"
  }
  JSON;

}

/* ----------- */
/*  /vs/login  */
/* ----------- */
else if (rtrim($_SERVER['REDIRECT_URL'], "/") == "/vs/login")
{

  if ($_SESSION["email"] != null) {

    echo <<<JSON
    {
      "success": false,
      "message": "Уже залогинен"
    }
    JSON;

    return;

  }

  $login = $_REQUEST["login"];
  $pass = $_REQUEST["pass"];


  $mysqli = mysqli_connect("localhost", "phgwpask_0360", "!@rocs6ipako!@", "phgwpask_0360");

  $sql = "SELECT email, pass FROM vs_user WHERE email = \"$login\"";

  $result = $mysqli->query($sql);

  $arr = $result->fetch_assoc();

  if (password_verify($pass, $arr["pass"])) {
      
    $_SESSION["email"] = $login;

    echo <<<JSON
    {
      "success": true
    }
    JSON;

  } else {

    echo <<<JSON
    {
      "success": false,
      "message": "Ошибка аутентификации."
    }
    JSON;

  }
}

/* ------------ */
/*  /vs/logout  */
/* ------------ */
else if (rtrim($_SERVER['REDIRECT_URL'], "/") == "/vs/logout")
{

  if ($_SESSION["email"] == null) {

    echo <<<JSON
    {
      "success": false,
      "message": "Не залогинен"
    }
    JSON;

    return;

  }

  $_SESSION["email"] = null;

  echo <<<JSON
  {
    "success": true
  }
  JSON;

}

/* ------------------- */
/*  /vs/getAllRecords  */
/* ------------------- */
else if (rtrim($_SERVER['REDIRECT_URL'], "/") == "/vs/getAllRecords") {

  $mysqli = mysqli_connect("localhost", "phgwpask_0360", "!@rocs6ipako!@", "phgwpask_0360");

  $sql = "SELECT * FROM vs_record";
  
  $result = $mysqli->query($sql);

  echo "[\n";

  foreach ($result as $index => $row) {

    echo "  {\n";

    echo "    \"recordDate\": \"{$row['recordDate']}\",\n";
    echo "    \"startHour\": {$row['startHour']},\n";
    echo "    \"email\": \"{$row['email']}\"\n";

    echo "  }";

    if ($result->num_rows - 1 != $index) echo ",";

    echo "\n";

  }
  
  echo "]";

}

/* ---------------- */
/*  /vs/getRecords  */
/* ---------------- */
else if (rtrim($_SERVER['REDIRECT_URL'], "/") == "/vs/getRecords") {

  /*$email=$_SESSION["email"];

  if ($email == null) {

    echo <<<JSON
    {
      "success": false,
      "message": "Не залогинен"
    }
    JSON;

    return;
  }*/

  $currentDate = date("Y-m-d");
  $maxDate = date("Y-m-d", strtotime($currentDate . '14 days'));

  $mysqli = mysqli_connect("localhost", "phgwpask_0360", "!@rocs6ipako!@", "phgwpask_0360");

  $sql = "SELECT * FROM vs_record WHERE recordDate >= \"$currentDate\" AND recordDate <= \"$maxDate\"";
  
  $result = $mysqli->query($sql);

  echo "[\n";

  foreach ($result as $index => $row) {

    echo "  {\n";

    echo "    \"recordDate\": \"{$row['recordDate']}\",\n";
    echo "    \"startHour\": {$row['startHour']},\n";
    echo "    \"email\": \"{$row['email']}\"\n";

    echo "  }";

    if ($result->num_rows - 1 != $index) echo ",";

    echo "\n";

  }
  
  echo "]";

}

/* ------------------ */
/*  /vs/createRecord  */
/* ------------------ */
else if (rtrim($_SERVER['REDIRECT_URL'], "/") == "/vs/createRecord") {

  $email = $_SESSION["email"];

  if ($email == null) {

    echo <<<JSON
    {
      "success": false,
      "message": "Не залогинен"
    }
    JSON;

    return;
  }

  $recordDate = $_REQUEST["recordDate"];
  $startHour = $_REQUEST["startHour"];

  if ($recordDate == null || $startHour == null || $email == null) {

    echo <<<JSON
    {
      "success": false,
      "message": "Отсутствует один из обязательных параметров"
    }
    JSON;

    return;

  }

  $sql = "INSERT INTO vs_record (recordDate, startHour, email) VALUES (\"$recordDate\", $startHour, \"$email\")";

  $mysqli = mysqli_connect("localhost", "phgwpask_0360", "!@rocs6ipako!@", "phgwpask_0360");

  if ($mysqli->query($sql)) {

    echo <<<JSON
    {
      "success": true
    }
    JSON;

  } else {

    echo <<<JSON
    {
      "success": false,
      "message": "Ошибка SQL/БД"
    }
    JSON;

  }

}

/* ------------------ */
/*  /vs/deleteRecord  */
/* ------------------ */
else if (rtrim($_SERVER['REDIRECT_URL'], "/") == "/vs/deleteRecord") {

  $email = $_SESSION["email"];

  if ($email == null) {

    echo <<<JSON
    {
      "success": false,
      "message": "Не залогинен"
    }
    JSON;

    return;
  }

  $recordDate = $_REQUEST["recordDate"];
  $startHour = $_REQUEST["startHour"];

  if ($recordDate == null || $startHour == null) {

    echo <<<JSON
    {
      "success": false,
      "message": "Отсутствует один из обязательных параметров"
    }
    JSON;

    return;

  }

  $sql = <<<SQL
    DELETE FROM vs_record
    WHERE recordDate = "$recordDate" AND
          startHour = $startHour AND
          email = "$email"
  SQL;

  $mysqli = mysqli_connect("localhost", "phgwpask_0360", "!@rocs6ipako!@", "phgwpask_0360");

  if ($mysqli->query($sql)) {

    echo <<<JSON
    {
      "success": true
    }
    JSON;

  } else {

    echo <<<JSON
    {
      "success": false,
      "message": "Ошибка SQL/БД"
    }
    JSON;

  }

}

/* ---------------------- */
/*  /vs/deleteAllRecords  */
/* ---------------------- */
else if (rtrim($_SERVER['REDIRECT_URL'], "/") == "/vs/deleteAllRecords") {
  
  $sql = "DELETE FROM vs_record";

  $mysqli = mysqli_connect("localhost", "phgwpask_0360", "!@rocs6ipako!@", "phgwpask_0360");

  if ($mysqli->query($sql)) {

    echo <<<JSON
    {
      "success": true
    }
    JSON;

  } else {

    echo <<<JSON
    {
      "success": false,
      "message": "Ошибка SQL/БД"
    }
    JSON;

  }

}