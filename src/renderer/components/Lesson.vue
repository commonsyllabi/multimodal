<template>
  <div>
    <span v-for="concept in data.concepts">
      <Concept :data="concept"/>
    </span>

    <!-- ALSO ADD HIERARCHY? -->
  </div>
</template>

<script>
import Concept from './Concept.vue'

export default {
  components: {
    Concept
  },
  data: function () {
    return {
      data: null
    }
  },
  methods: {

  },
  beforeMount() {
    this.data = window.data
  }
}
</script>
