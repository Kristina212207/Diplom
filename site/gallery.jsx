eventEmitter.addEventListener("body_refreshed", () => gallery_refresh());
eventEmitter.addEventListener("menu_refreshed", () => gallery_refresh());

function gallery_refresh() {

  if (typeof galleryContainer === 'undefined')
    return;

  if (menu_obj.current != "gallery") {
    galleryContainer.innerHTML = "";
  } else {
    gallery_innerRefresh();
  }

  eventEmitter.dispatchEvent(new Event("gallery_refreshed"));
}

function gallery_innerRefresh() {

  const gallery = [
    {
      img: "/vs/site/img/gal-1.jpg",
      caption: "Домиродлог",
      text: `Никто не винит себя, всегда ищет крайнего.`
    },
    {
      img: "/vs/site/img/gal-2.jpg",
      caption: "Гозмиросул",
      text: `Незачем опасаться новых идей. Бойтесь старых.`
    },
    {
      img: "/vs/site/img/gal-3.jpg",
      caption: "Иросулиска",
      text: `Лучше враг, чем союзник с глупыми высказываниями.`
    },
    {
      img: "/vs/site/img/gal-4.jpg",
      caption: "Илотаточка",
      text: `Одиноким быть нельзя. Ищите свой аналог.`
    },
    {
      img: "/vs/site/img/gal-5.jpg",
      caption: "Лкамочкако",
      text: `Цените мгновения, пока не ушли в архив.`
    },
    {
      img: "/vs/site/img/gal-6.jpg",
      caption: "Ипяндрабок",
      text: `Активный находит время, пассивный – извинительную фразу.`
    },
    {
      img: "/vs/site/img/gal-7.jpg",
      caption: "Асисяндраб",
      text: `Только работая над своими привычками и фразами можно все изменить.`
    },
    {
      img: "/vs/site/img/gal-8.jpg",
      caption: "Змиросулис",
      text: `Только на трудную работу легко устроиться.`
    }
  ];

  let str = "";

  for (let i = 0; i < gallery.length; i++) {
    str = str + gallery_renderCard(gallery[i].img, gallery[i].caption, gallery[i].text);
  }

  galleryContainer.innerHTML = `    
    <div class="flex flex-wrap font-sans font-medium leading-normal">
      ${str}
    </div>
  `;

}

function gallery_renderCard(img, caption, text) {
  return `
    <div class="flex flex-col items-center p-10 w-full md:w-1/2 lg:w-1/4">
      <div class="bg-indigo-800 p-2">
        <img src="${img}" alt="${caption}"/>
      </div>
      <div class="text-lg py-4">${caption}</div>      
      <div class="text-sm lg:text-base">${text}</div>
    </div>
  `;
}

