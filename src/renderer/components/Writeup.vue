<template>
  <div class="writeup-toggle-outer">
    <div class="writeup-toggle-inner" @click="toggleView">

    </div>
    <textarea class="writeup">{{data}}</textarea>
  </div>

</template>

<style scoped lang="scss">
.writeup-toggle-outer{
	position: absolute;
	bottom: 0px;
	width: 90%;
	height: 0vh;
	z-index: 4;
	background-color: white;
	transition: all 0.1s linear;
}

.writeup-toggle-inner{
	position:absolute;
	width: 20%;
	top: -10px;
	height: 10px;
	background-color: white;
	margin: auto;
	cursor: pointer;
	z-index: 3;
	margin-left: 40%;
}

.writeup{
  width: 100%;
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
      e.target.parentNode.style.height = this.visible ? '100px' : '0px'
    }
  },
  mounted(){
  }
}
</script>
