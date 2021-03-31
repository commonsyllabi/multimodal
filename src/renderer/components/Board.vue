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
          <button disabled>settings</button>
        </div>
      </div>

      <div class="menu-bottom">
        <a href="mailto:pierre.depaz@gmail.com?subject=feedback">pierre depaz</a> | <a href="https://multimodal.cc" target="_blank">multimodal.cc</a>
      </div>

    </div>

    <!-- MIDDLE -->
    <div class="subjects-container">
      <div class="subjects">
        <h1 v-if="data.subjects.length > 0">My Syllabi</h1>
        <!-- LIST SUBJECTS -->
        <div v-for="single in data.subjects"
          :class="current.subject.name == single.subject.name ? 'subject-container unfolded' : 'subject-container folded'"
          v-bind:key="single.subject.id">
          <div class="subject">

            <!-- SUBJECT NAME -->
            <div  class="subject-name-holder">
              <div v-if="single.isEdit">
                <input type="text" v-model:value="single.subject.name" placeholder="subject name">
              </div>
              <div v-else @click="setSubject($event, single.subject)" class="subject-name left">
                {{single.subject.name}}
              </div>
              <div @click="showSessions($event, single.subject)" class="subject-open right">
                {{ viewSessions && current.subject.name == single.subject.name ? '<-' : '->'}}</div>
            </div>


              <div class="subject-buttons">
                <button @click="toggleEdit($event, single)">{{single.isEdit ? 'save' : 'edit'}}</button>
                <button @click="exportTo('subject', 'html', single.subject.name, single.subject.path)">to html</button>
                <button @click="exportTo('subject', 'pdf', single.subject.name, single.subject.path)">to pdf</button>
                <button @click="removeSubject(single.subject)">remove</button>
              </div>

              <div v-if="current.subject.name == single.subject.name" class="subject-info-container">
                <div class="subject-info-item">
                  <b>Description:</b><br>
                  <div v-if="!single.isEdit" v-html="markdown(single.subject)"></div>
                  <div v-else class="">
                    <textarea v-model:value="single.subject.description.text" placeholder="description of the subject"></textarea>
                  </div>

                </div>
                <div class="subject-info-item">
                  <b>Created at:</b><br>
                  {{single.subject.created}}
                </div>
                <div class="subject-info-item">
                  <b>Path:</b><br>
                  <div>
                    {{single.subject.path}}
                  </div>
                  <div v-if="single.isEdit">
                    <button class="right" @click="choosePath($event, single.subject)">choose path</button>
                  </div>
                </div>
              </div>

          </div>
        </div>

        <!-- WELCOME MESSAGE -->
        <div v-if="data.subjects.length == 0" class="welcome-message">
          <h2> Welcome! </h2>
          <div>
            <b>Multimodal</b> is a software for teaching, focusing on interactive classroom discussions, the creation of full syllabi and the organization of class notes.
            <br>
            <br>
            It seems you haven't added any subjects yet.
            <ul>
              <li>Click on <b>Create</b> to get started with a new syllabus.</li>
              <li>Click on <b>Import</b> to work with an existing syllabus.</li>
            </ul>
          </div>
        </div>


      </div>
    </div>

    <!-- RIGHT -->

    <!-- SESSIONS CONTAINER -->
    <div class="sessions-container">
      <div class="sessions" v-if="viewSessions">
        <h1>My Sessions</h1>
        <ul>
          <li v-for="session in current.subject.sessions" v-bind:key="session.id" class="session">
            <div class="session-name"> {{session.name}} </div>
            <div class="session-latest"> Last topic covered: {{current.subject.topics[current.subject.topics.length-1].name}}</div>
          </li>
        </ul>
        <button class="topic-create" disabled>new session</button>
      </div>
    </div>

    <!-- TOPICS CONTAINERS -->
    <div class="topics-container">
      <div class="topics" v-if="viewSessions">
        <h1>My Topics</h1>
        <ul>
          <li v-for="topic in current.subject.topics" v-bind:key="topic.id" class="topic">
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
        <button class="topic-create" @click="createTopic(current.subject)">new topic</button>
      </div>
    </div>

    <!-- OVERLAY -->
    <Create v-if="showCreate" @close="showCreate = false" @create-subject="createSubject"/>

    <div class="msg-log" id="msg-log"></div>

  </div>
</template>

<style scoped lang="scss">
@import '../sass/globals.scss';

h1{
  margin-bottom: 50px;
}


//---------------- GENERAL
.subjects-container, .topics-container, .menu-container, .sessions-container{
  display: inline-block;
  float: left;
	height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

.subjects-container, .topics-container, .sessions-container{
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

.menu-item button:hover{
  text-decoration: underline;
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
  border-bottom: 2px solid $main-fg-color;
  overflow: hidden;
  transition: all 1.5s linear;
}

.subject {
	width: 100%;
	font-weight: bold;
	font-size: 2em;
}

.subject button, .topic button{
  text-align: center;
  border: none;
  margin: 0;
  padding: 0;
}

.subject button:hover, .topic button:hover, .subject-name-holder:hover, .topic-name:hover{
  text-decoration: underline;
}

.subject-name-holder, .subject-buttons, .subject-info-container{
  padding-left: 1vw;
}

.subject-info-container{
	color: $main-fg-color;
	background-color: $main-bg-color;
  padding: 10px;
}

.subject-info-item{
  font-size: 16px;
  font-weight: normal;
  margin: 10px;
}

.subject-info-item button{
  font-size: 1.2em;
  background-color: $main-fg-color;
  color: $main-bg-color;
  padding: 5px;
}

.subject-info-item textarea{
  width: 100%;
  font-size: 1em;
  min-height: 150px;
  border-bottom: 2px solid $main-fg-color;
}

.subject-buttons{
  pointer-events: all;
  width: 100%;
  margin-top: -10px;
}

.subject-name-holder{
  padding-top: 20px;
  overflow: hidden;
}

.subject-name, .subject-open{
  cursor: pointer;
}

.subject-name:hover, .subject-open:hover{
  text-decoration: underline;
}

.subject-name-holder input{
  width: 50%;
  font-size: 1em;
  background-color: transparent;
  border-bottom: 2px solid $main-fg-color;
}

//---------------- TOPICS
.topics-container, .sessions-container{
  left: 56vw;
}

.topics-container{
  top: 40vh;
}

.topic, .topic-instance {
	border: none;
	color: $main-fg-color;
	background-color: $main-bg-color;
	font-family: 'Inter UI';
	font-size: 1.2em;
}

.topics, .sessions{
  padding: 5%;
	margin-bottom: 5%;
}

.topic, .session{
  margin: 4px;
}

.topic {
	border: 2px solid $main-fg-color;
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

.topic-name, .session-name{
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  font-weight: bold;
}

//---------------- SESSIONS
.session{
  list-style: none;
  padding: 1vw;

  border: 3px solid $main-fg-color;
  background-color: $main-bg-color;
}

//---------------- OTHERS
.selected{
  background-color: $main-fg-color;
  color: $main-bg-color;
  border-color: $main-fg-color;
  font-weight: bold;
}

.folded {
  max-height: 15vh;
}

.unfolded{
  max-height: 100vh;
}
</style>

<script>
const ipc = require('electron').ipcRenderer
const {dialog} = require('electron').remote
const marked = require('marked')

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
          id: undefined,
          path: '',
          topics: [],
          description: {
            "text": '',
            "html": ''
          },
          sessions: []
        },
        topic: {
          name: undefined
        }
      },
      showCreate: false,
      viewSessions: false
    }
  },
  methods: {
    markdown (_subject){
      _subject.description.html = marked(_subject.description.text)
      return  _subject.description.html
    },
    //------------
    //-- sets the current subject, taking event, subject, path and topics
    //-- removes styles from all subjects and topics
    //-- styles the current subject
    //------------
    setSubject(_e, _subject, _p, _t){

      //-- if we're already selected, we reset
      if(this.current.subject.name == _subject.name){
        this.resetSubject()
        return
      }

      //-- fold and stop edit mode for all other subjects
      for(let s of this.data.subjects)
        if(_subject.id != this.current.subject.id)
          s.isEdit = false


      //-- copy into the current subject
      Object.assign(this.current.subject, _subject)
      console.log('current topics:', this.current.subject.topics);

    },
    //------------
    //-- resets the current subject
    //------------
    resetSubject(){
      for(let s of this.data.subjects)
        s.isEdit = false

      this.current.subject.name = undefined
      this.current.subject.id = undefined
      this.current.subject.topics = undefined
      this.current.subject.path = undefined
      this.current.subject.description = undefined
    },
    //------------
    //-- shows the active class sessions for a given subject
    //------------
    showSessions(_e, _subject, _p, _t){
      this.viewSessions = !this.viewSessions

      if(this.viewSessions && this.current.subject.name != _subject.name) //-- if we have no subject selected
        this.setSubject(_e, _subject, _p, _t)
      else if(!this.viewSessions) //-- if we're already showing sessions
        this.resetSubject()
    },
    //------------
    //-- toggles edit mode independently for each subject
    //-- if the edit mode is active, it saves the subject
    //------------
    toggleEdit(_e, _single){
      this.setSubject(_e, _single.subject)

      if(_single.isEdit)
        ipc.send('save-subject', this.current.subject)

      for(let s of this.data.subjects)
        if(s.subject.id == _single.subject.id)
          s.isEdit = !s.isEdit
        else
          s.isEdit = false
    },
    //------------
    //-- opens the topic
    //------------
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

      dialog.showOpenDialog(options, (_path) => {
    		ipc.send('import-subject', JSON.stringify({path: _path[0]}))
    	})
    },
    choosePath(evt, _subject){
      let options = {
        'title':'Select new path for subject',
        'defaultPath':'~/',
        'properties':['openDirectory', 'createDirectory']
      }

      dialog.showOpenDialog(options, (_path) => {
    		_subject.path = _path[0]
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

    	dialog.showOpenDialog(options).then((result) => {
    		ipc.send('export', JSON.stringify({info: this.current, path: result.filePaths[0], type: _type, format: _format}))
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
      ipc.send('create-subject', _subject)
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
  //-- and sanitizes it
  //------------
  beforeMount(){
    Object.assign(this.data, sanitize(window.data))

    // this.data = sanitize(window.data)
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

let sanitize = (_data) => {
    //-- populate edit flags for each subject
    for(let s of window.data.subjects)
      s.isEdit = false

    //-- check that the data has correct description fields
    for(let s of window.data.subjects)
      if(s.subject.description.text == undefined)
        s.subject.description = {"text": s.subject.description, "html": ''}

    //-- add default sessions
    for(let s of window.data.subjects)
      if(s.sessions == undefined){
        s.subject.sessions = []
        if(s.subject.name == "augmenting-the-gallery"){
          s.subject.sessions.push({
            "name": "[IMNY-UT-9001] Spring 2019",
            "id": "000000001"
          })
          s.subject.sessions.push({
            "name": "[IMNY-UT-9001] Spring 2020",
            "id": "000000001"
          })
        }else{
          s.subject.sessions.push({
            "name": "Default Session",
            "id": "000000001"
          })
        }
      }

    return window.data
}
</script>
