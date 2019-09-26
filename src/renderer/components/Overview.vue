<template>
  <div class="overview-container">
    <div class="overview-toggle-inner" @click="toggleView">

    </div>
    <!-- <input v-if="this.visible" :disabled="!this.isEdit" class="subject-name" type="text" v-model:value="topic"> -->
    <textarea v-if="this.visible" :disabled="!this.isEdit" class="overview" v-model:value="overview.text"></textarea>
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
  height: -20vh;
  padding: 5px;
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

.overview{
  width: 90%;
  height: 80%;
  margin: 10px;
  font-size: 1.2em;
}
</style>

<script>
export default {
  props: {
    overview: {
      type: Object,
      default: () => {text:""}
    },
    topic: {
      type: String,
      default: ""
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
  watch: {
    subject: function(updated) {
      this.name.text = updated
    },
    name: function(updated){
      this.subject = updated.text
    }
  },
  methods: {
    toggleView(e) {
      this.visible = !this.visible
      e.target.parentNode.style.height = this.visible ? '20vh' : '0px'
    }
  },
  afterMount(){
    this.name.text = this.subject
  }
}
</script>
