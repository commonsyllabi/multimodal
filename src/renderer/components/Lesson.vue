<template>
  <div>
    <div class="lessons-container">
      <span v-for="(concept, index) in data.concepts">
        <Concept :data="concept" :course="data.course" :index="index" @new-note="handleNewNote" :key="index" :isEdit="isEdit"/>
      </span>
    </div>

    <div class="concept-buttons">
      <Navigation v-for="(concept, index) in data.concepts" :data="concept" :index="index" :key="index"/>
      <div v-if="isEdit">add concept</div>
    </div>
    <div class="interface-buttons">
      <button class="lesson-btn" @click="toggleDraw"> write </button>
      <button class="lesson-btn" @click="clearBoard"> clear </button>
      <button class="lesson-btn" @click="editLesson"> {{isEdit ? "present" : "edit"}} </button>
      <button class="lesson-btn" @click="exitLesson"> exit </button>
      <button class="lesson-btn" @click="saveSession"> save </button>

      <div class="msg-log" id="msg-log"></div>
    </div>
  </div>
</template>

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
      currentConcept: 0,
      previousConcept: 0,
      position: { x: 0, y: 0}
    }
  },
  methods: {
    isScrolledIntoView() {
      let visibleElements = []
      for(let i = 0; i < this.data.concepts.length; i++){
        let el = document.getElementById(i)
        var rect = el.getBoundingClientRect();
        var elemTop = rect.top;
        var elemBottom = rect.bottom;

        let isVisible = elemTop < window.innerHeight*0.9 && elemBottom >= 0;

        if(isVisible)
          visibleElements.push(i)
      }

      if(visibleElements.length == 1)
        window.setCurrentConcept(visibleElements[0])
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

      el.setAttribute('id', 'current')
      el.focus()

      let pos = getGridPosition(this.position)
      window.currentNote.style.left = (pos.x + window.offsets[0])+'px'
      window.currentNote.style.top = (pos.y + window.offsets[1])+'px'
    },
    toggleDraw() {

    },
    clearBoard() {

    },
    editLesson() {
      this.isEdit = !this.isEdit
    },
    exitLesson() {

    },
    saveSession() {

    }
  },
  mounted(){
    drawing.init()
    globals.setCurrentConcept()
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
  		typing.handle(e)
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
