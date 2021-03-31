<template>
  <div class="context-container">

    <!-- HANDLE -->
    <div class="context-toggle-inner" @click="toggleView"> </div>

    <h3>Context</h3>
    <textarea type="text" v-if="this.visible && this.isEdit" rows="12" class="context" v-model:value="data.text" placeholder="provide context about this current concept"></textarea>
    <div v-if="this.visible && !this.isEdit" class="context" v-html="markdown"></div>

    <h3>Links</h3>
    <div v-for="(link, index) in data.links" class="context-link">
      <input v-if="isEdit" class="edit-link" type="text" placeholder="url" v-model:value="link.href"/>
      <a v-if="!isEdit" class="display-link" :href="link.href" target="_blank">{{link.href}}</a>

      <textarea v-if="isEdit" class="edit-comment" type="text" placeholder="comment" v-model:value="link.comment"/>
      <div v-if="!isEdit" class="display-comment">{{link.comment}}</div>

      <div v-if="isEdit" class="links-buttons">
        <button @click="addLink(index)">+</button>
        <button @click="removeLink(index)">-</button>
      </div>
    </div>

    <!-- CONTROLS TO ADD LINKS -->
    <div v-if="isEdit" class="links-buttons">
      <button @click="addLink(-1)">+</button>
    </div>
    <div v-if="!data.links && !isEdit">
      No links added yet.
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../sass/globals.scss';

.context-container{
  position: absolute;
  z-index: 2;
  right: -10px;
  top: 15vh;
  width: 0;
  height: 90%;
  // padding: 5px;
  background-color: $main-bg-color;
  color: $main-fg-color;
  border: 3px solid $main-fg-color;
  transition: all 0.2s linear;
}

//-- little handle
.context-toggle-inner{
	position:absolute;
	width: 10px;
  top: 20px;
	left: -25px;
	height: 90%;
	background-color: $main-fg-color;
	margin: auto;
	cursor: pointer;
	z-index: 3;
  border: 5px solid $main-bg-color;
}

h3{
  margin: 10px 0px 0px 10px;
}

textarea, .context{
  display: block;
  margin: auto;
}

textarea{
  width: 90%;
  font-style: italic;
}

.context{
  width: 90%;
  font-size: 1.2em;
  background: transparent;
  border-left: 2px solid $main-bg-color;
  padding-left: 5px;
}

.context a{
  color: $mid-orange;
}

.context-link{
  float: left;
  width: 95%;
  margin-top: 20px;
  padding-left: 10px;
  color: $main-fg-color;
}

.context-link::before{
  content: '-';
}

.display-link, .display-comment, .edit-link, .edit-comment{
  width: 85%;
  margin: auto;
}

.edit-link, .edit-comment{
  display: inline;
  border: none;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.05);
  border-bottom: 2px solid $main-fg-color;
  margin-left: 0px;

  font-family: 'Inter UI', sans-serif;
}

.display-comment, .edit-comment{
  margin-left: 8px;
}

.links-buttons{
  width: 90%;
}

.links-buttons button{
  font-size: 1.3em;
  float: right;
  border: none;
  margin-bottom: 10px;
  font-weight: bold;
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
        links: []
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
    markdown: function () {
      this.data.html = marked(this.data.text)
      return this.data.html
    }
  },
  methods: {
    toggleView(e) {
      this.visible = !this.visible
      e.target.parentNode.style.width = this.visible ? '20vw' : '0px'
    },
    addLink(_index) {
      if(_index == -1)
        this.data.links.push({"href":"", "comment":""})
      else
        this.data.links.splice(_index+1, 0, {"href":"", "comment":""})

      this.$forceUpdate()
    },
    removeLink(index) {
      let a = this.data.links.slice(0, index)
      let b = this.data.links.slice(index+1, this.data.links.length)
      let c = a.concat(b)
      this.data.links = c

      this.$forceUpdate()
    }
  }
}
</script>
