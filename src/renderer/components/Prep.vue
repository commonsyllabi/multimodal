<template>

  <span>
    <div v-if="data.type == 'txt'" class="prep written" :concept="index" :tag="data.tag">
      <input class="edit-input" type="text" v-if="isEdit" placeholder="your prep here" v-model:value="data.text">
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

    <button v-if="isEdit" @click="removePrep">-</button>
  </span>

</template>

<style scoped lang="scss">
@import '../sass/globals.scss';

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
  margin-top: 5%;
  text-align: left;
}

.edit-input{
  margin: 0;
  font-size: 1em;
  background-color: $main-bg-color;
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

.preview{
  max-width: 400px !important;
  max-height: 300px;
  float: left;
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

  }
}
</script>
