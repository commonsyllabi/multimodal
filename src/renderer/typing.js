'use strict'

import * as mouse from './mouse.js'
import { getCurrentNote, setCurrentNote, setCurrrentPosition } from './globals.js'

const ESC = 69
const BCK = 66
const SPC = 32

let currentNote = null
let floating = true

let handle = (e) => {
  currentNote = getCurrentNote()

  let charCode = e.key.charCodeAt(0)

  if(currentNote == null && charCode != SPC){
    console.log('key pressed',e.key,'with charCode',charCode,'but no note created, ignoring...')
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
	let cn = document.createElement('div')
	cn.setAttribute('class', 'note')
	cn.setAttribute('id', 'current')

	document.body.append(cn)

  setCurrentNote(cn)
  setCurrrentPosition(mouse.getPosition())
}

let endNote = () => {
	currentNote.removeAttribute('id')
	setCurrentNote(null)
}

let handleKey = (char) => {
	currentNote.innerText += char
}

let eraseCharacter = () => {
  currentNote.innerText = currentNote.innerText.slice(0, -1)
}

export { handle }
