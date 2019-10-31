<template>
  <div class="overview-container">
    <div class="overview-toggle-inner" @click="toggleView">
    </div>
    <h3 v-if="this.isEdit">
      overview
    </h3>
    <textarea v-if="this.visible && this.isEdit" class="overview" v-model:value="overview.text" placeholder="an overview of what this is all about"></textarea>
    <div v-if="this.visible && !this.isEdit" class="overview" v-html="markdown"></div>
  </div>
</template>

<style scoped lang="scss">
@import '../sass/globals.scss';

.overview-container{
  position: absolute;
  z-index: 3;
  left: 10px;
  top: -10px;
  width: 30vw;
  height: 0px;
  padding: 5px;
  padding-top: 15px;
  background-color: $main-fg-color;
  color: $main-bg-color;
  transition: all 0.2s linear;
}

.overview-toggle-inner{
	position:absolute;
	width: 10vw;
  bottom: -20px;
	left: 20px;
	height: 10px;
	background-color: $main-fg-color;
	margin: auto;
	cursor: pointer;
	z-index: 1;
  border: 5px solid $main-bg-color;
}

h3{
  margin: 0;
}

.overview{
  width: 90%;
  height: 80%;
  margin: 10px 10px 10px 0px;
  padding-left: 5px;
  border-left: 2px solid $main-bg-color;
  background: transparent;
  font-size: 1.2em;
}
</style>

<script>

const marked = require('marked')

export default {
  props: {
    overview: {
      type: Object,
      default: () => {text:""}
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      visible: false,
      name: {
        text: ""
      }
    }
  },
  computed: {
    markdown: function() {
      this.overview.html = marked(this.overview.text)
      return this.overview.html
    }
  },
  methods: {
    toggleView(e) {
      this.visible = !this.visible
      e.target.parentNode.style.height = this.visible ? '20vh' : '0px'
    }
  }
}
</script>
