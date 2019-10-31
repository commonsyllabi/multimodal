<template>
  <div class="context-container">
    <div class="context-toggle-inner" @click="toggleView">

    </div>
    <h3>
      Context
    </h3>
    <textarea v-if="this.visible" :disabled="!this.isEdit" rows="12" class="context" v-model:value="data.text"></textarea>


    <h3>
      Links
    </h3>
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
    <div v-if="isEdit" class="links-buttons">
      <button @click="addLink(-1)">+</button>
    </div>
    <div v-if="data.links.length == 0 && !isEdit">
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
  padding: 5px;
  background-color: $main-fg-color;
  color: $main-bg-color;
  transition: all 0.2s linear;
}
.context-toggle-inner{
	position:absolute;
	width: 10px;
  top: 20px;
	left: -20px;
	height: 90%;
	background-color: $main-fg-color;
	margin: auto;
	cursor: pointer;
	z-index: 3;
  border: 5px solid $main-bg-color;
}

h3{
  margin: 0px 0px 0px 10px;
}

.context{
  width: 90%;
  min-height: 10%;
  margin: 10px 10px 10px 0px;
  font-size: 1.2em;
  background: transparent;
  border-left: 2px solid $main-bg-color;
  padding-left: 5px;
}

.context-link{
  color: $main-bg-color;
}

.display-link, .display-comment, .edit-link, .edit-comment{
  width: 90%;
  display: block;
  float: left;
}

.edit-link, .edit-comment{
  border: none;
  padding: 5px;
  margin: 5px 5px 5px 0px;

  font-family: 'Inter UI', sans-serif;
}

.links-buttons{
  width: 90%;
  float: left;
  margin-bottom: 10px;
}

</style>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
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
  methods: {
    toggleView(e) {
      this.visible = !this.visible
      e.target.parentNode.style.width = this.visible ? '20vw' : '0px'
    },
    addLink(index) {
      if(index == -1)
        this.data.links.push({"href":"", "comment":""})
      else
        this.data.links.splice(index+1, 0, {"href":"", "comment":""})

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
