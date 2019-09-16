<template>
  <div v-show="visible">
    <div class="dialog-overlay">

    </div>
    <div class="dialog">
      <div class="message">
        {{message}}
      </div>
      <button v-show="choice" class="btn" @click="close();">cancel</button>
      <button v-for="cb in callbacks" class="btn right" @click="close(); if(cb.fn) cb.fn()">{{cb.name}}</button>
    </div>
  </div>

</template>

<style scoped lang="scss">
@import '../sass/globals.scss';

  .dialog-overlay{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .dialog{
    background-color: $main-bg-color;
    position: relative;
    top: 100px;
    width: 50vw;
    margin: auto;
    display: block;
    font-size: 2.2em;
    border: 2px solid white;
    padding: 3%;
  }

  .message{
    margin-bottom: 20px;
  }

  .dialog .btn{
    border: 2px solid $main-fg-color;
    font-size: 0.9em;
  }

  .right{
    margin-left: 10px;
  }

</style>

<script>
export default {
  data () {
    return {
      message: '',
      visible: false,
      choice: false,
      callbacks: null
    }
  },
  methods: {
    setMessage(msg, cbs = null, err = null, choice = false){
      this.visible = true
      this.message = msg

      this.callbacks = cbs
      this.choice = choice

      if(err)
        console.log(err);
    },
    close(){
      this.visible = false
    }
  }
}
</script>
