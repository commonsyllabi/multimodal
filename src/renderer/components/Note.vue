<template>
  <div class="note-holder" @dragstart="startDrag($event) "@drag="duringDrag($event)" @dragend.prevent="endDrag($event)" draggable="true">
    <div class="note-controls">
      <div class="note-grab">
        ■
      </div>
      <div class="note-minimize" @click="toggleVisible">
        -
      </div>
    </div>
    <textarea class="note moveable" type="text" v-model:value="data.text"></textarea>

  </div>
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

.note-holder{
  position: absolute;
  pointer-events: all;

  z-index: 5;
  width: auto;
  height: auto;
  max-height: 60px;
  overflow-y: hidden;

  color: $main-fg-color;
  background-color: $main-bg-color;
  font-size: 1.9em;

  transition: opacity 0.1s ease-in;
  transition: max-height 0.1s linear;
  border: 3px solid $main-fg-color;
}

.note-controls{
  z-index: 6;
  height: 20px;
  overflow: auto;
  border-bottom: 3px solid $main-fg-color;
}

.note-grab{
  cursor: grab;
}

.note-grab, .note-minimize{
  position: absolute;
  line-height: 14px;
  font-size: 28px;
  margin: 0;

  width: 20px;
}

.note-minimize{
  right: 0px;
  top: 2px;
  cursor: pointer;
}

.note{
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
  border-width: 5px;
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
      y: 0,
      isVisible: false,
      isDragging: false
    }
  },
  methods: {
    startDrag(evt){
      this.isDragging = true
      let ghost = document.createElement('img')
      ghost.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
      evt.dataTransfer.setDragImage(ghost, 0, 0)
    },
    duringDrag(evt) {
      // evt.preventDefault()
      let pos = {x: evt.clientX, y: evt.clientY}

      // pos.x -= this.data.x
      // pos.y -= this.data.y

      this.$el.style.left = pos.x+'px'
      this.$el.style.top = pos.y+'px'
    },
    endDrag(evt) {
      // evt.preventDefault()
      let pos = {x: evt.layerX, y: evt.layerY}

      // pos.x -= this.data.x
      // pos.y -= this.data.y

      this.$el.style.left = pos.x+'px'
      this.$el.style.top = pos.y+'px'

      this.isDragging = false
    },
    toggleVisible(evt, _value) {
      // evt.preventDefault()
      this.isVisible = _value ? _value : !this.isVisible
      this.$el.style.maxHeight = this.isVisible ? '500px' : '60px'
    }
  },
  mounted(){
    // this.toggleVisible(true)
    let el = this.$el

    //-- show editing note
    el.children[1].addEventListener('click', (evt) => {
      //-- set visible
      this.$el.style.maxHeight = '500px'

      window.currentNote = evt.target.parentNode
      evt.target.parentNode.setAttribute('id', 'current')
    })

    //-- resize on text input
    el.children[1].addEventListener('input', (evt) => {
      let e = evt.target
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
