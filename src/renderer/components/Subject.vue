<template>
  <div>
    <div class="main-container">
      <span v-for="(concept, index) in data.concepts">
        <Concept class="concept-group" :data="concept" :course="data.course" :concept="index" @new-note="handleNewNote" :key="index" :isEdit="isEdit"/>
      </span>
    </div>

    <div class="nav-container">
      <Navigation v-for="(concept, index) in data.concepts" :data="concept" :concept="index" :key="index" :isEdit="isEdit"
        @add-page="addPage" @remove-page="removePage"
        @add-concept="addConcept" @remove-concept="removeConcept"/>
    </div>

    <div class="buttons-container">
      <button class="lesson-btn" @click="toggleDraw"> {{isDrawing ? "write" : "draw"}} </button>
      <button class="lesson-btn" @click="clearBoard"> clear </button>
      <button class="lesson-btn" @click="editLesson"> {{isEdit ? "present" : "edit"}} </button>
      <button class="lesson-btn" @click="exitLesson"> exit </button>
      <button class="lesson-btn" @click="saveSession"> save </button>

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
}


//---------------- BUTTONS
.buttons-container {
	position: fixed;
	z-index: 3;
	bottom: 0px;
	left: 0px;
	padding-left: 10px;
	height: 5vh;
	width: 100%;

	background-color: $main-bg-color;
	border-top: 2px solid $main-fg-color;

	button {
		margin-right: 2%;
    border: none;
	}
}

.lesson-btn {
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

.lesson-btn:hover{
	background-color: $main-bg-color;
	color: $main-fg-color;
}

.lesson-btn:active{
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
	height: 100%;

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
      position: { x: 0, y: 0}
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
      evt.preventDefault()

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

    },
    editLesson() {
      this.isEdit = !this.isEdit
    },
    exitLesson() {

    },
    saveSession() {

    },
    addPage(_i) {
      this.data.concepts[_i.concept].pages.splice(_i.page+1, 0, {
        name: "new page",
        tag: "",
        preps: [{
          "tag": "",
          "text": "type here",
          "type": "txt"
        }],
        notes: [],
        writeups: ""
      })

      globals.setCurrentConcept(_i.concept)
      globals.setCurrentPage(_i.page+1, true)
    },
    removePage(_i) {
      this.data.concepts[_i.concept].pages.splice(_i.page, 1)
    },
    addConcept(_i) {
      this.data.concepts.splice(_i+1, 0, {
        name: "new concept",
        context: "",
        pages: [
          {
            name: "new page",
            tag: "",
            preps: [{
              "tag": "",
              "text": "type here",
              "type": "txt"
            }],
            notes: [],
            writeups: ""
          }
        ]
      })

      globals.setCurrentConcept(_i+1)
      globals.setCurrentPage(0, true)
    },
    removeConcept(_i) {
      this.data.concepts.splice(_i, 1)
    }
  },
  mounted(){
    drawing.init()
    globals.setCurrentPage(0, 0)
    globals.initTags()

    document.addEventListener('scroll', (e) => {
      this.isScrolledIntoView()
      this.handleMousePosition(e)
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
  	})
  },
  beforeMount() {
    this.data = window.data
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
