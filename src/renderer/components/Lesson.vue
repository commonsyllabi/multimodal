<template>
  <div>
    <div class="lessons-container">
      <span v-for="(concept, index) in data.concepts">
        <Concept :data="concept" :course="data.course" :index="index" @new-note="handleNewNote"/>
      </span>
    </div>

    <div class="concept-buttons">
      <Navigation v-for="(concept, index) in data.concepts" :data="concept" :index="index"/>
    </div>
  </div>
</template>

<script>
import Concept from './Concept.vue'
import Navigation from './Navigation.vue'

const typing = require('../lesson/typing.js')

export default {
  components: {
    Concept,
    Navigation
  },
  data: function () {
    return {
      data: null,
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
      this.position = {x: evt.clientX, y: evt.clientY}

    	if(window.currentNote != null){
    		let pos = getGridPosition(this.position)
        window.currentNote.style.top = pos.y+'px'
      	window.currentNote.style.left = pos.x+'px'
    	}
    },
    handleNewNote(el) {
      window.currentNote = el
      el.setAttribute('id', 'current')
      e.focus()

      let pos = getGridPosition(this.position)
      window.currentNote.style.top = pos.y+'px'
      window.currentNote.style.left = pos.x+'px'
    }
  },
  mounted(){
    document.addEventListener('scroll', this.isScrolledIntoView)

    window.addEventListener('mousemove', (e) =>{
  		this.handleMousePosition(e)
  		window.draw(e)
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

	normalized_pos.x = Math.floor(map(p.x, 0, 1800, 0, 18))*100
	normalized_pos.y = Math.floor(map(p.y, 0, 1000, 0, 25))*40

	return normalized_pos
}

let map = (value, start_1, end_1, start_2, end_2) => {
	return start_2 + (end_2 - start_2) * (value - start_1) / (end_1 - start_1)
}
</script>
