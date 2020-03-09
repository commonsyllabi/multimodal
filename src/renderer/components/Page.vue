<template>
  <div class="page-group" :id="index" :page="`${concept}-${index}`" :concept="concept">

    <!-- CANVAS -->
    <canvas class="drawing-board" :page="`${concept}-${index}`"></canvas>

    <!-- PAGE NAME -->
    <input class="edit-input" type="text" v-if="isEdit" placeholder="page name here" v-model:value="data.name">
    <div v-else class="title" :concept="index">
      {{data.name}}
    </div>

    <!-- ALL PREPS -->
   <Prep v-for="(prep, index) in data.preps" :data="prep" :key="`prep-${index}`" :_id="`prep-${index}`" :subject="subject" :index="index"
     @remove-prep="removePrep(index)"
     @add-prep="addPrep" :isEdit="isEdit"/>

    <!-- ALL NOTES -->
    <Note v-for="(note, index) in data.notes" :data="note" :key="`note-${index}`" @new-note="handleNewNote" :isEdit="isEdit"/>

    <!-- WRITEUP -->
    <Writeup :data="data.writeup" :isEdit="isEdit"/>
  </div>
</template>

<style scoped lang="scss">
@import '../sass/globals.scss';

canvas {
 position: absolute;
 top: 0px;
 left: 0px;
 z-index: -1;
 width: 100%;
 height: 100%;
}

.active {
  visibility: visible;
	pointer-events: auto;
	cursor: crosshair;
  z-index: 3;
}

.inactive{
  visibility: hidden;
}

.page-group{
  position: relative;
  width: 90vw;
  min-height: 105vh;
  overflow: hidden;
  background-color: $main-bg-color;
  margin-bottom: 20vh;
}

.title, .edit-input {
  font-size: 2.5em;
  font-weight: bold;
  margin-top: 10vh;
  margin-left: 10vw;
  width: 70%;
}

.edit-input{
  pointer-events: all;
  color: $main-fg-color;
  background-color: $main-bg-color;
  border: none;
  border-bottom: 2px solid $main-fg-color;
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
    //-----------
    //-- this handles the new-note event from Note
    //-- and passes it on to the Concept
    //-----------
    handleNewNote(el) {
      this.$emit('new-note', el)
    },
    //-----------
    //-- creates new preps
    //-- based on the type
    //-- and at the given index
    //-----------
    addPrep(_data) {
      let p = {}
      switch (_data.type) {
        case 'md':
          p = {
            "tag": "",
            "text": "",
            "type": _data.type
          }
          break;
        case 'space':
          p = {
            "tag": "",
            "text": "",
            "type": _data.type
          }
          break;
        case 'url':
          p = {
            "tag": "",
            "text": "",
            "url": "",
            "type": _data.type
          }
          break;
        case 'img':
          p = {
            "tag": "",
            "name": "",
            "src": "",
            "type": _data.type
          }
          break;
        case 'file':
          p = {
            "tag": "",
            "name": "",
            "path": "",
            "type": _data.type
          }
          break;
        default:
          console.log('Unexpected prep type');
          return
          break
      }
      this.data.preps.splice(_data.index+1, 0, p)
    },
    //-----------
    //-- removes the prep from the given index
    //-----------
    removePrep(_i) {
      let a = this.data.preps.slice(0, _i)
      let b = this.data.preps.slice(_i+1, this.data.preps.length)
      let c = a.concat(b)
      this.data.preps = c
    }
  },
  mounted(){
    //-----------
    //-- sets up the event listener to add new notes
    //-- which will trigger the `new-note` event in Note.vue
    //-----------
    this.$el.ondblclick = (e) => {
      if(window.currentNote == null && !this.isEdit)
              this.data.notes.push({
                text: null,
                tag: "",
                type: "text",
                x: e.clientX,
                y: e.clientY})

    }
  }
}
</script>
