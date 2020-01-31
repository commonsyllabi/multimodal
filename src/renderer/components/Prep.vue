<template>
  <div class="prep-holder">
    <textarea v-if="this.isEdit" placeholder="your text here">{{data.text}}</textarea>
    <div v-if="!this.isEdit" class="prep" v-html="markdown"></div>
  </div>
</template>

<style scoped lang="scss">
@import '../sass/globals.scss';

textarea{
  background-color: $main-bg-color;
  color: $main-fg-color;
  width: 100%;
  min-height: 50vh;
  font-size: 2em;
  height: auto;
  overflow: visible;
  border-left: 2px solid $main-fg-color;
  padding-left: 10px;
}

button{
    pointer-events: all; //-- always catch the click events
}

.prep-holder{
  position: relative;
  width: 70%;
  margin-top: 5vh;
  margin-left: 10vw;
}

#current{
  position: absolute;
}

.prep, .edit-input{
  position: relative;
  z-index: 2;
  opacity:1;

  font-family: 'Inter UI';
  font-style: italic;
  font-size: 2em;

  @media (max-width: 1300px){
    font-size: 2.5em;
  }

  color: $main-fg-color;
  margin-top: 5vh;
  text-align: left;

  max-width: 50vw;
  line-height: 2em;
}

.prep{
  pointer-events: none;
}

.moved{
  position: absolute;
  pointer-events: all;
}

.text{
  width: 100%;
}

.edit-input{
  position: relative;
  margin: 0;
  font-size: 1em;
  background-color: $main-bg-color;
  border: none;
  border-bottom: 2px solid $main-fg-color;
  pointer-events: all;
}

.file-input{
  font-family: "Inter UI";
  font-size: 0.6em;
  pointer-events: all;
}

.prep-tag-anchor {
  margin-left: 10px;
  font-size: 0.5em;
  cursor: pointer;
}

img{
  max-width: 800px !important;
  max-height: 600px;
  pointer-events: none;
}

.preview{
  max-width: 400px !important;
  max-height: 300px;
  float: left;
}

.add-buttons{
  width: auto;
  float: right;
  margin-top: 5px;

  button, .file-input{
    font-weight: bold;
    color: $main-bg-color;
    background-color: $main-fg-color;
  }
}
</style>

<script>
const ipc = require('electron').ipcRenderer
const marked = require('marked')

export default {
  props: {
    _id: {
      type: String,
      default: ''
    },
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
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      newFile: ''
    }
  },
  computed: {
    markdown: function () {//-- parse the text as markdown and render as html
      this.data.html = marked(this.data.text)
      return this.data.html
    }
  },
  methods: {
    openLink(e){
      e.preventDefault()
      ipc.send('open-url', e.target.href)
    },
    openPath(e){
      e.preventDefault()
      ipc.send('open-path', e.target.href)
    },
    handleFileInput(e) {
      e.preventDefault()
      this.data.src = e.target.files[0].path
      this.data.name = e.target.files[0].name
    },
    handlePathInput(e) {
      e.preventDefault()
      this.data.path = e.target.files[0].path
      this.data.name = e.target.files[0].name
    }
  },
  mounted(){
    if(this.data.type !== 'img')
      return

    let el = this.$el

    el.setAttribute('x', el.offsetLeft)
    el.setAttribute('y', el.offsetTop)

    //-- for notes that have been loaded from previous sessions
    //-- make them reactive to a click
    this.$el.onclick = (evt) => {
			if(evt.target.getAttribute('id') == 'current' || this.isEdit) return
			evt.target.setAttribute('id', 'current')
			evt.target.setAttribute('class', 'prep moved')
			window.currentNote = evt.target
		}
  }
}
</script>
