'use strict'

exports = module.exports = {}

let delay = 2000

//------------
//-- set message displays information at the bottom of the screen
//-- and fades out after `delay`
//------------
module.exports.setMessage = (_msg, _type) => {
	console.log(`[MSG] [${_type}] ${_msg}`)
	let el = document.getElementById('msg-log')
	el.innerText = _msg
	el.setAttribute('class', 'msg-log '+_type)
	el.style.opacity = 0.9

	setTimeout(() => {
		el.style.opacity = 0
		setTimeout(() => { el.setAttribute('class', 'msg-log') }, 500)
	}, delay)
}
