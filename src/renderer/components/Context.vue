<template>
  <div class="context-container">
    <div class="context-toggle-inner" @click="toggleView">

    </div>

    <textarea v-if="this.visible" :disabled="!this.isEdit" rows="12" class="context" v-model:value="data.text"></textarea>

    <div v-for="(link, index) in data.links" class="context-link">
      <input v-if="isEdit" type="text" placeholder="url" v-model:value="link.href"/>
      <a v-if="!isEdit" :href="link.href" target="_blank">{{link.href}}</a>

      <input v-if="isEdit" type="text" placeholder="comment" v-model:value="link.comment"/>
      <div v-if="!isEdit">{{link.comment}}</div>

      <div v-if="isEdit" class="links-buttons">
        <button @click="addLink(index)">+</button>
        <button @click="removeLink(index)">-</button>
      </div>
      <hr/>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../sass/globals.scss';

.context-container{
  position: absolute;
  z-index: 2;
  right: -10px;
  top: 7vh;
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

.context{
  width: 90%;
  min-height: 10%;
  margin: 10px;
  font-size: 1.2em;
}

.context-link{
  color: $main-bg-color;
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
      console.log('adding link',index);
      this.data.links.splice(index+1, 0, {"href":"link here", "comment":"comment here"})

      this.$forceUpdate()
    },
    removeLink(index) {
      console.log('removing link', index);
      let a = this.data.links.slice(0, index)
      let b = this.data.links.slice(index+1, this.data.links.length)
      let c = a.concat(b)
      this.data.links = c

      this.$forceUpdate()
    }
  }
}
</script>
