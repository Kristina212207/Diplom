
/**
 * Возвращает HTML (строку, то есть string)
 */
function inputPiece_render(id, type, placeholder) {

  const classStr = `py-2 px-3 border-orange-500 border-8 hover:border-orange-800 text-orange text-sm font-medium rounded-md shadow focus:outline-none`;

  return `<input id="${id}" type="${type}" placeholder="${placeholder}" class="${classStr}" />`

}