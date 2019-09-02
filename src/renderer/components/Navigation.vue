<template>
  <div>
    <button class="concept-btn concept" :concept="index">{{data.concept}}</button>
    <button v-if="isEdit" @click="addConcept">+</button>
    <button v-if="isEdit" @click="removeConcept">-</button>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {},
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
    }
  },
  methods: {
    addConcept () {
      this.$emit('add-concept', this.index)
    },
    removeConcept() {
      this.$emit('remove-concept', this.index)
    }
  }
}
</script>
