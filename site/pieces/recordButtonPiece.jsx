
/**
 * Возвращает HTML (строку, то есть string)
 */
function recordButtonPiece_render(value, onclick, isFree, isOurs) {

  let classS = `py-2 px-3 text-sm rounded-md shadow focus:outline-none text-white`;

  if (isFree) {
    classS += " bg-orange-500 hover:bg-orange-800 text-white font-semibold";
  } else {

    if (isOurs) {
      classS += " font-semibold bg-green-500 hover:bg-green-800";
    } else {
      classS += " font-bold bg-yellow-500 hover:bg-yellow-800";
    }

  }

  return `<button onclick="${onclick}" class="${classS} m-1">${value}</button>`

}