let cnv, ctx
let isDrawing = false

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

	isDrawing = true
	ctx.moveTo(e.pageX - cnv.offsetLeft, e.pageY - cnv.offsetTop)
	
	ctx.beginPath()
}

let draw = (e) => {
	if(!isDrawing) return

	//ctx.beginPath()
	ctx.lineTo(e.pageX-cnv.offsetLeft, e.pageY-cnv.offsetTop)
	//ctx.closePath()
	ctx.stroke()
}

let endDraw = (e) => {
	isDrawing = false
}

export { init, beginDraw, draw, endDraw }
