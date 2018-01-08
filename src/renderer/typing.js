'use strict'

exports = module.exports = {}

const ESC = 69
const BCK = 66
const SPC = 32

let currentNote = null

exports.handleKey = (e) => {
  let charCode = e.key.charCodeAt(0)

  if(currentNote == null && charCode != SPC){
    console.log('key pressed',e.key,'with charCode',charCode, 'but no note created, ignoring...')
    return
  }

  if(charCode == SPC)
    if(currentNote == null)
      newNote()
    else
      handleKey("\u00A0")

  if(charCode > 47 && charCode < 58 || charCode > 96 && charCode < 123)
    handleKey(e.key)

  if(charCode == BCK)
    eraseCharacter()

  if(charCode == ESC)
    endNote()
}

let newNote = () => {
	currentNote = document.createElement('div')
	currentNote.setAttribute('class', 'note')
	currentNote.setAttribute('id', 'current')
	document.body.append(currentNote)
}

let endNote = () => {
	currentNote.removeAttribute('id')
	currentNote = null
}

let handleKey = (char) => {
	currentNote.innerText += char
}

let eraseCharacter = () => {
  currentNote.innerText = currentNote.innerText.slice(0, -1)
}
