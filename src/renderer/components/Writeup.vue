<template>
  <div class="writeup-toggle-outer">
    <div class="writeup-toggle-inner" @click="toggleView">

    </div>
    <textarea class="writeup">{{data}}</textarea>
  </div>

</template>

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
