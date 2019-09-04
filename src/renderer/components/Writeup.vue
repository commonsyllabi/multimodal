<template>
  <div class="writeup-toggle-outer">
    <div class="writeup-toggle-inner" @click="toggleView">

    </div>
    <textarea v-if="this.visible" rows="12" class="writeup">{{data}}</textarea>
  </div>

</template>

<style scoped lang="scss">
@import '../sass/globals.scss';

.writeup-toggle-outer{
	position: absolute;
	bottom: 100px;
  left: 0px;
	width: 0;
	height: 20vh;
	z-index: 4;
	background-color: $main-fg-color;
	transition: all 0.3s linear;
}

.writeup-toggle-inner{
	position:absolute;
	width: 10px;
  top: 20px;
	right: -20px;
	height: 10vh;
	background-color: $main-fg-color;
	margin: auto;
	cursor: pointer;
	z-index: 3;
	margin-left: 40%;
  border: 5px solid $main-bg-color;
}

.writeup{
  width: 90%;
  margin: 5px;
  font-family: 'Inter UI'
}
</style>

<script>
export default {
  props: {
    data: {
      type: String,
      default: 'no current writeup bro'
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
      e.target.parentNode.style.width = this.visible ? '70vw' : '0px'
    }
  },
  mounted(){
  }
}
</script>
