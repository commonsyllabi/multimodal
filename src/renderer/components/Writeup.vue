<template>
  <div class="writeup-toggle-outer">
    <div class="writeup-toggle-inner" @click="toggleView">

    </div>
    <textarea type="text" v-if="this.visible" :disabled="!this.isEdit" class="writeup" v-model:value="data.text"></textarea>
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
	background-color: $main-fg-color;
	transition: all 0.2s linear;
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
  width: 90%;
  height: 90%;
  margin: 10px;
  font-size: 1.2em;
  font-family: 'Inter UI';
  border: none;
}
</style>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {
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
  methods: {
    toggleView(e) {
      this.visible = !this.visible
      e.target.parentNode.style.width = this.visible ? '65vw' : '0px'
    }
  },
  mounted(){
  }
}
</script>
