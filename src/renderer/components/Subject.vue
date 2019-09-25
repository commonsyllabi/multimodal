<template>
  <div>
    <div class="main-container">
      <div v-if="isEdit" class="subject-name">
        <input type="text" name="" v-model:value="data.name">
      </div>
      <!-- <div v-if="!isEdit" class="concept-name">
        {{data.concepts[currentConcept].name}}
      </div> -->
      <span v-for="(concept, index) in data.concepts">
        <Concept class="concept-group" :data="concept" :subject="data.subject" :concept="index" @new-note="handleNewNote" :key="index" :isEdit="isEdit"/>
      </span>
    </div>

    <div class="nav-container">
      <Navigation v-for="(concept, index) in data.concepts" :data="concept" :concept="index" :currentConcept="currentConcept" :key="index" :isEdit="isEdit"
        @add-page="addPage" @remove-page="removePage"
        @add-concept="addConcept" @remove-concept="removeConcept"
        @go-to-concept="goToConcept" @go-to-page="goToPage"/>
    </div>

    <div class="buttons-container">
      <button class="btn" @click="toggleDraw"> {{isDrawing ? "write" : "draw"}} </button>
      <button class="btn" @click="clearBoard"> clear </button>
      <button class="btn" @click="editLesson"> {{isEdit ? "present" : "edit"}} </button>
      <button class="btn" @click="exitLesson"> exit </button>
      <button class="btn" @click="saveSession"> save </button>

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

.subject-name{
  z-index: 5;
  position: absolute;
  left: 0;
  width: 30vw;
  margin: 10px;
  color: $main-fg-color;
}

.subject-name input{
  font-size: 48px;
  padding: 5px;
}

.concept-name{
  position: fixed;
  color: $main-fg-color;
  background-color: $main-bg-color;
  border-bottom: 2px solid $main-fg-color;
  z-index: 3;
  font-size: 1.6em;
  width: 100vw;
  text-align: center;
}

.concept-group{
  height: auto;
  overflow: visible;
  position: relative;
  color: $main-fg-color;
}


//---------------- BUTTONS
.buttons-container {
	position: fixed;
	z-index: 3;
	bottom: 0px;
	left: 0px;
	padding-left: 10px;
	height: 50px;
  line-height: 50px;
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
	height: 95vh;

	background-color: $main-bg-color;
	border-left: 2px solid $main-fg-color;
	color: $main-bg-color;

	overflow-y: scroll;
}
</style>

<script>
import Concept from './Concept.vue'
import Navigation from './Navigation.vue'

const typing = require('../lesson/typing.js')
const drawing = require('../lesson/drawing.js')
const globals = require('../lesson/globals.js')
const utils = require('../utils.js')

const ipc = require('electron').ipcRenderer

export default {
  components: {
    Concept,
    Navigation
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
    isScrolledIntoView() {

      let visibleElements = []
      let pages = document.getElementsByClassName('page-group')
      for(let page of pages){
        let rect = page.getBoundingClientRect();
        let isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        if(isVisible){
          let comp = page.getAttribute('page').split('-')
          visibleElements.push({"page": comp[1], "concept": comp[0]})
        }
      }

      if(visibleElements.length == 1){
        globals.setCurrentConcept(visibleElements[0].concept)
        globals.setCurrentPage(visibleElements[0].page)
      }

    },
    handleMousePosition(evt) {

      this.position = {x: evt.clientX, y: evt.clientY}

    	if(window.currentNote != null){
    		let pos = getGridPosition(this.position)

      	window.currentNote.style.left = (pos.x + window.offsets[0])+'px'
        window.currentNote.style.top = (pos.y + window.offsets[1])+'px'
    	}
    },
    handleNewNote(el) {
      window.currentNote = el

      let els = document.getElementsByClassName('written')
      for(let el of els)
        el.removeAttribute('id')

      el.setAttribute('id', 'current')
      el.focus()


      let pos = getGridPosition(this.position)
      window.currentNote.style.left = (pos.x + window.offsets[0])+'px'
      window.currentNote.style.top = (pos.y + window.offsets[1])+'px'
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
    exitLesson() {
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
    				if(this.data.concepts[i].pages[j].notes[k].text != "" || this.data.concepts[i].pages[j].notes[k].text != null){
              cleaned_notes.push(this.data.concepts[i].pages[j].notes[k])
              this.data.concepts[i].pages[j].notes[k].saved = true
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
            writeups: {"text":""}
          }
        ]
      })

      setTimeout(() => {
        globals.setCurrentConcept(_i+1)
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
  		typing.handle(e, this.data)
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
