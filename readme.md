# Разработка web-ресурса с использованием технологий HTML, CSS, JavaScript, Tailwind, PHP, mySql на примере web-ресурса: https://sanchez.p-host.in/vs

### Пояснительная записка в формате pdf [ЗДЕСЬ](/doc/Итоговая_работа_Сталидзанс_КВ.pdf)

## Обзор функциональности проекта

Проект представляет собой сайт косметолога. Персональная страница специалиста в области индустрии красоты.

Для целей тестирования **предлагается создать пару пользователей** (зарегистрировать самостоятельно) или использовать уже имеющихся в базе данных сайта (`test@mail.ru` и `test1@mail.ru`; пароль для тестовых пользователей `1234`). Создание (самостоятельная регистрация) новых пользователей производится без ограничений.

После входа пользователя в систему для оценки функциональности проекта **предлагается перейти в раздел (пункт меню) "Запись"**. В этом разделе пользователю предоставляется возможность **осуществить самостоятельную запись на прием** в один из 5 слотов (в течение каждого дня) на следующие две недели от текущей даты (дата изменяется динамически, определяется на стороне сервера). Уже осуществленные записи данным пользователем отображаются зеленым цветом. Записи, осуществленные другими пользователями - желтым. Свободные слоты - оранжевым.

**Нажатие на свободном слоте приводит к попытке записи текущего пользователя на прием**. В случае успеха или ошибки будет отображена соответствующая информация.

**Нажатие на занятом слоте** приводит к следующему: **если слот занят текущим залогиненным пользователем, произойдет попытка удаления записи**, то есть освобождение занятого текущим пользователем слота. Если слот занят другим пользователем, произойдет такая же **попытка отменить запись другого пользователя**, но из-за отказа сервером по причине отсутствия такого права чужая запись **не будет отменена**.

Для целей тестирования **предлагается осуществить несколько записей одним пользователем**.

**Выйти из системы и зайти в нее заново под другим пользователем. Убедиться в наличии описанной функциональности системы**.

---

Процесс создания web-ресурса включал в себя выполнение следующих последовательных этапов:

1. Определение назначения web-ресурса, его функционала.

2. Написание исходного программного кода и запуск web-ресурса.

   2.1. Разработка и создание прототипа серверной части (прототип php-скрипта)

   2.2. Разработка структуры и создание базы данных mySql

   2.3. Разработка и создание прототипа web-части (GUI)

   2.4. Доработка исходного кода и проекта в целом

3. Тестирование работоспособности web-ресурса: выявление существенных недостатков работы web-ресурса с последующим их устранением.
