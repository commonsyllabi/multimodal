subject-container<template>
  <div>

    <div class="menu-container">
      <div class="menu-top">
        <div class="menu-item">
          {{new Date().toDateString()}}
        </div>

        <hr>
        <div class="menu-item">
        <button  @click="showCreate = true">create</button>
        </div>

        <div class="menu-item">
          <button  @click="importFrom">import</button>
        </div>

        <div class="menu-item">
          <button>settings</button>
        </div>
      </div>

      <div class="menu-bottom">
        <a href="mailto:pierre.depaz@gmail.com?subject=feedback">pierre depaz</a> | <a href="https://multimodal.cc" target="_blank">multimodal.cc</a>
      </div>

    </div>

    <!-- MIDDLE -->
    <div class="subjects-container">
      <div class="subjects">
        <h1>My Syllabi</h1>
        <!-- LIST SUBJECTS -->
        <div v-for="single in data.subjects" class="subject-container">
          <div class="subject">
            <div class="subject-name" @click="setSubject($event, single.subject.name, single.subject.path, single.subject.topics)">
              {{single.subject.name}}
              </div>

              <div class="subject-buttons">
                <button @click="removeSubject(single.subject)">rename</button>
                <button @click="">duplicate</button>
                <button @click="exportTo('html', selectedSubject, selectedTopic)" :disabled="!(selectedSubject || selectedTopic)">export</button>
                <!-- <button @click="exportTo('pdf', selectedSubject, selectedTopic)" :disabled="!(selectedSubject || selectedTopic)">to pdf</button> -->
                <button @click="removeSubject(single.subject)">remove</button>
              </div>

          </div>
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
      <div class="topics" v-if="current.subject.name != undefined">
        <h1>My Classes</h1>
        <ul>
          <li v-for="topic in current.subject.topics" class="topic"
          @click="setTopic($event, topic.name)"
          @dblclick="openTopic(topic.name)">

            {{topic.name}}

            <button class="right" @click="removeTopic(topic)">remove</button>
          </li>
        </ul>
        <button @click="createTopic(current.subject)">create new topic</button>
      </div>
    </div>

    <!-- OVERLAY -->
    <Create v-if="showCreate" @close="showCreate = false" @create-subject="createSubject"/>

    <!-- CONTROLS -->


    <div class="msg-log" id="msg-log"></div>

  </div>
</template>

<style scoped lang="scss">
@import '../sass/globals.scss';

h1{
  margin-bottom: 50px;
}


//---------------- GENERAL
.buttons-container, .subjects-container, .topics-container, .menu-container{
  display: inline-block;
  float: left;
	height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

.subjects-container, .topics-container{
  position: absolute;
	float: left;
  width: 40vw;
  left: 0;
}

//---------------- MENU
.menu-container{
  position: fixed;
  width: 12vw;
  padding: 2vw;
  background-color: $main-fg-color;
  color: $main-bg-color;
}

.menu-container hr{
  border: 1px solid $main-bg-color;
}

.menu-bottom{
  position: absolute;
  bottom: 100px;
}

.menu-item, .menu-item button{
  font-size: 24px;
  width: 90%;
  text-align: center;
  background-color: transparent;
  color: $main-bg-color;
}

//---------------- SUBJECTS
.subjects-container{
  left: 16vw;
}

.subjects{
	padding: 5%;
	margin-bottom: 5%;
}

.subject-container{
  margin-bottom: 30px;
  margin-top: 20px;
  border-bottom: 2px solid $main-fg-color;
  overflow: hidden;
}

.subject {
	width: 100%;
  margin-bottom: 5vh;
	font-weight: bold;
	font-size: 2em;
}

.subject button{
  text-align: center;
  border: none;
  margin: 0;
  padding: 0;
}

.subject-name, .subject-buttons{
  padding-left: 1vw;
}

.subject-buttons{
  pointer-events: all;
  width: 100%;
}

.subject-name{
  width: 100%;
  cursor: pointer;
  overflow: hidden;
}

//---------------- TOPICS
.topics-container{
  left: 56vw;
}

.topic, .topic-instance {
	border: none;
	color: $main-fg-color;
	background-color: $main-bg-color;
	font-family: 'Inter UI';
	font-size: 1.2em;
	cursor: pointer;
}

.topics{
  padding: 5%;
	margin-bottom: 5%;
}

.topic {
	border: 2px solid $main-bg-color;
  padding: 1vw;
  list-style-type: none;
  color: $main-bg-color;
  background-color: $main-fg-color;
}

.topic:hover{
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
  // font-size: 1.5em;

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
  // font-size: 1em;
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
      current: {
        subject: {
          name: undefined,
          topics: []
        },
        topic: {
          name: undefined
        }
      },
      showCreate: false,
      selectedTopic: false,
      selectedSubject: false
    }
  },
  methods: {
    //------------
    //-- sets the current subject, taking event, subject, path and topics
    //-- removes styles from all subjects and topics
    //-- styles the current subject
    //------------
    setSubject(_e, _s, _p, _t){
      this.current.subject.name = _s
      this.current.subject.topics = _t
      this.current.path = _p

      let all_subjects = document.getElementsByClassName('subject-name')
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
    setTopic(_e, _n) {
      this.current.topic.name = _n
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
      if(this.current.topic == {}) return

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
    //------------
    //-- sets up the event listener
    //-- to display the result of exportTo
    //------------
    ipc.on('export-success', (event, d) => {
      let data = {
        path: JSON.parse(d.data).path,
        type: JSON.parse(d.data).type,
        name: JSON.parse(d.data).info.name
      }

      msgbox.setMessage("export successful!", [{fn: () => {
        data.location = "folder"
        ipc.send('open-export', JSON.stringify(data))
      }, name: "show in folder"},
      {fn: () => {
        data.location = "show"
        ipc.send('open-export', JSON.stringify(data))
      }, name: "open file"}], null, true)
    })
  }
}
</script>
