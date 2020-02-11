<template>
  <div class="prep-holder">

    <!-- MARKDOWN PREP -->
    <div v-if="data.type == 'md'" class="prep written" :concept="index" :tag="data.tag">
      <textarea class="edit-input text" type="text" v-if="isEdit" placeholder="..." v-model:value="data.text"></textarea>
      <div class="markdown-render" v-else v-html="markdown"></div>
    </div>

    <!-- SPACE PREP -->
    <div v-else-if="data.type == 'space'" :class="isEdit ? 'prep space outline' : 'prep space'">

    </div>

    <!-- FILE PREP -->
    <div v-else-if="data.type == 'file'" class="prep written" :concept="index" :tag="data.tag">
      <input class="file-input" type="file" v-if="isEdit" @change="handlePathInput"></input>
      <a v-else :href="data.path" @click="openPath">{{data.name}}</a>
    </div>

    <!-- IMAGE PREP -->
    <div v-else-if="data.type == 'img'" class="prep" :concept="index" :tag="data.tag">
      <div v-if="isEdit">
        <input class="file-input" type="file" @change="handleFileInput"></input>
        <img class="preview" :src="data.src"/>
      </div>
      <img v-else :name="data.name" :src="data.src"/>
    </div>

    <!-- VIDEO PREP -->
    <div v-else-if="data.type == 'vid'" class="prep written " :concept="index" :tag="data.tag">
      <video max-width="800px" max-height="600px" controls>
        <source :name="data.name" :src="`assets/${subject.name}/lessons/${name}/media/${data.name}`"/>
      </video>
    </div>

    <!-- CONTROLS -->
    <div v-if="isEdit"class="add-buttons">
      <button @click="addPrep('md')">add txt</button>
      <button @click="addPrep('space')">add space</button>
      <button @click="addPrep('img')">add img</button>
      <button @click="addPrep('file')">add file</button>
      <button v-if="isEdit" @click="removePrep">remove</button>
    </div>
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
  pointer-events: all;
}

.space{
  width: 100vw;
  height: 80vh;
  background-color: $main-bg-color;
}

.outline{
  border-left: 3px solid $main-fg-color;
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

  button{
    font-size: 16px;
  }
}
</style>

<script>
const ipc = require('electron').ipcRenderer
const marked = require('marked')

//-- setting links as target="_blank"
let renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
    let link = marked.Renderer.prototype.link.apply(this, arguments);
    return link.replace("<a","<a target='_blank'");
};

marked.setOptions({
    renderer: renderer
});

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
    removePrep() {
      this.$emit('remove-prep', this)
    },
    addPrep(t){
      this.$emit('add-prep', {type:t, index:this.index})
    },
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

    //-- this is commented out to prevent images from moving

    //-- for notes that have been loaded from previous sessions
    //-- make them reactive to a click
    // this.$el.onclick = (evt) => {
		// 	if(evt.target.getAttribute('id') == 'current' || this.isEdit) return
		// 	evt.target.setAttribute('id', 'current')
		// 	evt.target.setAttribute('class', 'prep moved')
		// 	window.currentNote = evt.target
		// }
  }
}
</script>
