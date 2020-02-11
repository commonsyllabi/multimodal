let canvases, cnv, ctx, ctn
let contexts = []
let isDrawing = false
let isDrawMode = false
let prevx, prevy
let orange = '#ff9933'

//------------
//-- finds all the <canvas> and sets them up
//-- finds the main container
//-- resets the attributes of all canvases
//-- sets the first canvas
//------------
let init = () => {
	canvases = document.getElementsByClassName('drawing-board')
	ctn = document.getElementsByClassName('main-container')[0]

	for(let i in canvases){
		if(i == 'length') break
		setupCanvas(i)
	}

	selectCanvas(0, 0)
	cnv = canvases[0]
	ctx = contexts[0]
}

//------------
//-- gets the context
//-- sets up the size
//-- appearance of stroke
//-- and clears it up
//------------
let setupCanvas = (_i) => {
	contexts[_i] = canvases[_i].getContext('2d')
	canvases[_i].width = 1800
	canvases[_i].height = 1000
	canvases[_i].style.pointerEvents = 'none'

	contexts[_i].lineWidth = 5
	contexts[_i].lineJoin = 'round'
	contexts[_i].lineCap = 'round'
	contexts[_i].strokeStyle = orange

	contexts[_i].clearRect(0, 0, canvases[_i].height, canvases[_i].width)
}

//------------
//-- takes a page and a concept number
//-- find the corresponding canvas
//-- activates it for drawing
//------------
let selectCanvas = (_page, _concept) => {
	if(!_page){
		console.log(`_page is not defined: ${_page}`)
		return
	} 

	for(let i in canvases){
		if(i == 'length') break
		if(canvases[i].getAttribute('page') == `${_concept}-${_page}`){
			canvases[i].setAttribute('class', 'drawing-board active')
			cnv = canvases[i]
			ctx = contexts[i]
			console.log('3 - SETTING CANVAS', _page, _concept)
			break
		}else{
			canvases[i].setAttribute('class', 'drawing-board')
		}
	}
}

//------------
//-- handles the drawing
//-- takes into account the difference in scale
//-- thank god: https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas#17130415
//------------
let beginDraw = (_e) => {
	if(!isDrawMode) return

	isDrawing = true
	let rect = cnv.getBoundingClientRect()
	let scaleX = cnv.width / rect.width
	let scaleY = cnv.height / rect.height

	prevx = (_e.clientX - rect.left) * scaleX
	prevy = (_e.clientY - rect.top) * scaleY

	ctx.moveTo(prevx, prevy)
}

let draw = (_e) => {
	let rect = cnv.getBoundingClientRect()
	let scaleX = cnv.width / rect.width
	let scaleY = cnv.height / rect.height

	if(!isDrawing || !isDrawMode) return

	let x = (_e.clientX - rect.left) * scaleX
	let y = (_e.clientY - rect.top) * scaleY

	ctx.beginPath()
	ctx.moveTo(prevx, prevy)
	ctx.lineTo(x, y)
	ctx.closePath()
	ctx.stroke()

	prevx = x
	prevy = y
}

let endDraw = () => {
	if(!isDrawMode) return
	isDrawing = false
}

let clearBoard = () => {
	ctx.beginPath()
	ctx.clearRect(0, 0, cnv.width, cnv.height)
}

//------------
//-- toggles draw mode
//-- and switches the index of the canvas and the main-container
//------------
let toggleDraw = (mode) => {
	console.log('toggling draw:', mode);
	isDrawMode = mode
	if(isDrawMode){
		cnv.setAttribute('class', 'drawing-board active')
		cnv.style.zIndex = 1
		ctn.style.zIndex = 0
	}else{
		cnv.setAttribute('class', 'drawing-board')
		cnv.style.zIndex = 0
		ctn.style.zIndex = 1
	}
}

export { init, beginDraw, draw, endDraw, clearBoard, toggleDraw, selectCanvas }
