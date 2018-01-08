'use strict'

let currentNote = null

let setCurrentNote = (el) => {
  currentNote = el
}

let getCurrentNote = () => {
  return currentNote
}

let setCurrrentPosition = (pos) => {
  currentNote.style.cssText = "top: "+pos.y+"px; left: "+pos.x+"px;"
  console.log(currentNote.style.cssText);
}

export { currentNote, getCurrentNote, setCurrentNote, setCurrrentPosition}
