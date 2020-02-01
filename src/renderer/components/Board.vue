<template>
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

              <div v-if="current.subject.name == single.subject.name" class="subject-info-container">
                <div class="subject-info-item">
                  <b>Description:</b><br>
                  {{single.subject.description}}
                </div>
                <div class="subject-info-item">
                  <b>Created at:</b><br>
                  {{single.subject.created}}
                </div>
                <div class="subject-info-item">
                  <b>Path:</b><br>
                  {{single.subject.path}}
                </div>
              </div>

              <div class="subject-buttons">
                <button @click="removeSubject(single.subject)">rename</button>
                <button @click="">duplicate</button>
                <button @click="exportTo('subject', 'html', single.subject.name, single.subject.path)">to html</button>
                <button @click="exportTo('subject', 'pdf', single.subject.name, single.subject.path)">to pdf</button>
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
          <li v-for="topic in current.subject.topics" class="topic">
          <div class="topic-name" @click="openTopic($event, topic.name)">
            {{topic.name}}
          </div>

            <div class="topic-buttons">
              <button @click="exportTo('topic', 'html', topic.name)">to html</button>
              <button @click="exportTo('topic', 'pdf', topic.name)">to pdf</button>
              <button @click="removeTopic(topic)">remove</button>
            </div>
          </li>
        </ul>
        <button class="topic-create" @click="createTopic(current.subject)">create new topic</button>
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
.subjects-container, .topics-container, .menu-container{
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

.subject button, .topic button{
  text-align: center;
  border: none;
  margin: 0;
  padding: 0;
}

.subject button:hover, .topic button:hover{
  text-decoration: underline;
}

.subject-name, .subject-buttons, .subject-info-container{
  padding-left: 1vw;
}

.subject-info-container{
	color: $main-bg-color;
	background-color: $main-fg-color;
  padding-top: 10px;
  padding-bottom: 10px;
}

.subject-info-item{
  font-size: 16px;
  font-weight: normal;
  margin: 10px;
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

.topic button{
  color: $main-bg-color;
  background-color: $main-fg-color;
  cursor: pointer;
}

.topic-create{
  font-size: 18px;
  font-weight: bold;
}

.topic-name{
  width: 100%;
  cursor: pointer;
  overflow: hidden;
}

.topic-name:hover{
	font-weight: bold;
}

.selected {
	background-color: $main-fg-color;
	color: $main-bg-color;
	border-color: $main-fg-color;
	font-weight: bold;
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
        },
        path: ''
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
    openTopic(_e, _n){
      this.current.topic.name = _n
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
    //-- either from subject or topic
    //-- either to html or to pdf
    //-- with a given path
    //-- and exports that
    //------------
    exportTo(_format, _type, _name, _path) {
      if(_format == 'topic') this.current.topic.name = _name

      let options = {
    		'title':'Select export path',
    		'defaultPath':'~/',
    		'properties':['openDirectory', 'createDirectory']
    	}

    	dialog.showOpenDialog(options, (_path) => {
    		ipc.send('export', JSON.stringify({info: this.current, path: _path, type: _type, format: _format}))
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
