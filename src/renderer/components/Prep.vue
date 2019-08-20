<template>
  <!-- <p>{{data.text}}</p> -->
  <input type="text" v-model="data.text"/>
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
