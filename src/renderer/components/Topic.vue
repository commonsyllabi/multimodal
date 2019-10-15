<template>
  <div>
    <div class="main-container">
      <input type="text" v-if="isEdit" class="topic-name" v-model:value="data.name"/>
      <Overview :overview="data.overview" :isEdit="isEdit"/>
      <div >
        <input class="concept-name" type="text" :disabled="!isEdit" v-model:value="data.concepts[currentConcept].name"/>
      </div>
      <span v-for="(concept, index) in data.concepts">
        <Concept class="concept-group" :data="concept" :subject="data.subject" :concept="index" @new-note="handleNewNote" :key="index" :isEdit="isEdit"/>
      </span>
    </div>

    <div class="nav-container">
      <Navigation v-for="(concept, index) in data.concepts" :data="concept" :concept="index" :currentConcept="parseInt(currentConcept)" :key="index" :isEdit="isEdit"
        @add-page="addPage" @remove-page="removePage"
        @add-concept="addConcept" @remove-concept="removeConcept"
        @go-to-concept="goToConcept" @go-to-page="goToPage"/>
    </div>

    <div class="buttons-container">
      <button class="btn" @click="toggleDraw"> {{isDrawing ? "write" : "draw"}} </button>
      <button class="btn" @click="clearBoard"> clear </button>
      <button class="btn" @click="editLesson"> {{isEdit ? "present" : "edit"}} </button>
      <button class="btn" @click="saveSession"> save </button>
      <button class="btn right" @click="exitSession"> exit </button>
      <div class="msg-log" id="msg-log"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../sass/globals.scss';

.main-container {
  position: absolute;
	top: 0px;
	left: 0px;
	width: 90vw;
	height: 100%;
	z-index: 0;
  background-color: $main-bg-color;
  font-family: "Inter UI", serif;
  overflow-x: hidden;
}

.topic-name, .concept-name{
  width: 25vw;
  text-align: center;
  right: 10vw;
  height: 45px;
  font-size: 36px;
  padding: 5px;
  background-color: $main-fg-color;
  color: $main-bg-color;
  border: none;
}

.topic-name{
  z-index: 5;
  position: absolute;
  top: 0px;
  right: 0px;
}

.concept-name{
  position: fixed;
  top: 60px;
  width: 15vw;
  height: 30px;
  z-index: 3;
  font-size: 1.6em;
  font-weight: bold;
}

.concept-group{
  height: auto;
  overflow: visible;
  position: relative;
  color: $main-fg-color;
  border-bottom: thick double $main-fg-color;
}


//---------------- BUTTONS
.buttons-container {
	position: fixed;
	z-index: 3;
	bottom: 0px;
	left: 0px;
	padding-left: 10px;
	height: 35px;
  line-height: 35px;
	width: 100%;

	background-color: $main-bg-color;
	border-top: 2px solid $main-fg-color;

	button {
		margin-right: 2%;
    border: none;
	}
}

.btn {
	border: none;
	color: $main-fg-color;
	background-color: $main-bg-color;
  font-size: $btn-size;
	font-family: 'Inter UI';
	cursor: pointer;
  font-size: 1.5em;

  @media (max-width: $break-medium){
		font-size: 1.5em;
	}
}

.btn:hover{
	background-color: $main-bg-color;
	color: $main-fg-color;
}

.btn:active{
	border: none;
}

.exit-lesson, .save-session {
	float: right;
}


//--------------- NAVIGATION
.nav-container{
	position: fixed;
	top: 0px;
	right: 0px;
	min-width: 10%;
	width: 10vw;
	height: 97vh;

	background-color: $main-bg-color;
	border-left: 2px solid $main-fg-color;
	color: $main-bg-color;

	overflow-y: scroll;
}
</style>

<script>
import Concept from './Concept.vue'
import Navigation from './Navigation.vue'
import Overview from './Overview.vue'

const drawing = require('../lesson/drawing.js')
const globals = require('../lesson/globals.js')
const utils = require('../utils.js')

const ipc = require('electron').ipcRenderer

const ESC = 27
const UP = 38
const LEFT = 37
const RIGHT = 39
const DOWN = 40
const ACTIVATE_EDIT = 69 //-- E
const TOGGLE_DRAW = 68 //-- D
const CLEAR_DRAW = 67 //-- C

export default {
  components: {
    Concept,
    Navigation,
    Overview
  },
  data: function () {
    return {
      data: null,
      isEdit: false,
      isDrawing: false,
      currentPage: 0,
      previousPage: 0,
      currentConcept: 0,
      position: { x: 0, y: 0},
      lessonSaved: false
    }
  },
  methods: {
    //-----------------------------------
    //-- checks whether an element has been scrolled into view,
    //-- which is used for higlighting the current page and the current concept
    //-----------------------------------
    isScrolledIntoView() {
      let visibleElements = []
      let pages = document.getElementsByClassName('page-group')
      for(let page of pages){
        let rect = page.getBoundingClientRect();
        let isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        //-- this extracts the concept and page of any element in view
        if(isVisible){
          let comp = page.getAttribute('page').split('-')
          visibleElements.push({"page": comp[1], "concept": comp[0]})
        }
      }

      //-- if there is only one element in view, set its concept and page as the current ones
      if(visibleElements.length == 1){
        globals.setCurrentConcept(visibleElements[0].concept)
        globals.setCurrentPage(visibleElements[0].page)
      }
    },
    //-----------------------------------
    //-- handles the keyinputs, mostly used for one-key shortcuts
    //-----------------------------------
    handle(e){
    	let cn = window.currentNote
    	let page, concept
    	switch(e.keyCode){
    	case UP: //-- go to previous page
    		if(!cn && !this.isEdit){
    			e.preventDefault()
    			page = globals.getCurrentPage()
    			concept = globals.getCurrentConcept()
    			if(page > 0){
    				page--
    			}else{
    				//-- check for concept overflow
    				if(concept > 0)
    					concept--
    				else
    					concept = 0

    				page = data.concepts[concept].pages.length - 1
    			}

    			globals.setCurrentConcept(concept)
    			globals.setCurrentPage(page, true)
    		}
    		break
    	case DOWN: //-- go to following page
    		if(!cn && !this.isEdit){
    			e.preventDefault()
    			page = globals.getCurrentPage()
    			concept = globals.getCurrentConcept()
    			if(page < data.concepts[concept].pages.length-1){
    				page++
    			}else{
    				page = 0
    				//-- check for concept overflow
    				if(concept < data.concepts.length-1)
    					concept++
    				else
    					concept = 0
    			}

    			globals.setCurrentConcept(concept)
    			globals.setCurrentPage(page, true)
    		}
    		break
    	case LEFT: //-- go to previous page
    		if(!cn && !this.isEdit){
    			concept = globals.getPreviousConcept()
    			page = globals.getPreviousPage()

    			globals.setCurrentConcept(concept)
    			globals.setCurrentPage(page, true)
    		}
    		break
    	case RIGHT: //-- jump to the scrapboard
    		if(!cn && !this.isEdit){
    			concept = document.getElementsByClassName('concept-group').length-1

    			globals.setCurrentConcept(concept)
    			globals.setCurrentPage(0, true)
    		}
    		break
      case ACTIVATE_EDIT: //-- turn edit on, turn off with ESC
        if(!cn)
        this.isEdit = true
        break
      case TOGGLE_DRAW: //-- toggle draw on
        if(!this.isEdit)
          this.toggleDraw()
        break
      case CLEAR_DRAW:
        if(!this.isEdit)
          drawing.clearBoard()
        break
    	case ESC: //-- stop editing the current note
    		if(cn)
    			this.endNote(cn)
        else if(this.isEdit) //-- stop editing the current topic
          this.isEdit = false
    		break
    	default:
    		break
    	}
    },
    //---------------------
    //-- takes care of removing the current status of the note
    //-- and setting it as regular note
    //---------------------
    endNote(el){
    	//-- if note is left blank, remove it from the DOM (it is removed from the data structure on save)
    	if(el.value == ''){
    		el.style.display = 'none'
    		el.parentNode.removeChild(el)
    	}else{ //-- else position it correctly
    		el.style.height = (el.scrollHeight)+'px'
    	}

    	el.blur()
    	el.removeAttribute('id')

      //-- attach the listener to make it interactable again as the current note
    	el.onclick = (evt) => {
    		if(evt.target.getAttribute('id') == 'current') return
    		evt.target.setAttribute('id', 'current')
    		window.currentNote = evt.target
    	}

    	window.currentNote = null
    },
    //---------------------
    //-- handles the mouse position and stores it
    //-- if necessary, sets the current mouse position as the current note position
    //--------------------
    handleMousePosition(evt) {
      //-- always save the mouse position
      this.position = {x: evt.clientX, y: evt.clientY}

      if(!window.currentNote)
        return

  		let pos = getGridPosition(this.position)

      window.currentNote.style.left = Math.max(pos.x, 0)+'px'
      window.currentNote.style.top = Math.max(pos.y, 0)+'px'
    },
    handleNewNote(el, evt) {
      window.currentNote = el

      let els = document.getElementsByClassName('written')
      for(let el of els)
        el.removeAttribute('id')

      el.setAttribute('id', 'current')
      el.focus()

      let pos = getGridPosition(this.position)
      window.currentNote.style.left = Math.max(pos.x, 0)+'px'
      window.currentNote.style.top = Math.max(pos.y, 0)+'px'
    },
    toggleDraw() {
      this.isDrawing = !this.isDrawing
      drawing.toggleDraw(this.isDrawing)
    },
    clearBoard() {
      drawing.clearBoard()
    },
    editLesson() {
      this.isEdit = !this.isEdit
    },
    exitSession() {
      if(!this.lessonSaved)
        msgbox.setMessage("it seems you haven\'t saved this session. would you still like quit?", [{fn: () => {ipc.send('exit-home', {'coming':'back'})}, name: "exit"}], null, true)
      else
        ipc.send('exit-home', {'coming':'back'})
    },
    saveSession() {
      utils.setMessage('saving...', 'info')
      for(let i = 0; i < this.data.concepts.length; i++){
    		for(let j = 0; j < this.data.concepts[i].pages.length; j++){
    			let cleaned_notes = []
    			for(let k = 0; k < this.data.concepts[i].pages[j].notes.length; k++){
            if(this.data.concepts[i].pages[j].notes[k].text != null){
              if(this.data.concepts[i].pages[j].notes[k].text.length > 0){
                cleaned_notes.push(this.data.concepts[i].pages[j].notes[k])
                this.data.concepts[i].pages[j].notes[k].saved = true
              }
            }
    			}

    			this.data.concepts[i].pages[j].notes = cleaned_notes
    		}
    	}

			ipc.send('save-topic', this.data)
      this.lessonSaved = true
    },
    addPage(_i) {
      this.data.concepts[_i.concept].pages.splice(_i.page+1, 0, {
        name: "new page",
        tag: "",
        preps: [{
          "tag": "",
          "text": "",
          "type": "txt"
        }],
        notes: [],
        writeup: {"text":""}
      })

      setTimeout(() => {
        globals.setCurrentConcept(_i.concept)
        globals.setCurrentPage(_i.page+1, true)
      }, 200)

    },
    removePage(_i) {
      this.data.concepts[_i.concept].pages.splice(_i.page, 1)
    },
    addConcept(_i) {
      this.data.concepts.splice(_i+1, 0, {
        name: "new concept",
        context: {"text":""},
        pages: [
          {
            name: "new page",
            tag: "",
            preps: [{
              "tag": "",
              "text": "",
              "type": "txt"
            }],
            notes: [],
            writeup: {"text":""}
          }
        ]
      })

      setTimeout(() => {
        globals.setCurrentConcept(_i+1)
        this.currentConcept = window.currentConcept
        globals.setCurrentPage(0, true)
      }, 200)
    },
    removeConcept(_i) {
      this.data.concepts.splice(_i, 1)
    },
    goToConcept(c){
      globals.setCurrentConcept(c)
      globals.setCurrentPage(0, true)
      this.currentConcept = c
    },
    goToPage(d){
      globals.setCurrentPage(d.page, true)
    }
  },
  mounted(){
    drawing.init()
    globals.setCurrentPage(0, 0)
    globals.initTags()


    document.addEventListener('wheel', (e) => {
      this.isScrolledIntoView()
      this.handleMousePosition(e)

      this.currentConcept = window.currentConcept
    })

    window.addEventListener('mousedown', (e) => {
  		drawing.beginDraw(e)
  	})

    window.addEventListener('mousemove', (e) => {
  		this.handleMousePosition(e)
  		drawing.draw(e)
  	})

    window.addEventListener('mouseup', () => {
      drawing.endDraw()
    })

    window.addEventListener('keydown', (e) => {
  		this.handle(e, this.data)
      this.currentConcept = window.currentConcept
  	})

    document.title = `Multimodal | ${data.name}`

  },
  beforeMount() {
    this.data = window.data
    this.currentConcept = window.currentConcept
  },
  afterMount(){
    setTimeout(() => {this.currentNote = null}, 100)

  }
}

let getGridPosition = (p) =>{
	let normalized_pos = {
		x : 0,
		y : 0
	}

	normalized_pos.x = Math.floor(map(p.x, 0, 1800, 0, 36))*50
	normalized_pos.y = Math.floor(map(p.y, 0, 1000, 0, 50))*20

	return normalized_pos
}

let map = (value, start_1, end_1, start_2, end_2) => {
	return start_2 + (end_2 - start_2) * (value - start_1) / (end_1 - start_1)
}
</script>
