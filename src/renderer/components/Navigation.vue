<template>
  <div class="nav-concept">
    <input class="edit-input" v-if="isEdit" type="text" v-model:value="data.name" placeholder="new concept">
    <button v-else class="nav concept" @click="goToConcept"> {{data.name}} </button>
    <div class="input-holder">
      <button v-if="isEdit" class="add-concept" @click="addConcept">+</button>
      <button v-if="isEdit" class="add-concept" @click="removeConcept">-</button>
    </div>

    <span v-show="concept == currentConcept || isEdit">
      <div v-for="(page, index) in data.pages" class="nav page" :page="`${concept}-${index}`">

        <button v-if="isEdit" class="add-page" @click="addPage(index)">+</button>
        <button v-if="isEdit" class="add-page" @click="removePage(index)">-</button>
        <button class="nav" @click="goToPage(index)">{{page.name}}</button>
      </div>
    </span>
  </div>
</template>

<style scoped lang="scss">
@import '../sass/globals.scss';

.nav-concept{
  border-bottom: 2px solid $main-fg-color;
  padding-bottom: 5px;
  height: auto;
  overflow: auto;
  font-family: 'Inter UI';
}

.nav, .edit-input {
	border: none;
	color: $main-fg-color;
	background-color: $main-bg-color;
  padding-right: 5px;
  text-align: right;
  float: right;
	cursor: pointer;
}


.nav{
  font-size: 1em;
  max-width: 80%;
  margin-left: 0;
}

.input-holder{
  width: auto;
  float: left;
}

.add-concept, .add-page{
  border: none;
}

.add-concept{
  font-weight: bold;
  font-size: 1.2em;
  float: left;
  text-align: left;
}

.add-page{
  float: left;
}

.concept, .page {
	max-width: 95%;
	margin: 0%;
  padding-right: 10px;
  float: right;
	text-align: right;
}

.concept, .edit-input, .input-holder{
  font-size:1.2em;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 5px;
  max-width: 70%;
}

.concept:hover, .page:hover{
	background-color: $main-fg-color;
	color: $main-bg-color;
}

.current-page {
	border-left: 10px solid $main-fg-color;
}

.current-page .nav{
  font-weight: bold;
}

.edit-input{
  font-style: italic;
  border-bottom: 1px solid $main-fg-color;
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
