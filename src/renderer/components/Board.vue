<template>
<div>
  <div class="subjects-container">
    <div class="subjects">
      <div v-for="single in data.subjects" class="inter-class">
        <div class="subject-title">
          {{single.subject.name}}
          <button class="right" @click="removeSubject(single.subject)">-</button>
        </div>
        <ul>
          <li v-for="topic in single.topics" class="topic"
          @click="setTopic($event, single.subject.name, topic.name, single.subject.path)"
          @dblclick="openTopic(single.subject.name, topic.name, single.subject.path)">
            {{topic.name}}

            <button class="right" @click="removeTopic(topic)">-</button>
          </li>

        </ul>
        <button class="btn" @click="createTopic(single.subject)">+</button>
      </div>
      <div v-if="data.subjects.length == 0" class="welcome-message">
        <h2> Welcome to Multimodal! </h2>
        <div>
          It seems you haven't added any subjects yet.
          <ul>
            <li>Click on 'Create' to get started...</li>
            <li>...or peruse the <a href="https://periode.github.io/multimodal/" target="_blank">homepage</a> to learn more.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <Create v-if="showCreate" @exit="showCreate = false" @create-subject="createSubject"/>

  <div class="buttons-container">
    <button class="btn" @click="create">create</button>
    <button class="btn" @click="exportTo" :disabled="!selectedTopic">export</button>

    <div class="msg-log" id="msg-log"></div>
  </div>
</div>
</template>

<style scoped lang="scss">
@import '../sass/globals.scss';

.inter-class{
  margin-bottom: 50px;
}

.topic, .inter-btn-main {
	border: none;
	color: $main-fg-color;
	background-color: $main-bg-color;
	font-family: 'Inter UI';
	font-size: 1.2em;
	cursor: pointer;
}

.topic {
	border: 2px solid $main-bg-color;
	padding: 5px;
}

.topic:hover{
	border-color: $main-fg-color;
	font-weight: bold;
}

//---------------- BUTTONS
.buttons-container {
	position: fixed;
	z-index: 3;
	bottom: 0px;
	left: 0px;
	padding-left: 10px;
	height: 50px;
  line-height: 50px;
	width: 100%;

	background-color: $main-bg-color;
	border-top: 2px solid $main-fg-color;

	button {
		margin-right: 2%;
    border: none;
	}
}

.btn {
	border: none;
	color: $main-fg-color;
	background-color: $main-bg-color;
  font-size: $btn-size;
	font-family: 'Inter UI';
	cursor: pointer;

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

.btn:disabled{
  color: $main-bg-color;
}

li button{
  font-size: 1em;
  font-weight: bold;
  color: $main-bg-color;
  background-color: $main-fg-color;
  border-radius: 60px;
  z-index: 5;
}
</style>

<script>
const ipc = require('electron').ipcRenderer
const {dialog} = require('electron').remote

import Create from './Create.vue'

export default {
  components: {
    Create
  },
  props: {

  },
  data: function () {
    return {
      data: {},
      current: {},
      showCreate: false,
      selectedTopic: false
    }
  },
  methods: {
    setTopic(_e, _c, _l, _p) {
      this.current.subject = _c
      this.current.name = _l
      this.current.path = _p

      let all_lessons = document.getElementsByClassName('welcome-lesson')
      for(let l of all_lessons)
        l.setAttribute('class', 'welcome-lesson')


      _e.target.setAttribute('class', 'welcome-lesson selected')

      let btns = document.getElementsByClassName('inter-btn-main')
      for(let btn of btns)
        btn.disabled = false

      this.selectedTopic = true
    },
    openTopic(_c, _l, _p){
    	ipc.send('open-topic', this.current)
    },
    create() {
      this.showCreate = true
    },
    exportTo() {
      let options = {
    		'title':'Select export path',
    		'defaultPath':'~/',
    		'properties':['openDirectory', 'createDirectory']
    	}

    	dialog.showOpenDialog(options, (p) => {
    		ipc.send('export-subject', JSON.stringify({subject: this.current, path: p, type: 'html'}))
    	})

    },
    createTopic(subject){
      ipc.send('create-topic', {subject: subject})
    },
    removeTopic(topic){
      dialog.setMessage("are you sure you want to remove this topic?", ()=>{
        ipc.send('remove-topic', topic)
      }, null, true)
    },
    createSubject(subject){
      ipc.send('save-subject', subject)
    },
    removeSubject(subject){
      dialog.setMessage("are you sure you want to remove this subject?", ()=>{
        ipc.send('remove-subject', subject)
      }, null, true)
    }
  },
  beforeMount(){
    this.data = window.data
  },
  mounted(){

  }
}
</script>
