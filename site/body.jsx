
eventEmitter.addEventListener("main_refreshed", () => body_refresh());

function body_refresh() {

  if (typeof bodyContainer === 'undefined')
    return;

  bodyContainer.innerHTML = `
    <div id="aboutContainer"></div>
    <div id="servicesContainer"></div>
    <div id="galleryContainer"></div>
    <div id="recordsContainer"></div>
    <div id="contactsContainer"></div>
  `;

  eventEmitter.dispatchEvent(new Event("body_refreshed"));
}