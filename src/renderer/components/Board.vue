subject-container<template>
  <div>

    <!-- LEFT -->
    <div class="subjects-container">
      <div class="subjects">

        <!-- LIST SUBJECTS -->
        <div v-for="single in data.subjects" class="subject-container">
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

        <!-- WELCOME MESSAGE -->
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

    <!-- RIGHT -->
    <div class="topics-container">
      <div class="topics">
        <ul>
          <li class="topic" v-for="instances in current.sessions"
            @click="setTopic($event, current.subject, current.name, current.path)"
            @dblclick="openTopic(current.subject, current.name, current.path)">
              Spring 2020 (dummy info)
          </li>
        </ul>
      </div>
    </div>

    <!-- OVERLAY -->
    <Create v-if="showCreate" @close="showCreate = false" @create-subject="createSubject"/>

    <!-- CONTROLS -->
    <div class="buttons-container">
      <button class="btn left" @click="showCreate = true">create</button>
      <button class="btn left" @click="exportTo('html', selectedSubject, selectedTopic)" :disabled="!(selectedSubject || selectedTopic)">to html</button>
      <button class="btn left" @click="exportTo('pdf', selectedSubject, selectedTopic)" :disabled="!(selectedSubject || selectedTopic)">to pdf</button>
      <button class="btn right" @click="importFrom">import</button>

      <div class="msg-log" id="msg-log"></div>
    </div>

  </div>
</template>

<style scoped lang="scss">
@import '../sass/globals.scss';


//---------------- GENERAL
.buttons-container, .subjects-container, .topics-container{
	position: absolute;
	width: 50%;
	height: 100%;
}

.buttons-container, .subjects-container{
  	float: left;
    left: 0;
}

//---------------- SUBJECTS
.subject-container{
  margin-bottom: 50px;
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

//---------------- TOPICS
.topic, .topic-instance {
	border: none;
	color: $main-fg-color;
	background-color: $main-bg-color;
	font-family: 'Inter UI';
	font-size: 1.2em;
	cursor: pointer;
}

.topics-container{
  float: right;
  right: 0;
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
    //------------
    //-- sets the current subject, taking event, subject and path
    //-- removes styles from all subjects and topics
    //-- styles the current subject
    //------------
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
      this.selectedTopic = false
    },
    //------------
    //-- sets the current topic, taking event, subject and path
    //-- removes styles from all subjects and topics
    //-- styles the current topic
    //------------
    setTopic(_e, _s, _n, _p) {
      this.current.subject = _s
      this.current.name = _n //-- this is setting the topic
      this.current.path = _p
      // this.current.sessions = ["session one", "session two"]

      // TODO: this can be streamlined
      let all_subjects = document.getElementsByClassName('subject')
      for(let s of all_subjects)
        s.setAttribute('class', s.getAttribute('class').replace('selected', ''))

      let all_topics = document.getElementsByClassName('topic')
      for(let l of all_topics)
        l.setAttribute('class', l.getAttribute('class').replace('selected', ''))

      let cl = _e.target.getAttribute('class')
      _e.target.setAttribute('class', `${cl} selected`)

      let btns = document.getElementsByClassName('inter-btn-main')
      for(let btn of btns)
        btn.disabled = false

      this.selectedTopic = true
      this.selectedSubject = false
    },
    openTopic(){
      if(this.current == {}) return

    	ipc.send('open-topic', this.current)
    },
    //------------
    //-- opens a dialog box to import a .mmd file
    //------------
    importFrom() {
      let options = {
        'title':'Select file to import',
        'defaultPath':'~/',
        'properties':['openFile']
      }

      dialog.showOpenDialog(options, (p) => {
    		ipc.send('import-subject', JSON.stringify({path: p[0]}))
    	})
    },

    //------------
    //-- opens a dialog box to export
    //-- either to html or to pdf
    //-- checks if topic or subject is non-null
    //-- and exports that
    //------------
    exportTo(_type, _selectedSubject, _selectedTopic) {
      if(this.current == {}) return

      let format = _selectedSubject ? 'subject' : _selectedTopic ? 'topic' : null
      if(format == null) return

      let options = {
    		'title':'Select export path',
    		'defaultPath':'~/',
    		'properties':['openDirectory', 'createDirectory']
    	}

    	dialog.showOpenDialog(options, (_path) => {
    		ipc.send('export', JSON.stringify({info: this.current, path: _path, type: _type, format: format}))
    	})
    },
    //------------
    //-- creates a topic, under a given subject
    //------------
    createTopic(_subject){
      ipc.send('create-topic', {subject: _subject})
    },
    //------------
    //-- removes a given topic
    //------------
    removeTopic(_topic){
      msgbox.setMessage("are you sure you want to remove this topic?", [{fn: () => {
        ipc.send('remove-topic', _topic)
      }, name: "remove"}], null, true)
    },
    //------------
    //-- creates a new subject
    //-- called from within the Create component
    //------------
    createSubject(_subject){
      ipc.send('save-subject', _subject)
    },
    //------------
    //-- removes a given subject
    //------------
    removeSubject(_subject){
      msgbox.setMessage("are you sure you want to remove this subject?", [{fn: () => {
        ipc.send('remove-subject', _subject)
      }, name: "remove"}], null, true)
    }
  },
  //------------
  //-- loads the data rendered with pug
  //------------
  beforeMount(){
    this.data = window.data
  },
  mounted(){
    console.log('hey');
    //------------
    //-- sets up the event listener
    //-- to display the result of exportTo
    //------------
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
