<template>
  <p hidden>{{data}}</p>
</template>

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
      greeting: 'Hello'
    }
  }
}
</script>
