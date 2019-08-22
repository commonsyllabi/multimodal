<template>
  <div class="concept-group" :id="index" :concept="index">
    <canvas class="drawing-board" :concept="index"></canvas>

    <div>
      <div class="prep note title concept-bound" :concept="index">
        {{data.concept}}
      </div>
      <span v-for="prep in data.prep">
        <Prep :data="prep" :course="course"/>
      </span>

      <span v-for="context in data.contexts">
        <Context :data="context"/>
      </span>

      <span v-for="note in data.notes">
        <Note :data="note" @new-note="handleNewNote"/>
      </span>

      <span v-for="writeup in data.writeups">
        <Writeup :data="writeup"/>
      </span>
    </div>
  </div>
</template>

<script>
import Context from './Context.vue'
import Prep from './Prep.vue'
import Note from './Note.vue'
import Writeup from './Writeup.vue'

export default {
  components: {
    Context,
    Note,
    Writeup,
    Prep
  },
  props: {
    data: {
      type: Object,
      default: {}
    },
    course: {
      type: Object,
      default: {}
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
      currentNote: null
    }
  },
  methods: {
    handleNewNote(el) {
      this.$emit('new-note', el)
    }
  },
  mounted(){
    let root = document.getElementById(this.index)
    root.ondblclick = (e) => {
      if(e.target.getAttribute("concept") == this.index){
        	let els = document.getElementsByClassName('written')
        	for(let el of els)
        		el.removeAttribute('id')

        	if(window.currentNote == null)
            this.data.notes.push({text: ''})
      }
    }
  }
}
</script>
