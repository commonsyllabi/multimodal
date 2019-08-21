<template>
  <textarea class="writeup concept-bound" hidden>{{data}}</textarea>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data: function () {
    return {
    }
  }
}
</script>
