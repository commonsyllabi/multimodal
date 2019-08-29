<template>
  <div class="concept-group" :id="index" :concept="index">
    <canvas class="drawing-board" :concept="index"></canvas>
      <div class="prep note title concept-bound" :concept="index">
        {{data.concept}}
      </div>
        <Prep v-for="(prep, index) in data.prep" :data="prep" :key="`prep-${index}`" :course="course"/>
        <Context v-for="(context, index) in data.contexts" :data="context" :key="`context-${index}`"/>
        <Note v-for="(note, index) in data.notes" :data="note" :key="`note-${index}`" @new-note="handleNewNote"/>
        <Writeup v-for="(writeup, index) in data.writeups" :data="writeup" :key="`writeup-${index}`"/>
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
