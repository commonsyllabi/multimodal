let canvases, cnv, ctx, ctn, toggle_btn
let contexts = []
let isDrawing = false
let isDrawMode = false
let prevx, prevy

let init = () => {
	canvases = document.getElementsByClassName('drawing-board')
	ctn = document.getElementsByClassName('main-container')[0]
	toggle_btn = document.getElementsByClassName('toggle-draw')[0]

	for(let i in canvases){
		if(i == 'length') break
		setupCanvas(i)
	}

	selectCanvas(0)
}

let setupCanvas = (i) => {

	contexts[i] = canvases[i].getContext('2d')
	canvases[i].width = 1800
	canvases[i].height = 1000
	contexts[i].lineWidth = 5
	contexts[i].lineJoin = 'round'
	contexts[i].lineCap = 'round'
	contexts[i].strokeStyle = '#ff9933'


	contexts[i].beginPath()
}

let selectCanvas = (_page, _concept) => {

	for(let i in canvases){
		if(i == 'length') break
		if(canvases[i].getAttribute('page') == `${_concept}-${_page}`){
			canvases[i].setAttribute('class', 'drawing-board active')
			cnv = canvases[i]
			ctx = contexts[i]
		}else{
			canvases[i].setAttribute('class', 'drawing-board inactive')
		}
	}
}

let beginDraw = (e) => {
	if(!isDrawMode) return

	isDrawing = true
	prevx = e.pageX - cnv.offsetParent.offsetLeft
	prevy = e.pageY - cnv.offsetParent.offsetTop

	ctx.moveTo(prevx, prevy)
}

let draw = (e) => {
	if(!isDrawing || !isDrawMode) return
	let nextx, nexty

	nextx = e.pageX-cnv.offsetParent.offsetLeft
	nexty = e.pageY-cnv.offsetParent.offsetTop
	let x = (prevx + nextx)/2
	let y = (prevy + nexty)/2

	ctx.quadraticCurveTo(prevx, prevy, x, y)

	prevx = e.pageX - cnv.offsetParent.offsetLeft
	prevy = e.pageY - cnv.offsetParent.offsetTop
	ctx.stroke()
}

let endDraw = () => {
	if(!isDrawMode) return
	isDrawing = false
}

let clearBoard = () => {
	ctx.beginPath()
	ctx.clearRect(0, 0, cnv.width, cnv.height)
}

let toggleDraw = (mode) => {
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
