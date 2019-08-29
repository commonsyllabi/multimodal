<template>
  <div v-if="data.type == 'txt'" class="prep note written concept-bound" :concept="index" :tag="data.tag">
    {{data.text}}
  </div>
  <div v-else-if="data.type == 'url'" class="prep note written concept-bound" :concept="index" :tag="data.tag">
    <a :href="prep.url" target="_blank">{{data.url}}</a>
  </div>
  <img  v-else-if="data.type == 'img'" class="prep note moveable concept-bound" :concept="index" :tag="data.tag" :name="data.name" :src="data.src"/>
  <div v-else-if="data.type == 'vid'" class="prep note written concept-bound" :concept="index" :tag="data.tag">
    <video max-width="800px", max-height="600px" controls>
      <source :name="data.name" :src="`assets/${course.name}/lessons/${name}/media/${data.name}`">
    </video>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    },
    course: {
      type: Object,
      default: {}
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {

    }
  },
  mounted(){
    this.$el.onclick = (evt) => {
			if(evt.target.getAttribute('id') == 'current') return
			evt.target.setAttribute('id', 'current')
			evt.target.setAttribute('class', 'note moveable concept-bound')

      window.offsets = [
        evt.target.offsetLeft - evt.clientX,
        evt.target.offsetTop - evt.clientY
      ]

			window.currentNote = evt.target
		}
  }
}
</script>
