'use strict'

let position = {
  x : 0,
  y: 0
}

let getPosition = () =>{;
  return position
}

let handle = (event) => {
  position.x = event.pageX
  position.y = event.pageY
}

export { getPosition, handle }
