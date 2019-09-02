<template>
  <div>
    <button class="concept-btn concept"> {{data.name}} </button>
    <div v-for="(page, index) in data.pages">
      <button class="concept-btn page" :page="`${concept}-${index}`">{{page.name}}</button>
      <button v-if="isEdit" @click="addPage">+</button>
      <button v-if="isEdit" @click="removePage">-</button>
    </div>
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
    concept: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
    }
  },
  methods: {
    addPage () {
      this.$emit('add-page', this.index)
    },
    removePage() {
      this.$emit('remove-page', this.index)
    }
  }
}
</script>
