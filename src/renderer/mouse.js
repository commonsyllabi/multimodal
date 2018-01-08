'use strict'

import { currentNote, setCurrrentPosition } from './globals.js'

let position = {
	x : 0,
	y: 0
}

let getPosition = () =>{
	return position
}

let handle = (event) => {
	position.x = event.pageX
	position.y = event.pageY

	if(currentNote != null){
		setCurrrentPosition(position)
	}

}

export { getPosition, handle }
