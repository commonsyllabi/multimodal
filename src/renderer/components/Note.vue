<!-- NOTE -->

<template>
  <textarea v-if="data" class="note moveable concept-bound" type="text" v-model:value="data.text"></textarea>
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      default: ''
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

  },
  mounted(){
    let el = this.$el

    //-- if there is empty text it means we just created it (instead of loaded from previous sessions)
    if(this.data.text == '')
      setTimeout(() => {this.$emit('new-note', el)}, 1)


    //-- make them reactive to a click (for notes that have been loaded from previous sessions)
    el.onclick = (evt) => {
			if(evt.target.getAttribute('id') == 'current') return
			evt.target.setAttribute('id', 'current')
			evt.target.setAttribute('class', 'note moveable concept-bound')
			window.currentNote = evt.target
		}

    //-- resize on text input
    el.addEventListener('input', () => {
      let e = document.getElementById('current')
      e.style.height = 'auto'
      e.style.height = (e.scrollHeight) + 'px'
    })
  },
  afterMount(){
    this.$emit('new-note', el)
  }
}
</script>
