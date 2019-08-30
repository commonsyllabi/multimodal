<template>

  <span>
    <div v-if="data.type == 'txt'" class="prep note written concept-bound" :concept="index" :tag="data.tag">
      <input type="text" v-if="isEdit" placeholder="your prep here" v-model:value="data.text">
      <span v-else>{{data.text}}</span>
    </div>

    <div v-else-if="data.type == 'url'" class="prep note written concept-bound" :concept="index" :tag="data.tag">
      <input type="text" v-if="isEdit" placeholder="resource text" v-model:value="data.text">
      <input type="text" v-if="isEdit" placeholder="resource link" v-model:value="data.url">
      <a v-else :href="data.url" target="_blank">{{data.text}}</a>
    </div>

    <img  v-else-if="data.type == 'img'" class="prep note moveable concept-bound" :concept="index" :tag="data.tag" :name="data.name" :src="data.src"/>

    <div v-else-if="data.type == 'vid'" class="prep note written concept-bound" :concept="index" :tag="data.tag">
      <video max-width="800px", max-height="600px" controls>
        <source :name="data.name" :src="`assets/${course.name}/lessons/${name}/media/${data.name}`">
      </video>
    </div>

    <button v-if="isEdit" @click="removePrep">-</button>
  </span>

</template>

<script>
export default {
  props: {
    _id: {
      type: String,
      default: ''
    },
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
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {

    }
  },
  methods: {
    removePrep() {
      this.$emit('remove-prep', this)
    }
  },
  mounted(){

  }
}
</script>
