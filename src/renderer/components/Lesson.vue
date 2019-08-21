<template>
  <div>
    <div class="lessons-container">
      <span v-for="(concept, index) in data.concepts">
        <Concept :data="concept" :course="data.course" :index="index"/>
      </span>
    </div>

    <div class="concept-buttons">
      <Navigation v-for="(concept, index) in data.concepts" :data="concept" :index="index"/>
    </div>
  </div>
</template>

<script>
import Concept from './Concept.vue'
import Navigation from './Navigation.vue'

export default {
  components: {
    Concept,
    Navigation
  },
  data: function () {
    return {
      data: null,
      currentConcept: 0
    }
  },
  methods: {
    isScrolledIntoView() {
      let visibleElements = []
      for(let i = 0; i < this.data.concepts.length; i++){
        let el = document.getElementById(i)
        var rect = el.getBoundingClientRect();
        var elemTop = rect.top;
        var elemBottom = rect.bottom;

        let isVisible = elemTop < window.innerHeight*0.9 && elemBottom >= 0;

        if(isVisible)
          visibleElements.push(i)
      }
      
      if(visibleElements.length == 1)
        window.setCurrentConcept(visibleElements[0])
    }
  },
  mounted(){
    document.addEventListener('scroll', this.isScrolledIntoView)
  },
  beforeMount() {
    this.data = window.data
  }
}
</script>
