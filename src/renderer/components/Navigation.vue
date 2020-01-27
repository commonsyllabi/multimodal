<template>
  <div>

    <!-- CONCEPT NAME -->
    <input class="edit-input" v-if="isEdit" type="text" v-model:value="data.name" placeholder="new concept">
    <button v-else class="nav concept" @click="goToConcept"> {{data.name}} </button>
    <!-- CONCEPT CONTROLS -->
    <div class="input-holder">
      <button v-if="isEdit" class="add-concept" @click="addConcept">+</button>
      <button v-if="isEdit" class="add-concept" @click="removeConcept">-</button>
    </div>


    <span v-show="concept == currentConcept || isEdit">
      <div v-for="(page, index) in data.pages" class="nav page" :page="`${concept}-${index}`">
        <!-- PAGE NAME -->
        <button class="nav" @click="goToPage(index)">{{page.name}}</button>

        <!-- PAGE CONTROLS -->
        <button v-if="isEdit" class="add-page" @click="addPage(index)">+</button>
        <button v-if="isEdit" class="add-page" @click="removePage(index)">-</button>
      </div>
    </span>
  </div>
</template>

<style scoped lang="scss">
@import '../sass/globals.scss';

.nav, .edit-input {
	border: none;
  text-align: right;
  float: right;

  color: $main-fg-color;
  background-color: $main-bg-color;
	cursor: pointer;
}

.nav{
  font-size: 1em;
  min-width: 50%;
  max-width: 92%;
  margin-left: 0;
}


.edit-input{
  font-style: italic;
  border-bottom: 1px solid $main-fg-color;
  padding-right: 5px;
}

.input-holder{
  width: auto;
  float: left;
}

.concept, .page {
	width: 100%;
	margin: 0%;
  float: right;
	text-align: right;
}

.page {
  font-size: 0.9em;
}

.concept, .edit-input, .input-holder{
  font-size:1.2em;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 5px;
  max-width: 65%;
}

//-- current page styling
.current-page .nav{
  font-weight: bold;
}

.current-page::before{
  content: "->";
}

//-- controls to add and remove pages
.add-concept, .add-page{
  border: none;
  float: left;
}

.add-concept{
  font-weight: bold;
  font-size: 1.2em;
  text-align: left;
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
