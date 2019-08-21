<template>
  <button class="concept-btn concept" :concept="index">{{data.concept}}</button>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
    }
  }
}
</script>
