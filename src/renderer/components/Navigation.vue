<template>
  <div class="nav-concept">
    <input class="edit-input" v-if="isEdit" type="text" v-model:value="data.name" placeholder="new concept">
    <button v-else class="nav concept" @click="goToConcept"> {{data.name}} </button>
    <div class="input-holder">
      <button v-if="isEdit" class="add-input add-concept" @click="addConcept">+</button>
      <button v-if="isEdit" class="add-input add-concept" @click="removeConcept">-</button>
    </div>

    <span v-show="concept == currentConcept || isEdit">
      <div v-for="(page, index) in data.pages">
        <button class="nav page" :page="`${concept}-${index}`" @click="goToPage(index)">{{page.name}}</button>
        <button v-if="isEdit" class="add-input" @click="addPage(index)">+</button>
        <button v-if="isEdit" class="add-input" @click="removePage(index)">-</button>
      </div>
    </span>
  </div>
</template>

<style scoped lang="scss">
@import '../sass/globals.scss';

.nav, .edit-input {
	border: none;
	color: $main-fg-color;
	background-color: $main-bg-color;
  padding-right: 5px;

	font-family: 'Inter UI';

	cursor: pointer;
}

.edit-input{
  text-align: right;
}

.input-holder{
  width: 100%;
  float: right;
}

.add-input{
  float: right;
  border: none;
}

.add-concept{
  font-weight: bold;
  font-size: 1.2em;
}

.nav-concept{
  border-bottom: 2px solid $main-fg-color;
  padding-bottom: 5px;
  height: auto;
  overflow: auto;
}

.concept, .page {
	width: 100%;
	margin: 0%;

	padding-right: 10px;
	text-align: right;
}

.concept, .edit-input{
  font-size: 1.1em;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 5px;
  float: right;
}

.page{
  padding-right: 20px;
  float: right;
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
    },
    currentConcept: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
    }
  },
  methods: {
    goToConcept() {
      this.$emit('go-to-concept', this.concept)
    },
    goToPage(i) {
      this.$emit('go-to-page', {concept: this.concept, page: i})
    },
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
