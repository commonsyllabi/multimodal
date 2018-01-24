let cnv, ctx, ctn, toggle_btn
let isDrawing = false
let isDrawMode = false

let init = () => {
	cnv = document.getElementById('drawing-board')
	ctn = document.getElementsByClassName('container')[0]
	toggle_btn = document.getElementsByClassName('toggle-draw')[0]
	
	cnv.width = 1800
	cnv.height = 1000
	ctx = cnv.getContext('2d')
	ctx.lineWidth = 5
	ctx.lineJoin = 'round'
	ctx.lineCap = 'round'
	ctx.strokeStyle = 'red'
}

let beginDraw = (e) => {
	if(!isDrawMode) return

	isDrawing = true
	ctx.moveTo(e.pageX - cnv.offsetLeft, e.pageY - cnv.offsetTop)
	
	ctx.beginPath()
}

let draw = (e) => {
	if(!isDrawing || !isDrawMode) return

	ctx.lineTo(e.pageX-cnv.offsetLeft, e.pageY-cnv.offsetTop)
	ctx.stroke()
}

let endDraw = () => {
	if(!isDrawMode) return
	isDrawing = false
}

let clearBoard = () => {
	ctx.clearRect(0, 0, 1800, 1000)
}

let toggleDraw = () => {
	isDrawMode = !isDrawMode
	if(isDrawMode){
		toggle_btn.innerText = 'draw'
		cnv.style.zIndex = 1
		ctn.style.zIndex = 0
	}else{
		toggle_btn.innerText = 'write'
		cnv.style.zIndex = 0
		ctn.style.zIndex = 1
	}
}

export { init, beginDraw, draw, endDraw, clearBoard, toggleDraw }
