<template>
  <div class="note-holder" @drag="duringDrag($event)" @dragend.stop.prevent="endDrag($event)" draggable="true">
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
  opacity: 0.5;
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
      isVisible: false
    }
  },
  methods: {
    duringDrag(evt) {
      let pos = {x: evt.screenX, y: evt.screenY}

      this.$el.style.left = pos.x+'px'
      this.$el.style.top = pos.y+'px'
    },
    endDrag(evt) {
      let pos = {x: evt.layerX, y: evt.layerY}

      pos.x -= this.data.x
      pos.y -= this.data.y

      this.$el.style.left = pos.x+'px'
      this.$el.style.top = pos.y+'px'
    },
    toggleVisible(evt, _value) {
      this.isVisible = _value ? _value : !this.isVisible
      this.$el.style.maxHeight = this.isVisible ? '500px' : '60px'
      this.$el.style.opacity = this.isVisible ? '1' : '0.5'
    }
  },
  mounted(){
    let el = this.$el

    //-- show editing note
    el.children[1].addEventListener('click', (evt) => {
      this.toggleVisible(true)
      window.currentNote = evt.target
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
