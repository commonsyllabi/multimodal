<template>
  <textarea class="note moveable" type="text" v-model:value="data.text"></textarea>
</template>

<style scoped lang="scss">
@import '../sass/globals.scss';

textarea {
  font-family: 'Inter UI';
  background-color: rgba(1, 0, 0, 0);
  border: none;
  outline: none;
  height: auto;
}

.note{
  position: absolute;
  pointer-events: all;
  z-index: 5;
  width: 40%;
  color: $main-fg-color;
  font-size: 1.9em;

  transition: opacity 0.5s ease-in;

  @media (max-width: 1300px){
    font-size: 1.7em;
  }
}

.written {
   width: 100%;
}

.moveable{
  z-index: 4;
  width: initial;
}

#current{
   position: absolute;
   font-weight: bold;
   overflow-y: visible;
}
</style>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {
        text: "",
          x: 0,
          y: 0,
          saved: false
      }
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      x: 0,
      y: 0
    }
  },
  methods: {

  },
  mounted(){
    let el = this.$el

    //-- make them reactive to a click (for notes that have been loaded from previous sessions)
    el.onclick = (evt) => {
			if(evt.target.getAttribute('id') == 'current') return
			evt.target.setAttribute('id', 'current')
			evt.target.setAttribute('class', 'note moveable')
			window.currentNote = evt.target
		}

    //-- resize on text input
    el.addEventListener('input', () => {
      let e = document.getElementById('current')
      e.style.height = 'auto'
      e.style.height = (e.scrollHeight) + 'px'
    })

    //-- listen for x and y attribute changes
    //-- so that we can save them for future sessions
    let that = this
    let observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type == "attributes") {
          that.data.y = el.style.top.substring(0, el.style.top.length-2)
          that.data.x = el.style.left.substring(0, el.style.left.length-2)
        }
      })
    })

    observer.observe(el, {attributes: true})

    //-- this prevents existing notes from being set as current notes on subject mount
    if(!this.data.saved)
      this.$emit('new-note', el)

    if(this.data.x){
      el.style.left = this.data.x + 'px'
      el.style.top = this.data.y + 'px'
    }

  }
}
</script>
