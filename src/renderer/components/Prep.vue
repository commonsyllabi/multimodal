<template>

  <div class="prep-holder">
    <div v-if="data.type == 'txt'" class="prep written" :concept="index" :tag="data.tag">
      <input class="edit-input text" type="text" v-if="isEdit" placeholder="..." v-model:value="data.text">
      <span v-else>{{data.text}}</span>
    </div>

    <div v-else-if="data.type == 'url'" class="prep written" :concept="index" :tag="data.tag">
      <input class="edit-input" type="text" v-if="isEdit" placeholder="resource text" v-model:value="data.text">
      <input class="edit-input" type="text" v-if="isEdit" placeholder="resource link" v-model:value="data.url">
      <a v-else :href="data.url" @click="openLink" target="_blank">{{data.text}}</a>
    </div>

    <div v-else-if="data.type == 'img'" class="prep moveable" :concept="index" :tag="data.tag">
      <div v-if="isEdit">
        <input type="file" @change="handleFileInput"></input>
        <img class="preview" :src="data.src"/>
      </div>
      <img v-else :name="data.name" :src="data.src"/>
    </div>

    <div v-else-if="data.type == 'vid'" class="prep written " :concept="index" :tag="data.tag">
      <video max-width="800px", max-height="600px" controls>
        <source :name="data.name" :src="`assets/${subject.name}/lessons/${name}/media/${data.name}`"/>
      </video>
    </div>


    <div v-if="isEdit"class="add-buttons">
      <button @click="addPrep('txt')">txt</button>
      <button @click="addPrep('url')">url</button>
      <button @click="addPrep('img')">img</button>
      <button v-if="isEdit" @click="removePrep">-</button>
    </div>
  </div>

</template>

<style scoped lang="scss">
@import '../sass/globals.scss';

.prep-holder{
  width: 50vw;
  margin-left: 10vw;
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

.text{
  width: 100%;
}

.edit-input{
  margin: 0;
  font-size: 1em;
  background-color: $main-bg-color;
  border: none;
  border-bottom: 2px solid $main-fg-color;
}

.prep-tag-anchor {
  margin-left: 10px;
  font-size: 0.5em;
  cursor: pointer;
}

img{
  max-width: 800px !important;
  max-height: 600px;
}

.prep-moveable{
  max-width: 10%;
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

  button{
    font-weight: bold;
    color: $main-bg-color;
    background-color: $main-fg-color;
  }
}
</style>

<script>
const ipc = require('electron').ipcRenderer

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
  methods: {
    removePrep() {
      this.$emit('remove-prep', this)
    },
    addPrep(t){
      this.$emit('add-prep', t)
    },
    openLink(evt, el){
      evt.preventDefault()
      ipc.send('open-url', evt.target.href)
    },
    handleFileInput(e) {
      e.preventDefault()
      this.data.src = e.target.files[0].path
      this.data.name = e.target.files[0].name
    }
  },
  mounted(){
    let el = this.$el.children[0]

    if(el == undefined || el.getAttribute('class').indexOf('moveable') == -1)
      return

    //-- make them reactive to a click (for notes that have been loaded from previous sessions)
    this.$el.onclick = (evt) => {
			if(evt.target.getAttribute('id') == 'current') return
			evt.target.setAttribute('id', 'current')
			evt.target.setAttribute('class', 'prep moveable')
			window.currentNote = evt.target
		}
  }
}
</script>
