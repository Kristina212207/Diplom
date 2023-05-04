eventEmitter.addEventListener("main_refreshed", () => footer_refresh());

function footer_refresh() {

  if (typeof footerContainer === 'undefined')
    return;

  footerContainer.innerHTML = `
    <div class="flex bg-orange-300 bg-gradient-to-tl" style="background-image: url('/vs/site/img/footer-bg.jpg')">
      <div class="flex flex-col px-7 self-center bg-orange-300/60 font-medium whitespace-nowrap">
        <div>Контакты</div>
        <div>г. Москва, ул. Братская, д. 23, корп. 3</div>
        <div>
          <i class="fa-solid fa-phone"></i>
          <a href="tel:+79154545556">+7(915)-454-55-56</a>
        </div>
        <div>
          <a href="https://t.me/tati_kosm">Telegram</a>
        </div>
      </div>
      <div class="flex flex-row-reverse grow h-32 overflow-hidden">
        <img class="max-w-none" src="/vs/site/img/footer-1.jpg"/>
        <img class="max-w-none" src="/vs/site/img/footer-2.jpg"/>
        <img class="max-w-none" src="/vs/site/img/footer-3.jpg"/>
        <img class="max-w-none" src="/vs/site/img/footer-4.jpg"/>
      </div>
    </div>
  `;

  eventEmitter.dispatchEvent(new Event("footer_refreshed"));
}