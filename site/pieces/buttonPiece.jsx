
/**
 * Возвращает HTML (строку, то есть string)
 */
function buttonPiece_render(type, value, onclick) {

  const classS = `py-2 px-3 bg-orange-500 hover:bg-orange-800 text-white text-sm font-semibold rounded-md shadow focus:outline-none`;

  return `<input type="${type}" value="${value}" onclick="${onclick}" class="${classS}" />`

}