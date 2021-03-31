<template>
  <div class="create-container">

    <!-- OVERLAY -->
    <div class="overlay">
    </div>

    <!-- POPUP -->
    <div class="create-subject">
      <h1>new syllabi</h1>

      <!-- NAME -->
      <input class="name" type="text" placeholder="subject name" v-model="subject.name">

      <!-- DESCRIPTION -->
      <textarea class="description" rows="8" v-model="subject.description" placeholder="subject description"></textarea>

      <!-- LOCATION -->
      <input class="path" type="text" placeholder="subject folder" v-model="subject.path">
      <button class="create-local-path" @click="selectSubjectPath($event)">select</button>

      <!-- CONTROLS -->
      <button class="btn close" @click="close">X</button>
      <div class="buttons-container">
        <button class="btn right" @click="create">create</button>
        <div class="msg-log" id="msg-log"></div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
@import '../sass/globals.scss';

.create-container {
  position: absolute;
	width: 100vw;
  height: 100vh;
	margin: auto;
	overflow: auto;
  z-index: 10;

  top: 200px;
}

.create-subject{
  position: relative;
	width: 50%;
	overflow: auto;
	margin: auto;
	padding: 4%;
	text-align: left;
	border: 3px solid $main-fg-color;
  background-color: $main-bg-color;
}

.name, .path, .description {
	width: 100%;
	font-size: 24px;
	height: 48px;
	display: block;
	float: left;
  margin-bottom: 20px;
  border-bottom: 2px solid $main-fg-color;

  color: $main-fg-color;
  background-color: $main-bg-color;
}

.path{
  width: 78%;
}

.description{
  height: 72px;
}

.create-local-path{
  width: 20%;
  float: right;
  display: inline;
  font-size: 24px;
  height: 51px;
  background-color: $main-fg-color;
  color: $main-bg-color;
}

.buttons-container {
	position: absolute;
	z-index: 3;
	bottom: 0px;
	left: 0px;
	padding-left: 10px;
	height: 50px;
  line-height: 50px;
	width: auto;

	button {
    border: none;
	}
}

.btn {
	border: none;
	color: $main-fg-color;
	background-color: $main-bg-color;
  font-size: $btn-size;
	cursor: pointer;
  margin-right: 10px;
  padding: 0px;

  @media (max-width: $break-medium){
		font-size: 1.5em;
	}
}

.btn:hover{
	background-color: $main-bg-color;
	color: $main-fg-color;
}

.btn:active{
	border: none;
}

.close{
  position: absolute;
  top: 10px;
  right: 0px;
}
</style>

<script>
const {dialog} = require('electron').remote

export default {
  data: function () {
    return {
      subject: {
        name: '',
        path: '',
        description: ''
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    //-----------
    //-- checks if all fields are there
    //-- if that's the case, create the subject
    //-----------
    create(){
      if(this.subject.name == '' || this.subject.path == '' || this.subject.description == '')
    		alert('Some fields are missing!')
      else
        this.$emit('create-subject', this.subject)
    },
    selectSubjectPath(){
    	let options = {
    		'title':'Select course folder',
    		'defaultPath':'~/',
    		'properties':['openDirectory', 'createDirectory']
    	}

    	dialog.showOpenDialog(options, (path) => {
    		this.subject.path = path[0]
    	})
    }
  }
}
</script>
