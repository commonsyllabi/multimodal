<template>
  <div class="writeup-toggle-outer">

    <!-- HANDLE -->
    <div class="writeup-toggle-inner" @click="toggleView"></div>

    <h3 v-if="this.visible">details</h3>
    <textarea type="text" v-if="this.visible && this.isEdit" class="writeup" v-model:value="data.text" placeholder="write your notes for this particular page here"></textarea>
    <div v-if="this.visible && !this.isEdit" class="writeup" v-html="markdown"></div>
  </div>
</template>

<style scoped lang="scss">
@import '../sass/globals.scss';

.writeup-toggle-outer{
	position: absolute;
	bottom: 100px;
  left: 0px;
	width: 0;
	height: 25vh;
	z-index: 4;
  pointer-events: all;
	background-color: $main-fg-color;
	transition: all 0.2s linear;
}

h3{
  color: $main-bg-color;
  margin: 5px 0px 0px 10px;
}

.writeup-toggle-inner{
	position:absolute;
	width: 10px;
  top: 20px;
	right: -20px;
	height: 15vh;
	background-color: $main-fg-color;
	margin: auto;
	cursor: pointer;
	z-index: 3;
	margin-left: 40%;
  border: 5px solid $main-bg-color;
}

.writeup{
  color: $main-bg-color;
  width: 90%;
  height: 80%;
  border: none;
  background: transparent;
  border-left: 2px solid $main-bg-color;
  margin: 10px;
  padding-left: 5px;
  font-size: 1.2em;
  font-family: 'Inter UI';
  overflow: scroll;
}

textarea{
  font-style: italic;
}
</style>

<script>
const marked = require('marked')

export default {
  props: {
    data: {
      type: Object,
      default: () => {
        text: ""
      }
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      visible: false
    }
  },
  computed: {
    markdown: function () {//-- parse the text as markdown and render as html
      this.data.html = marked(this.data.text)
      return this.data.html
    }
  },
  methods: {
    toggleView(e) {
      this.visible = !this.visible
      e.target.parentNode.style.width = this.visible ? '65vw' : '0px'
    }
  }
}
</script>
