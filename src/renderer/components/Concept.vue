<template>
  <div>
    {{data.concept}}
    <span v-for="prep in data.prep">
      <Prep :data="prep"/>
    </span>

    <!-- <span v-for="context in data.contexts">
      <Context :data="context"/>
    </span> -->

    <span v-for="note in data.notes">
      <Note :data="note"/>
    </span>

    <span v-for="writeup in data.writeups">
      <Writeup :data="writeup"/>
    </span>
  </div>
</template>

<script>
import Context from './Context.vue'
import Prep from './Prep.vue'
import Note from './Note.vue'
import Writeup from './Writeup.vue'

export default {
  components: {
    Context,
    Note,
    Writeup,
    Prep
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data: function () {
    return {
      greeting: 'Hello'

    }
  }
}
</script>
