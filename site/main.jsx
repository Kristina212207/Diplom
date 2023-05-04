
function main_refresh() {

  if (typeof mainContainer === 'undefined')
    return;

  mainContainer.innerHTML = `
    <div>
      <div id="menuContainer"></div>
      <div id="loginContainer"></div>
      <div id="bodyContainer"></div>
      <div id="footerContainer"></div>
    </div>
  `;

  eventEmitter.dispatchEvent(new Event("main_refreshed"));
}