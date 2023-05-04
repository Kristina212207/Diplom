
let menu_obj = {
  current: "about"
};

function menu_refresh() {

  if (typeof menuContainer === 'undefined')
    return;

  const itemClassStr = `
    font-sans text-xs font-medium leading-tight
    uppercase
    hover:bg-orange-100
    transition-colors duration-700
    text-neutral-500
    my-2 pt-4 pb-3.5 px-7
    cursor-pointer
    select-none
    whitespace-nowrap
  `;
  const itemClass = `class="${itemClassStr}"`;

  menuContainer.innerHTML = `
    <div class="flex flex-wrap">
      <div class="flex items-center grow">
        <img class="max-w-none" src="/vs/site/img/logo.png" />
        <div class="flex flex-col items-center pl-3 whitespace-nowrap">
          <div class="text-base font-medium leading-loose uppercase">ПРОФ-косметик</div>
          <div class="text-sm font-light leading-tight">Профкосметика дома</div>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div id="menu_about" ${itemClass} onclick="menu_about_clicked()">О косметологе</div>
        <div id="menu_services" ${itemClass} onclick="menu_services_clicked()">Мои услуги</div>
        <div id="menu_gallery" ${itemClass} onclick="menu_gallery_clicked()">Мои работы</div> 
        <div id="menu_records" ${itemClass} onclick="menu_records_clicked()">Запись</div>
        <div id="menu_contacts" ${itemClass} onclick="menu_contacts_clicked()">Контакты</div>
      </div>
    </div>    
  `;

  if (menu_obj.current == "about") menu_about.classList.add("border-b-2", "border-green-500");
  else if (menu_obj.current == "services") menu_services.classList.add("border-b-2", "border-green-500");
  else if (menu_obj.current == "gallery") menu_gallery.classList.add("border-b-2", "border-green-500");
  else if (menu_obj.current == "records") menu_records.classList.add("border-b-2", "border-green-500");
  else if (menu_obj.current == "contacts") menu_contacts.classList.add("border-b-2", "border-green-500");


  eventEmitter.dispatchEvent(new Event("menu_refreshed"));
}


function menu_about_clicked() {

  menu_obj.current = "about";

  menu_refresh();
}

function menu_services_clicked() {

  menu_obj.current = "services";

  menu_refresh();
}

function menu_gallery_clicked() {

  menu_obj.current = "gallery";

  menu_refresh();
}

function menu_records_clicked() {

  menu_obj.current = "records";

  menu_refresh();
}

function menu_contacts_clicked() {

  menu_obj.current = "contacts";

  menu_refresh();
}