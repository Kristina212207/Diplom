eventEmitter.addEventListener("body_refreshed", () => contacts_refresh());
eventEmitter.addEventListener("menu_refreshed", () => contacts_refresh());

function contacts_refresh() {

  if (typeof contactsContainer === 'undefined')
    return;

  if (menu_obj.current != "contacts") {
    contactsContainer.innerHTML = "";
  } else {
    contacts_innerRefresh();
  }

  eventEmitter.dispatchEvent(new Event("contacts_refreshed"));
}

function contacts_innerRefresh() {

  contactsContainer.innerHTML = `
    <div class="flex flex-wrap m-5">
      <a class="mr-5" href="https://t.me/tati_kosm">Telegram</a>
      <i class="fa-solid fa-phone"></i>
      <a href="tel:+79154545556">+7(915)-454-55-56</a>
    </div>

    <script async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Ad679f957c1255a347e856ae9a2865dd8ea8ee95491eb8d192fbb5626cbc3fb6f&amp;width=100%25&amp;height=590&amp;lang=ru_RU&amp;scroll=false"></script>
  `;

  Array.from(contactsContainer.querySelectorAll("script"))
    .forEach(oldScriptElement => {
      const newScriptElement = document.createElement("script");

      Array.from(oldScriptElement.attributes).forEach(attr => newScriptElement.setAttribute(attr.name, attr.value));

      const scriptText = document.createTextNode(oldScriptElement.innerHTML);
      newScriptElement.appendChild(scriptText);

      oldScriptElement.parentNode.replaceChild(newScriptElement, oldScriptElement);
    });
}