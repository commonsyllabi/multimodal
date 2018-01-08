
// import * as typing from './typing.js'

let isTyping = false
let currentNote = null

init = () => {
  document.addEventListener('keydown', (e) => {
    const k = e.key
    console.log('key pressed',e)

    switch (e.keyCode) {
      case 32:
        if(!isTyping)
          newNote()
        else
          handleKey(e.key)
        break;
      case 27:
        endNote()
        break;
      default:
        handleKey(e.key)
        break;
    }

    if(e.keyCode == 32 && !isTyping)
      isTyping = true

    if(e.keyCode == 27)
      isTyping == false
  })
}

newNote = () => {
  currentNote = document.createElement('div')
  currentNote.setAttribute('class', 'note')
  currentNote.setAttribute('id', 'current')
  document.body.append(currentNote)
  isTyping = true
}

endNote = () => {
  currentNote.removeAttribute('id')
  currentNote = null
  isTyping = false
}

handleKey = (char) => {
  currentNote.innerText += char
}
