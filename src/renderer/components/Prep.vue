<template>
  <div v-if="data.type == 'txt'" class="prep note written concept-bound" :concept="index" :tag="data.tag">
    {{data.text}}
  </div>
  <div v-else-if="data.type == 'url'" class="prep note written concept-bound" :concept="index" :tag="data.tag">
    <a :href="prep.url" target="_blank">{{data.url}}</a>
  </div>
  <div v-else-if="data.type == 'img'" class="prep note written concept-bound" :concept="index" :tag="data.tag">
    <img :name="prep.name" :src="`${course.path}/${course.name}/lessons/${name}/media/${prep.name}`"/>
  </div>
  <div v-else-if="data.type == 'vid'" class="prep note written concept-bound" :concept="index" :tag="data.tag">
    <video max-width="800px", max-height="600px" controls>
      <source :name="prep.name" :src="`assets/${course.name}/lessons/${name}/media/${prep.name}`">
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
  }
}
</script>
