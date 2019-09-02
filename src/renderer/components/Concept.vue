<template>
  <div>
    <Page v-for="(page, index) in data.pages" :concept="concept" :index="index ":data="page" :key="`page-${index}`" :_id="`page-${index}`" :course="course" :isEdit="isEdit" @new-note="handleNewNote"/>
  </div>
</template>

<script>
import Context from './Context.vue'
import Page from './Page.vue'

export default {
  components: {
    Page,
    Context
  },
  props: {
    data: {
      type: Object,
      default: {}
    },
    course: {
      type: Object,
      default: {}
    },
    concept: {
      type: Number,
      default: 0
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      currentNote: null
    }
  },
  methods: {
    handleNewNote(el){
      this.$emit('new-note', el)
    }
  },
  mounted(){

  }
}
</script>
