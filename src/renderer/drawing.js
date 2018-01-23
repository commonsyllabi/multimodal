let cnv, ctx
let isDrawing = false
let isDrawMode = false

let init = () => {
	cnv = document.getElementById('drawing-board')
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

	//ctx.beginPath()
	ctx.lineTo(e.pageX-cnv.offsetLeft, e.pageY-cnv.offsetTop)
	//ctx.closePath()
	ctx.stroke()
}

let endDraw = (e) => {
	if(!isDrawMode) return
	isDrawing = false
}

let clearBoard = () => {
	ctx.clearRect(0, 0, 1800, 1000)
}

let toggleDraw = () => {
	isDrawMode = !isDrawMode
	if(isDrawMode)
		document.getElementsByClassName('toggle-draw')[0].innerText = 'Drawing'
	else
		document.getElementsByClassName('toggle-draw')[0].innerText = 'Writing'
}

export { init, beginDraw, draw, endDraw, clearBoard, toggleDraw }
