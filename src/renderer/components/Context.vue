<template>
  <div class="context-container">
    <div class="context-toggle-inner" @click="toggleView">

    </div>
    explain what the concept is about, add links etc.<br/>
    <textarea v-if="this.visible" rows="12" class="context">{{data}}</textarea>
  </div>
</template>

<style scoped lang="scss">
@import '../sass/globals.scss';

.context-container{
  position: absolute;
  right: -5px;
  top: 30px;
  width: 0;
  height: 90%;
  padding: 5px;
  background-color: $main-fg-color;
  color: $main-bg-color;
  transition: all 0.3s linear;
}
.context-toggle-inner{
	position:absolute;
	width: 10px;
  top: 20px;
	left: -20px;
	height: 10vh;
	background-color: $main-fg-color;
	margin: auto;
	cursor: pointer;
	z-index: 3;
  border: 5px solid $main-bg-color;
}

.context{
  width: 90%;
  margin: 5px;
}
</style>

<script>
export default {
  props: {
    data: {
      type: String,
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
    }
  }
}
</script>
