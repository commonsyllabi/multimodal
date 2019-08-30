<template>
  <textarea class="writeup concept-bound" hidden>{{data}}</textarea>
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
    }
  }
}
</script>
