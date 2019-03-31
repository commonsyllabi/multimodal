<template>
  <p>Area</p>
  <Concept></Concept>
  <Note></Note>
  <Writeup></Writeup>
</template>

<script>
import Concept from './Concept.vue'
import Note from './Note.vue'
import Writeup from './Writeup.vue'

module.exports = {
  data: function () {
    return {
      greeting: 'Hello'
    }
  }
}
</script>
