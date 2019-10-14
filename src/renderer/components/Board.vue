<template>
<div>
  <div class="subjects-container">
    <div class="subjects">
      <div v-for="single in data.subjects" class="inter-class">
        <div class="subject" @click="setSubject($event, single.subject.name, single.subject.path)">
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

  <!-- <div class="topics-container">
    <div class="topics">
      <ul>
        <li class="topic" v-for="instances in current.sessions"
          @click="setTopic($event, current.subject, current.name, current.path)"
          @dblclick="openTopic(current.subject, current.name, current.path)">
            {{instances}}
        </li>
      </ul>
    </div>
  </div> -->

  <Create v-if="showCreate" @exit="showCreate = false" @create-subject="createSubject"/>

  <div class="buttons-container">
    <button class="btn left" @click="create">create</button>
    <button class="btn left" @click="exportTo('html')" :disabled="!(selectedSubject || selectedTopic)">to html</button>
    <button class="btn left" @click="exportTo('pdf')" :disabled="!(selectedSubject || selectedTopic)">to pdf</button>
    <button class="btn right" @click="importFrom">import</button>

    <div class="msg-log" id="msg-log"></div>
  </div>
</div>
</template>

<style scoped lang="scss">
@import '../sass/globals.scss';

.buttons-container, .subjects-container, .topics-container{
	position: absolute;
	width: 50%;
	height: 100%;
}

.buttons-container, .subjects-container{
  	float: left;
    left: 0;
}

.topics-container{
  float: right;
  right: 0;
}

.subjects, .topics{
	padding: 5%;
	margin-bottom: 5%;
}

.subject {
	width: 100%;
	font-weight: bold;
	font-size: 2em;
  cursor: pointer;
}

.inter-class{
  margin-bottom: 50px;
}

.topic, .topic-instance {
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

.selected {
	background-color: $main-fg-color;
	color: $main-bg-color;
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
	height: 35px;
  line-height: 35px;
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
  font-size: 1.5em;

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
  data: function () {
    return {
      data: {},
      current: {},
      showCreate: false,
      selectedTopic: false,
      selectedSubject: false
    }
  },
  methods: {
    setSubject(_e, _s, _p){
      this.current.subject = _s
      this.current.path = _p
      this.current.name = null

      let all_subjects = document.getElementsByClassName('subject')
      for(let s of all_subjects)
        s.setAttribute('class', s.getAttribute('class').replace('selected', ''))

      let all_topics = document.getElementsByClassName('topic')
      for(let l of all_topics)
        l.setAttribute('class', l.getAttribute('class').replace('selected', ''))

      let _class = _e.target.getAttribute('class')
      _e.target.setAttribute('class', `${_class} selected`)

      this.selectedSubject = true
    },
    setTopic(_e, _s, _n, _p) {
      this.current.subject = _s
      this.current.name = _n
      this.current.path = _p
      // this.current.sessions = ["session one", "session two"]

      // TODO: this can be streamlined
      let all_subjects = document.getElementsByClassName('subject')
      for(let s of all_subjects)
        s.setAttribute('class', s.getAttribute('class').replace('selected', ''))

      let all_topics = document.getElementsByClassName('topic')
      for(let l of all_topics)
        l.setAttribute('class', l.getAttribute('class').replace('selected', ''))

      let _class = _e.target.getAttribute('class')
      _e.target.setAttribute('class', `${_class} selected`)

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
    importFrom() {
      let options = {
        'title':'Select file to import',
        'defaultPath':'~/',
        'properties':['openFile']
      }

      dialog.showOpenDialog(options, (p) => {
        console.log(p);
    		ipc.send('import-subject', JSON.stringify({path: p[0]}))
    	})
    },
    exportTo(type) {
      let options = {
    		'title':'Select export path',
    		'defaultPath':'~/',
    		'properties':['openDirectory', 'createDirectory']
    	}

    	dialog.showOpenDialog(options, (p) => {
    		ipc.send('export-subject', JSON.stringify({subject: this.current, path: p, type: type}))
    	})
    },
    createTopic(subject){
      console.log('here');
      ipc.send('create-topic', {subject: subject})
    },
    removeTopic(topic){
      msgbox.setMessage("are you sure you want to remove this topic?", [{fn: () => {
        ipc.send('remove-topic', topic)
      }, name: "remove"}], null, true)
    },
    createSubject(subject){
      ipc.send('save-subject', subject)
    },
    removeSubject(subject){
      msgbox.setMessage("are you sure you want to remove this subject?", [{fn: () => {
        ipc.send('remove-subject', subject)
      }, name: "remove"}], null, true)
    }
  },
  beforeMount(){
    this.data = window.data
  },
  mounted(){
    ipc.on('export-success', (event, d) => {
      msgbox.setMessage("export successful!", [{fn: () => {
        d.type = "folder"
        ipc.send('open-export', JSON.stringify(d))
      }, name: "show in folder"},
      {fn: () => {
        d.type = "show"
        ipc.send('open-export', JSON.stringify(d))
      }, name: "open file"}], null, true)
    })
  }
}
</script>
