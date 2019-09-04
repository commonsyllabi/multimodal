<template>
  <div class="page-group" :id="index" :page="`${concept}-${index}`" :concept="concept">
    <canvas v-if="!isEdit" class="drawing-board" :page="`${concept}-${index}`"></canvas>
    <input class="edit-input" type="text" v-if="isEdit" placeholder="page name here" v-model:value="data.name">
    <div v-else class="title" :concept="index">
      {{data.name}}
    </div>

    <Prep v-for="(prep, index) in data.preps" :data="prep" :key="`prep-${index}`" :_id="`prep-${index}`" :subject="subject" @remove-prep="removePrep(index)" :isEdit="isEdit"/>
    <Context v-for="(context, index) in data.contexts" :data="context" :key="`context-${index}`" :isEdit="isEdit"/>
    <Note v-for="(note, index) in data.notes" :data="note" :key="`note-${index}`" @new-note="handleNewNote" :isEdit="isEdit"/>
    <Writeup :data="data.writeup" :isEdit="isEdit"/>

    <div v-if="isEdit"class="add-buttons">
      <button @click="addPrep('txt')">add text</button>
      <button @click="addPrep('url')">add link</button>
      <button @click="addPrep('img')">add image</button>
    </div>
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

.active {
	pointer-events: auto;
	cursor: crosshair;
}

.page-group{
  position: relative;
  padding-top: 5%;
  padding-left: 10%;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  border: 2px solid $main-fg-color;
}

.title, .edit-input {
  font-size: 2.3em;
  font-weight: bold;
}

.edit-input{
  color: $main-fg-color;
  background-color: $main-bg-color;
  border-bottom: 2px solid $main-fg-color;
}

.add-buttons{
  width: 100%;
  float: left;
  margin-top: 50px;
}

</style>

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
    subject: {
      type: Object,
      default: () => {}
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
      let p = {}
      switch (_type) {
        case 'txt':
          p = {
            "tag": "",
            "text": "",
            "type": _type
          }
          break;
        case 'url':
          p = {
            "tag": "",
            "text": "",
            "url": "",
            "type": _type
          }
          break;
        case 'img':
          p = {
            "tag": "",
            "name": "",
            "src": "",
            "type": _type
          }
          break;
        default:
          break
      }
      this.data.preps.push(p)
    },
    removePrep(i) {
      let a = this.data.preps.slice(0, i)
      let b = this.data.preps.slice(i+1, this.data.preps.length)
      let c = a.concat(b)
      this.data.preps = c
    }
  },
  mounted(){
    this.$el.ondblclick = (e) => {
      if(window.currentNote == null)
            this.data.notes.push({text: null, tag: "", type: "text"})
    }
  }
}
</script>
