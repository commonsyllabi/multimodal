<template>
  <div>

    <!-- MAIN AREA -->
    <div class="main-container">
      <input type="text" v-if="isEdit" class="topic-name" v-model:value="data.name"/>
      <Overview :overview="data.overview" :isEdit="isEdit"/>
      <div >
        <input class="concept-name" type="text" :disabled="!isEdit" v-model:value="data.concepts[currentConcept].name"/>
      </div>
      <span v-for="(concept, index) in data.concepts">
        <h1 class="concept-break">{{concept.name}}</h1>
        <Concept class="concept-group" :data="concept" :subject="data.subject" :concept="index" @new-note="handleNewNote" :key="index" :isEdit="isEdit"/>
      </span>
    </div>

    <!-- NAVIGATION -->
    <div class="nav-container">
      <Navigation v-for="(concept, index) in data.concepts" :data="concept" :concept="index" :currentConcept="parseInt(currentConcept)" :key="index" :isEdit="isEdit"
        @add-page="addPage" @remove-page="removePage"
        @add-concept="addConcept" @remove-concept="removeConcept"
        @go-to-concept="goToConcept" @go-to-page="goToPage"/>
    </div>

    <!-- MESSAGE LOG -->
    <div class="msg-log" id="msg-log">saved</div>

  </div>
</template>

<style scoped lang="scss">
@import '../sass/globals.scss';

canvas {
 position: absolute;
 top: 0px;
 left: 0px;
 z-index: 1;
 width: 100%;
 height: 100%;
}

.main-container {
  font-family: "Inter UI", serif;
  position: absolute;
	top: 0px;
	left: 0px;
	width: 90vw;
	height: 100%;
	z-index: 0;
  background-color: $main-bg-color;
  overflow-x: hidden;
}

//-- TOPIC AND CONCEPT OVERLAYS
.topic-name, .concept-name{
  text-align: center;

  padding: 5px;
  background-color: $main-fg-color;
  color: $main-bg-color;
  border: 4px solid $main-bg-color;
}

.topic-name{
  position: fixed;
  bottom: 0px;
  left: 0px;
  z-index: 5;

  width: 25vw;
  height: 45px;
  font-size: 2em;
}

.concept-name{
  position: fixed;
  top: 60px;
  right: 10vw;
  z-index: 3;

  width: 15vw;
  height: 30px;
  font-size: 1.6em;
  font-weight: bold;
}

.concept-break{
  width: 100%;
  background-color: $main-fg-color;
  color: $main-bg-color;
  text-align: center;
  margin-top: 0;
  padding: 10px 0px 10px 0px;
}

.concept-group{
  height: auto;
  overflow: visible;
  position: relative;
  color: $main-fg-color;
}


//-- MESSAGE BOX
.msg-log {
  position: fixed;
  z-index: 4;

  width: 100vw;
  height: 4vh;

  bottom: 0px;
  left: 0px;
}

//-- NAVIGATION
.nav-container{
  font-family: "Inter UI";
	position: fixed;
	top: 0px;
	right: 0px;
  z-index: 3;
	min-width: 10%;
	width: 10vw;
	height: 100vh;

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
      topicSaved: false
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
          e.preventDefault()
    			concept = globals.getPreviousConcept()
    			page = globals.getPreviousPage()

    			globals.setCurrentConcept(concept)
    			globals.setCurrentPage(page, true)
    		}
    		break
    	case RIGHT: //-- jump to the scrapboard
    		if(!cn && !this.isEdit){
          e.preventDefault()
    			concept = document.getElementsByClassName('concept-group').length-1

    			globals.setCurrentConcept(concept)
    			globals.setCurrentPage(0, true)
    		}
    		break
    	case ESC: //-- stop editing the current note
    		if(cn)
    			this.endNote(cn)
        else if(this.isEdit){
          this.isEdit = false
          drawing.selectCanvas(this.currentPage, this.currentConcept)
        } //-- stop editing the current topic

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
      this.topicSaved = false

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
    //------------
    //-- takes an element from the Note component
    //-- sets it as the currentNote globally
    //-- removes any other possible currentNote
    //-- styles it and positions it
    //------------
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
    //------------
    //-- toggles draw mode
    //------------
    toggleDraw() {
      this.isDrawing = !this.isDrawing
      drawing.toggleDraw(this.isDrawing)
    },
    //------------
    //-- clears board
    //------------
    clearBoard() {
      drawing.clearBoard()
    },
    //------------
    //-- toggles edit
    //-- if we exit edit mode, sets the topic as unsaved
    //------------
    editTopic() {
      this.isEdit = !this.isEdit
      this.isDrawing = false
      drawing.toggleDraw(this.isDrawing)
      if(!this.isEdit) this.topicSaved = false
    },
    //------------
    //-- exits topic
    //-- prompts to save if there are unsaved changes
    //-- unsaved changes
    //------------
    exitTopic() {
      console.log('exiting with topic saved:', this.topicSaved);
      if(!this.topicSaved)
        msgbox.setMessage("it seems you haven\'t saved this session. would you still like quit?", [{fn: () => {ipc.send('exit-home', {'coming':'back'})}, name: "exit"}], null, true)
      else
        ipc.send('exit-home', {'coming':'back'})
    },
    //------------
    //-- save topic
    //-- checks for all empty notes and skips them
    //-- sets all the remaining notes as `saved`
    //-- sets them as the data notes
    //-- sends the data back to the main process
    //------------
    saveTopic() {
      utils.setMessage('saving...', 'info')
      for(let i = 0; i < this.data.concepts.length; i++){
    		for(let j = 0; j < this.data.concepts[i].pages.length; j++){
    			let cleaned_notes = []
    			for(let k = 0; k < this.data.concepts[i].pages[j].notes.length; k++){
            if(this.data.concepts[i].pages[j].notes[k].text != null){
              if(this.data.concepts[i].pages[j].notes[k].text.length > 0){
                this.data.concepts[i].pages[j].notes[k].saved = true
                cleaned_notes.push(this.data.concepts[i].pages[j].notes[k])
              }
            }
    			}

    			this.data.concepts[i].pages[j].notes = cleaned_notes
    		}
    	}

			ipc.send('save-topic', this.data)
      this.topicSaved = true
    },
    //------------
    //-- adds a new page
    //-- including one default prep
    //-- and the writeup
    //-- then sets it as the current page to scroll into view
    //------------
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
        writeup: {
          "text":"",
          "links": ""
        }
      })

      setTimeout(() => {
        globals.setCurrentConcept(_i.concept)
        globals.setCurrentPage(_i.page+1, true)
      }, 200)

    },
    //------------
    //-- removes the page from the data array
    //------------
    removePage(_i) {
      this.data.concepts[_i.concept].pages.splice(_i.page, 1)
    },
    //------------
    //-- adds a new concept
    //-- including a new page and context
    //-- then sets it as the current concept to scroll into view
    //------------
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
            writeup: {
              "text":"",
              "links":""
            }
          }
        ]
      })

      setTimeout(() => {
        globals.setCurrentConcept(_i+1)
        this.currentConcept = window.currentConcept
        globals.setCurrentPage(0, true)
      }, 200)
    },
    //------------
    //-- removes the ceoncept from the data array
    //------------
    removeConcept(_i) {
      this.data.concepts.splice(_i, 1)
    },
    //------------
    //-- on click from the navigation panel
    //-- goes to the specified concept
    //-- this.currentConcept is used in the attributes of HTML elements
    //------------
    goToConcept(c){
      globals.setCurrentConcept(c)
      globals.setCurrentPage(0, true)
      this.currentConcept = c
    },
    //------------
    //-- idem
    //------------
    goToPage(d){
      globals.setCurrentPage(d.page, true)
    }
  },
  //------------
  //-- initiates the canvases, tags and current pages
  //-- sets up the event listeners
  //-- sets the window title
  //------------
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
  //------------
  //-- before rendering anything,
  //-- cleans up some data
  //-- this is mostly used for backwards compatibility
  //------------
  beforeMount() {
    this.data = window.data
    for(let concept of this.data.concepts)
        concept.context.links = concept.context.links == undefined ? [] : concept.context.links

    this.data.overview = this.data.overview ? this.data.overview : {"text":""}

    this.currentConcept = window.currentConcept
  }
}

//------------
//-- returns a normalized position
//-- for snapping notes to a grid
//------------
let columns = 36
let columns_step = 50
let rows = 50
let rows_step = 20
let getGridPosition = (p) =>{
	let normalized_pos = {
		x : 0,
		y : 0
	}

	normalized_pos.x = Math.floor(map(p.x, 0, 1800, 0, columns))*columns_step
	normalized_pos.y = Math.floor(map(p.y, 0, 1000, 0, rows))*rows_step

	return normalized_pos
}

//------------
//-- helper function
//-- for mapping one value from one range to another
//------------
let map = (value, start_1, end_1, start_2, end_2) => {
	return start_2 + (end_2 - start_2) * (value - start_1) / (end_1 - start_1)
}
</script>
