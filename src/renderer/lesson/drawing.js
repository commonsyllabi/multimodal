let canvases, cnv, ctx, ctn, toggle_btn
let contexts = []
let isDrawing = false
let isDrawMode = false

let init = () => {
	canvases = document.getElementsByClassName('drawing-board')
	let cnv = canvases[0]
	ctn = document.getElementsByClassName('lessons-container')[0]
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
	contexts[i].strokeStyle = 'red'


	contexts[i].beginPath()
}

let selectCanvas = (_currentConcept) => {

	for(let i in canvases){
		if(i == 'length') break
		if(canvases[i].getAttribute('concept') == _currentConcept){
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
	ctx.moveTo(e.pageX - cnv.offsetLeft, e.pageY - cnv.offsetTop)
	
	//ctx.beginPath()
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

		cnv.setAttribute('class', 'drawing-board active')
		toggle_btn.innerText = 'draw'
		cnv.style.zIndex = 1
		ctn.style.zIndex = 0
	}else{

		cnv.setAttribute('class', 'drawing-board')
		toggle_btn.innerText = 'write'
		cnv.style.zIndex = 0
		ctn.style.zIndex = 1
	}
}

export { init, beginDraw, draw, endDraw, clearBoard, toggleDraw, selectCanvas }
