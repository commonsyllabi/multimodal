'use strict'

import { currentNote, setCurrrentPosition } from './globals.js'

let position = {
	x : 0,
	y: 0
}

let getGridPosition = () =>{
	let normalized_pos = {
		x : 0,
		y : 0
	}

	normalized_pos.x = Math.floor(map(position.x, 0, 1800, 0, 18))*100
	normalized_pos.y = Math.floor(map(position.y, 0, 1000, 0, 25))*40

	return normalized_pos
}

let handle = (event) => {
	position.x = event.pageX
	position.y = event.pageY

	if(currentNote != null){
		setCurrrentPosition(getGridPosition())
	}

}

let map = (value, start_1, end_1, start_2, end_2) => {
	return start_2 + (end_2 - start_2) * (value - start_1) / (end_1 - start_1)
}

export { getGridPosition, handle }
