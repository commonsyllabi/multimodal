<template>
  <p hidden>{{data}}</p>
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      default: {}
    }
  },
  data: function () {
    return {
      greeting: 'Hello'
    }
  }
}
</script>
