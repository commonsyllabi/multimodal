<template>
  <span>
    <input class="edit-input" v-if="isEdit" type="text" v-model:value="data.name" placeholder="new concept">
    <button v-else class="nav concept"> {{data.name}} </button>
    <button v-if="isEdit" @click="addConcept">C+</button>
    <button v-if="isEdit" @click="removeConcept">C-</button>
    <div v-for="(page, index) in data.pages">
      <button class="nav page" :page="`${concept}-${index}`">{{page.name}}</button>
      <button v-if="isEdit" @click="addPage(index)">P+</button>
      <button v-if="isEdit" @click="removePage(index)">P-</button>
    </div>
  </span>
</template>

<style scoped lang="scss">
@import '../sass/globals.scss';

.nav, .edit-input {
	border: none;
	color: $main-fg-color;
	background-color: $main-bg-color;

	font-family: 'Inter UI';

	cursor: pointer;
}

.edit-input{
  border-bottom: 1px solid $main-fg-color;
  text-align: right;
}

.concept, .page {
	width: 100%;
	margin: 0%;

	padding-right: 10px;
	text-align: right;
}

.concept{
  font-size: 1.1em;
  font-weight: bold;
  border-bottom: 2px solid $main-fg-color;
  margin-top: 10px;
  margin-bottom: 5px;
}

.page{
  padding-right: 20px;
}

.concept:hover, .page:hover{
	background-color: $main-bg-color;
	color: $main-fg-color;
}

.current-page {
	background-color: $main-bg-color;
	border-left: 10px solid $main-fg-color;
	color: $main-fg-color;
	font-weight: bold;
}
</style>

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
    addPage (i) {
      this.$emit('add-page', {concept: this.concept, page:i})
    },
    removePage(i) {
      this.$emit('remove-page', {concept: this.concept, page:i})
    },
    addConcept () {
      this.$emit('add-concept', this.concept)
    },
    removeConcept() {
      this.$emit('remove-concept', this.concept)
    }
  }
}
</script>
