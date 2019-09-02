<template>
  <div class="page-group" :id="index" :page="`${concept}-${index}`" :concept="concept">
    <canvas v-if="!isEdit" class="drawing-board" :page="`${concept}-${index}`"></canvas>
    <input type="text" v-if="isEdit" placeholder="page name here" v-model:value="data.concept">
    <div v-else class="prep note title concept-bound" :concept="index">
      {{data.name}}
    </div>

    <Prep v-for="(prep, index) in data.preps" :data="prep" :key="`prep-${index}`" :_id="`prep-${index}`" :course="course" @remove-prep="removePrep(index)" :isEdit="isEdit"/>
    <Context v-for="(context, index) in data.contexts" :data="context" :key="`context-${index}`" :isEdit="isEdit"/>
    <Note v-for="(note, index) in data.notes" :data="note" :key="`note-${index}`" @new-note="handleNewNote" :isEdit="isEdit"/>
    <Writeup :data="data.writeup" :isEdit="isEdit"/>

    <button v-if="isEdit" @click="addPrep('txt')">add text</button>
    <button v-if="isEdit" @click="addPrep('url')">add link</button>
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
    },
    concept: {
      type: Number,
      default: 0
    },
    isEdit: {
      type: Boolean,
      default: false
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
    },
    addPrep(_type) {
      this.data.preps.push({
        "tag": "",
        "text": "",
        "type": _type
      })
    },
    removePrep(i) {
      let a = this.data.preps.slice(0, i)
      let b = this.data.preps.slice(i+1, this.data.preps.length)
      let c = a.concat(b)
      this.data.preps = c
    }
  },
  mounted(){
    let root = this.$el
    root.ondblclick = (e) => {
      if(e.target.getAttribute("concept") == this.index){
        	let els = document.getElementsByClassName('written')
        	for(let el of els)
        		el.removeAttribute('id')

        	if(window.currentNote == null)
            this.data.notes.push({text: null, tag: "", type: "text"})
      }
    }
  }
}
</script>
