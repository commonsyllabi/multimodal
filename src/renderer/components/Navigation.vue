<template>
  <span>
    <button class="nav concept"> {{data.name}} </button>
    <div v-for="(page, index) in data.pages">
      <button class="nav page" :page="`${concept}-${index}`">{{page.name}}</button>
      <button v-if="isEdit" @click="addPage">+</button>
      <button v-if="isEdit" @click="removePage">-</button>
    </div>
  </span>
</template>

<style scoped lang="scss">
@import '../sass/globals.scss';

.nav {
	border: none;
	color: $main-fg-color;
	background-color: $main-bg-color;

	font-family: 'Inter UI';

	cursor: pointer;
}

.concept, .page {
	width: 100%;
	margin: 0%;
	display: block;
	float: left;

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
    addPage () {
      this.$emit('add-page', this.index)
    },
    removePage() {
      this.$emit('remove-page', this.index)
    }
  }
}
</script>
